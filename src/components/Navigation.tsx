"use client";

import React from "react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { db } from "@/firebase/config";
import useScrollListener from "@/hooks/useScroll";
import { cn } from "@/lib/utils";
import { doc, getDoc } from "firebase/firestore";
import {
    ChevronDown,
    Facebook,
    Instagram,
    Mail,
    Map,
    Menu,
    Phone,
    School,
    Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useAuth } from "./providers/auth";

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
    const { user } = useAuth();
    const [applicationLink, setApplicationLink] = useState<string | null>(null);
    const t = useTranslations("Common.Navigation");

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

    useEffect(() => {
        const fetchLink = async () => {
            try {
                const docRef = doc(db, "links", "application-link");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setApplicationLink(data.link || null);
                } else {
                    setApplicationLink(null);
                }
            } catch (error) {
                console.error("Error fetching link:", error);
            }
        };

        fetchLink();
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
            className="sticky top-0 z-50 flex h-17.5 w-screen max-w-full items-center justify-between bg-blue-700 px-6 text-white shadow-xl transition-all duration-500"
        >
            <div
                className="h-full w-15 cursor-pointer bg-[url('/logo.png')] bg-contain bg-center bg-no-repeat"
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
                                        className="max-w-20"
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

                        {/* Projects */}
                        <MobileMenuItem
                            hasLoaded={hasLoaded}
                            delay="animate-delay-500"
                        >
                            <SheetClose asChild>
                                <Link href="/projects">{t("projects")}</Link>
                            </SheetClose>
                        </MobileMenuItem>
                        {user.role === "admin" && (
                            <MobileMenuItem
                                hasLoaded={hasLoaded}
                                delay="animate-delay-300"
                            >
                                <Link
                                    className="mx-2 flex justify-center gap-2 self-center"
                                    href={"/admin"}
                                >
                                    {t("admin")}
                                </Link>
                            </MobileMenuItem>
                        )}

                        {/* Programs */}
                        <MobileMenuItem
                            hasLoaded={hasLoaded}
                            delay="animate-delay-700"
                        >
                            <SheetClose asChild>
                                <Link href="/documents">{t("documents")}</Link>
                            </SheetClose>
                        </MobileMenuItem>

                        {/* About Us */}
                        <Collapsible>
                            <CollapsibleTrigger
                                className={cn(
                                    "align-center animate-delay-300 flex w-full justify-between rounded-md border-2 p-2 text-lg font-bold",
                                    hasLoaded && "animate-fade-right",
                                )}
                            >
                                <Users />
                                {t("aboutUs")}
                                <ChevronDown />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="flex flex-col divide-y-2 p-2 text-center">
                                    <ScrollOrLink
                                        pathname={pathname}
                                        to="about"
                                    >
                                        <SheetClose>
                                            {t("missionVision")}
                                        </SheetClose>
                                    </ScrollOrLink>
                                    <ScrollOrLink
                                        pathname={pathname}
                                        to="select"
                                    >
                                        <SheetClose>
                                            {t("whyChooseUs")}
                                        </SheetClose>
                                    </ScrollOrLink>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>

                        {/* Contacts */}
                        <Collapsible>
                            <CollapsibleTrigger
                                className={cn(
                                    "align-center animate-delay-200 flex w-full justify-between rounded-md border-2 p-2 text-lg font-bold",
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
                                            privatetradeschool@gmail.com
                                        </a>
                                        <a
                                            href={`mailto:${contactInfo.email2}`}
                                        >
                                            400070@edu.mon.bg
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
                                    <p>+359 893 344 539</p>
                                </a>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Desktop Menu */}
            <nav className="hidden w-full justify-end text-sm md:flex md:items-center md:gap-2 lg:text-base">
                <Link
                    href="/"
                    className="rounded px-4 py-2 transition-colors hover:bg-blue-900"
                >
                    {t("home")}
                </Link>

                <Link
                    href={applicationLink || "#"}
                    className="rounded bg-blue-500 px-4 py-2 transition-colors hover:bg-blue-900"
                >
                    {t("applicationForm")}
                </Link>

                <Link
                    href="/projects"
                    className="rounded px-4 py-2 transition-colors hover:bg-blue-900"
                >
                    {t("projects")}
                </Link>

                <Link
                    href="/documents"
                    className="rounded px-4 py-2 transition-colors hover:bg-blue-900"
                >
                    {t("documents")}
                </Link>

                {isHomePage ? (
                    <ScrollLink
                        to="news"
                        spy
                        smooth
                        duration={500}
                        className="block cursor-pointer rounded px-4 py-2 transition-colors hover:bg-blue-900"
                    >
                        {t("news")}
                    </ScrollLink>
                ) : (
                    <Link
                        href="/"
                        className="rounded px-4 py-2 transition-colors hover:bg-blue-900"
                    >
                        {t("news")}
                    </Link>
                )}

                {/* About Us Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 rounded px-4 py-2 transition-colors hover:bg-blue-900">
                        {t("aboutUs")}
                        <ChevronDown size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            {isHomePage ? (
                                <ScrollLink
                                    to="about"
                                    spy
                                    smooth
                                    duration={500}
                                >
                                    {t("missionVision")}
                                </ScrollLink>
                            ) : (
                                <Link href="/">{t("missionVision")}</Link>
                            )}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            {isHomePage ? (
                                <ScrollLink
                                    to="select"
                                    spy
                                    smooth
                                    duration={500}
                                >
                                    {t("whyChooseUs")}
                                </ScrollLink>
                            ) : (
                                <Link href="/">{t("whyChooseUs")}</Link>
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Contacts Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 rounded px-4 py-2 transition-colors hover:bg-blue-900">
                        {t("contacts")}
                        <ChevronDown size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64">
                        <DropdownMenuItem className="flex items-center gap-2">
                            <Mail size={20} />
                            <div className="flex flex-col text-xs">
                                <a href={`mailto:${contactInfo.email1}`}>
                                    privatetradeschool@gmail.com
                                </a>
                                <a href={`mailto:${contactInfo.email2}`}>
                                    400070@edu.mon.bg
                                </a>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                            <Map size={20} />
                            <Link href={contactInfo.mapUrl}>
                                {t("address")}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <a
                                href={`tel:${contactInfo.phone}`}
                                className="flex items-center gap-2"
                            >
                                <Phone size={20} />
                                <p>+359 893 344 539</p>
                            </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center justify-evenly gap-2">
                            <Instagram size={20} />
                            <Link href={contactInfo.facebookUrl}>
                                <Facebook size={20} />
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {user.role === "admin" && (
                    <Link
                        className="flex items-center gap-2 rounded px-4 py-2 transition-colors hover:bg-blue-900"
                        href={"/admin"}
                    >
                        <School size={20} />
                    </Link>
                )}
            </nav>
        </div>
    );
}
