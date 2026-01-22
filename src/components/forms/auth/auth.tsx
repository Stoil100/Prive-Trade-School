"use client";

import { useRouter } from "@/components/navigationSetup";
import { useAuth } from "@/components/providers/auth";
import { AuthSchema, AuthSchemaType } from "@/components/schemas/authScheme";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Footer } from "./footer";
import { Header } from "./header";
import { Inputs } from "./inputs";
import { Socials } from "./socials";
type AuthFormProps = {
    variant: "register" | "login";
    t: (arg: string) => string;
};

const AuthForm = ({ variant = "login", t }: AuthFormProps) => {
    const formSchema = AuthSchema(variant, t);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { signUp, googleLogin, facebookLogin, logIn } = useAuth();
    const router = useRouter();

    const form = useForm<AuthSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            ...(variant === "register" && { confirmPassword: "" }),
        },
    });

    const onSubmit = async (values: AuthSchemaType) => {
        setIsLoading(true);
        try {
            let errorMessage: any;
            if (variant === "register") {
                errorMessage = await signUp(values);
            } else {
                errorMessage = await logIn(values);
            }
            if (errorMessage !== null) {
                const errorMessageMap: Record<string, string> = {
                    "auth/email-already-in-use": "Email is already in use",
                    "auth/user-not-found": "User does not exist",
                    "auth/claims-too-large": "Claims payload is too large",
                    "auth/id-token-expired": "ID token has expired",
                    "auth/id-token-revoked": "ID token has been revoked",
                    "auth/insufficient-permission":
                        "Insufficient permission for the operation",
                    "auth/internal-error": "Internal error encountered",
                    "auth/invalid-argument": "Invalid argument provided",
                    "auth/invalid-disabled-field":
                        "Invalid disabled user property",
                    "auth/invalid-display-name":
                        "Invalid display name property",
                    "auth/invalid-dynamic-link-domain":
                        "Invalid dynamic link domain for the project",
                    "auth/invalid-email": "Invalid email format",
                    "auth/invalid-email-verified-field":
                        "Invalid emailVerified user property",
                    "auth/invalid-hash-algorithm":
                        "Invalid hash algorithm provided",
                    "auth/invalid-hash-block-size": "Invalid hash block size",
                    "auth/invalid-hash-derived-key-length":
                        "Invalid hash derived key length",
                    "auth/invalid-hash-key": "Invalid hash key",
                    "auth/invalid-hash-memory-cost": "Invalid hash memory cost",
                    "auth/invalid-hash-parallelization":
                        "Invalid hash parallelization",
                    "auth/invalid-hash-rounds": "Invalid hash rounds",
                    "auth/invalid-hash-salt-separator":
                        "Invalid hash salt separator",
                    "auth/invalid-id-token": "Invalid ID token",
                    "auth/invalid-last-sign-in-time":
                        "Invalid last sign in time",
                    "auth/invalid-page-token":
                        "Invalid page token for list operation",
                    "auth/invalid-password": "Invalid password provided",
                    "auth/invalid-password-hash": "Invalid password hash",
                    "auth/invalid-password-salt": "Invalid password salt",
                    "auth/invalid-phone-number": "Invalid phone number",
                    "auth/invalid-photo-url": "Invalid photo URL",
                    "auth/invalid-provider-data": "Invalid provider data",
                    "auth/invalid-provider-id": "Invalid provider ID",
                    "auth/invalid-oauth-responsetype":
                        "Invalid OAuth responseType",
                    "auth/invalid-session-cookie-duration":
                        "Invalid session cookie duration",
                    "auth/invalid-uid": "Invalid user ID",
                    "auth/maximum-user-count-exceeded":
                        "Maximum user count exceeded",
                    "auth/missing-android-pkg-name":
                        "Missing Android package name",
                    "auth/missing-continue-uri": "Missing continue URL",
                    "auth/missing-hash-algorithm": "Missing hash algorithm",
                    "auth/missing-ios-bundle-id": "Missing iOS Bundle ID",
                    "auth/missing-uid": "Missing UID",
                    "auth/operation-not-allowed": "Operation not allowed",
                    "auth/phone-number-already-exists":
                        "Phone number already exists",
                    "auth/project-not-found": "Project not found",
                    "auth/reserved-claims": "Reserved claims present",
                    "auth/session-cookie-revoked":
                        "Session cookie has been revoked",
                    "auth/too-many-requests": "Too many requests",
                    "auth/unauthorized-continue-uri":
                        "Unauthorized continue URI",
                };
                setError(
                    errorMessageMap[errorMessage.code] || "An error occurred",
                );
            } else {
                router.push("/");
            }
        } catch (error) {
            console.error("Error:", error);
        }
        setIsLoading(false);
    };

    return (
        <div className="font-openSans flex flex-col items-center justify-center gap-3">
            <Header variant={variant} t={t} />
            <Socials
                googleLogin={googleLogin}
                facebookLogin={facebookLogin}
                isLoading={isLoading}
                t={t}
            />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex h-full w-full flex-col justify-between space-y-6 text-black"
                >
                    <Inputs form={form} variant={variant} t={t} />
                    {error && <p>{error}</p>}
                    <Footer isLoading={isLoading} t={t} />
                </form>
            </Form>
        </div>
    );
};

export default AuthForm;
