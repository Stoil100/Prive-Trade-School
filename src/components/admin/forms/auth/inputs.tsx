import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

export const Inputs = ({
    form,
    variant,
    t,
    passwordReset,
    isLoading,
}: {
    form: UseFormReturn<any>;
    variant: "register" | "login";
    t: (key: string, values?: Record<string, any>) => string;
    passwordReset?: () => void;
    isLoading?: boolean;
}) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input
                                placeholder={t("emailPlaceholder")}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div>
                <div className="flex w-full gap-1">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        type={visible ? "text" : "password"}
                                        placeholder={t("passwordPlaceholder")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setVisible(!visible)}
                    >
                        {visible ? <Eye /> : <EyeOff />}
                    </Button>
                </div>
                {variant === "login" && passwordReset && (
                    <button
                        type="button"
                        onClick={passwordReset}
                        disabled={isLoading}
                        className="w-fit text-xs text-gray-400 disabled:opacity-50"
                    >
                        {t("forgotPassword") || "Forgot password?"}
                    </button>
                )}
            </div>

            {variant === "register" && (
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type={visible ? "text" : "password"}
                                    placeholder={t(
                                        "confirmPasswordPlaceholder",
                                    )}
                                    {...field}
                                    value={field.value as string}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
        </>
    );
};
