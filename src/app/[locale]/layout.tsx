import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { ParallaxProvider } from "@/components/providers/parallax";
import TopSocialMedia from "@/components/TopSocialMedia";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "sonner";
import { AuthContextProvider } from "../../components/providers/auth";
import "./global.css";
import Favicon from "/public/favicon.ico";
export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Частна Търговска гимназия 'Конто Трейд'",
    description: "",
    icons: [{ rel: "icon", url: Favicon.src }],
};

export default function LocaleLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = useMessages();
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                className={cn(
                    "flex min-h-screen w-screen max-w-full flex-col overflow-x-hidden scroll-smooth bg-gray-900 font-montserrat antialiased",
                )}
            >
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <AuthContextProvider>
                        <TopSocialMedia />
                        <Navigation />
                        <ParallaxProvider>{children}</ParallaxProvider>
                        <Footer />
                        <Toaster />
                    </AuthContextProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
