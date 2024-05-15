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
    SheetClose,
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
    Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "./Providers";
import { Button } from "./ui/button";
import { Link as ScrollLink } from "react-scroll";
import { useTranslations } from "next-intl";

export default function Navigation() {
    const router = useRouter();
    const pathname = usePathname();
    const navigationRef = useRef<HTMLDivElement>(null);
    const useScroll = useScrollListener();
    const [hasLoaded, setHasLoaded] = useState(false);
    const { user, logOut } = useAuth();
    const t = useTranslations("navigation");
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
                    className="space-y-5 overflow-y-auto"
                    onChange={() => {
                        setHasLoaded(false);
                    }}
                >
                    <SheetHeader>
                        <SheetTitle className="flex justify-center">
                            <Link href={"/"}>
                                <SheetClose asChild>
                                    <img
                                        src="/logo.png"
                                        className="max-w-[80px]"
                                    />
                                </SheetClose>
                            </Link>
                        </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-2">
                        <Collapsible>
                            <CollapsibleTrigger
                                className={cn(
                                    `align-center flex w-full justify-center rounded-md border-2 p-2 text-lg font-bold animate-delay-1000 `,
                                    hasLoaded && " animate-fade-right",
                                )}
                            >
                                <SheetClose asChild>
                                    {pathname === "/" ? (
                                        <ScrollLink
                                            to="news"
                                            spy={true}
                                            smooth={true}
                                            duration={500}
                                        >
                                            {t("news")}
                                        </ScrollLink>
                                    ) : (
                                        <Link href="/">{t("news")}</Link>
                                    )}
                                </SheetClose>
                            </CollapsibleTrigger>
                        </Collapsible>
                        <Collapsible>
                            <CollapsibleTrigger
                                className={cn(
                                    `align-center flex w-full justify-center rounded-md border-2 p-2 text-lg font-bold animate-delay-700 `,
                                    hasLoaded && " animate-fade-right",
                                )}
                            >
                                <SheetClose asChild>
                                    {pathname === "/" ? (
                                        <ScrollLink
                                            to="programs"
                                            spy={true}
                                            smooth={true}
                                            duration={500}
                                        >
                                            {t("programs")}
                                        </ScrollLink>
                                    ) : (
                                        <Link href="/">
                                            {t("programs")}
                                        </Link>
                                    )}
                                </SheetClose>
                            </CollapsibleTrigger>
                        </Collapsible>
                        <Collapsible>
                            <CollapsibleTrigger
                                className={cn(
                                    `align-center flex w-full justify-center rounded-md border-2 p-2 text-lg font-bold animate-delay-500 `,
                                    hasLoaded && " animate-fade-right",
                                )}
                            >
                                <SheetClose asChild>
                                    <Link href={"/projects"}>
                                        {t("projects")}
                                    </Link>
                                </SheetClose>
                            </CollapsibleTrigger>
                        </Collapsible>
                        <Collapsible>
                            <CollapsibleTrigger
                                className={cn(
                                    `align-center flex w-full justify-between rounded-md border-2 p-2 text-lg font-bold animate-delay-300 `,
                                    hasLoaded && " animate-fade-right",
                                )}
                            >
                                <Users />
                                {t("about_us")}
                                <ChevronDown />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="flex flex-col divide-y-2 p-2 text-center">
                                    {pathname === "/" ? (
                                        <ScrollLink
                                            to="about"
                                            spy={true}
                                            smooth={true}
                                            duration={500}
                                        >
                                            <SheetClose>
                                                {t("mission_vision")}
                                            </SheetClose>
                                        </ScrollLink>
                                    ) : (
                                        <Link href="/">
                                            <SheetClose>
                                                {t("mission_vision")}
                                            </SheetClose>
                                        </Link>
                                    )}
                                    {pathname === "/" ? (
                                        <ScrollLink
                                            to="select"
                                            spy={true}
                                            smooth={true}
                                            duration={500}
                                        >
                                            <SheetClose>
                                                {t("why_choose_us")}
                                            </SheetClose>
                                        </ScrollLink>
                                    ) : (
                                        <Link href="/">
                                            <SheetClose>
                                                {t("why_choose_us")}
                                            </SheetClose>
                                        </Link>
                                    )}
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                        <Collapsible>
                            <CollapsibleTrigger
                                className={cn(
                                    `align-center flex w-full justify-between rounded-md border-2 p-2 text-lg font-bold animate-delay-200 `,
                                    hasLoaded && " animate-fade-right",
                                )}
                            >
                                <Phone />
                                {t("contacts")}
                                <ChevronDown />
                            </CollapsibleTrigger>
                            <CollapsibleContent className="flex flex-col items-center justify-center">
                                <div className="flex items-center gap-2 p-2">
                                    <Mail />
                                    <div className="flex flex-col divide-y-2 text-xs">
                                        <a href="mailto:privatetradeschool@gmail.com">
                                            {t("email_1")}
                                        </a>
                                        <a href="mailto:400070@edu.mon.bg">
                                            {t("email_2")}
                                        </a>
                                    </div>
                                </div>
                                <a
                                    href={
                                        "https://maps.app.goo.gl/PCDdCJbaF5vfMTY98"
                                    }
                                    className="flex items-center justify-center gap-1 p-2"
                                >
                                    <Map />
                                    <p>{t("address")}</p>
                                </a>
                                <a
                                    href={"tel:0893344539"}
                                    className="flex items-center justify-center gap-1 p-2"
                                >
                                    <Phone />
                                    <p>{t("phone")}</p>
                                </a>
                            </CollapsibleContent>
                        </Collapsible>
                        {user.uid === null ? (
                            <Collapsible>
                                <CollapsibleTrigger
                                    className={cn(
                                        `align-center flex w-full justify-between rounded-md border-2 p-2 text-lg font-bold animate-delay-100`,
                                        hasLoaded && " animate-fade-right",
                                    )}
                                >
                                    <CircleUserRound />{" "}
                                    {t("registration_login")}
                                    <ChevronDown />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="decoration-dot flex justify-center text-xl">
                                    <Link
                                        href="/login"
                                        className=" flex items-center gap-2"
                                    >
                                        - {t("login")}
                                        <UnlockKeyhole />
                                    </Link>
                                </CollapsibleContent>
                                <CollapsibleContent className="decoration-dot flex justify-center text-xl">
                                    <Link
                                        href="/register"
                                        className=" flex items-center gap-2 "
                                    >
                                        - {t("register")}
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
                                    <CircleUserRound /> {t("account")}
                                    <ChevronDown />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="decoration-dot gap-2">
                                    <Button
                                        onClick={logOut}
                                        className=" flex w-full items-center gap-2 text-xl font-normal"
                                        variant="ghost"
                                    >
                                        - {t("logout")}
                                        <LogOut />
                                    </Button>
                                </CollapsibleContent>
                                {user.role === "admin" && (
                                    <CollapsibleContent className="decoration-dot flex justify-center text-xl">
                                        <Link
                                            href="/register"
                                            className=" flex items-center gap-2"
                                        >
                                            - {t("admin")}
                                            <School />
                                        </Link>
                                    </CollapsibleContent>
                                )}
                            </Collapsible>
                        )}
                    </div>
                </SheetContent>
            </Sheet>

            {/* End of mobile view */}

            <div className="hidden w-full justify-end text-sm md:!flex lg:text-base">
                <Menubar className="border-none bg-blue-700">
                    <MenubarMenu>
                        <MenubarTrigger onClick={() => router.push("/")}>
                            {t("home")}
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger
                            onClick={() => router.push("/")}
                            className="bg-blue-500 transition-colors hover:bg-blue-900"
                        >
                            {t("application_form")}
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <ScrollLink
                                to="programs"
                                spy={true}
                                smooth={true}
                                duration={500}
                            >
                                {t("programs")}
                            </ScrollLink>
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <Link href={"/projects"}>
                                {t("projects")}
                            </Link>
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <ScrollLink
                                to="news"
                                spy={true}
                                smooth={true}
                                duration={500}
                            >
                                {t("news")}
                            </ScrollLink>
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>{t("about_us")}</MenubarTrigger>
                        <MenubarContent className="grid grid-flow-col grid-rows-2 divide-x">
                            <MenubarItem>
                                <ScrollLink
                                    to="about"
                                    spy={true}
                                    smooth={true}
                                    duration={500}
                                >
                                    {t("mission_vision")}
                                </ScrollLink>
                            </MenubarItem>
                            <MenubarItem>
                                <ScrollLink
                                    to="select"
                                    spy={true}
                                    smooth={true}
                                    duration={500}
                                >
                                    {t("why_choose_us")}
                                </ScrollLink>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>{t("contacts")}</MenubarTrigger>
                        <MenubarContent className="grid grid-flow-col grid-rows-4 divide-x">
                            <MenubarItem className="flex justify-center gap-2">
                                <Mail size={20} />
                                <div className="flex flex-col">
                                    <a
                                        href="mailto:privatetradeschool@gmail.com"
                                        className="cursor-pointer border-b-2 border-gray-500"
                                    >
                                        {t("email_1")}
                                    </a>
                                    <a
                                        href="mailto:400070@edu.mon.bg"
                                        className="cursor-pointer"
                                    >
                                        {t("email_2")}
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
                                    {t("address")}
                                </Link>
                            </MenubarItem>
                            <MenubarItem className="flex gap-2">
                                <a
                                    href={"tel:0893344539"}
                                    className="flex cursor-pointer gap-1"
                                >
                                    <Phone size={20} />
                                    <p>{t("phone")}</p>
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
                                            <School size={20} />{" "}
                                            {t("admin")}
                                        </MenubarItem>
                                    )}
                                    <MenubarItem
                                        className="flex justify-center gap-2"
                                        onClick={logOut}
                                    >
                                        {t("logout")}{" "}
                                        <LogOut size={20} />
                                    </MenubarItem>
                                </>
                            ) : (
                                <>
                                    <MenubarItem
                                        className="flex justify-center gap-2"
                                        onClick={() => router.push("/login")}
                                    >
                                        <UnlockKeyhole size={20} />
                                        {t("login")}
                                    </MenubarItem>
                                    <MenubarItem
                                        className="flex justify-center gap-2"
                                        onClick={() => router.push("/register")}
                                    >
                                        <LockKeyhole size={20} />
                                        {t("register")}
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
