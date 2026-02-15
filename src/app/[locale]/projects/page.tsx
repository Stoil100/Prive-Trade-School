"use client";
import { Separator } from "@/components/ui/separator";
import { db } from "@/firebase/config";
import { PostT } from "@/models/post";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<PostT[]>([]);
    const t = useTranslations("Pages.Projects");
    useEffect(() => {
        const q = query(collection(db, "projects"));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const docs: PostT[] = snapshot.docs.map((doc) => ({
                    ...(doc.data() as PostT),
                }));
                setProjects(docs);
            },
            (error) => {
                console.error("Error fetching documents: ", error);
            },
        );

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);
    return (
        <section className="bg-white p-6">
            <h1 className="mb-8 text-center text-6xl font-bold tracking-tight text-balance underline decoration-4">
                {t("title")}
            </h1>

            {projects.length === 0 ? (
                <div className="py-12 text-center">
                    <p className="text-muted-foreground">{t("notFound")}</p>
                </div>
            ) : (
                projects.map((project, index) => (
                    <div key={index} className="w-full">
                        <h2 className="text-xl font-bold">{project.title}</h2>
                        {project.titleDescriptions!.map((description) => (
                            <p
                                key={description.id}
                                className="text-md max-w-100 px-5 py-3"
                            >
                                {description.value}
                            </p>
                        ))}
                        <Separator className="my-8 bg-slate-700" />
                    </div>
                ))
            )}
        </section>
    );
}
