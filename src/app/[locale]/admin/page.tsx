"use client";

import { useAuth } from "@/components/Providers";
import { redirect } from "next/navigation";
import {
    useLayoutEffect
} from "react";

import HeadersAdmin from "@/components/schemas/headersScheme";
import NewsAdmin from "@/components/schemas/newsScheme";
import ProjectsAdmin from "@/components/schemas/projectsScheme";


export default function Admin() {
    const { user, loading } = useAuth();

    useLayoutEffect(() => {
        if (user.role !== "admin" && !loading) {
            redirect("/");
        }
    }, [user, loading]);

    return (
        <section className="flex flex-col bg-white p-2">
            <HeadersAdmin />
            <NewsAdmin />
            <ProjectsAdmin/>
        </section>
    );
}
