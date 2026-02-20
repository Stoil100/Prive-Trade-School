"use client";

import React, { useRef } from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { db } from "@/firebase/config";
import { cn } from "@/lib/utils";
import { PostT } from "@/models/post";
import Autoplay from "embla-carousel-autoplay";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

interface NewsSectionProps {
    t: (key: string) => string;
}

export default function NewsSection({ t }: NewsSectionProps) {
    const [carouselApi, setApi] = useState<CarouselApi | undefined>();
    const [activeIndex, setActiveIndex] = useState(0);

    const { isIntersecting: isCarouselVisible, ref: carouselRef } =
        useIntersectionObserver({});

    const [news, setNews] = useState<PostT[]>([]);
    const autoplay = useRef(
        Autoplay({
            delay: 4000,
            stopOnInteraction: false,
        }),
    );
    useEffect(() => {
        // const fetchNews = async () => {
        //     try {
        //         const newsCollection = collection(db, "news");

        //         const now = new Date();

        //         // 2 months ago
        //         const twoMonthsAgo = new Date();
        //         twoMonthsAgo.setMonth(now.getMonth() - 2);

        //         const twoMonthQuery = query(
        //             newsCollection,
        //             where("createdAt", ">=", Timestamp.fromDate(twoMonthsAgo)),
        //             orderBy("createdAt", "desc"),
        //         );

        //         let snapshot = await getDocs(twoMonthQuery);

        //         // If no results → fetch last 6 months
        //         if (snapshot.empty) {
        //             const sixMonthsAgo = new Date();
        //             sixMonthsAgo.setMonth(now.getMonth() - 6);

        //             const sixMonthQuery = query(
        //                 newsCollection,
        //                 where(
        //                     "createdAt",
        //                     ">=",
        //                     Timestamp.fromDate(sixMonthsAgo),
        //                 ),
        //                 orderBy("createdAt", "desc"),
        //             );

        //             snapshot = await getDocs(sixMonthQuery);
        //         }

        //         const newsList: PostT[] = snapshot.docs.map(
        //             (doc) =>
        //                 ({
        //                     id: doc.id,
        //                     ...doc.data(),
        //                 }) as PostT,
        //         );

        //         setNews(newsList);
        //     } catch (error) {
        //         console.error("Error fetching news:", error);
        //     }
        // };

        const fetchNews = async () => {
            try {
                const newsCollection = collection(db, "news");

                const q = query(
                    newsCollection,
                    orderBy("createdAt", "desc"), // newest first
                );

                const snapshot = await getDocs(q);

                const newsList: PostT[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as PostT[];

                setNews(newsList);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };
        fetchNews();
    }, []);
    console.log("Fetched news:", news);

    useEffect(() => {
        if (!carouselApi) return;

        const onSelect = () => {
            setActiveIndex(carouselApi.selectedScrollSnap());
        };

        carouselApi.on("select", onSelect);
        onSelect(); // initialize

        return () => {
            carouselApi.off("select", onSelect);
        };
    }, [carouselApi]);

    return (
        <section className="flex h-fit w-full flex-col items-center justify-center gap-2 bg-white p-5 sm:min-h-fit sm:max-lg:p-20">
            <h1 className="font-geologica text-5xl text-cyan-900 underline decoration-4 sm:text-7xl">
                {t("title")}
            </h1>

            <Carousel
                ref={carouselRef}
                setApi={setApi}
                className={cn(
                    "animate-delay-300 w-full",
                    isCarouselVisible && "animate-fade-down",
                )}
                opts={{
                    loop: true,
                }}
                plugins={[autoplay.current]}
            >
                <CarouselContent className="-ml-1">
                    {news.map((item, index) => (
                        <CarouselItem
                            key={index}
                            className="p-4 pl-1 md:basis-1/2 lg:basis-1/3"
                        >
                            <CarouselNewsItemContent {...item} key={index} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {news.length > 1 && (
                    <>
                        <CarouselPrevious
                            className="bg-opacity-60 hidden h-12 w-12 bg-black text-white shadow-xl backdrop-blur-sm sm:flex lg:translate-x-20"
                            onClick={() => {
                                carouselApi?.scrollPrev();
                                autoplay.current.reset();
                            }}
                        />
                        <CarouselNext
                            className="bg-opacity-60 hidden h-12 w-12 bg-black text-white shadow-xl backdrop-blur-sm sm:flex lg:-translate-x-20"
                            onClick={() => {
                                carouselApi?.scrollNext();
                                autoplay.current.reset();
                            }}
                        />
                    </>
                )}
            </Carousel>
            {news.length > 1 && (
                <div className="space-between flex w-fit gap-2 sm:hidden">
                    {carouselApi
                        ?.scrollSnapList()
                        .map((_: any, index: number) => (
                            <div
                                key={index}
                                className={`h-3 w-3 cursor-pointer rounded-full bg-gray-400 ${
                                    index === activeIndex && "bg-slate-800"
                                }`}
                                onClick={() => {
                                    carouselApi?.scrollTo(index);
                                    autoplay.current.reset();
                                }}
                            />
                        ))}
                </div>
            )}
        </section>
    );
}

const CarouselNewsItemContent: React.FC<PostT> = ({
    id,
    title,
    titleDescriptions,
    heroImage,
}) => (
    <Link href={`news/${id}`} className="relative">
        {heroImage && (
            <img
                src={heroImage}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
            />
        )}
        <div className="bg-opacity-30 relative flex h-full min-h-[450px] w-full flex-col justify-end border-sky-500 bg-linear-to-t from-black to-transparent to-70% p-4 text-white transition-all hover:border-b-8 hover:to-80% sm:to-50%">
            <p className="z-999 text-4xl">{title}</p>
            {titleDescriptions?.map((desc) => (
                <p key={desc.id}>{desc.value}</p>
            ))}
        </div>
    </Link>
);
