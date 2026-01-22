"use client";

import logo from "@/../public/logo.png";

import Image from "next/image";
import MainButton from "../MainButton";

type NoPermissionViewProps = {
    t: (key: string) => string;
    router: any;
    logOut: () => Promise<void>;
};

export default function NoPermissionView({
    t,
    router,
    logOut,
}: NoPermissionViewProps) {
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-4 p-2 md:p-4">
            <Image src={logo || "/favicon.ico"} alt="Logo" priority />
            <h2 className="max-w-md text-center text-5xl">{t("message")}</h2>
            <MainButton variant="transparent" onClick={logOut}>
                {t("logout")}
            </MainButton>
            <MainButton onClick={() => router.push("/")}>
                {t("goBack")}
            </MainButton>
        </div>
    );
}
