"use client";

import { useEffect, useState } from "react";

import { DocumentCard } from "@/components/documents/Card";
import { DocumentViewerDialog } from "@/components/documents/Viewer";
import LoadingOverlay from "@/components/Loading";
import { db } from "@/firebase/config";
import { DocumentT } from "@/models/document";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useTranslations } from "next-intl";

type DocType = "pdf" | "doc" | "docx";

function inferTypeFromNameOrContentType(
    name: string,
    contentType?: string,
): DocType {
    const lower = name.toLowerCase();

    if (contentType === "application/pdf" || lower.endsWith(".pdf"))
        return "pdf";
    if (contentType === "application/msword" || lower.endsWith(".doc"))
        return "doc";
    if (
        contentType ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        lower.endsWith(".docx")
    )
        return "docx";

    if (lower.endsWith(".docx")) return "docx";
    if (lower.endsWith(".doc")) return "doc";
    return "pdf";
}

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<DocumentT[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDocument, setSelectedDocument] = useState<DocumentT | null>(
        null,
    );
    const [dialogOpen, setDialogOpen] = useState(false);
    const t = useTranslations("Pages.Documents");

    function normalizeDocumentType(contentType?: string) {
        if (!contentType) return "other";

        if (contentType === "application/pdf") return "pdf";

        if (contentType.includes("word")) return "word";

        if (contentType.includes("spreadsheet")) return "excel";

        if (contentType.includes("presentation")) return "powerpoint";

        if (contentType === "text/plain") return "txt";

        if (contentType === "text/csv") return "csv";

        if (contentType.includes("zip")) return "zip";

        return "other";
    }

    useEffect(() => {
        let cancelled = false;

        const fetchDocuments = async () => {
            try {
                const q = query(
                    collection(db, "documents"),
                    orderBy("createdAt", "desc"),
                );

                const snapshot = await getDocs(q);

                const docs: DocumentT[] = snapshot.docs.map((doc) => {
                    const data = doc.data();

                    const normalizedType = normalizeDocumentType(data.fileType);

                    return {
                        id: doc.id,

                        title: data.title,
                        description: data.description ?? "",

                        size: data.fileSize ?? 0,
                        name: data.fileName ?? "",
                        url: data.fileUrl,

                        // 🔥 controlled type
                        type: normalizedType,

                        createdAt: data.createdAt?.toDate?.() ?? new Date(),
                    } as DocumentT;
                });

                if (!cancelled) setDocuments(docs);
            } catch (error) {
                console.error(
                    "[documents] Error fetching from Firestore:",
                    error,
                );
                if (!cancelled) setDocuments([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchDocuments();

        return () => {
            cancelled = true;
        };
    }, []);

    console.log(documents);
    const handleDocumentClick = (document: DocumentT) => {
        setSelectedDocument(document);
        setDialogOpen(true);
    };

    if (loading) return <LoadingOverlay />;

    return (
        <main className="min-h-screen-nav bg-background">
            <div className="container mx-auto px-4 py-12">
                <h1 className="mb-8 text-center text-6xl font-bold tracking-tight text-balance underline decoration-4">
                    {t("title")}
                </h1>

                {documents.length === 0 ? (
                    <div className="py-12 text-center">
                        <p className="text-muted-foreground">{t("notFound")}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {documents.map((document) => (
                            <DocumentCard
                                t={t}
                                key={document.id}
                                document={document}
                                onClick={() => handleDocumentClick(document)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <DocumentViewerDialog
                document={selectedDocument}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            />
        </main>
    );
}
