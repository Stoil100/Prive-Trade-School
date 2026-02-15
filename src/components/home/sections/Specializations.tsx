"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { DollarSign, FileSearch, Landmark, Phone } from "lucide-react";
import { useMemo } from "react";

interface SpecializationsSectionProps {
    t: (key: string) => string;
}

export default function SpecializationsSection({
    t,
}: SpecializationsSectionProps) {
    const specializations = useMemo(
        () => [
            {
                type: t("types.customs"),
                image: "bg-[url('/home/specializations/customs.jpg')]",
                icon: (
                    <FileSearch
                        className="self-start rounded-full border-4 border-white p-1"
                        size={40}
                    />
                ),
                pdf: "https://firebasestorage.googleapis.com/v0/b/private-trade-school.appspot.com/o/pdfs%2Faccountant.PDF?alt=media&token=de3f1483-2c99-4701-a1a1-6174ec077ecb",
            },
            {
                type: t("types.banker"),
                image: "bg-[url('/home/specializations/banker.jpg')]",
                icon: (
                    <Landmark
                        className="self-start rounded-full border-4 border-white p-1"
                        size={40}
                    />
                ),
                pdf: "https://firebasestorage.googleapis.com/v0/b/private-trade-school.appspot.com/o/pdfs%2Fbanker.PDF?alt=media&token=1bf1e9da-a3b3-424f-b7ae-dc65ed2de0df",
            },
            {
                type: t("types.accountant"),
                image: "bg-[url('/home/specializations/accountant.jpg')]",
                icon: (
                    <DollarSign
                        className="self-start rounded-full border-4 border-white p-1"
                        size={40}
                    />
                ),
                pdf: "https://firebasestorage.googleapis.com/v0/b/private-trade-school.appspot.com/o/pdfs%2FborderAdmin.PDF?alt=media&token=7135de87-2cef-4eac-b96e-15c820558744",
            },
        ],
        [t],
    );

    return (
        <section className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-3 bg-linear-to-b from-slate-600 to-slate-950 p-2 sm:p-5">
            <h2 className="text-center text-3xl text-white sm:text-6xl">
                {t("title")}
            </h2>

            <div className="flex h-fit w-full flex-wrap items-center justify-center gap-10 px-4 py-3 sm:px-8">
                {specializations.map((item) => (
                    <div
                        key={item.pdf}
                        className="relative h-[450px] w-[350px] transition-transform duration-300 hover:scale-110"
                    >
                        <div
                            className={cn(
                                "absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl border-y-8 border-amber-400 bg-white bg-cover",
                                item.image,
                            )}
                        >
                            <div className="flex h-full w-full flex-col items-center justify-between bg-linear-to-t from-black/80 to-transparent p-2 text-white">
                                {item.icon}
                                <p className="text-center text-lg font-bold">
                                    {item.type}
                                </p>
                            </div>
                        </div>

                        <Link
                            className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl bg-black/40 p-4 text-center text-xl text-white opacity-0 transition-opacity hover:opacity-100"
                            href={item.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t("download")}
                        </Link>
                    </div>
                ))}
            </div>

            <p className="flex gap-2 text-slate-400">
                {t("info")}
                <span className="flex cursor-pointer gap-1 text-sky-400 underline underline-offset-2">
                    <Phone /> +359 893 344 538
                </span>
            </p>
        </section>
    );
}
