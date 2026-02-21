"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DocumentT } from "@/models/document";
import { FileIcon, FileText } from "lucide-react";

interface DocumentCardProps {
    t: (key: string) => string;
    document: DocumentT;
    onClick: () => void;
}

export function DocumentCard({ t, document, onClick }: DocumentCardProps) {
    const isPdf = document.type === "pdf";
    const Icon = isPdf ? FileText : FileIcon;
    return (
        <Card
            className="group cursor-pointer transition-shadow hover:shadow-lg"
            onClick={onClick}
        >
            <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                        <Icon className="text-primary h-6 w-6" />
                    </div>
                    <CardTitle className="line-clamp-2 flex-1 text-base leading-relaxed">
                        {document.title}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm">
                    {document.description ?? t("noDescription")}
                </p>
                <div className="text-muted-foreground flex items-center justify-between text-sm">
                    <span className="uppercase">{document.type}</span>
                    <span className="uppercase">
                        {(document.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                    <span>
                        {new Date(document.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:bg-primary/10 w-full"
                >
                    {t("view")}
                </Button>
            </CardFooter>
        </Card>
    );
}
