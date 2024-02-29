"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
export default function Page({ params }: { params: { id: string } }) {
    const [content, setContent] = useState<any>();
    useEffect(() => {
        const fetchUploadedContent = async () => {
            const docRef = doc(db, "headers", params.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setContent({ id: params.id, ...docSnap.data() });
            }
        };
        fetchUploadedContent();
    }, []);
    
    return (
        <section className="flex flex-col bg-white p-3 md:p-6">
            {content && (
                <>
                    <header className="mb-4 text-center space-y-1">
                        <h1 className="text-4xl md:text-7xl font-bold underline decoration-4">
                            {content.title!}
                        </h1>
                        <h3 className="text-2xl md:text-3xl">{content.titleDesc!}</h3>
                    </header>
                    <img
                        src={content.image!}
                        alt="headers image"
                        className="w-full"
                    />
                    {content.descriptions!.map((item: any, index: number) => (
                        <div key={index} className="px-2 md:px-4 space-y-4">
                            <h4 className="text-2xl md:text-3xl font-bold">
                                {item.descTitle!}
                            </h4>
                            <p className="text-md md:text-xl px-2">{item.description!}</p>
                        </div>
                    ))}
                    {content.tables!.map((item: any, index: number) => (
                        <div key={index} className="p-2 md:p-4">
                            <h5 className="text-3xl">{item.tableTitle!}</h5>
                            <ul className="list-decimal px-6 md:px-10 py-2 text-lg">
                                {item.tableItems &&
                                    item.tableItems!.map(
                                        (desc: string, index: number) => (
                                            <li key={index}>{desc}</li>
                                        ),
                                    )}
                            </ul>
                        </div>
                    ))}
                    <footer>{content.footer!}</footer>
                </>
            )}
        </section>
    );
}
