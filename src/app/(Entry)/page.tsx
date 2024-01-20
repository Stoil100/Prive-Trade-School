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
import { useIntersectionObserver as useVisibility } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { DollarSign, FileSearch, Landmark, Phone } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import ContactForm from "@/components/ContactForm";
import { Profiles } from "../../models/profile";
import { Reasons } from "../../models/reason";
import { Parallax } from "react-scroll-parallax";
import { Header, Headers } from "../../models/headerItem";
const headerItems: Headers = [
    {
        title: "Качество и Специализация",
        description:
            "При нас ще получиш висококачествено образование, съобразено с твоите интереси и способности. Изучавай специални дисциплини, свързани с избраната от теб специалност, които ще те подготвят за успешна кариера.",
        direction: "items-center sm:items-start",
        textDirection: "text-center sm:text-left",
        background: "bg-[url('/specialization.jpg')]",
    },
    {
        title: "Форми на обучение:",
        description:
            "Дневна форма \n Самостоятелна форма \n Дистанционна (on-line) форма",
        direction: "items-center",
        textDirection: "text-center",
        background: "bg-[url('/onlineSchool.jpg')] ",
    },
    {
        title: "Прием условия: ",
        description:
            "Интервю с кандидатите и с техните родители (настойници) (лице в лице или онлайн) \n изпит по Английски език (за установяване на ниво)",
        direction: "items-center sm:items-end",
        textDirection: "text-center sm:text-right",
        background: "bg-[url('/admission.jpg')] bg-center",
    },
];
const profiles: Profiles = [
    {
        type: "Данъчен и митнически контрол",
        icon: <FileSearch />,
        description: "",
    },
    {
        type: "Банково дело",
        icon: <Landmark />,
        description: "",
    },
    {
        type: "Оперативно счетоводство",
        icon: <DollarSign />,
        description: "",
    },
];
const aboutReasons: Reasons = [
    {
        title: "Международни Възможности:",
        description:
            "Отворени сме за записвания от цяла Европа - разстоянието не е препятствие! Без значение къде се намираш в Европа, ти имаш възможността да се присъединиш към нас. ",
    },
    {
        title: "",
        description:
            "Освен богатство от специализирани и икономически и общообразователни дисциплини, ти ще се впуснеш и в засилено изучаване на чужд език - Английски, Немски или Испански. Готви се за стажове в чужбина и международни проекти, като програма Еразмус +.        ",
    },
    {
        title: "Персонален Подход:",
        description:
            "Вярваме, че всеки ученик е уникален. Разчитай на индивидуален подход, подкрепа и възможност да напредваш в собствени темпове.",
    },
    {
        title: "Подготовка за Бизнес Успех:",
        description:
            "Ние не само ти предоставяме знания, но и условия за умения, научаваме те да ги използваш практически. Обочаваме те да стартираш свой собствен бизнес след завършване на гимназията.",
    },
];

export default function Home() {
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center">
            <HeroSection />
            <NewsSection />
            <AboutSection />
            <ProfilesSection />
            <ContactSection />
        </main>
    );
}

