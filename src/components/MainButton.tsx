import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Button } from "./ui/button";

export default function MainButton({
    children,
    variant = "default",
    ...props
}: {
    children: ReactNode;
    variant?: "default" | "transparent";
} & Omit<React.ComponentProps<typeof Button>, "variant">) {
    const baseClass =
        "h-fit rounded-full px-4 py-1 max-sm:text-base text-wrap text-xl font-extralight transition-all drop-shadow-lg";
    const variantClasses = {
        default: "text-white bg-blue-500 transition-colors hover:bg-blue-900",
        transparent: "bg-transparent border text-white hover:underline",
    };

    return (
        <Button
            {...props}
            className={cn(baseClass, variantClasses[variant], props.className)}
        >
            {children}
        </Button>
    );
}
