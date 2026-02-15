"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import { useIntersectionObserver } from "usehooks-ts";

type SelectReason = {
    title: string;
    description: string;
};

type CarouselSelectItemContentProps = SelectReason & {
    className?: string;
};
interface SelectSectionProps {
    t: (key: string) => string;
}

export default function SelectSection({ t }: SelectSectionProps) {
    const [progress, setProgress] = useState(0);

    const { isIntersecting: isAboutTitleVisible, ref: aboutTitleRef } =
        useIntersectionObserver({});

    const { isIntersecting: isSectionVisible, ref: sectionBoxRef } =
        useIntersectionObserver({ threshold: 0.95 });

    const [carouselApi, setApi] = useState<CarouselApi>();

    const selectReasons = useMemo<SelectReason[]>(
        () => [
            {
                title: t("reasons.Global.title"),
                description: t("reasons.Global.description"),
            },
            {
                title: t("reasons.Individual.title"),
                description: t("reasons.Individual.description"),
            },
            {
                title: t("reasons.Preparation.title"),
                description: t("reasons.Preparation.description"),
            },
        ],
        [t],
    );

    useEffect(() => {
        if (!carouselApi) return;
        carouselApi.scrollTo(Math.floor(progress * 3));
    }, [progress, carouselApi]);

    return (
        <Parallax onProgressChange={setProgress}>
            <section
                className={cn(
                    "relative min-h-[400vh] w-screen max-w-screen bg-white transition-colors duration-1000",
                    isSectionVisible &&
                        "bg-slate-600 text-white mix-blend-difference",
                    progress > 0 &&
                        progress < 0.33 &&
                        isSectionVisible &&
                        "bg-sky-600",
                    progress >= 0.33 && progress < 0.66 && "bg-blue-600",
                    progress >= 0.66 && progress < 1 && "bg-indigo-700",
                    progress > 0.75 && "bg-slate-600",
                )}
            >
                <div className="absolute h-full w-1/4 -skew-x-[5deg] bg-white mix-blend-overlay sm:-skew-x-[7deg] md:-skew-x-10 lg:-skew-x-15 2xl:-skew-x-20" />

                <div
                    ref={sectionBoxRef}
                    className={cn(
                        "sticky top-0 z-10 flex h-screen flex-col justify-center bg-transparent",
                        progress > 0.5 && "text-white",
                    )}
                >
                    <h3
                        ref={aboutTitleRef}
                        className={cn(
                            "text-center text-3xl drop-shadow sm:text-5xl md:text-7xl lg:text-8xl",
                            isAboutTitleVisible && "animate-fade-down",
                        )}
                    >
                        {t("title")}
                    </h3>

                    <Carousel
                        setApi={setApi}
                        opts={{
                            watchDrag: false,
                        }}
                    >
                        <CarouselContent className="h-125">
                            {selectReasons.map((item, index) => (
                                <CarouselItem
                                    key={index}
                                    className={cn(
                                        "flex items-center justify-center transition-transform duration-1000",
                                        isSectionVisible
                                            ? "scale-100"
                                            : "scale-95",
                                    )}
                                >
                                    <CarouselSelectItemContent
                                        title={item.title}
                                        description={item.description}
                                        className={cn(
                                            "shadow-[ -28px_-28px_0_rgba(0,0,0,0.25)] flex w-3/4 flex-col justify-center rounded-2xl bg-slate-900 p-8 text-center text-white transition-colors duration-500",
                                            isSectionVisible &&
                                                "bg-white text-slate-800",
                                        )}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </section>
        </Parallax>
    );
}

const CarouselSelectItemContent = ({
    title,
    description,
    className,
}: CarouselSelectItemContentProps) => (
    <div className={className}>
        <h3 className="text-xl font-bold sm:text-2xl md:text-4xl lg:text-6xl">
            {title}
        </h3>

        <p className="mt-4 text-base sm:text-xl md:text-2xl lg:text-3xl">
            {description}
        </p>
    </div>
);
