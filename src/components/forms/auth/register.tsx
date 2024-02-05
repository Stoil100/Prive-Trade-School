"use client";
import * as z from "zod";
import React, { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { useAuth } from "../../Providers";
import { AuthT } from "@/models/auth";
import { Icons } from "@/components/ui/icons";
import { useRouter } from "next/navigation";

const formSchema = z
    .object({
        email: z
            .string()
            .email({ message: "Please enter a valid email address." }),
        phone: z
            .string()
            .regex(
                new RegExp(
                    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
                ),
                "Invalid phone number",
            )
            .optional(),
        password: z
            .string()
            .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
            .regex(new RegExp(".*[a-z].*"), "One lowercase character")
            .regex(new RegExp(".*\\d.*"), "One number")
            .regex(
                new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
                "One special character",
            )
            .min(8, "Must be at least 8 characters in length"),

        confirmPassword: z
            .string()
            .min(8, "Must be at least 8 characters in length"),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match",
            });
        }
    });

export default function RegisterForm() {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { signUp, googleLogin } = useAuth();
    const router=useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            const errorMessage = await signUp(values as AuthT);
            if (errorMessage !== null){
                const errorMessageMap: any = {
                    "auth/email-already-in-use": "Email is already in use",
                
                };
                setError(errorMessageMap[errorMessage.code]);
            }
        router.push("/")
        } catch (error) {
           throw error
        }
        setIsLoading(false);
    }
    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <Button className="w-full bg-blue-500" onClick={googleLogin} disabled={isLoading}>
                <Icons.google className="mr-2 h-4 w-4" />
                Google
            </Button>
            <div className="flex w-full items-center">
                <div className="w-full border-t-2 border-gray-300" />
                <p className="w-full text-center">Or with</p>
                <div className="h-1 w-full border-t-2 border-gray-300" />
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex h-full w-full flex-col justify-between space-y-2 text-black"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email:</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your Email here..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password:</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your password here..."
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm password:</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Confirm your password here..."
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {error && <p>{error}</p>}
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={isLoading}
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}
