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
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Timestamp,
    collection,
    deleteDoc,
    doc,
    getDocs,
    setDoc,
} from "firebase/firestore";
import {
    ChangeEvent,
    useEffect,
    useState
} from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

const headersFormSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    titleDesc: z.string().optional(),
    image: z.string().optional(),
    descriptions: z.array(
        z.object({ descTitle: z.string().optional(), description: z.string().optional() }),
    ),
    tables: z
        .array(
            z.object({
                tableTitle: z.string().optional(),
                tableItems: z.array(z.string()).optional(),
            }),
        )
        .optional(),
        footer:z.string().optional(),
});

type HeaderFormValues = z.infer<typeof headersFormSchema>;

export default function HeadersAdmin() {
    const [bValue, setBValue] = useState(false);
    const [uploadedHeaders, setUploadedHeaders] =
        useState<HeaderFormValues[]>();
    const [isLoading, setLoading] = useState(false);
    const [submitImage, setSubmitImage] = useState("");
    const [submitValues, setSubmitValues] = useState<HeaderFormValues>({
        title: "",
        titleDesc:"",
        image: "",
        descriptions: [{ descTitle: "", description: "" }],
        tables: [{ tableTitle: "", tableItems: [""] }],
        footer:"",
    });

    useEffect(() => {
        const fetchUploadedContent = async () => {
            const querySnapshot = await getDocs(collection(db, "headers"));
            const content: any = [];
            querySnapshot.forEach((doc) => {
                content.push({
                    id: doc.id,
                    title: doc.data().title!,
                    image: doc.data().image!,
                });
            });
            setUploadedHeaders(content);
        };
        fetchUploadedContent();
    }, []);

    async function deleteHeader(id: string) {
        await deleteDoc(doc(db, "headers", id));
    }

    const headersForm = useForm<z.infer<typeof headersFormSchema>>({
        resolver: zodResolver(headersFormSchema),
        defaultValues: {
            title: "",
            titleDesc:"",
            image: "",
            descriptions: [{ descTitle: "", description: "" }],
            tables: [
                {
                    tableTitle: "",
                    tableItems: ["", ""],
                },
            ],
            footer:"",
        },
    });

    async function onSubmit(values: z.infer<typeof headersFormSchema>) {
        const submitFormValues = {
            title: values.title,
            titleDesc:values.titleDesc,
            image:
                submitImage !== ""
                    ? `${submitImage}`
                    : "https://cdn.pixabay.com/photo/2016/02/01/00/56/news-1172463_1280.jpg",
            descriptions: values.descriptions,
            tables: values.tables,
            footer:values.footer,
        };
        console.table(submitFormValues);
        setSubmitValues(submitFormValues);
    }
    async function uploadContent() {
        setLoading(true);
        await setDoc(doc(db, "headers", `${Date.now()}`), {
            title: submitValues.title,
            titleDesc:submitValues.titleDesc,
            descriptions: submitValues.descriptions,
            image: submitValues.image,
            tables: submitValues.tables,
            footer:submitValues.footer,
            createdAt: Timestamp.now(),
        });
        setLoading(false);
        setSubmitImage("");
        setSubmitValues({
            title: "",
            titleDesc:"",
            image: "",
            descriptions: [{ descTitle: "", description: "" }],
            tables: [{ tableTitle: "", tableItems: [""] }],
            footer:"",
        });
        headersForm.reset;
    }
    async function getImageData(event: ChangeEvent<HTMLInputElement>) {
        return await uploadImage(
            event.target.files![0],
            event.target.files![0].name,
        );
    }

    const { fields: descriptionFields, append: appendDesc } = useFieldArray({
        control: headersForm.control,
        name: "descriptions",
    });
    const { fields: tableFields, append: appendTable } = useFieldArray({
        control: headersForm.control,
        name: "tables",
    });

    return (
        <div className="h-fit w-full space-y-2 rounded border p-2">
            <h1 className="text-center text-6xl">Header admin section:</h1>
            <Form {...headersForm}>
                <form
                    onSubmitCapture={headersForm.handleSubmit(onSubmit)}
                    className="flex h-full w-full flex-col justify-between space-y-2 rounded border border-black p-10 text-left text-black"
                >
                    <h3 className="text-4xl">Create new header:</h3>
                    <FormField
                        control={headersForm.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title:</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter headers title here..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={headersForm.control}
                        name="titleDesc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title description:</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter headers title description here..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={headersForm.control}
                        name="image"
                        render={() => (
                            <FormItem>
                                <FormLabel>Image:</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        placeholder="Place your image here..."
                                        onChangeCapture={async (event) => {
                                            setLoading(true);
                                            const res = await getImageData(
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
                    {descriptionFields.map((_, index) => (
                        <div key={index}>
                            <FormField
                                control={headersForm.control}
                                key={`descriptions.${index}.descTitle`}
                                name={`descriptions.${index}.descTitle`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Description title:
                                        </FormLabel>
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
                                control={headersForm.control}
                                key={`descriptions.${index}.description`}
                                name={`descriptions.${index}.description`}
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
                        </div>
                    ))}
                    <Button
                        disabled={isLoading}
                        type="button"
                        onClick={() =>
                            appendDesc({ descTitle: "", description: "" })
                        }
                    >
                        Add more descriptions
                    </Button>

                    {tableFields.map((_, index) => (
                        <div key={index}>
                            <FormField
                                control={headersForm.control}
                                key={`tables.${index}.tableTitle`}
                                name={`tables.${index}.tableTitle`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Table title:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter headers table title here..."
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={headersForm.control}
                                key={`tables.${index}.tableItems`}
                                name={`tables.${index}.tableItems`}
                                render={({ field }) => (
                                    <>
                                        {field.value!.map(
                                            (_, tableItemIndex) => (
                                                <FormItem
                                                    key={`tables.${index}.tableItems.${tableItemIndex}`}
                                                >
                                                    <FormLabel>
                                                        Table Item{" "}
                                                        {tableItemIndex + 1}:
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter headers table item here..."
                                                            //@ts-ignore
                                                            onInput={(event,) => {field.value[tableItemIndex] =event.target.value;}}
                                                        />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            ),
                                        )}
                                        <Button
                                            disabled={isLoading}
                                            type="button"
                                            key={index}
                                            onClick={() => {
                                                field.value!.push("");
                                                setBValue(!bValue);
                                            }}
                                        >
                                            Add more table items
                                        </Button>
                                    </>
                                )}
                            />
                        </div>
                    ))}

                    <Button
                        disabled={isLoading}
                        onClick={() =>
                            appendTable({
                                tableTitle: "",
                                tableItems: [""],
                            })
                        }
                        type="button"
                    >
                        Add more tables
                    </Button>
                    <FormField
                        control={headersForm.control}
                        name="footer"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Footer:</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter headers footer here..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={isLoading}
                        className="w-full"
                        type="submit"
                    >
                        Preview
                    </Button>
                </form>
            </Form>
            {submitValues.title !== "" && (
                <>
                    <h2 className="text-4xl">Preview header before upload:</h2>
                    <div className="flex flex-col rounded border border-black bg-white p-6">
                        <h2 className="mb-4 text-center text-7xl font-bold underline decoration-4">
                            {submitValues.title}
                        </h2>
                        <h4 className="text-center text-4xl mb-2">{submitValues.titleDesc!}</h4>
                        <img
                            className="max-h-[81vh] w-full object-cover"
                            src={submitValues.image!}
                            alt="header image"
                        />
                        <div className="px-4 pt-2">
                            {submitValues.descriptions!.map(
                                (description, index) => (
                                    <div key={index} className="space-y-2">
                                        <h4 className="text-4xl">
                                            {description.descTitle}
                                        </h4>
                                        <p className="px-2 text-xl">{description.description}</p>
                                    </div>
                                ),
                            )}
                        </div>
                        <div className="p-4">
                            {submitValues.tables!.map((table, tableIndex) => (
                                <>
                                    <h5 className="text-3xl">
                                        {table.tableTitle}
                                    </h5>
                                    <ul
                                        key={tableIndex}
                                        className="list-decimal px-10 py-2 text-lg"
                                    >
                                        {table.tableItems!.map(
                                            (item, listIndex) => (
                                                <li key={listIndex}>{item}</li>
                                            ),
                                        )}
                                    </ul>
                                </>
                            ))}
                        </div>
                        <h5>{submitValues.footer!}</h5>
                        <Button type="button" onClick={uploadContent}>
                            Upload
                        </Button>
                    </div>
                </>
            )}

            <div className="h-fit w-full rounded border border-black">
                <h2 className="text-4xl">Delete headers:</h2>
                {uploadedHeaders?.map((header, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center gap-1 p-3 sm:w-1/2 md:w-1/3"
                    >
                        <div className=" flex flex-col items-center justify-center gap-2">
                            <h2 className="text-4xl ">{header.title}</h2>
                            <img src={header.image} />
                        </div>
                        <Button
                            type="button"
                            className="w-full"
                            onClick={() => {
                                deleteHeader(header.id!);
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
