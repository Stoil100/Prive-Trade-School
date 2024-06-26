"use client";

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
import { NewsT } from "@/models/news";
import Autoplay from "embla-carousel-autoplay";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import {
    GraduationCap,
    Backpack,
    Star,
    BookOpenText,
    Phone,
    FileSearch,
    Landmark,
    DollarSign,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import { useIntersectionObserver as useVisibility } from "usehooks-ts";
import { Header, Headers } from "@/models/headerItem";
import { Profiles } from "@/models/profile";
import { AboutItem, AboutItems } from "@/models/about";
import { Reason, Reasons } from "@/models/reason";
import { Element } from "react-scroll";
import Link from "next/link";
import { useTranslations } from "next-intl";

const headerItems: Headers = [
    {
        link: "/apply",
        background: "/headers/appliance.png",
    },
];
export default function Home() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center">
            <Element name="home" className="w-full">
                <HeroSection />
            </Element>
            <Element name="about" className="w-full">
                <AboutSection />
            </Element>
            <Element name="news" className="w-full">
                <NewsSection />
            </Element>
            <Element name="select" className="w-full">
                <SelectSection />
            </Element>
            <Element name="programs" className="w-full">
                <ProfilesSection />
            </Element>
            <Element name="contact" className="w-full">
                <ContactSection />
            </Element>
        </main>
    );
}
const HeroSection: React.FC = () => {
    const [carouselApi, setApi] = useState<CarouselApi | undefined>();
    const [activeIndex, setActiveIndex] = useState(0);
    const [headerImages, setHeaderImages] = useState<Headers>([]);

    useEffect(() => {
        const fetchUploadedContent = async () => {
            const querySnapshot = await getDocs(collection(db, "headers"));
            const fetchedContent: Headers = [];
            querySnapshot.forEach((doc) => {
                fetchedContent.push({
                    link: doc.id,
                    background: doc.data().image,
                });
            });
            const content = headerItems.concat(fetchedContent);
            setHeaderImages(content);
        };
        fetchUploadedContent();
    }, []);

    useEffect(() => {
        if (carouselApi) {
            carouselApi.scrollTo(activeIndex);
        }
        carouselApi?.on("select", () => {
            setActiveIndex(carouselApi.selectedScrollSnap());
        });
    }, [activeIndex, carouselApi]);

    return (
        <section className="relative flex w-full items-center justify-between gap-5 bg-sky-500">
            <Carousel
                setApi={setApi}
                className="h-fit w-full"
                opts={{
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 10000,
                    }),
                ]}
            >
                <CarouselContent className="h-fit">
                    {headerImages.map((item, index) => (
                        <CarouselItem
                            key={index}
                            className={cn(
                                "w-full border-b-[20px] border-sky-500 lg:border-b-[44px]",
                            )}
                        >
                            <CarouselHeaderItemContent
                                key={index}
                                background={item.background}
                                link={item.link}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="space-between absolute bottom-2 left-[50%] flex w-fit translate-x-[-50%] gap-2 drop-shadow-xl lg:bottom-6">
                {carouselApi?.scrollSnapList().map((_: any, index: number) => (
                    <div
                        key={index}
                        className={cn(
                            "h-2 w-2 cursor-pointer rounded-full bg-white",
                            index === activeIndex && "bg-blue-800",
                        )}
                        onClick={() => {
                            setActiveIndex(index);
                        }}
                    />
                ))}
            </div>
        </section>
    );
};
const CarouselHeaderItemContent: React.FC<Header> = ({ link, background }) => {
    const router = useRouter();
    return (
        <img
            src={background}
            onClick={() => {
                router.push(link);
            }}
            className={cn("max-h-[81vh] w-full cursor-pointer object-cover")}
        />
    );
};
const AboutSection: React.FC = () => {
    const [carouselApi, setApi] = useState<CarouselApi | undefined>();
    const [activeIndex, setActiveIndex] = useState(0);
    const t = useTranslations("Homepage.About");
    const aboutItems: AboutItems = [
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
    ];
    useEffect(() => {
        if (carouselApi) {
            carouselApi.scrollTo(activeIndex);
        }
        carouselApi?.on("select", () => {
            setActiveIndex(carouselApi.selectedScrollSnap());
        });
    }, [activeIndex, carouselApi]);

    // const reorderItems = () => {
    //     const middleIndex = Math.floor(aboutItems.length / 2);
    //     const offset = activeIndex - middleIndex;
    //     return [...aboutItems.slice(offset), ...aboutItems.slice(0, offset)];
    // };

    return (
        <section className="flex min-h-[500px] w-full flex-col items-center justify-start gap-5 bg-gradient-to-b from-sky-500 from-50% to-white to-100% py-4">
            <h2 className="text-5xl font-bold text-white underline decoration-4 underline-offset-4 md:text-7xl">
                {t("title")}
            </h2>
            <div className="flex h-fit w-full flex-col items-center justify-center md:flex-row">
                <Carousel
                    setApi={setApi}
                    orientation="vertical"
                    opts={{
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 4000,
                        }),
                    ]}
                    className="max-w-[1000px]"
                >
                    <CarouselContent className="mt-1 h-[300px] sm:h-[200px] md:h-[350px]">
                        {aboutItems.map((item, index) => (
                            <CarouselItem
                                key={index}
                                className="flex w-full items-center justify-center p-5 md:border-r"
                            >
                                <CarouselAboutItemContent
                                    title={item.title}
                                    description={item.description}
                                    icon={item.icon}
                                    key={index}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <div className="flex w-fit min-w-40 flex-row items-center justify-center gap-7  p-4 md:flex-col md:gap-3">
                    {aboutItems.map((item, index) => (
                        <div
                            key={index}
                            className={cn(
                                "flex h-12 w-12  cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white transition-all md:h-16 md:w-16",
                                index === activeIndex &&
                                    "scale-125 bg-blue-600 md:scale-110",
                            )}
                            onClick={() => {
                                setActiveIndex(index);
                            }}
                        >
                            {item.icon}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
const CarouselAboutItemContent: React.FC<AboutItem> = ({
    title,
    description,
}) => {
    return (
        <div className="flex h-full w-fit flex-col justify-center p-2 text-center text-white md:text-left">
            <p className="mb-2 text-3xl font-bold md:text-5xl">{title}</p>
            <p className="text-md md:text-2xl">{description}</p>
        </div>
    );
};
const NewsSection: React.FC = () => {
    const [carouselApi, setApi] = useState<CarouselApi | undefined>();
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const isCarouselVisible = !!useVisibility(carouselRef, {})?.isIntersecting;
    const [news, setNews] = useState<NewsT[]>([]);
    useEffect(() => {
        if (carouselApi) {
            carouselApi.scrollTo(activeIndex);
        }
        carouselApi?.on("select", () => {
            setActiveIndex(carouselApi.selectedScrollSnap());
        });
    }, [activeIndex, carouselApi]);
    const t =useTranslations("Homepage.News")

    useEffect(() => {
        async function getNews() {
            const q = query(
                collection(db, "news"),
                orderBy("createdAt", "desc"),
                limit(5),
            );
            const querySnapshot = await getDocs(q);
            let tempNews: NewsT[] = [];
            querySnapshot.forEach((doc) => {
                tempNews.push(doc.data() as NewsT);
            });
            setNews(tempNews);
        }
        getNews();
    }, []);

    return (
        <section className="flex h-fit w-full flex-col items-center justify-center gap-2 bg-white p-5 sm:min-h-fit sm:max-lg:p-20">
            <h1 className="font-geologica text-5xl text-cyan-900 underline decoration-4 sm:text-7xl">
                {t("title")}
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
                plugins={[
                    Autoplay({
                        delay: 4000,
                    }),
                ]}
            >
                <CarouselContent className="-ml-1">
                    {news.map((item, index) => (
                        <CarouselItem
                            key={index}
                            className="p-4 pl-1 md:basis-1/2 lg:basis-1/3"
                        >
                            <CarouselNewsItemContent
                                title={item.title}
                                description={item.description}
                                image={item.image}
                                key={index}
                            />
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
const CarouselNewsItemContent: React.FC<NewsT> = ({
    title,
    description,
    image,
}) => (
    <div
        className="h-full min-h-[450px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
    >
        <div className="flex h-full w-full flex-col justify-end border-sky-500 bg-opacity-30 bg-gradient-to-t from-black to-transparent to-70% p-4 text-white transition-all hover:border-b-8 hover:to-80% sm:to-50%">
            <p className="text-4xl">{title}</p>
            <p>{description}</p>
        </div>
    </div>
);
const SelectSection: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const sectionBoxRef = useRef<HTMLDivElement | null>(null);
    const aboutTitleRef = useRef<HTMLHeadingElement | null>(null);
    const isAboutTitleVisible = !!useVisibility(aboutTitleRef, {})
        ?.isIntersecting;
    const isSectionBoxRefFVisible = !!useVisibility(sectionBoxRef, {
        threshold: 0.95,
    })?.isIntersecting;
    const [carouselApi, setApi] = useState<CarouselApi>();
    const t = useTranslations("Homepage.Select");
    const selectReasons: Reasons = [
        {
            title: t("selectReasons.Global.title"),
            description: t("selectReasons.Global.description"),
        },
        {
            title: t("selectReasons.Individual.title"),
            description: t("selectReasons.Individual.description"),
        },
        {
            title: t("selectReasons.Preperation.title"),
            description: t("selectReasons.Preperation.description"),
        },
    ];
    useEffect(() => {
        if (carouselApi) {
            carouselApi.scrollTo(Math.floor(progress * 3));
        }
    }, [progress]);
    return (
        <Parallax onProgressChange={(progress) => setProgress(progress)}>
            <section
                className={cn(
                    "max-w-screen relative h-fit min-h-[400vh] w-screen bg-white bg-gradient-to-r transition-colors duration-1000",
                    isSectionBoxRefFVisible &&
                        "bg-slate-600 text-white mix-blend-difference",
                    progress > 0 &&
                        progress < 0.33 &&
                        isSectionBoxRefFVisible &&
                        "bg-sky-600",
                    progress >= 0.33 && progress < 0.66 && "bg-blue-600",
                    progress >= 0.66 && progress < 1 && "bg-indigo-700",
                    progress > 0.75 && "bg-slate-600",
                )}
            >
                <div className="absolute h-full w-1/4  -skew-x-[5deg] bg-white mix-blend-overlay sm:-skew-x-[7deg] md:-skew-x-[10deg] lg:-skew-x-[15deg]  2xl:-skew-x-[20deg]" />
                <div
                    ref={sectionBoxRef}
                    className={cn(
                        "z-3 sticky top-0 flex h-screen flex-col justify-center bg-transparent",
                        progress > 0.5 && "text-white",
                    )}
                >
                    <h3
                        ref={aboutTitleRef}
                        className={cn(
                            "text-center text-3xl shadow-black drop-shadow-xl sm:text-5xl md:text-7xl lg:text-8xl",
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
                        <CarouselContent className="h-[500px]">
                            {selectReasons.map((item, index) => (
                                <CarouselItem
                                    key={index}
                                    className={cn(
                                        "flex scale-90 items-center justify-center transition-transform duration-1000",
                                        isSectionBoxRefFVisible && "scale-100",
                                    )}
                                >
                                    <CarouselSelectItemContent
                                        title={item.title}
                                        description={item.description}
                                        className={cn(
                                            "flex w-3/4 flex-col justify-center bg-slate-900 p-8 text-center text-white drop-shadow-[-35px_-35px_rgba(0,0,0,0.25)] transition-colors duration-500",
                                            isSectionBoxRefFVisible &&
                                                "bg-white  text-slate-800",
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
};
const CarouselSelectItemContent: React.FC<Reason> = ({
    title,
    description,
    className,
}) => (
    <div className={className}>
        <h3 className="text-xl font-bold sm:text-2xl md:text-4xl lg:text-6xl">
            {title}
        </h3>

        <p className="text-md sm:text-1xl md:text-2xl lg:text-3xl">
            {description}
        </p>
    </div>
);
const ProfilesSection: React.FC = () => {
    const t = useTranslations("Homepage.Profile");
    const profiles: Profiles = [
        {
            type: t("profiles.border"),
            image: "bg-[url('/profiles/borderControl.jpg')]",
            icon: (
                <FileSearch
                    size={40}
                    className="self-start rounded-full border-4 border-white p-1"
                />
            ),
            pdf: "https://firebasestorage.googleapis.com/v0/b/private-trade-school.appspot.com/o/pdfs%2Faccountant.PDF?alt=media&token=de3f1483-2c99-4701-a1a1-6174ec077ecb",
        },
        {
            type: t("profiles.bank"),
            image: "bg-[url('/profiles/bank.jpg')]",
            icon: (
                <Landmark
                    size={40}
                    className="self-start rounded-full border-4 border-white p-1"
                />
            ),
            pdf: "https://firebasestorage.googleapis.com/v0/b/private-trade-school.appspot.com/o/pdfs%2Fbanker.PDF?alt=media&token=1bf1e9da-a3b3-424f-b7ae-dc65ed2de0df",
        },
        {
            type: t("profiles.accountant"),
            image: "bg-[url('/profiles/accountant.jpg')]",
            icon: (
                <DollarSign
                    size={40}
                    className="self-start rounded-full border-4 border-white p-1"
                />
            ),
            pdf: "https://firebasestorage.googleapis.com/v0/b/private-trade-school.appspot.com/o/pdfs%2FborderAdmin.PDF?alt=media&token=7135de87-2cef-4eac-b96e-15c820558744",
        },
    ];
    return (
        <section className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-slate-600  to-[#111827] p-2 sm:p-5">
            <h2 className="text-center text-3xl text-white sm:text-6xl">
                {t("title")}
            </h2>
            <div className="flex h-fit w-full flex-wrap items-center justify-center gap-10 px-4 py-3 sm:px-8">
                {profiles.map((item, index) => (
                    <div
                        key={index}
                        className="relative h-[450px] w-[350px] transition-transform duration-300 hover:scale-110"
                    >
                        <div
                            className={cn(
                                "absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl border-y-8 border-amber-400 bg-white bg-cover",
                                item.image,
                            )}
                        >
                            <div className="flex h-full w-full flex-col items-center justify-between bg-opacity-30 bg-gradient-to-t from-black to-transparent to-70% p-2 text-white">
                                {item.icon}
                                <p className="text-center text-lg font-bold">
                                    {item.type}
                                </p>
                            </div>
                        </div>
                        <Link
                            className="absolute inset-0 flex transform cursor-pointer flex-col items-center justify-center gap-2 rounded-xl bg-black/40 p-4 text-center text-xl text-white opacity-0 transition-opacity hover:opacity-100"
                            href={item.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            locale={false}
                        >
                            {t("download")}
                        </Link>
                    </div>
                ))}
            </div>
            <p className="flex gap-2 text-gray-400">
                {t("info")}
                <span className="flex cursor-pointer gap-1 text-blue-500 underline underline-offset-2">
                    <Phone /> +359 893 344 538
                </span>
            </p>
        </section>
    );
};
const ContactSection: React.FC = () => (
    <section className="h-fit w-full">
        {/* <h3 className="w-full p-3 text-center text-4xl underline  decoration-4 sm:text-left lg:text-6xl">
            Свържете се с нас
        </h3> */}
        <div className="flex h-fit w-full justify-center bg-gray-900">
            <Link
                href="https://maps.app.goo.gl/PCDdCJbaF5vfMTY98"
                className="relative h-fit w-fit       
             before:absolute
             before:right-0
             before:top-0
             before:h-full
             before:w-full
             before:bg-[linear-gradient(90deg,transparent_0_90%,#111827_100%)] 
             before:content-['']
            after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[linear-gradient(270deg,transparent_0_90%,#111827_100%)] after:content-['']
    "
            >
                <img
                    src={"/contacts/map.png"}
                    className="h-auto w-full border-y-4 border-yellow-500"
                />
            </Link>
        </div>
        {/* <div className="flex w-full flex-col gap-2 bg-white sm:flex-row h-full">
           
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.3079355977425!2d27.916657411454345!3d43.20303018131007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a453f471687209%3A0xf1a81062daaa8d89!2z0KfQsNGB0YLQvdCwINGC0YrRgNCz0L7QstGB0LrQsCDQs9C40LzQvdCw0LfQuNGP!5e0!3m2!1sbg!2sbg!4v1703864908152!5m2!1sbg!2sbg"
            
            <ContactForm />
        </div> */}
    </section>
);
