"use client";

import React, { useRef } from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { db } from "@/firebase/config";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { PostT } from "@/models/post";
import Autoplay from "embla-carousel-autoplay";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function HeroSection() {
    const [carouselApi, setApi] = useState<CarouselApi | undefined>();
    const [activeIndex, setActiveIndex] = useState(0);
    const [headers, setHeaders] = useState<PostT[]>([]);
    useEffect(() => {
        const fetchHeaders = async () => {
            try {
                const headersCollection = collection(db, "headers");

                const q = query(headersCollection, orderBy("createdAt", "asc"));

                const headerSnapshot = await getDocs(q);

                const headersList: PostT[] = headerSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as PostT[];

                setHeaders(headersList);
            } catch (error) {
                console.error("Error fetching headers:", error);
            }
        };

        fetchHeaders();
    }, []);

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
    const autoplay = useRef(
        Autoplay({
            delay: 4000,
            stopOnInteraction: false,
        }),
    );

    return (
        <section className="relative flex w-full items-center justify-between gap-5 bg-sky-500">
            <Carousel
                setApi={setApi}
                className="h-fit w-full"
                opts={{
                    loop: true,
                }}
                plugins={[autoplay.current]}
            >
                <CarouselContent className="h-fit">
                    {headers.map((item) => (
                        <CarouselItem
                            key={item.id}
                            className={cn(
                                "w-full border-b-20 border-sky-500 lg:border-b-44",
                            )}
                        >
                            <CarouselHeaderItemContent
                                key={item.id}
                                {...item}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            {headers.length > 1 && (
                <div className="space-between absolute bottom-2 left-[50%] flex w-fit translate-x-[-50%] gap-2 drop-shadow-xl lg:bottom-6">
                    {carouselApi
                        ?.scrollSnapList()
                        .map((_: any, index: number) => (
                            <div
                                key={index}
                                className={cn(
                                    "h-2 w-2 cursor-pointer rounded-full bg-white",
                                    index === activeIndex && "bg-blue-800",
                                )}
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

const CarouselHeaderItemContent: React.FC<PostT> = ({ id, heroImage }) => {
    return (
        <Link href={`/${id}`}>
            <img
                src={heroImage || "/placeholder.png"}
                className={cn(
                    "max-h-[81vh] w-full cursor-pointer object-cover",
                )}
            />
        </Link>
    );
};
