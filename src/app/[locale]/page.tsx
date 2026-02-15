"use client";

import AboutSection from "@/components/home/sections/About";
import ContactSection from "@/components/home/sections/Contact";
import HeroSection from "@/components/home/sections/Hero";
import NewsSection from "@/components/home/sections/News";
import SelectSection from "@/components/home/sections/Select";
import SpecializationsSection from "@/components/home/sections/Specializations";
import { useTranslations } from "next-intl";
import { Element } from "react-scroll";

export default function Home() {
    const t = useTranslations("Pages.Home");
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center">
            <Element name="home" className="w-full">
                <HeroSection />
            </Element>
            <Element name="about" className="w-full">
                <AboutSection t={(key) => t(`About.${key}`)} />
            </Element>
            <Element name="news" className="w-full">
                <NewsSection t={(key) => t(`News.${key}`)} />
            </Element>
            <Element name="select" className="w-full">
                <SelectSection t={(key) => t(`Select.${key}`)} />
            </Element>
            <Element name="programs" className="w-full">
                <SpecializationsSection
                    t={(key) => t(`Specializations.${key}`)}
                />
            </Element>
            <Element name="contact" className="w-full">
                <ContactSection />
            </Element>
        </main>
    );
}
