"use client";

import { useAuth } from "@/components/Providers";
import { useRouter } from "next/router";
import React, { useState, useRef, ChangeEvent, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadImage } from "@/firebase/utils/upload";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { db } from "@/firebase/config";
import { setDoc,doc, Timestamp } from "firebase/firestore";

const formSchema = z.object({
    title: z.string().min(1, { message: "Please enter a valid title." }),
    description: z
        .string()
        .optional(),
    image:z.string().optional(),
});

export default function Admin() {
    const [submitImage, setSubmitImage]=useState("");
    const [isLoading,setLoading] = useState(false);
    const [submitValues, setSubmitValues] = useState<
        z.infer<typeof formSchema>
    >({
        title: "",
        description: "",
        image:"",
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });
    const { user, loading } = useAuth();

    useLayoutEffect(() => {
        if (user.role !== "admin" && !loading) {
            redirect("/");
        }
    }, [user, loading]);



    async function onSubmit(values: z.infer<typeof formSchema>) {
        const submitValues = {
            title:values.title,
            description:values.description,
            image:submitImage!==""? submitImage :"https://cdn.pixabay.com/photo/2016/02/01/00/56/news-1172463_1280.jpg",
        }
        setSubmitValues(submitValues);
    }

    const handleUpload = async() => {
        setLoading(true);
        await setDoc(doc(db, "news", `${Date.now()}`), {
            title:submitValues.title,
            description: submitValues.description,
            image: submitValues.image,
            createdAt: Timestamp.now()

        });
        setLoading(false);
        setSubmitImage("");
        setSubmitValues({
            title: "",
            description: "",
            image:"",
        })
        form.reset;
    };

    async function getImageData(event: ChangeEvent<HTMLInputElement>) {      
        return await uploadImage(event.target.files![0], event.target.files![0].name)
      }
    return (
        <section className="flex flex-col md:flex-row items-center justify-around bg-white p-2">
            <div className="flex w-fit flex-col border rounded-lg text-center">
                <h2 className="text-2xl">Enter news information here:</h2>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex h-full w-full flex-col justify-between p-10 text-black text-left space-y-2"
                    >
                        <FormField
                            control={form.control}
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
                            control={form.control}
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
                            control={form.control}
                            name="image"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Image:</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            placeholder="Place your image here..."
                                            onChangeCapture={async(event) => {
                                                setLoading(true);
                                                const  res  = await getImageData(event as ChangeEvent<HTMLInputElement>);
                                               setSubmitImage(res);
                                               setLoading(false);
                                              }}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="w-full" type="submit" disabled={isLoading}>
                            Preview
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="flex w-fit h-full flex-col items-center justify-between gap-2">
                <h2 className="text-center font-bold text-4xl">Result:</h2>
                {submitValues.title !== "" && (
                    <div
                        className={cn(
                            "h-[450px] border bg-cover w-[350px] bg-center",
                            submitValues.image,
                        )}
                        style={{
                            backgroundImage: `url(${submitValues.image})`
                        }}
                    >
                        <div className="flex h-full w-full flex-col justify-end border-sky-500 bg-opacity-30 bg-gradient-to-t from-black to-transparent to-70% p-4 text-white transition-all hover:border-b-8 hover:to-80% sm:to-50%">
                            <p className="text-4xl">{submitValues.title}</p>
                            <p>{submitValues.description}</p>
                        </div>
                    </div>
                )}
                <Button disabled={submitValues.title === "" || isLoading} className="w-full" onClick={handleUpload}>Upload</Button>
            </div>
        </section>
    );
}