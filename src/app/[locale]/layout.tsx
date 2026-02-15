import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import OutageOverlay from "@/components/Outage";
import { ParallaxProvider } from "@/components/providers/parallax";
import TopBar from "@/components/TopBar";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter as FontSans, Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { AuthContextProvider } from "../../components/providers/auth";

export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Частна Търговска гимназия 'Конто Трейд'",
    description: "",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
    const messages = await getMessages();
    const outage = true;

    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale} suppressHydrationWarning>
            <head />
            <body
                className={cn(
                    `${geistSans.variable} ${geistMono.variable} font-montserrat flex min-h-screen w-screen max-w-full flex-col overflow-x-hidden scroll-smooth bg-gray-900 antialiased`,
                )}
            >
                {outage ? (
                    <OutageOverlay />
                ) : (
                    <NextIntlClientProvider messages={messages} locale={locale}>
                        <AuthContextProvider>
                            <TopBar />
                            <Navigation />
                            <ParallaxProvider>{children}</ParallaxProvider>
                            <Footer />
                            <Toaster />
                        </AuthContextProvider>
                    </NextIntlClientProvider>
                )}
            </body>
        </html>
    );
}
