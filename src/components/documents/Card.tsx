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
    document: DocumentT;
    onClick: () => void;
}

export function DocumentCard({ document, onClick }: DocumentCardProps) {
    const isPdf = document.type === "pdf";
    const Icon = isPdf ? FileText : FileIcon;

    return (
        <Card
            className="group cursor-pointer transition-shadow hover:shadow-lg"
            onClick={onClick}
        >
            <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="line-clamp-2 flex-1 text-base leading-relaxed">
                        {document.name}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="uppercase">{document.type}</span>
                    <span>
                        {new Date(document.uploadedAt).toLocaleDateString()}
                    </span>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full group-hover:bg-primary/10"
                >
                    View Document
                </Button>
            </CardFooter>
        </Card>
    );
}
