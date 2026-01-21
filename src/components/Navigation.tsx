"use client";

import React from "react";

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
    SheetClose,
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
    Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useAuth } from "./providers/auth";
import { Button } from "./ui/button";

// Extracted mobile menu item component
const MobileMenuItem = memo(
    ({
        hasLoaded,
        delay,
        children,
    }: {
        hasLoaded: boolean;
        delay: string;
        children: React.ReactNode;
    }) => (
        <Collapsible>
            <CollapsibleTrigger
                className={cn(
                    `align-center flex w-full justify-center rounded-md border-2 p-2 text-lg font-bold ${delay}`,
                    hasLoaded && "animate-fade-right",
                )}
            >
                {children}
            </CollapsibleTrigger>
        </Collapsible>
    ),
);
MobileMenuItem.displayName = "MobileMenuItem";

// Extracted scroll or link component
const ScrollOrLink = memo(
    ({
        pathname,
        to,
        children,
    }: {
        pathname: string;
        to: string;
        children: React.ReactNode;
    }) => {
        const isHomePage = pathname === "/";

        if (isHomePage) {
            return (
                <ScrollLink to={to} spy smooth duration={500}>
                    {children}
                </ScrollLink>
            );
        }

        return <Link href="/">{children}</Link>;
    },
);
ScrollOrLink.displayName = "ScrollOrLink";

