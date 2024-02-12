"use client";
import { cn } from "@/lib/utils";
import { Facebook, Instagram, Mail, Map, Phone, Twitter } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { useIntersectionObserver as useVisibility } from "usehooks-ts";
import { Link as ScrollLink } from "react-scroll";
import { Links } from "@/models/link";
const fastLinks: Links = [
    {
        title: "Начало",
        link: "home",
    },
    {
        title: "За нас",
        link: "about",
    },
    {
        title: "Новини",
        link: "news",
    },
    {
        title: "Защо да изберете нас",
        link: "select",
    },
    {
        title: "Специалности",
        link: "programs",
    },
    {
        title: "Проекти",
        link: "projects",
    },
];
const programLinks: Links = [
    { title: "Данъчен и митнически контрол", link: "/pdfs/borderAdmin.pdf" },
    { title: "Банково дело", link: "/pdfs/banker.pdf" },
    { title: "Оперативно счетоводство", link: "/pdfs/accountant.pdf" },
];

const FooterProgramsSection: FC<{
    links: { title: string; link: string }[];
}> = ({ links }) => {
    const linksRef = useRef(null);
    const isLinkVisible = !!useVisibility(linksRef, {})?.isIntersecting;
    return (
        <div
            ref={linksRef}
            className={cn(
                "flex flex-col items-center opacity-0 animate-delay-500 md:items-start",
                isLinkVisible && "animate-fade-up opacity-100",
            )}
        >
            <p className="before-border mb-2 border-yellow-500 text-xl sm:max-md:border-b-2 sm:max-md:before:border-none">
                Програми
            </p>
            {links.map((link, index) => (
                <a href={link.link} target="_blank" rel="noopener noreferrer" download className="text-md" key={index}>
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
    return (
        <div
            ref={programsRef}
            className={cn(
                "flex flex-col items-center opacity-0 animate-delay-700 md:items-start sm:ml-6",
                isProgramsVisible && "animate-fade-up opacity-100",
            )}
        >
            <h2 className="before-border mb-2 text-xl sm:max-md:border-b-2 sm:max-md:before:border-none">
                Бързи връзки
            </h2>
            {links.map((link, index) => (
                // <p className="before-border mb-2 border-yellow-500 text-xl sm:max-md:border-b-2 sm:max-md:before:border-none">
                //     {link.title}
                // </p>
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

    return (
        <div
            ref={contactRef}
            className={cn(
                "flex flex-col items-center gap-2 text-xs opacity-0 animate-delay-1000 sm:items-center md:items-start",
                isContactVisible && "animate-fade-up opacity-100",
            )}
        >
            <p className="before-border mb-2 border-yellow-500 text-xl sm:max-md:border-b-2 sm:max-md:before:border-none">
                Контакти
            </p>
            <div className="flex items-center gap-4">
                <Map size={20} />
                <p>ул. Преспа 1, Варна 9000</p>
            </div>
            <div className="flex items-center gap-4">
                <Phone size={20} />
                <div>
                    <p>052 / 65 67 40</p>
                    <p>0893 344 538</p>
                    <p>0894 379 119</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Mail size={20} />
                <p>director_tradescl@abv.bg</p>
            </div>
        </div>
    );
};

export default function Footer() {
    const titleBoxRef = useRef(null);
    const isTitleBoxVisible = !!useVisibility(titleBoxRef, {})?.isIntersecting;

    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(() => {
        titleBoxRef.current && setHasLoaded(true);
    }, [titleBoxRef]);

    return (
        <footer className="flex min-h-[200px] flex-col items-center gap-10 bg-gray-900 px-10 py-3 text-white">
            <div className="grid-rows-auto grid items-center gap-7 sm:gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1fr_.75fr_.75fr_.5fr]">
                <div
                    ref={titleBoxRef}
                    className={cn(
                        "flex flex-col items-center gap-4 text-center opacity-0 animate-delay-200 md:max-lg:col-span-3 lg:items-start lg:text-left",
                        isTitleBoxVisible && "animate-fade-up opacity-100",
                    )}
                >
                    <p className="lg:before-border border-b-2 border-yellow-500  text-3xl lg:border-none">
                        Частна търговска гимназия
                    </p>
                    <div className="flex items-center gap-5">
                        <Instagram />
                        <Facebook />
                        <Twitter />
                        <Mail />
                        <Phone />
                    </div>
                </div>
                <FooterLinksSection
                   links={fastLinks}
                />
                <FooterProgramsSection links={programLinks} />
                <ContactInfo />
            </div>
            <div>
                <p className="text-center">
                    <span className="text-sky-500">
                        &copy; {new Date().getFullYear()}
                    </span>{" "}
                    Частна търговска гимназия - гр. Варна
                </p>
            </div>
        </footer>
    );
}
