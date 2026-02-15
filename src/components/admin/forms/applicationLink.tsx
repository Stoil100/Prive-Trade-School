"use client";

import LoadingOverlay from "@/components/Loading";
import MainButton from "@/components/MainButton";
import {
    ApplicationLinkFormValues,
    applicationLinkSchema,
} from "@/components/schemas/admin/applicationLink";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Link as LinkIcon, Loader2, UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ApplicationLinkFormProps {
    t: (key: string, values?: Record<string, any>) => string;
    documentId?: string;
}

export function ApplicationLinkForm({
    documentId = "application-link",
    t,
}: ApplicationLinkFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [linkExists, setLinkExists] = useState(false);

    const form = useForm<ApplicationLinkFormValues>({
        resolver: zodResolver(
            applicationLinkSchema((key) => t(`errors.${key}`)),
        ),
        defaultValues: {
            link: "",
        },
    });

    // Fetch existing link data on component mount
    useEffect(() => {
        const fetchLink = async () => {
            try {
                setIsFetching(true);
                const docRef = doc(db, "links", documentId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setLinkExists(true);
                    form.reset({
                        link: data.link || "",
                    });
                } else {
                    setLinkExists(false);
                }
            } catch (error) {
                console.error("Error fetching link:", error);
                toast.error("Failed to fetch existing link");
            } finally {
                setIsFetching(false);
            }
        };

        fetchLink();
    }, [documentId, form]);

    async function onSubmit(values: ApplicationLinkFormValues) {
        try {
            setIsLoading(true);
            const docRef = doc(db, "links", documentId);

            await setDoc(docRef, {
                link: values.link,
                updatedAt: new Date().toISOString(),
            });

            setLinkExists(true);
            toast.success(
                linkExists ? t("success.update") : t("success.upload"),
            );
        } catch (error) {
            console.error("[v0] Error saving link:", error);
            toast.error(t("error.save"));
        } finally {
            setIsLoading(false);
        }
    }

    if (isFetching) {
        return <LoadingOverlay />;
    }

    console.log(linkExists);
    return (
        <Card className="mx-auto w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5" />
                    {t("title")}
                </CardTitle>
                <CardDescription>
                    {linkExists
                        ? t("description.update")
                        : t("description.upload")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="link"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("link.label")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://example.com"
                                            type="url"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        {t("link.description")}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <MainButton
                            type="submit"
                            disabled={isLoading}
                            className="w-full"
                        >
                            {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {linkExists
                                ? t("button.update")
                                : t("button.upload")}
                            <UploadIcon />
                        </MainButton>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
