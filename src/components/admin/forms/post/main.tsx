"use client";

import MainButton from "@/components/MainButton";
import { postSchema, PostSchemaType } from "@/components/schemas/admin/post";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { UploadIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Descriptions } from "./descriptions";
import { Docs } from "./docs";
import { Lists } from "./lists";
import { TitleDescriptions } from "./titleDescriptions";

interface PostSchemaProps {
    type: "headers" | "news" | "projects";
    t: (key: string, values?: Record<string, any>) => string;
}

export function PostForm({ type, t }: PostSchemaProps) {
    const formSchema = postSchema((key) => t(`errors.${key}`));
    const form = useForm<PostSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            heroImage: "",
        },
    });

    async function onSubmit(values: PostSchemaType) {
        await addDoc(collection(db, type), {
            ...values,
            createdAt: serverTimestamp(),
        });
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("title")}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="heroImage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("heroImage")}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <TitleDescriptions
                    control={form.control}
                    name="titleDescriptions"
                    t={(key) => t(`titleDescriptions.${key}`)}
                />

                <Descriptions
                    control={form.control}
                    name="descriptions"
                    t={(key) => t(`descriptions.${key}`)}
                />

                <Lists
                    control={form.control}
                    name="lists"
                    t={(key) => t(`lists.${key}`)}
                />

                <Docs
                    control={form.control}
                    name="docs"
                    t={(key) => t(`docs.${key}`)}
                />

                <MainButton className="w-full" type="submit">
                    {t(`submit.${type}`)} <UploadIcon />
                </MainButton>
            </form>
        </Form>
    );
}
