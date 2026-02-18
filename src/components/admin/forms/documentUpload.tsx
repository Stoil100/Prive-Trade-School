"use client";

import MainButton from "@/components/MainButton";
import {
    uploadDocSchema,
    UploadDocSchemaType,
} from "@/components/schemas/admin/doc";
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
import { Textarea } from "@/components/ui/textarea";
import { db, storage } from "@/firebase/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FileText, Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface DocumentUploadFormProps {
    t: (key: string, values?: Record<string, any>) => string;
    onSuccess?: () => void;
}
export function DocumentUploadForm({ t, onSuccess }: DocumentUploadFormProps) {
    const [isUploading, setIsUploading] = useState(false);

    const form = useForm<UploadDocSchemaType>({
        resolver: zodResolver(uploadDocSchema((key) => t(`errors.${key}`))),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const onSubmit = async (data: UploadDocSchemaType) => {
        setIsUploading(true);
        try {
            const file = data.file[0];

            // Upload file to Firebase Storage
            if (!file) throw new Error("No file selected");

            if (file.size > 3 * 1024 * 1024) {
                throw new Error("File must be under 3MB");
            }

            const uniqueName = `${Date.now()}-${crypto.randomUUID()}-${file.name}`;
            const storageRef = ref(storage, `documents/${uniqueName}`);

            await uploadBytes(storageRef, file, {
                cacheControl: "public, max-age=31536000",
                contentType: file.type,
            });

            const downloadURL = await getDownloadURL(storageRef);

            // Add document metadata to Firestore
            await addDoc(collection(db, "documents"), {
                title: data.title,
                description: data.description || "",
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
                fileUrl: downloadURL,
                uploadedAt: Timestamp.now(),
            });

            toast("Document uploaded successfully");

            form.reset();
            onSuccess?.();
        } catch (error) {
            console.error("[v0] Upload error:", error);
            toast.error("Failed to upload document. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const selectedFile = form.watch("file")?.[0];

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("title.label")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t("title.placeholder")}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                {t("title.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("description.label")}</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={t("description.placeholder")}
                                    className="resize-none"
                                    rows={3}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                {t("description.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="file"
                    render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                            <FormLabel>{t("file.label")}</FormLabel>
                            <FormControl>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                        <Input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) =>
                                                onChange(e.target.files)
                                            }
                                            {...field}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                    {selectedFile && (
                                        <div className="border-border bg-muted flex items-center gap-2 rounded-lg border p-3">
                                            <FileText className="text-muted-foreground h-5 w-5" />
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium">
                                                    {selectedFile.name}
                                                </p>
                                                <p className="text-muted-foreground text-xs">
                                                    {(
                                                        selectedFile.size /
                                                        1024 /
                                                        1024
                                                    ).toFixed(2)}{" "}
                                                    MB
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </FormControl>
                            <FormDescription>
                                {t("file.description")}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <MainButton
                    type="submit"
                    disabled={isUploading}
                    className="w-full"
                >
                    {isUploading ? (
                        <>
                            {t("uploading")}
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        </>
                    ) : (
                        <>
                            {t("submit")}
                            <Upload className="mr-2 h-4 w-4" />
                        </>
                    )}
                </MainButton>
            </form>
        </Form>
    );
}
