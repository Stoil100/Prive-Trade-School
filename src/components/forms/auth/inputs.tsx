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
}: {
    form: UseFormReturn<any>;
    variant: "register" | "login";
    t: (arg: string) => string;
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
