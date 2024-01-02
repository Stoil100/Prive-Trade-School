"use client";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState, useRef } from "react";
import useVisibility from "@/hooks/useVisibility";
import { cn } from "@/lib/utils";
import { Contact, Phone } from "lucide-react";
export default function Home() {
    const [carouselApi, setApi] = useState<CarouselApi | undefined>();
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (carouselApi) {
            carouselApi.scrollTo(activeIndex);
        }
    }, [activeIndex, carouselApi]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <HeroSection />
            <QuoteSection />
            <NewsSection
                carouselApi={carouselApi}
                setActiveIndex={setActiveIndex}
                activeIndex={activeIndex}
                setApi={setApi}
            />
            <MissionSection />
            <ProfilesSection />
        </main>
    );
}

const HeroSection: React.FC = () => (
    <section className="flex h-fit w-full flex-col items-center justify-between gap-5 bg-slate-500 bg-[url('/school.jpg')] bg-cover bg-fixed p-5 sm:h-screen md:p-14 lg:flex-row lg:px-24 lg:py-28">
        <div className="flex h-fit w-full animate-fade-up flex-col items-center justify-between gap-4 rounded-xl bg-white px-5 py-10 text-center shadow-xl animate-duration-500 lg:h-full lg:w-[350px] ">
            <h3 className="text-2xl">Lorem Ipsum</h3>
            <h4 className="text-lg">Lorem Ipsum</h4>
            <Button>Lorem Ipsum</Button>
            <p className="text-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                delectus ducimus hic velit deserunt, soluta autem placeat
                architecto minima odio nobis inventore, error voluptate
                corrupti! Saepe veniam veritatis dolorum quidem.
            </p>
        </div>
        <div className="flex h-full w-full animate-fade flex-col rounded-md border-b-4 border-sky-600 bg-white p-2 delay-300 lg:w-auto">
            <div className="flex-1">
                <iframe
                    className="h-full w-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.3079355977425!2d27.916657411454345!3d43.20303018131007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a453f471687209%3A0xf1a81062daaa8d89!2z0KfQsNGB0YLQvdCwINGC0YrRgNCz0L7QstGB0LrQsCDQs9C40LzQvdCw0LfQuNGP!5e0!3m2!1sbg!2sbg!4v1703864908152!5m2!1sbg!2sbg"
                />
            </div>
            <div>
                <h1 className="text-3xl">
                    Lorem Lorem Lorem Lorem Lorem Lorem
                </h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
        </div>
    </section>
);

const QuoteSection: React.FC = () => (
    <section className="flex h-[150px] w-full items-center justify-center bg-slate-500 p-3 text-white">
        <blockquote>
            <p className="text-2xl font-bold italic">
                &ldquo;Гимназия Гимназия Гимназия&rdquo;
            </p>
            <footer className="text-sm">-Гимназия</footer>
        </blockquote>
    </section>
);

