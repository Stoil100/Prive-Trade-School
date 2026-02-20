"use client";

import LoadingOverlay from "@/components/Loading";
import MainButton from "@/components/MainButton";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { db } from "@/firebase/config";
import { cn } from "@/lib/utils";
import { PostT } from "@/models/post";
import { doc, getDoc } from "firebase/firestore";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

function useHeaders(postId: string) {
    const [header, setHeader] = useState<PostT>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        const fetchHeader = async () => {
            if (!postId) {
                setLoading(false);
                setError(new Error("Invalid header ID"));
                return;
            }

            try {
                setLoading(true);
                const docRef = doc(db, "headers", postId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setHeader({
                        id: docSnap.id,
                        ...docSnap.data(),
                    } as PostT);
                } else {
                    setError(new Error("Post not found"));
                }
            } catch (fetchError) {
                setError(fetchError as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchHeader();
    }, [postId]);

    return { header, loading, error };
}
export default function HeaderIdPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const pageId = React.use(params).id;
    const { header, loading, error } = useHeaders(pageId);
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>();
    const [activeTabIndex, setActiveTabIndex] = useState<number>();
    const [api, setApi] = useState<CarouselApi>();
    useEffect(() => {
        if (!api) {
            return;
        }

        api.on("select", () => {
            setActiveTabIndex(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const scrollTo = useCallback(
        (index: number) => {
            if (!api) return;
            api.scrollTo(index);
        },
        [api],
    );
    if (loading) return <LoadingOverlay />;
    if (error || !header) return <div>Error loading post</div>;

    return (
        <section className="flex min-h-screen items-center justify-center bg-white px-2 py-6">
            <div className="max-w-2xl space-y-6">
                <h1 className="text-5xl">{header!.title}</h1>
                <div className="space-y-2 px-2">
                    {header.titleDescriptions?.map((desc, index) => (
                        <p key={index} className="text-xl font-light">
                            {desc.value}
                        </p>
                    ))}
                </div>
                {header.heroImage && (
                    <img
                        src={header.heroImage}
                        alt={header.title}
                        className="w-full rounded-2xl"
                    />
                )}
                <div className="space-y-6 text-2xl font-light">
                    {header.descriptions?.map((desc, index) => (
                        <p key={index}>{desc.value}</p>
                    ))}
                </div>
                {header.lists?.map((list, listIndex) => (
                    <div
                        key={listIndex}
                        className="space-y-2 text-2xl font-light"
                    >
                        <h3>{list.title}</h3>
                        <ul className="list-disc space-y-1 px-6">
                            {list.items.map((item, itemIndex) => (
                                <li key={itemIndex}>{item.value}</li>
                            ))}
                        </ul>
                    </div>
                ))}
                <div>
                    {header.docs?.map((doc, docIndex) => {
                        const images = doc.images ?? [];
                        return (
                            <div key={docIndex} className="space-y-4">
                                <h2 className="text-4xl">{doc.title}</h2>
                                {images.length > 0 && images.length <= 2 && (
                                    <div className="flex flex-col gap-2">
                                        {images.map((image) => (
                                            <img
                                                key={image.id}
                                                src={image.value}
                                                alt={`Doc ${docIndex} Image ${image.id}`}
                                            />
                                        ))}
                                    </div>
                                )}
                                {images.length > 2 && (
                                    <div
                                        className="flex w-full cursor-pointer gap-2"
                                        onClick={() => {
                                            setActiveIndex(docIndex);
                                            setOpen(true);
                                        }}
                                    >
                                        <img
                                            src={doc!.images![0].value}
                                            alt={`Doc ${docIndex} Image 0`}
                                            className="w-3/4 rounded-2xl"
                                        />
                                        <div
                                            className={cn(
                                                "flex w-full gap-2",
                                                docIndex % 2 === 0
                                                    ? "flex-col-reverse"
                                                    : "flex-col",
                                            )}
                                        >
                                            <p className="flex aspect-square w-full items-center justify-center rounded-2xl border text-center text-5xl">
                                                {doc!.images!.length - 2}+
                                            </p>
                                            <img
                                                src={doc!.images![1].value}
                                                className="h-full rounded-2xl object-cover"
                                            />
                                        </div>
                                        {(() => {
                                            const activeDoc =
                                                activeIndex !== undefined
                                                    ? header.docs?.[activeIndex]
                                                    : undefined;
                                            return (
                                                activeDoc &&
                                                activeDoc.images?.length && (
                                                    <Dialog
                                                        open={open}
                                                        onOpenChange={setOpen}
                                                    >
                                                        <DialogContent className="z-9999 flex h-full max-h-screen max-w-screen flex-col items-center justify-center border-none bg-black/80 md:p-8">
                                                            <DialogTitle className="sr-only text-2xl font-light text-white">
                                                                {
                                                                    activeDoc.title
                                                                }
                                                            </DialogTitle>
                                                            <Carousel
                                                                className="max-w-3xl 2xl:max-w-7xl"
                                                                style={{
                                                                    marginTop:
                                                                        "var(--nav-height)",
                                                                }}
                                                                setApi={setApi}
                                                                opts={{
                                                                    watchDrag: false,
                                                                    loop: true,
                                                                }}
                                                            >
                                                                <CarouselContent className="-ml-4">
                                                                    {activeDoc.images?.map(
                                                                        (
                                                                            image,
                                                                            index,
                                                                        ) => (
                                                                            <CarouselItem
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className=""
                                                                            >
                                                                                <div className="flex aspect-video h-min items-center justify-center">
                                                                                    <img
                                                                                        src={
                                                                                            image.value
                                                                                        }
                                                                                        alt={image.toString()}
                                                                                        className="h-full w-full rounded-xl object-cover"
                                                                                    />
                                                                                </div>
                                                                            </CarouselItem>
                                                                        ),
                                                                    )}
                                                                </CarouselContent>
                                                                <CarouselNext className="border-green bg-green hover:text-green hidden text-white hover:bg-transparent lg:flex" />
                                                                <CarouselPrevious className="border-green bg-green hover:text-green hidden text-white hover:bg-transparent lg:flex" />
                                                            </Carousel>
                                                            <ScrollArea className="min-h-fit whitespace-nowrap max-sm:hidden">
                                                                <div className="flex justify-center gap-8 p-4 2xl:gap-16">
                                                                    {activeDoc.images?.map(
                                                                        (
                                                                            image,
                                                                            index,
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className={cn(
                                                                                    "aspect-video h-max min-w-48 cursor-pointer rounded-xl bg-cover bg-center transition-transform",
                                                                                    index ===
                                                                                        api?.selectedScrollSnap() &&
                                                                                        "scale-105 md:scale-110",
                                                                                )}
                                                                                style={{
                                                                                    backgroundImage: `url('${image.value}')`,
                                                                                }}
                                                                                onClick={() => {
                                                                                    scrollTo(
                                                                                        index,
                                                                                    );
                                                                                }}
                                                                            />
                                                                        ),
                                                                    )}
                                                                </div>
                                                                <ScrollBar orientation="horizontal" />
                                                            </ScrollArea>
                                                            <div className="flex gap-4 sm:hidden">
                                                                <MainButton
                                                                    className="size-10"
                                                                    onClick={() => {
                                                                        api?.scrollPrev();
                                                                    }}
                                                                >
                                                                    <ArrowLeft />
                                                                </MainButton>
                                                                <MainButton
                                                                    className="size-10"
                                                                    onClick={() => {
                                                                        api?.scrollNext();
                                                                    }}
                                                                >
                                                                    <ArrowRight />
                                                                </MainButton>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                )
                                            );
                                        })()}
                                    </div>
                                )}
                                <div className="space-y-1 text-xl font-light">
                                    {doc.texts?.map((text, textIndex) => {
                                        if ("value" in text) {
                                            return (
                                                <p key={textIndex}>
                                                    {text.value}
                                                </p>
                                            );
                                        } else {
                                            return (
                                                <div
                                                    key={textIndex}
                                                    className="space-y-2"
                                                >
                                                    <h3>{text.title}</h3>
                                                    <ul className="list-disc px-6">
                                                        {text.listItems.map(
                                                            (item) => (
                                                                <li
                                                                    key={
                                                                        item.id
                                                                    }
                                                                >
                                                                    {item.value}
                                                                </li>
                                                            ),
                                                        )}
                                                    </ul>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
