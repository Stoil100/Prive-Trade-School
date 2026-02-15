"use client";

import MainButton from "@/components/MainButton";
import {
    adminCreateSchema,
    AdminFormValues,
} from "@/components/schemas/admin/adminCreate";
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
import { auth, db, firebaseApp } from "@/firebase/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AdminCreateFormProps {
    t: (key: string, values?: Record<string, any>) => string;
}

type CreateAdminUserInput = { email: string; password: string };
type CreateAdminUserOutput = { uid: string; email: string };

export async function adminCreateUser(email: string, password: string) {
    const functions = getFunctions(firebaseApp);
    const fn = httpsCallable<CreateAdminUserInput, CreateAdminUserOutput>(
        functions,
        "adminCreateUser",
    );

    const res = await fn({ email, password });
    return res.data; // { uid, email }
}

export function AdminCreateForm({ t }: AdminCreateFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<AdminFormValues>({
        resolver: zodResolver(adminCreateSchema((key) => t(`errors.${key}`))),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: AdminFormValues) {
        setIsLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password,
            );

            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: values.email,
                role: "admin",
            });

            // Reset form
            form.reset();
        } catch (error: any) {
            console.error("Error creating admin:", error);

            let errorMessage =
                "Failed to create admin profile. Please try again.";

            if (error.code === "auth/email-already-in-use") {
                errorMessage = t("errors.emailAlreadyInUse");
            } else if (error.code === "auth/weak-password") {
                errorMessage = t("errors.weakPassword");
            } else if (error.code === "auth/invalid-email") {
                errorMessage = t("errors.invalidEmail");
            }

            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="rounded-xl border p-4 shadow-sm">
            <h3 className="mb-4 text-3xl font-semibold">{t("title")}</h3>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("email.label")}</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="admin@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    {t("email.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("password.label")}</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder={t("password.placeholder")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    {t("password.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {t("confirmPassword.label")}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder={t(
                                            "confirmPassword.placeholder",
                                        )}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    {t("confirmPassword.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <MainButton
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {isLoading ? t("loading") : t("submit")}
                    </MainButton>
                </form>
            </Form>
        </div>
    );
}
