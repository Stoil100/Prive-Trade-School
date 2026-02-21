"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { db, storage } from "@/firebase/config";
import { DocumentT } from "@/models/document";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import {
    AlertTriangle,
    ExternalLink,
    FileText,
    Loader2,
    Search,
    Trash2,
} from "lucide-react";
import { Suspense, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import LoadingOverlay from "../../Loading";

interface DocumentPreviewProps {
    t: (key: string, values?: Record<string, any>) => string;
}

export default function DocumentPreview({ t }: DocumentPreviewProps) {
    const [documents, setDocuments] = useState<DocumentT[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [documentToDelete, setDocumentToDelete] = useState<DocumentT | null>(
        null,
    );
    const [deleting, setDeleting] = useState(false);

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
        const q = query(
            collection(db, "documents"),
            orderBy("uploadedAt", "desc"),
        );
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const docs: DocumentT[] = snapshot.docs.map((docSnapshot) => {
                    const data = docSnapshot.data() as any;

                    const normalizedType = normalizeDocumentType(data.fileType);

                    return {
                        id: data.id,

                        title: data.title,
                        description: data.description ?? "",
                        file: undefined as any,

                        size: data.fileSize ?? 0,
                        name: data.fileName ?? "",
                        url: data.fileUrl,
                        type: normalizedType,
                        createdAt: data.createdAt?.toDate?.() ?? new Date(),
                    } as DocumentT;
                });

                setDocuments(docs);
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching documents:", error);
                toast.error("Failed to load documents");
                setLoading(false);
            },
        );

        return () => unsubscribe();
    }, []);

    const filteredDocuments = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return documents;

        return documents.filter((d) => {
            const titleMatch = (d.title ?? "").toLowerCase().includes(q);
            const descMatch = (d.description ?? "").toLowerCase().includes(q);
            const nameMatch = (d.name ?? "").toLowerCase().includes(q);
            return titleMatch || descMatch || nameMatch;
        });
    }, [documents, searchQuery]);

    const handleDeleteClick = (document: DocumentT) => {
        setDocumentToDelete(document);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!documentToDelete) return;

        setDeleting(true);
        try {
            // IMPORTANT: if `documentToDelete.url` is a Firebase download URL, use refFromURL
            const fileRef = ref(storage, documentToDelete.url);
            await deleteObject(fileRef);

            toast.success(t("successDelete"));
            setDeleteDialogOpen(false);
            setDocumentToDelete(null);
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete document");
        } finally {
            setDeleting(false);
        }
    };

    const formatBytes = (bytes?: number) => {
        if (typeof bytes !== "number" || !Number.isFinite(bytes))
            return "Unknown";
        const mb = bytes / 1024 / 1024;
        if (mb >= 1) return `${mb.toFixed(2)} MB`;
        const kb = bytes / 1024;
        return `${kb.toFixed(0)} KB`;
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getFileTypeBadge = (fileType?: string) => {
        const ft = (fileType ?? "").toLowerCase();
        if (!ft) return <Badge variant="outline">Unknown</Badge>;
        if (ft.includes("pdf")) return <Badge variant="default">PDF</Badge>;
        if (
            ft.includes("word") ||
            ft.includes("document") ||
            ft.includes("doc")
        )
            return <Badge variant="secondary">DOC</Badge>;

        // e.g. "application/vnd.ms-excel" => EXCEL, "image/png" => PNG
        const tail = ft.split("/")[1]?.toUpperCase();
        return <Badge variant="outline">{tail || ft.toUpperCase()}</Badge>;
    };

    if (loading) {
        return <LoadingOverlay />;
    }

    return (
        <div className="bg-background">
            <div className="mx-auto px-4 py-8 md:container">
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold tracking-tight text-balance">
                        {t("title.docs")}
                    </h1>
                    <p className="text-muted-foreground text-pretty">
                        {t("view.docs")}
                    </p>
                </div>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>{t("filter.search.title")}</CardTitle>
                        <CardDescription>
                            {t("filter.search.description")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <Input
                                placeholder={t("filter.search.placeholder")}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>{t("filter.all.title")}</CardTitle>
                                <CardDescription>
                                    {filteredDocuments.length} document
                                    {filteredDocuments.length !== 1
                                        ? "s"
                                        : ""}{" "}
                                    found
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        {filteredDocuments.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <FileText className="text-muted-foreground mb-4 h-12 w-12" />
                                <p className="text-lg font-medium">
                                    {t("filter.noDocsFound")}
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    {searchQuery
                                        ? "Try adjusting your search"
                                        : "Upload documents to get started"}
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>
                                                {t("filter.all.table.title")}
                                            </TableHead>
                                            <TableHead>
                                                {t("filter.all.table.file")}
                                            </TableHead>
                                            <TableHead>
                                                {t("filter.all.table.type")}
                                            </TableHead>
                                            <TableHead>
                                                {t("filter.all.table.size")}
                                            </TableHead>
                                            <TableHead>
                                                {t("filter.all.table.uploaded")}
                                            </TableHead>
                                            <TableHead className="text-right">
                                                {t(
                                                    "filter.all.table.actions.title",
                                                )}
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {filteredDocuments.map((document) => (
                                            <TableRow key={document.id}>
                                                <TableCell>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-medium">
                                                            {document.title}
                                                        </span>
                                                        {document.description ? (
                                                            <span className="text-muted-foreground line-clamp-1 text-xs">
                                                                {
                                                                    document.description
                                                                }
                                                            </span>
                                                        ) : null}
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="text-muted-foreground h-4 w-4" />
                                                        <span className="text-sm">
                                                            {document.name ||
                                                                "Unknown"}
                                                        </span>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    {getFileTypeBadge(
                                                        (document as any).type,
                                                    )}
                                                </TableCell>

                                                <TableCell className="text-muted-foreground text-sm">
                                                    {formatBytes(
                                                        (document as any).size,
                                                    )}
                                                </TableCell>

                                                <TableCell className="text-muted-foreground text-sm">
                                                    {formatDate(
                                                        document.createdAt,
                                                    )}
                                                </TableCell>

                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                window.open(
                                                                    document.url,
                                                                    "_blank",
                                                                )
                                                            }
                                                        >
                                                            <ExternalLink className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleDeleteClick(
                                                                    document,
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Suspense fallback={<LoadingOverlay />}>
                <AlertDialog
                    open={deleteDialogOpen}
                    onOpenChange={setDeleteDialogOpen}
                >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <div className="flex items-center gap-2">
                                <div className="bg-destructive/10 flex h-10 w-10 items-center justify-center rounded-full">
                                    <AlertTriangle className="text-destructive h-5 w-5" />
                                </div>
                                <AlertDialogTitle>
                                    {t("table.actions.delete")}
                                </AlertDialogTitle>
                            </div>
                            <AlertDialogDescription className="text-pretty">
                                {t("table.alert.deleteMessage", {
                                    title: documentToDelete?.title!,
                                })}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={deleting}>
                                {t("table.actions.cancel")}
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDeleteConfirm}
                                disabled={deleting}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                {deleting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {t("table.actions.deleting")}
                                    </>
                                ) : (
                                    t("table.actions.delete")
                                )}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </Suspense>
        </div>
    );
}
