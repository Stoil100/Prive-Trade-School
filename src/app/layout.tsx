import type { Metadata } from "next";

import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Favicon from '/public/favicon.ico';
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import TopSocialMedia from "@/components/TopSocialMedia";
import { cn } from "@/lib/utils";
import { AuthContextProvider, ParallaxProviders } from "../components/Providers";
export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Частна Търговска гимназия 'Конто Трейд'",
    description: "",
    icons: [{ rel: 'icon', url: Favicon.src }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                className={cn(
                    "min-h-screen w-screen max-w-full overflow-x-hidden scroll-smooth bg-gray-900 font-montserrat antialiased flex flex-col",
                )}
            >
                {" "}
                <AuthContextProvider>
                    <TopSocialMedia />
                    <Navigation />

                    <ParallaxProviders>{children}</ParallaxProviders>

                    <Footer />
                </AuthContextProvider>
            </body>
        </html>
    );
}