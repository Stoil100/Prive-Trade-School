"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Facebook, Mail, Map, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import type { FC, ReactNode } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useIntersectionObserver } from "usehooks-ts";

type Link = {
    title: string;
    link: string;
};

interface AnimatedSectionProps {
    animationIndex: number;
    className?: string;
    children: ReactNode;
}

interface FooterSectionProps {
    title: string;
    links: Link[];
    animationIndex: number;
    className?: string;
}

interface ContactInfoProps {
    title: string;
    address: string;
    phones: string[];
    email: string;
    animationIndex: number;
}

const AnimatedSection: FC<AnimatedSectionProps> = ({
    animationIndex,
    className,
    children,
}) => {
    const { isIntersecting, ref } = useIntersectionObserver({
        threshold: 0.2,
        freezeOnceVisible: true,
    });

    const animationDelays = ["0ms", "100ms", "200ms", "300ms", "400ms"];
    const delay = animationDelays[animationIndex] || "0ms";

    return (
        <div
            ref={ref}
            className={cn(
                "flex flex-col opacity-0 transition-all duration-700 ease-out",
                isIntersecting && "animate-fade-up opacity-100",
                className,
            )}
            style={{
                transitionDelay: isIntersecting ? delay : "0ms",
            }}
        >
            {children}
        </div>
    );
};

const FooterSpecializationsSection: FC<FooterSectionProps> = ({
    title,
    links,
    animationIndex,
    className,
}) => {
    return (
        <AnimatedSection animationIndex={animationIndex} className={className}>
            <SectionTitle>{title}</SectionTitle>
            <div className="flex flex-col gap-2">
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="h-auto w-full justify-start p-0 text-base font-normal hover:text-amber-400"
                    >
                        {link.title}
                    </a>
                ))}
            </div>
        </AnimatedSection>
    );
};

const FooterLinksSection: FC<FooterSectionProps> = ({
    title,
    links,
    animationIndex,
    className,
}) => {
    return (
        <AnimatedSection animationIndex={animationIndex} className={className}>
            <SectionTitle>{title}</SectionTitle>
            <div className="flex flex-col gap-2">
                {links.map((link, index) => (
                    <ScrollLink
                        key={index}
                        to={link.link}
                        spy
                        smooth
                        duration={500}
                        className="w-full justify-start p-0 text-base font-normal hover:cursor-pointer hover:bg-transparent hover:text-amber-400"
                    >
                        {link.title}
                    </ScrollLink>
                ))}
            </div>
        </AnimatedSection>
    );
};

const ContactInfo: FC<ContactInfoProps> = ({
    title,
    address,
    phones,
    email,
    animationIndex,
}) => {
    return (
        <AnimatedSection animationIndex={animationIndex}>
            <SectionTitle>{title}</SectionTitle>

            <div className="space-y-2">
                <ContactRow icon={<Map size={20} />}>{address}</ContactRow>

                <ContactRow icon={<Phone size={20} />}>
                    <div>
                        {phones.map((phone, index) => (
                            <p key={index}>{phone}</p>
                        ))}
                    </div>
                </ContactRow>

                <ContactRow icon={<Mail size={20} />}>{email}</ContactRow>
            </div>
        </AnimatedSection>
    );
};

const SectionTitle: FC<{ children: ReactNode }> = ({ children }) => (
    <>
        <h3 className="text-lg font-semibold sm:text-xl">{children}</h3>
        <Separator className="my-1 h-0.5 bg-amber-400" />
    </>
);

const ContactRow: FC<{ icon: ReactNode; children: ReactNode }> = ({
    icon,
    children,
}) => (
    <div className="flex items-start gap-3 sm:gap-4">
        <div className="mt-0.5 shrink-0">{icon}</div>
        <div className="flex-1 leading-relaxed">{children}</div>
    </div>
);

const SocialLink: FC<{ href: string; icon: ReactNode; label: string }> = ({
    href,
    icon,
    label,
}) => (
    <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 hover:text-amber-400"
        asChild
        aria-label={label}
    >
        <a href={href} target="_blank" rel="noopener noreferrer">
            {icon}
        </a>
    </Button>
);

export default function Footer() {
    const t = useTranslations("Common.Footer");

    const fastLinks: Link[] = [
        { title: t("home"), link: "home" },
        { title: t("about"), link: "about" },
        { title: t("news"), link: "news" },
        { title: t("whyChooseUs"), link: "select" },
        { title: t("specialties"), link: "programs" },
        { title: t("projects"), link: "projects" },
    ];

    const programLinks: Link[] = [
        { title: t("taxCustomsControl"), link: "/pdfs/borderAdmin.pdf" },
        { title: t("banking"), link: "/pdfs/banker.pdf" },
        { title: t("accounting"), link: "/pdfs/accountant.pdf" },
    ];

    return (
        <footer className="w-full bg-slate-900 text-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
                    {/* Brand Section */}
                    <AnimatedSection animationIndex={0} className="space-y-4">
                        <h2 className="text-2xl font-bold sm:text-3xl">
                            {t("name")}
                        </h2>
                        <div className="flex gap-2 pt-2">
                            <SocialLink
                                href="https://www.facebook.com/privatetradeschool"
                                icon={<Facebook size={20} />}
                                label="Follow us on Facebook"
                            />
                            <SocialLink
                                href="mailto:privatetradeschool@gmail.com"
                                icon={<Mail size={20} />}
                                label="Send us an email"
                            />
                            <SocialLink
                                href="tel:0893344539"
                                icon={<Phone size={20} />}
                                label="Call us"
                            />
                        </div>
                    </AnimatedSection>

                    {/* Quick Links */}
                    <FooterLinksSection
                        title={t("quickLinks")}
                        links={fastLinks}
                        animationIndex={1}
                    />

                    {/* Programs */}
                    <FooterSpecializationsSection
                        title={t("specializations")}
                        links={programLinks}
                        animationIndex={2}
                    />

                    {/* Contact */}
                    <ContactInfo
                        title={t("contact")}
                        address={t("address")}
                        phones={[
                            "052 / 65 67 40",
                            "0893 344 538",
                            "0894 379 119",
                        ]}
                        email="director_tradescl@abv.bg"
                        animationIndex={3}
                    />
                </div>

                <Separator className="my-8 bg-slate-700" />

                <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-400 sm:flex-row">
                    <p>
                        <span className="font-semibold text-amber-400">
                            &copy; {new Date().getFullYear()}
                        </span>{" "}
                        {t("city")} {t("copyrightNotice")}
                    </p>
                </div>
            </div>
        </footer>
    );
}