const HeroSection: React.FC = () => {
    const [carouselApi, setApi] = useState<CarouselApi | undefined>();
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (carouselApi) {
            carouselApi.scrollTo(activeIndex);
        }
        carouselApi?.on("select", () => {
            setActiveIndex(carouselApi.selectedScrollSnap());
        });
    }, [activeIndex, carouselApi]);

    return (
        <section className="relative flex w-full items-center justify-between gap-5">
            <Carousel
                setApi={setApi}
                className="h-fit w-full"
                opts={{
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 3000,
                    }),
                ]}
            >
                <CarouselContent className="h-[660px]">
                    {headerItems.map((item, index) => (
                        <CarouselItem
                            key={index}
                            className={cn(
                                "w-full border-b-[44px] border-sky-500",
                            )}
                        >
                            <CarouselHeaderItemContent
                                key={index}
                                direction={item.direction}
                                title={item.title}
                                description={item.description}
                                textDirection={item.textDirection}
                                background={item.background}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="space-between absolute bottom-6 left-[50%] flex w-fit translate-x-[-50%] gap-2 drop-shadow-xl">
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

const ContactSection: React.FC = () => (
    <section className="w-full h-[400px]">
        {/* <h3 className="w-full p-3 text-center text-4xl underline  decoration-4 sm:text-left lg:text-6xl">
            Свържете се с нас
        </h3> */}
         <div className="w-full h-full flex justify-center bg-gray-900">
            <div className="h-full w-fit relative
           
             before:content-['']
             before:absolute
             before:w-full
             before:h-full
             before:bg-[linear-gradient(90deg,transparent_0_70%,#111827_90%_100%)]
             before:right-0 
             before:top-0
        
            after:content-[''] after:absolute after:w-full after:h-full after:bg-[linear-gradient(270deg,transparent_0_70%,#111827_90%_100%)] after:left-0 after:top-0
    ">
            <img src={"/map.png"} className="h-full w-auto border-yellow-500 border-y-4"/>
            </div>
            
         </div>
        {/* <div className="flex w-full flex-col gap-2 bg-white sm:flex-row h-full">
           
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.3079355977425!2d27.916657411454345!3d43.20303018131007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a453f471687209%3A0xf1a81062daaa8d89!2z0KfQsNGB0YLQvdCwINGC0YrRgNCz0L7QstGB0LrQsCDQs9C40LzQvdCw0LfQuNGP!5e0!3m2!1sbg!2sbg!4v1703864908152!5m2!1sbg!2sbg"
            
            <ContactForm />
        </div> */}
    </section>
);

const NewsSection: React.FC = () => {
    const [carouselApi, setApi] = useState<CarouselApi | undefined>();
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const isCarouselVisible = !!useVisibility(carouselRef, {})?.isIntersecting;

    useEffect(() => {
        if (carouselApi) {
            carouselApi.scrollTo(activeIndex);
        }
        carouselApi?.on("select", () => {
            setActiveIndex(carouselApi.selectedScrollSnap());
        });
    }, [activeIndex, carouselApi]);

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
                plugins={[
                    Autoplay({
                        delay: 4000,
                    }),
                ]}
            >
                <CarouselContent className="-ml-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem
                            key={index}
                            className="p-4 pl-1 md:basis-1/2 lg:basis-1/3"
                        >
                            <CarouselNewsItemContent key={index} />
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

const CarouselNewsItemContent: React.FC = () => (
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
const CarouselHeaderItemContent: React.FC<Header> = ({
    direction,
    title,
    description,
    textDirection,
    background,
}) => (
    <div
        className={cn(
            "flex h-full w-full flex-col justify-center bg-cover p-8",
            direction,
            background,
        )}
    >
        <div
            className={cn(
                "flex h-full w-full flex-col justify-center border-8 border-double bg-sky-500/30 p-5 text-white backdrop-blur-sm sm:w-1/2 ",
                textDirection,
            )}
        >
            <h2 className="border-b-[5px] pb-2 text-3xl md:text-6xl">
                {title}
            </h2>
            <h4 className="text-2xl md:text-4xl">{description}</h4>
        </div>
    </div>
);

const AboutSection: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const sectionBoxRef = useRef<HTMLDivElement | null>(null);
    const aboutBoxRef = useRef<HTMLDivElement | null>(null);
    const aboutTitleRef = useRef<HTMLHeadingElement | null>(null);
    const isAboutTitleVisible = !!useVisibility(aboutTitleRef, {})
        ?.isIntersecting;
    const isSectionBoxRefFVisible = !!useVisibility(sectionBoxRef, {
        threshold: 0.95,
    })?.isIntersecting;
    return (
        <Parallax onProgressChange={(progress) => setProgress(progress)}>
            <section
                className={cn(
                    "max-w-screen relative h-fit min-h-[400vh] w-screen bg-white bg-gradient-to-r transition-colors duration-1000",
                    isSectionBoxRefFVisible &&
                        "bg-slate-600 text-white mix-blend-difference",
                    progress > 0 &&
                        progress < 0.3 &&
                        isSectionBoxRefFVisible &&
                        "bg-sky-600",
                    progress > 0.3 && progress < 0.5 && "bg-blue-600",
                    progress > 0.5 && progress < 0.7 && "bg-indigo-700",
                    progress > 0.7 && "bg-slate-600",
                )}
            >
                <div className="absolute h-full w-1/4 -skew-x-[30deg] bg-white  mix-blend-overlay" />
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
                        Защо да изберете нас?
                    </h3>
                    <div
                        className={cn(
                            "relative flex h-fit w-full scale-90  items-center transition-transform duration-1000 ",
                            isSectionBoxRefFVisible && "scale-100",
                        )}
                    >
                        <div className="aboslute min-h-[400px]" />
                        <div
                            ref={aboutBoxRef}
                            className={cn(
                                "absolute z-10 flex h-fit w-fit transform items-center justify-between transition-transform ease-in md:gap-[25vw] ",

                                progress > 0.3 &&
                                    progress < 0.5 &&
                                    "-translate-x-[100vw]",
                                progress > 0.5 &&
                                    progress < 0.7 &&
                                    "-translate-x-[200vw]",
                                progress > 0.7 && "-translate-x-[300vw]",
                            )}
                        >
                            {aboutReasons.map((item, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "z-11 flex h-fit w-screen flex-col items-center justify-around bg-slate-900 p-8  text-center text-white drop-shadow-[-35px_-35px_rgba(0,0,0,0.25)] transition-all duration-500 md:w-[75vw]  md:translate-x-[12.5vw]",
                                        isSectionBoxRefFVisible &&
                                            "bg-white  text-slate-800",
                                    )}
                                >
                                    <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl">
                                        {item.title}
                                    </h3>

                                    <p className="text-md sm:text-1xl md:text-2xl lg:text-3xl">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Parallax>
    );
};

const ProfilesSection: React.FC = () => {
    return (
        <section className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-slate-600  to-[#111827] p-2 sm:p-5">
            <h2 className="text-center text-3xl text-white sm:text-6xl">
                Специалности
            </h2>
            <div className="flex h-fit w-full flex-wrap items-center  justify-center gap-10 px-4 py-3 sm:px-8">
                {profiles.map((item, index) => (
                    <div key={index} className="relative h-[250px] w-[300px] drop-shadow-[15px_15px_rgba(0,0,0,0.25)]">
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white">
                            <p className="text-center text-lg font-bold">
                                {item.type}
                            </p>
                            {item.icon}
                        </div>
                        <div className="absolute inset-0 flex transform flex-col items-center justify-center gap-2  bg-blue-700 p-4 text-center text-white opacity-0 transition-opacity hover:opacity-100">
                            <p className="text-2xl font-bold">{item.type}</p>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <p className="flex gap-2 text-gray-400">
                За повече информация се свържете с нас на
                <span className="flex cursor-pointer text-blue-500 underline gap-1">
                    <Phone /> +359 000 000 000
                </span>
            </p>
        </section>
    );
};
