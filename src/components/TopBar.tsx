import { AtSign, MapPin, PhoneCall } from "lucide-react";
import { useTranslations } from "next-intl";
import Language from "./LanguageButton";

export default function Topbar() {
    const t = useTranslations("Common.Topbar");
    return (
        <div className="flex flex-wrap items-center justify-around gap-2 bg-white p-2 text-center text-xs text-blue-500 md:h-8 lg:w-screen lg:px-20 lg:py-2">
            <a
                href="https://maps.app.goo.gl/PCDdCJbaF5vfMTY98"
                className="flex items-center gap-2"
            >
                <MapPin size={15} />
                <p>{t("address")}</p>
            </a>
            <a href="tel:0893344539" className="flex items-center gap-2">
                <PhoneCall size={15} />
                <p>+359 893 344 539</p>
            </a>
            <a
                href="mailto:privatetradeschool@gmail.com"
                className="flex items-center gap-2"
            >
                <AtSign size={15} />
                <p>privatetradeschool@gmail.com</p>
            </a>
            <Language />
        </div>
    );
}
