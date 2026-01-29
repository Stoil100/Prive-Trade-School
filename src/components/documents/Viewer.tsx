"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DocumentT } from "@/models/document";

interface DocumentViewerDialogProps {
    document: DocumentT | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DocumentViewerDialog({
    document,
    open,
    onOpenChange,
}: DocumentViewerDialogProps) {
    if (!document) return null;

    const isPdf = document.type === "pdf";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex h-[90vh] max-w-4xl flex-col">
                <DialogHeader>
                    <DialogTitle className="text-pretty">
                        {document.name}
                    </DialogTitle>
                </DialogHeader>
                <ScrollArea className="w-full flex-1">
                    {isPdf ? (
                        <iframe
                            src={document.url}
                            className="h-[calc(90vh-100px)] w-full border-0"
                            title={document.name}
                        />
                    ) : (
                        <div className="h-full w-full">
                            <iframe
                                src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                                    document.url,
                                )}&embedded=true`}
                                className="h-[calc(90vh-100px)] w-full border-0"
                                title={document.name}
                            />
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
