"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "./navigationSetup";
import { useLocale, useTranslations } from "next-intl";
import clsx from "clsx";
export default function Language() {
    const t = useTranslations("topbar");
    const languages = ["en", "bg"];
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const changeLanguage = (language: string) => {
        router.replace(pathname, { locale: language });
    };

    return (
        <Button
            variant="ghost"
            className="w-fit h-fit bg-transparent !px-0 !py-0"
        >
            {languages.map((code) => (
                <div
                    key={code}
                    onClick={() => changeLanguage(code)}
                    className={clsx(
                        "px-0 py-0",
                        code === locale && "hidden",
                    )}
                >
                    <p className="text-xs ">{t("languages." + code)}</p>
                </div>
            ))}
        </Button>
    );
}
