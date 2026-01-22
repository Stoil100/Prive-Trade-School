"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase/config";
import { uploadImage } from "@/firebase/utils/upload";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    setDoc,
    Timestamp,
} from "firebase/firestore";
import {
    ChangeEvent,
    useEffect,
    useState
} from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const newsFormSchema = z.object({
    title: z.string().min(1, { message: "Please enter a valid title." }),
    description: z.string().optional(),
    image: z.string().optional(),
});

export default function NewsAdmin() {
    const [uploadedNews, setUploadedNews] = useState<any>();
    const [submitImage, setSubmitImage] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [submitValues, setSubmitValues] = useState<
        z.infer<typeof newsFormSchema>
    >({
        title: "",
        description: "",
        image: "",
    });

    const newsForm = useForm<z.infer<typeof newsFormSchema>>({
        resolver: zodResolver(newsFormSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });
    useEffect(() => {
        const fetchUploadedContent = async () => {
            const querySnapshot = await getDocs(collection(db, "news"));
            const content: any = [];
            querySnapshot.forEach((doc) => {
                content.push({
                    id: doc.id,
                    title: doc.data().title!,
                    image: doc.data().image!,
                });
            });
            setUploadedNews(content);
        };
        fetchUploadedContent();
    }, []);

    async function onSubmit(values: z.infer<typeof newsFormSchema>) {
        const submitValues = {
            title: values.title,
            description: values.description,
            image:
                submitImage !== ""
                    ? submitImage
                    : "https://cdn.pixabay.com/photo/2016/02/01/00/56/news-1172463_1280.jpg",
        };
        setSubmitValues(submitValues);
    }

    const handleUpload = async () => {
        setLoading(true);
        await setDoc(doc(db, "news", `${Date.now()}`), {
            title: submitValues.title,
            description: submitValues.description,
            image: submitValues.image,
            createdAt: Timestamp.now(),
        });
        setLoading(false);
        setSubmitImage("");
        setSubmitValues({
            title: "",
            description: "",
            image: "",
        });
        newsForm.reset;
    };
    async function deleteNews(id: string) {
        await deleteDoc(doc(db, "news", id));
    }
    async function getImageData(event: ChangeEvent<HTMLInputElement>) {
        return await uploadImage(
            event.target.files![0],
            event.target.files![0].name,
        );
    }
    return (
        <div className="w-full">
            <div className="flex w-full flex-col items-center justify-around md:flex-row">
                <div className="flex w-fit flex-col rounded-lg border text-center">
                    <h2 className="text-2xl">Enter news information here:</h2>
                    <Form {...newsForm}>
                        <form
                            onSubmit={newsForm.handleSubmit(onSubmit)}
                            className="flex h-full w-full flex-col justify-between space-y-2 p-10 text-left text-black"
                        >
                            <FormField
                                control={newsForm.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter news title here..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={newsForm.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter news description here..."
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={newsForm.control}
                                name="image"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Image:</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                placeholder="Place your image here..."
                                                onChangeCapture={async (
                                                    event,
                                                ) => {
                                                    setLoading(true);
                                                    const res =
                                                        await getImageData(
                                                            event as ChangeEvent<HTMLInputElement>,
                                                        );
                                                    setSubmitImage(res);
                                                    setLoading(false);
                                                }}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                className="w-full"
                                type="submit"
                                disabled={isLoading}
                            >
                                Preview
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="flex h-full w-fit flex-col items-center justify-between gap-2">
                    <h2 className="text-center text-4xl font-bold">Result:</h2>
                    {submitValues.title !== "" && (
                        <div
                            className={cn(
                                "h-[450px] w-[350px] border bg-cover bg-center",
                                submitValues.image,
                            )}
                            style={{
                                backgroundImage: `url(${submitValues.image})`,
                            }}
                        >
                            <div className="flex h-full w-full flex-col justify-end border-sky-500 bg-opacity-30 bg-gradient-to-t from-black to-transparent to-70% p-4 text-white transition-all hover:border-b-8 hover:to-80% sm:to-50%">
                                <p className="text-4xl">{submitValues.title}</p>
                                <p>{submitValues.description}</p>
                            </div>
                        </div>
                    )}
                    <Button
                        disabled={submitValues.title === "" || isLoading}
                        className="w-full"
                        onClick={handleUpload}
                    >
                        Upload
                    </Button>
                </div>
            </div>
            <div className="w-full">
                <div className="flex h-[500px] w-full">
                    {uploadedNews?.map(
                        (
                            header: {
                                id: string;
                                title: string;
                                image: string;
                            },
                            index: number,
                        ) => (
                            <div
                                key={index}
                                className="flex h-full flex-col items-center justify-center gap-1 p-3 sm:w-1/2 md:w-1/3"
                            >
                                <div className=" flex flex-col items-center justify-center gap-2">
                                    <h2 className="text-4xl ">
                                        {header.title}
                                    </h2>
                                    <img
                                        src={header.image}
                                        className="max-h-[300px] w-auto"
                                    />
                                </div>
                                <Button
                                    className="w-full"
                                    onClick={() => {
                                        deleteNews(header.id);
                                    }}
                                >
                                    Delete
                                </Button>
                            </div>
                        ),
                    )}
                </div>
            </div>
        </div>
    );
}
