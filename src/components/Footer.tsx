"use client";
import { cn } from "@/lib/utils";
import { Facebook, Instagram, Mail, Map, Phone, Twitter } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { useIntersectionObserver as useVisibility } from "usehooks-ts";
import { Link as ScrollLink } from "react-scroll";
import { Links } from "@/models/link";
import { useTranslations } from "next-intl";

const FooterProgramsSection: FC<{
    links: { title: string; link: string }[];
}> = ({ links }) => {
    const linksRef = useRef(null);
    const isLinkVisible = !!useVisibility(linksRef, {})?.isIntersecting;
    const t = useTranslations("footer");
    return (
        <div
            ref={linksRef}
            className={cn(
                "flex flex-col items-center opacity-0 animate-delay-500 md:items-start",
                isLinkVisible && "animate-fade-up opacity-100",
            )}
        >
            <p className="before-border mb-2 border-yellow-500 text-xl sm:max-md:border-b-2 sm:max-md:before:border-none">
                {t("programs")}
            </p>
            {links.map((link, index) => (
                <a
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="text-md"
                    key={index}
                >
                    {link.title}
                </a>
            ))}
        </div>
    );
};
const FooterLinksSection: FC<{
    links: { title: string; link: string }[];
}> = ({ links }) => {
    const programsRef = useRef(null);
    const isProgramsVisible = !!useVisibility(programsRef, {})?.isIntersecting;
    const t = useTranslations("footer");
    return (
        <div
            ref={programsRef}
            className={cn(
                "flex flex-col items-center opacity-0 animate-delay-700 sm:ml-6 md:items-start",
                isProgramsVisible && "animate-fade-up opacity-100",
            )}
        >
            <h2 className="before-border mb-2 text-xl sm:max-md:border-b-2 sm:max-md:before:border-none">
                {t("quick_links")}
            </h2>
            {links.map((link, index) => (
                <ScrollLink
                    to={link.link}
                    spy={true}
                    smooth={true}
                    duration={500}
                    className="cursor-pointer"
                    key={index}
                >
                    {link.title}
                </ScrollLink>
            ))}
        </div>
    );
};
const ContactInfo: FC = () => {
    const contactRef = useRef(null);
    const isContactVisible = !!useVisibility(contactRef, {})?.isIntersecting;
    const t = useTranslations("footer");
    return (
        <div
          ref={contactRef}
          className={cn(
            "flex flex-col items-center gap-2 text-xs opacity-0 animate-delay-1000 sm:items-center md:items-start",
            isContactVisible && "animate-fade-up opacity-100",
          )}
        >
          <p className="before-border mb-2 border-yellow-500 text-xl sm:max-md:border-b-2 sm:max-md:before:border-none">
            {t('contact')}
          </p>
          <div className="flex items-center gap-4">
            <Map size={20} />
            <p>{t('address')}</p>
          </div>
          <div className="flex items-center gap-4">
            <Phone size={20} />
            <div>
              <p>{t('phone_numbers.main')}</p>
              <p>{t('phone_numbers.secondary1')}</p>
              <p>{t('phone_numbers.secondary2')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Mail size={20} />
            <p>{t('email')}</p>
          </div>
        </div>
      );
};

export default function Footer() {
    const titleBoxRef = useRef(null);
    const isTitleBoxVisible = !!useVisibility(titleBoxRef, {})?.isIntersecting;
    const t = useTranslations("footer");
    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(() => {
        titleBoxRef.current && setHasLoaded(true);
    }, [titleBoxRef]);
    const fastLinks: Links = [
        {
            title: t("home"),
            link: "home",
        },
        {
            title:  t("about"),
            link: "about",
        },
        {
            title:  t("news"),
            link: "news",
        },
        {
            title:  t("why_choose_us"),
            link: "select",
        },
        {
            title:  t("specialties"),
            link: "programs",
        },
        {
            title:  t("projects"),
            link: "projects",
        },
    ];
    const programLinks: Links = [
        { title: t("tax_customs_control"), link: "/pdfs/borderAdmin.pdf" },
        { title: t("banking"), link: "/pdfs/banker.pdf" },
        { title: t("accounting"),link: "/pdfs/accountant.pdf" },
    ];
    return (
        <footer className="flex min-h-[200px] flex-col items-center gap-10 bg-gray-900 px-10 py-3 text-white">
            <div className="grid-rows-auto grid items-center gap-7 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-[1fr_.75fr_.75fr_.5fr]">
                <div
                    ref={titleBoxRef}
                    className={cn(
                        "flex flex-col items-center gap-4 text-center opacity-0 animate-delay-200 md:max-lg:col-span-3 lg:items-start lg:text-left",
                        isTitleBoxVisible && "animate-fade-up opacity-100",
                    )}
                >
                    <p className="lg:before-border border-b-2 border-yellow-500  text-3xl lg:border-none">
                        {t("school_name")}
                    </p>
                    <div className="flex items-center gap-5">
                        <a href="https://www.facebook.com/privatetradeschool?">
                            <Facebook />
                        </a>
                        <a href="mailto:privatetradeschool@gmail.com">
                            <Mail />
                        </a>
                        <a href={"tel:0893344539"}>
                            <Phone />
                        </a>
                    </div>
                </div>
                <FooterLinksSection links={fastLinks} />
                <FooterProgramsSection links={programLinks} />
                <ContactInfo />
            </div>
            <div>
                <p className="text-center">
                    <span className="text-sky-500">
                        &copy; {new Date().getFullYear()}
                    </span>{" "}
                    {t("city")}
                </p>
            </div>
        </footer>
    );
}
