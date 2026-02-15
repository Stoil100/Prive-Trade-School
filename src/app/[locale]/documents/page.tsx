"use client";

import {
    getDownloadURL,
    getMetadata,
    listAll,
    ref,
    type FullMetadata,
} from "firebase/storage";
import { useEffect, useState } from "react";

import { DocumentCard } from "@/components/documents/Card";
import { DocumentViewerDialog } from "@/components/documents/Viewer";
import LoadingOverlay from "@/components/Loading";
import { storage } from "@/firebase/config";
import { DocumentT } from "@/models/document";
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

    useEffect(() => {
        let cancelled = false;

        const fetchDocuments = async () => {
            try {
                const folderRef = ref(storage, "documents");
                const res = await listAll(folderRef);

                const docs = await Promise.all(
                    res.items.map(async (itemRef) => {
                        const [url, meta]: [string, FullMetadata] =
                            await Promise.all([
                                getDownloadURL(itemRef),
                                getMetadata(itemRef),
                            ]);

                        const uploadedAt = meta.timeCreated
                            ? new Date(meta.timeCreated)
                            : new Date();
                        const type = inferTypeFromNameOrContentType(
                            meta.name,
                            meta.contentType,
                        );

                        // Build a DocumentT that won't break UI expecting title/description/name/type/url/uploadedAt
                        const doc: DocumentT = {
                            // Prefer a stable id. fullPath is stable for storage objects.
                            id: itemRef.fullPath,

                            // Common fields used across your UI:
                            name: meta.name,
                            url,
                            type,
                            uploadedAt,

                            // Safe defaults if your UI expects them:
                            title: meta.name, // or strip extension if you want
                            description: "",

                            // Optional but useful:
                            size:
                                typeof meta.size === "number"
                                    ? meta.size
                                    : undefined,
                            storagePath: itemRef.fullPath,
                        } as unknown as DocumentT;

                        return doc;
                    }),
                );

                docs.sort(
                    (a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime(),
                );

                if (!cancelled) setDocuments(docs);
            } catch (error) {
                console.error(
                    "[documents] Error fetching documents from Storage:",
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
