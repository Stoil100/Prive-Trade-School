"use client";
import { FC, useRef,useEffect, useState } from "react";
import { Facebook, Instagram, Mail, Map, Phone, Twitter } from "lucide-react";
import useVisibility from "@/hooks/useVisibility";
import { cn } from "@/lib/utils";

const FooterLinksSection: FC<{ title: string; links: string[] }> = ({
    title,
    links,
}) => {
    const linksRef = useRef(null);
    const isLinkVisible = useVisibility(linksRef.current!);
    return (
        <div
            ref={linksRef}
            className={cn(
                "animate-delay-500 flex flex-col items-center opacity-0 md:items-start",
                isLinkVisible && "animate-fade-up opacity-100",
            )}
        >
            <p className="before-border mb-2 border-yellow-500 text-xl sm:max-md:border-b-2 sm:max-md:before:border-none">
                {title}
            </p>
            {links.map((link, index) => (
                <p className="text-md" key={index}>
                    {link}
                </p>
            ))}
        </div>
    );
};
const FooterProgramsSection: FC<{ title: string; links: string[] }> = ({
    title,
    links,
}) => {
    const programsRef = useRef(null);
    const isProgramsVisible = useVisibility(programsRef.current!);
    return (
        <div
            ref={programsRef}
            className={cn(
                "animate-delay-700 flex flex-col items-center opacity-0 md:items-start",
                isProgramsVisible && "animate-fade-up opacity-100",
            )}
        >
            <p className="before-border mb-2 border-yellow-500 text-xl sm:max-md:border-b-2 sm:max-md:before:border-none">
                {title}
            </p>
            {links.map((link, index) => (
                <p className="text-md" key={index}>
                    {link}
                </p>
            ))}
        </div>
    );
};
const ContactInfo: FC = () => {
    const contactRef = useRef(null);
    const isContactVisible = useVisibility(contactRef.current!);

    return (
        <div
            ref={contactRef}
            className={cn(
                "animate-delay-1000 flex flex-col items-center gap-2 text-xs opacity-0 sm:items-center md:items-start",
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
    const isTitleBoxVisible = useVisibility(titleBoxRef.current!);
    
    const [hasLoaded,setHasLoaded]=useState(false);
    useEffect(() =>{
        titleBoxRef.current&&setHasLoaded(true);
    },[titleBoxRef]);
    
    return (
        <footer className="flex min-h-[200px] flex-col items-center gap-10 bg-gray-900 px-10 py-3 text-white">
            <div className="grid-rows-auto grid items-center gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1fr_.75fr_.75fr_.5fr]">
                <div
                    ref={titleBoxRef}
                    className={cn(
                        "animate-delay-200 flex flex-col items-center gap-4 text-center opacity-0 md:max-lg:col-span-3 lg:items-start lg:text-left",
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
                    title="Програми"
                    links={Array.from(
                        { length: 8 },
                        (_, index) => `Lorem Ipsum ${index + 1}`,
                    )}
                />
                <FooterProgramsSection
                    title="Бързи връзки"
                    links={Array.from(
                        { length: 5 },
                        (_, index) => `Lorem Ipsum ${index + 1}`,
                    )}
                />
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
