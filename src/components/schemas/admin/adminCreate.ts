import { z } from "zod";

export const adminCreateSchema = (
    t: (key: string, values?: Record<string, any>) => string,
) =>
    z
        .object({
            email: z
                .email({ message: t("email.invalid") })
                .min(1, { message: t("email.required") }),
            password: z
                .string()
                .min(8, { message: t("password.minLength") })
                .regex(/[A-Z]/, {
                    message: t("password.uppercase"),
                })
                .regex(/[a-z]/, {
                    message: t("password.lowercase"),
                })
                .regex(/[0-9]/, {
                    message: t("password.number"),
                }),
            confirmPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: t("confirmPassword.mismatch"),
            path: ["confirmPassword"],
        });

export type AdminFormValues = z.infer<ReturnType<typeof adminCreateSchema>>;
