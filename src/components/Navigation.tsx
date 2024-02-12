"use client";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import useScrollListener from "@/hooks/useScroll";
import { cn } from "@/lib/utils";
import {
    ChevronDown,
    CircleUserRound,
    Facebook,
    Instagram,
    LockKeyhole,
    LogOut,
    Mail,
    Map,
    Menu,
    Phone,
    School,
    UnlockKeyhole,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./Providers";
import { Button } from "./ui/button";
import { Link as ScrollLink } from "react-scroll";

export default function Navigation() {
    const router = useRouter();
    const navigationRef = useRef<HTMLDivElement>(null);
    const useScroll = useScrollListener();
    const [hasLoaded, setHasLoaded] = useState(false);
    const { user, logOut } = useAuth();

    useEffect(() => {
        navigationRef.current!.style.top =
            useScroll.y > useScroll.lastY ? "-50%" : "0px";
    }, [useScroll.lastY, useScroll.y, navigationRef.current]);

    return (
        <div
            ref={navigationRef}
            className="sticky top-0 z-50 flex h-[70px] w-screen max-w-full items-center justify-between bg-blue-700 px-6 text-white shadow-xl transition-all duration-500"
        >
            <div
                className="h-full w-[60px] bg-[url('/logo.png')] bg-contain bg-center bg-no-repeat"
                onClick={() => {
                    router.push("/");
                }}
            />
            <Sheet>
                <SheetTrigger
                    className="md:hidden"
                    onClick={() => {
                        setHasLoaded(true);
                    }}
                >
                    <Menu />
                </SheetTrigger>
                <SheetContent
                    side="left"
                    className="overflow-y-auto"
                    onChange={() => {
                        setHasLoaded(false);
                    }}
                >
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-2">
                        {[200, 300, 500, 700, 1000].map((item, index) => (
                            <Collapsible key={index}>
                                <CollapsibleTrigger
                                    className={cn(
                                        `align-center flex w-full justify-between rounded-md border-2 p-2 text-lg font-bold animate-delay-${item} `,
                                        hasLoaded && " animate-fade-right",
                                    )}
                                >
                                    Can I use this in my project?
                                    <ChevronDown />
                                </CollapsibleTrigger>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <CollapsibleContent
                                        key={index}
                                        className="decoration-dot before:content-['-']"
                                    >
                                        Yes. Free to use for personal and
                                        commercial projects. No attribution
                                        required.
                                    </CollapsibleContent>
                                ))}
                            </Collapsible>
                        ))}
                        {user.uid === null ? (
                            <Collapsible>
                                <CollapsibleTrigger
                                    className={cn(
                                        `align-center flex w-full justify-between rounded-md border-2 p-2 text-lg font-bold animate-delay-100 `,
                                        hasLoaded && " animate-fade-right",
                                    )}
                                >
                                    <CircleUserRound /> Register / Login
                                    <ChevronDown />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="decoration-dot flex justify-center  text-xl">
                                    <Link
                                        href="/login"
                                        className=" flex items-center gap-2"
                                    >
                                        - Login
                                        <UnlockKeyhole />
                                    </Link>
                                </CollapsibleContent>
                                <CollapsibleContent className="decoration-dot flex justify-center  text-xl">
                                    <Link
                                        href="/register"
                                        className=" flex items-center gap-2 "
                                    >
                                        - Register
                                        <UnlockKeyhole />
                                    </Link>
                                </CollapsibleContent>
                            </Collapsible>
                        ) : (
                            <Collapsible>
                                <CollapsibleTrigger
                                    className={cn(
                                        `align-center flex w-full justify-between rounded-md border-2 p-2 text-lg font-bold animate-delay-100 `,
                                        hasLoaded && " animate-fade-right",
                                    )}
                                >
                                    <CircleUserRound /> Account
                                    <ChevronDown />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="decoration-dot gap-2">
                                    <Button
                                        onClick={logOut}
                                        className=" flex w-full items-center gap-2 text-xl font-normal"
                                        variant="ghost"
                                    >
                                        - Logout
                                        <LogOut />
                                    </Button>
                                </CollapsibleContent>
                                {user.role === "admin" && (
                                    <CollapsibleContent className="decoration-dot flex justify-center text-xl">
                                        <Link
                                            href="/register"
                                            className=" flex items-center gap-2"
                                        >
                                            - Admin
                                            <School />
                                        </Link>
                                    </CollapsibleContent>
                                )}
                            </Collapsible>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
            <div className="hidden w-full justify-end md:!flex">
                <Menubar className="border-none bg-blue-700">
                    <MenubarMenu>
                        <MenubarTrigger
                            onClick={() => {
                                router.push("/");
                            }}
                        >
                            Начало
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger
                            onClick={() => {
                                router.push("/");
                            }}
                            className="bg-blue-500 transition-colors hover:bg-blue-900"
                        >
                            Форма за кандидатстване
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Програми</MenubarTrigger>
                        <MenubarContent className="grid grid-flow-col grid-rows-5 divide-x">
                            {Array.from({ length: 50 }).map((_, index) => (
                                <MenubarItem key={index}>{index}</MenubarItem>
                            ))}
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <ScrollLink
                                to="news"
                                spy={true}
                                smooth={true}
                                duration={500}
                            >
                                Новини
                            </ScrollLink>
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>За нас</MenubarTrigger>
                        <MenubarContent className="grid grid-flow-col grid-rows-2 divide-x">
                        
                            <MenubarItem>
                            <ScrollLink
                                to="about"
                                spy={true}
                                smooth={true}
                                duration={500}
                            >
                                Мисия и Визия
                            </ScrollLink>
                            
                            </MenubarItem>
                            <MenubarItem>
                            <ScrollLink
                                to="select"
                                spy={true}
                                smooth={true}
                                duration={500}
                            >
                               Защо да изберете нас
                            </ScrollLink>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Контакти</MenubarTrigger>
                        <MenubarContent className="grid grid-flow-col grid-rows-4 divide-x">
                            <MenubarItem className="flex justify-center gap-2">
                                <Mail size={20} />

                                <div className="flex flex-col">
                                    <a
                                        href="mailto:privatetradeschool@gmail.com"
                                        className="cursor-pointer border-b-2 border-gray-500"
                                    >
                                        privatetradeschool@gmail.com
                                    </a>
                                    <a
                                        href="mailto:400070@edu.mon.bg"
                                        className="cursor-pointer"
                                    >
                                        400070@edu.mon.bg
                                    </a>
                                </div>
                            </MenubarItem>
                            <MenubarItem className="flex items-center gap-2">
                                <Map size={20} />
                                <Link
                                    href={
                                        "https://maps.app.goo.gl/PCDdCJbaF5vfMTY98"
                                    }
                                >
                                    ул. Преспа 1, Варна 9000
                                </Link>
                            </MenubarItem>
                            <MenubarItem className="flex gap-2">
                                <a
                                    href={"tel:0893344539"}
                                    className="flex cursor-pointer gap-1"
                                >
                                    <Phone size={20} />
                                    <p>+359 893 344 539</p>
                                </a>
                            </MenubarItem>
                            <MenubarItem className="flex items-center justify-evenly">
                                <Instagram />
                                <Link
                                    href={
                                        "https://www.facebook.com/privatetradeschool"
                                    }
                                >
                                    <Facebook />
                                </Link>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <CircleUserRound />
                        </MenubarTrigger>
                        <MenubarContent className="font-bold">
                            {user.uid ? (
                                <>
                                    {user.role === "admin" && (
                                        <MenubarItem
                                            className="flex justify-center gap-2"
                                            onClick={() =>
                                                router.push("/admin")
                                            }
                                        >
                                            <School size={20} /> Admin
                                        </MenubarItem>
                                    )}
                                    <MenubarItem
                                        className="flex justify-center gap-2"
                                        onClick={logOut}
                                    >
                                        Logout <LogOut size={20} />
                                    </MenubarItem>
                                </>
                            ) : (
                                <>
                                    <MenubarItem
                                        className="flex justify-center gap-2"
                                        onClick={() => router.push("/login")}
                                    >
                                        <UnlockKeyhole size={20} />
                                        Login
                                    </MenubarItem>
                                    <MenubarItem
                                        className="flex justify-center gap-2"
                                        onClick={() => router.push("/register")}
                                    >
                                        <LockKeyhole size={20} />
                                        Register
                                    </MenubarItem>
                                </>
                            )}
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </div>
    );
}
