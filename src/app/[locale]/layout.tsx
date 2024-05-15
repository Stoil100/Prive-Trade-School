import type { Metadata } from "next";

import { Inter as FontSans } from "next/font/google";
import "./global.css"
import Favicon from "/public/favicon.ico";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import TopSocialMedia from "@/components/TopSocialMedia";
import { cn } from "@/lib/utils";
import {
    AuthContextProvider,
    ParallaxProviders,
} from "../../components/Providers";
export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});
import { NextIntlClientProvider, useMessages } from "next-intl";

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
                    <ParallaxProviders>{children}</ParallaxProviders>
                    <Footer />
                </AuthContextProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