const NewsSection: React.FC<{
    carouselApi: CarouselApi | undefined;
    setApi: CarouselApi | undefined;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    activeIndex: number;
}> = ({ carouselApi, setActiveIndex, setApi, activeIndex }) => {
    const carouselRef = useRef(null);
    const isCarouselVisible = useVisibility(carouselRef.current!);

    return (
        <section className="flex h-fit w-full flex-col items-center justify-center gap-2 bg-white p-5 sm:min-h-fit sm:max-lg:p-20">
            <h1 className="font-geologica text-5xl underline decoration-4 sm:text-7xl">
                Новини
            </h1>

            <Carousel
                ref={carouselRef}
                setApi={setApi}
                className={cn(
                    "w-full animate-delay-300",
                    isCarouselVisible && "animate-fade-down",
                )}
                opts={{
                    loop: true,
                }}
            >
                <CarouselContent className="-ml-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem
                            key={index}
                            className="p-4 pl-1 md:basis-1/2 lg:basis-1/3"
                        >
                            <CarouselItemContent key={index} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className=" hidden h-12 w-12 bg-black bg-opacity-60 text-white shadow-xl backdrop-blur-sm sm:flex lg:translate-x-20" />
                <CarouselNext className="hidden h-12 w-12 bg-black bg-opacity-60 text-white shadow-xl backdrop-blur-sm sm:flex lg:-translate-x-20" />
            </Carousel>

            <div className="space-between flex w-fit gap-2 sm:hidden">
                {carouselApi?.scrollSnapList().map((_: any, index: number) => (
                    <div
                        key={index}
                        className={`h-3 w-3 cursor-pointer rounded-full bg-gray-400 ${
                            index === activeIndex && "bg-slate-800"
                        }`}
                        onClick={() => {
                            setActiveIndex(index);
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

const CarouselItemContent: React.FC = () => (
    <div className="h-full min-h-[450px] w-full bg-[url('/school.jpg')] bg-cover">
        <div className="flex h-full w-full flex-col justify-end border-sky-500 bg-opacity-30 bg-gradient-to-t from-black to-transparent to-70% p-4 text-white transition-all hover:border-b-8 hover:to-80% sm:to-50%">
            <p className="text-4xl">Title</p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                atque sint vero eveniet, reprehenderit minima, reiciendis optio
                maxime doloribus beatae molestiae deserunt minus at iure
                delectus eligendi, alias dolorem voluptate.
            </p>
        </div>
    </div>
);

const MissionSection: React.FC = () => {
    const missionTitleRef = useRef(null);
    const missionBoxesRef = useRef(null);
    const isMissionTitleVisible = useVisibility(missionTitleRef.current!);
    const isMissionBoxesVisible = useVisibility(missionBoxesRef.current!);

    return (
        <section className="relative h-fit min-h-[150vh] w-full">
            <div className="z-3 sticky top-[60px] flex h-screen w-full justify-center bg-[url('/school.jpg')] bg-cover sm:items-center sm:justify-end md:items-start md:p-10 lg:pr-[7.5rem] lg:pt-[7.5rem]">
                <h3
                    ref={missionTitleRef}
                    className={cn(
                        "rounded text-center text-3xl text-white  opacity-0 backdrop-blur-sm sm:text-end sm:text-5xl md:text-7xl lg:text-8xl",
                        isMissionTitleVisible &&
                            "animate-fade-left opacity-100",
                    )}
                >
                    Нашата цел
                </h3>
            </div>
            <div
                ref={missionBoxesRef}
                className={cn(
                    "z-10 mt-[-100vh] flex h-full w-full flex-col items-start justify-start gap-5 bg-transparent p-3 pb-5 pt-12 md:p-10 lg:p-[7.5rem]",
                    isMissionBoxesVisible &&
                        "animate-fade-down opacity-100 sm:animate-fade-right",
                )}
            >
                {Array.from({ length: 10 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex h-fit flex-col items-center justify-around rounded-xl bg-white px-5 text-center sm:w-[300px] md:w-[400px]"
                    >
                        <h3 className="text-2xl">Lorem Ipsum</h3>

                        <p className="text-md">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Eum delectus ducimus hic velit deserunt,
                            soluta autem placeat architecto minima odio nobis
                            inventore, error voluptate corrupti! Saepe veniam
                            veritatis dolorum quidem.
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const ProfilesSection: React.FC = () => {
    return (
        <section className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-3 bg-slate-600 p-2 sm:p-5">
            <h2 className="text-center text-3xl text-white sm:text-6xl">
                Профилиращи предмети
            </h2>
            <div className="flex h-fit w-full flex-wrap items-center justify-center gap-3 px-4 py-3 sm:px-8">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="relative h-[250px] w-[300px]">
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg border bg-white">
                            <p className="text-lg font-bold">Паралелка</p>
                            <Contact size={48} />
                        </div>
                        <div className="absolute inset-0 flex transform flex-col items-center justify-center gap-2 rounded-lg border-2 bg-blue-500 p-4 text-center text-white opacity-0 transition-opacity hover:opacity-100">
                            <p className="text-2xl font-bold">Title</p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Porro soluta rerum nemo. Eaque
                                tempore harum est doloribus temporibus!
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <p className="flex gap-2">За повече информация се свържете с нас на <span className="text-blue-500 flex underline cursor-pointer"><Phone/> +359 000 000 000</span></p>
        </section>
    );
};
