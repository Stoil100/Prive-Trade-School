"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

export default function Language() {
    const t = useTranslations("Common.LanguageButton");
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
            className="h-fit w-fit bg-transparent px-0! py-0!"
        >
            {languages.map((code) => (
                <div
                    key={code}
                    onClick={() => changeLanguage(code)}
                    className={cn("px-0 py-0", code === locale && "hidden")}
                >
                    <p className="text-xs">{t(`${code}`)}</p>
                </div>
            ))}
        </Button>
    );
}
