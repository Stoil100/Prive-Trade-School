import { UploadDocSchemaType } from "@/components/schemas/admin/doc";

export interface DocumentT extends UploadDocSchemaType {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
    createdAt: Date;
}
