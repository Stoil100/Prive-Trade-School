import type { Metadata } from "next";

import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import TopSocialMedia from "@/components/TopSocialMedia";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning className="scroll-smooth">
            <head />
            <body
                className={cn(
                    "box-border min-h-screen overflow-x-hidden bg-gray-900 font-montserrat antialiased max-w-screen scroll-smooth",
                )}
            >
                <TopSocialMedia />
                <Navigation />
                <Providers>{children}</Providers>
                <Footer />
            </body>
        </html>
    );
}
