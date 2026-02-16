"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { Backpack, BookOpenText, GraduationCap, Star } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

interface AboutSectionProps {
    t: (key: string) => string;
}

export default function AboutSection({ t }: AboutSectionProps) {
    const [carouselApi, setApi] = useState<CarouselApi>();
    const [activeIndex, setActiveIndex] = useState(0);

    const aboutItems = useMemo(
        () => [
            {
                icon: <Star />,
                title: t("aboutItems.Star.title"),
                description: t("aboutItems.Star.description"),
            },
            {
                icon: <BookOpenText />,
                title: t("aboutItems.Book.title"),
                description: t("aboutItems.Book.description"),
            },
            {
                icon: <GraduationCap />,
                title: t("aboutItems.Graduation.title"),
                description: t("aboutItems.Graduation.description"),
            },
            {
                icon: <Backpack />,
                title: t("aboutItems.Backpack.title"),
                description: t("aboutItems.Backpack.description"),
            },
        ],
        [t],
    );
    const autoplay = useRef(
        Autoplay({
            delay: 4000,
            stopOnInteraction: false,
        }),
    );
    // scroll when activeIndex changes
    useEffect(() => {
        carouselApi?.scrollTo(activeIndex);
    }, [activeIndex, carouselApi]);

    // attach select listener once per api instance
    useEffect(() => {
        if (!carouselApi) return;

        const onSelect = () => setActiveIndex(carouselApi.selectedScrollSnap());
        carouselApi.on("select", onSelect);
        onSelect();

        return () => {
            carouselApi.off("select", onSelect);
        };
    }, [carouselApi]);

    return (
        <section className="flex min-h-125 w-full flex-col items-center justify-start gap-2 bg-linear-to-b from-sky-500 from-50% to-white to-100% py-4">
            <h2 className="text-5xl font-bold text-white underline decoration-4 underline-offset-4 md:text-7xl">
                {t("title")}
            </h2>

            <div className="flex h-fit w-full flex-col items-center justify-center md:flex-row">
                <Carousel
                    setApi={setApi}
                    orientation="vertical"
                    opts={{ loop: true }}
                    plugins={[autoplay.current]}
                    className="max-w-250"
                >
                    <CarouselContent className="mt-1 h-80 sm:h-50 md:h-[350px]">
                        {aboutItems.map((item, index) => (
                            <CarouselItem
                                key={index}
                                className="flex w-full items-start justify-center px-0! md:border-r"
                            >
                                <CarouselAboutItemContent
                                    title={item.title}
                                    description={item.description}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <div className="flex w-fit min-w-40 flex-row items-center justify-center gap-7 p-4 md:flex-col md:gap-3">
                    {aboutItems.map((item, index) => (
                        <button
                            key={index}
                            type="button"
                            className={cn(
                                "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white transition-transform md:h-16 md:w-16",
                                index === activeIndex &&
                                    "scale-125 bg-blue-600 md:scale-110",
                            )}
                            onClick={() => {
                                setActiveIndex(index);
                                autoplay.current.reset();
                            }}
                        >
                            {item.icon}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

const CarouselAboutItemContent = ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => {
    return (
        <div className="flex h-fit w-fit flex-col justify-center p-2 text-center text-white md:text-left">
            <p className="mb-2 text-3xl font-bold md:text-5xl">{title}</p>
            <p className="text-base md:text-2xl">{description}</p>
        </div>
    );
};