export default function Navigation() {
    const router = useRouter();
    const pathname = usePathname();
    const navigationRef = useRef<HTMLDivElement>(null);
    const useScroll = useScrollListener();
    const [hasLoaded, setHasLoaded] = useState(false);
    const { user, logOut } = useAuth();
    const t = useTranslations("navigation");

    const isHomePage = pathname === "/";

    // Handle scroll behavior
    useEffect(() => {
        if (navigationRef.current) {
            navigationRef.current.style.top =
                useScroll.y > useScroll.lastY ? "-50%" : "0px";
        }
    }, [useScroll.lastY, useScroll.y]);

    // Update CSS variable for nav height
    useEffect(() => {
        const updateHeight = () => {
            if (navigationRef.current) {
                const height =
                    navigationRef.current.getBoundingClientRect().height;
                document.documentElement.style.setProperty(
                    "--nav-height",
                    `${height}px`,
                );
            }
        };

        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    // Memoized handlers
    const handleLogoClick = useCallback(() => {
        router.push("/");
    }, [router]);

    const handleSheetOpen = useCallback(() => {
        setHasLoaded(true);
    }, []);

    const handleSheetClose = useCallback(() => {
        setHasLoaded(false);
    }, []);

    // Memoized contact info
    const contactInfo = useMemo(
        () => ({
            email1: "privatetradeschool@gmail.com",
            email2: "400070@edu.mon.bg",
            phone: "0893344539",
            mapUrl: "https://maps.app.goo.gl/PCDdCJbaF5vfMTY98",
            facebookUrl: "https://www.facebook.com/privatetradeschool",
        }),
        [],
    );

    return (
        <div
            ref={navigationRef}
            className="sticky top-0 z-50 flex h-[70px] w-screen max-w-full items-center justify-between bg-blue-700 px-6 text-white shadow-xl transition-all duration-500"
        >
            <div
                className="h-full w-[60px] cursor-pointer bg-[url('/logo.png')] bg-contain bg-center bg-no-repeat"
                onClick={handleLogoClick}
                role="button"
                tabIndex={0}
                aria-label="Home"
            />

            {/* Mobile Menu */}
            <Sheet>
                <SheetTrigger className="md:hidden" onClick={handleSheetOpen}>
                    <Menu />
                </SheetTrigger>
                <SheetContent
                    side="left"
                    className="space-y-5 overflow-y-auto"
                    onCloseAutoFocus={handleSheetClose}
                >
                    <SheetHeader>
                        <SheetTitle className="flex justify-center">
                            <Link href="/">
                                <SheetClose asChild>
                                    <img
                                        src="/logo.png"
                                        alt="Logo"
                                        className="max-w-[80px]"
                                    />
                                </SheetClose>
                            </Link>
                        </SheetTitle>
                    </SheetHeader>

                    <div className="flex flex-col gap-2">
                        {/* News */}
                        <MobileMenuItem
                            hasLoaded={hasLoaded}
                            delay="animate-delay-1000"
                        >
                            <SheetClose asChild>
                                <ScrollOrLink pathname={pathname} to="news">
                                    {t("news")}
                                </ScrollOrLink>
                            </SheetClose>
                        </MobileMenuItem>

                        {/* Programs */}
                        <MobileMenuItem
                            hasLoaded={hasLoaded}
                            delay="animate-delay-700"
                        >
                            <SheetClose asChild>
                                <ScrollOrLink pathname={pathname} to="programs">
                                    {t("programs")}
                                </ScrollOrLink>
                            </SheetClose>
                        </MobileMenuItem>

                        {/* Projects */}
                        <MobileMenuItem
                            hasLoaded={hasLoaded}
                            delay="animate-delay-500"
                        >
                            <SheetClose asChild>
                                <Link href="/projects">{t("projects")}</Link>
                            </SheetClose>
                        </MobileMenuItem>

                        {/* About Us */}
                        <Collapsible>
                            <CollapsibleTrigger
                                className={cn(
                                    "align-center flex w-full justify-between rounded-md border-2 p-2 text-lg font-bold animate-delay-300",
                                    hasLoaded && "animate-fade-right",
                                )}
                            >
                                <Users />
                                {t("about_us")}
                                <ChevronDown />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="flex flex-col divide-y-2 p-2 text-center">
                                    <ScrollOrLink
                                        pathname={pathname}
                                        to="about"
                                    >
                                        <SheetClose>
                                            {t("mission_vision")}
                                        </SheetClose>
                                    </ScrollOrLink>
                                    <ScrollOrLink
                                        pathname={pathname}
                                        to="select"
                                    >
                                        <SheetClose>
                                            {t("why_choose_us")}
                                        </SheetClose>
                                    </ScrollOrLink>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>

                        {/* Contacts */}
                        <Collapsible>
                            <CollapsibleTrigger
                                className={cn(
                                    "align-center flex w-full justify-between rounded-md border-2 p-2 text-lg font-bold animate-delay-200",
                                    hasLoaded && "animate-fade-right",
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
                                        <a
                                            href={`mailto:${contactInfo.email1}`}
                                        >
                                            {t("email_1")}
                                        </a>
                                        <a
                                            href={`mailto:${contactInfo.email2}`}
                                        >
                                            {t("email_2")}
                                        </a>
                                    </div>
                                </div>
                                <a
                                    href={contactInfo.mapUrl}
                                    className="flex items-center justify-center gap-1 p-2"
                                >
                                    <Map />
                                    <p>{t("address")}</p>
                                </a>
                                <a
                                    href={`tel:${contactInfo.phone}`}
                                    className="flex items-center justify-center gap-1 p-2"
                                >
                                    <Phone />
                                    <p>{t("phone")}</p>
                                </a>
                            </CollapsibleContent>
                        </Collapsible>

                        {/* User Menu */}
                        {!user.uid ? (
                            <Collapsible>
                                <CollapsibleTrigger
                                    className={cn(
                                        "align-center flex w-full justify-between rounded-md border-2 p-2 text-lg font-bold animate-delay-100",
                                        hasLoaded && "animate-fade-right",
                                    )}
                                >
                                    <CircleUserRound />
                                    {t("registration_login")}
                                    <ChevronDown />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="decoration-dot flex justify-center text-xl">
                                    <Link
                                        href="/login"
                                        className="flex items-center gap-2"
                                    >
                                        - {t("login")}
                                        <UnlockKeyhole />
                                    </Link>
                                </CollapsibleContent>
                                <CollapsibleContent className="decoration-dot flex justify-center text-xl">
                                    <Link
                                        href="/register"
                                        className="flex items-center gap-2"
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
                                        "align-center flex w-full justify-between rounded-md border-2 p-2 text-lg font-bold animate-delay-100",
                                        hasLoaded && "animate-fade-right",
                                    )}
                                >
                                    <CircleUserRound /> {t("account")}
                                    <ChevronDown />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="decoration-dot gap-2">
                                    <Button
                                        onClick={logOut}
                                        className="flex w-full items-center gap-2 text-xl font-normal"
                                        variant="ghost"
                                    >
                                        - {t("logout")}
                                        <LogOut />
                                    </Button>
                                </CollapsibleContent>
                                {user.role === "admin" && (
                                    <CollapsibleContent className="decoration-dot flex justify-center text-xl">
                                        <Link
                                            href="/admin"
                                            className="flex items-center gap-2"
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

            {/* Desktop Menu */}
            <div className="hidden w-full justify-end text-sm md:!flex lg:text-base">
                <Menubar className="border-none bg-blue-700">
                    <MenubarMenu>
                        <MenubarTrigger onClick={handleLogoClick}>
                            {t("home")}
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger
                            onClick={handleLogoClick}
                            className="bg-blue-500 transition-colors hover:bg-blue-900"
                        >
                            {t("application_form")}
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger>
                            {isHomePage ? (
                                <ScrollLink
                                    to="programs"
                                    spy
                                    smooth
                                    duration={500}
                                >
                                    {t("programs")}
                                </ScrollLink>
                            ) : (
                                <Link href="/">{t("programs")}</Link>
                            )}
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger>
                            <Link href="/projects">{t("projects")}</Link>
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger>
                            {isHomePage ? (
                                <ScrollLink to="news" spy smooth duration={500}>
                                    {t("news")}
                                </ScrollLink>
                            ) : (
                                <Link href="/">{t("news")}</Link>
                            )}
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger>{t("about_us")}</MenubarTrigger>
                        <MenubarContent className="grid grid-flow-col grid-rows-2 divide-x">
                            <MenubarItem>
                                {isHomePage ? (
                                    <ScrollLink
                                        to="about"
                                        spy
                                        smooth
                                        duration={500}
                                    >
                                        {t("mission_vision")}
                                    </ScrollLink>
                                ) : (
                                    <Link href="/">{t("mission_vision")}</Link>
                                )}
                            </MenubarItem>
                            <MenubarItem>
                                {isHomePage ? (
                                    <ScrollLink
                                        to="select"
                                        spy
                                        smooth
                                        duration={500}
                                    >
                                        {t("why_choose_us")}
                                    </ScrollLink>
                                ) : (
                                    <Link href="/">{t("why_choose_us")}</Link>
                                )}
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
                                        href={`mailto:${contactInfo.email1}`}
                                        className="cursor-pointer border-b-2 border-gray-500"
                                    >
                                        {t("email_1")}
                                    </a>
                                    <a
                                        href={`mailto:${contactInfo.email2}`}
                                        className="cursor-pointer"
                                    >
                                        {t("email_2")}
                                    </a>
                                </div>
                            </MenubarItem>
                            <MenubarItem className="flex items-center gap-2">
                                <Map size={20} />
                                <Link href={contactInfo.mapUrl}>
                                    {t("address")}
                                </Link>
                            </MenubarItem>
                            <MenubarItem className="flex gap-2">
                                <a
                                    href={`tel:${contactInfo.phone}`}
                                    className="flex cursor-pointer gap-1"
                                >
                                    <Phone size={20} />
                                    <p>{t("phone")}</p>
                                </a>
                            </MenubarItem>
                            <MenubarItem className="flex items-center justify-evenly">
                                <Instagram />
                                <Link href={contactInfo.facebookUrl}>
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
                                            <School size={20} /> {t("admin")}
                                        </MenubarItem>
                                    )}
                                    <MenubarItem
                                        className="flex justify-center gap-2"
                                        onClick={logOut}
                                    >
                                        {t("logout")} <LogOut size={20} />
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
