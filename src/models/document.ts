import { UploadDocSchemaType } from "@/components/schemas/admin/doc";

export interface DocumentT extends UploadDocSchemaType {
    id: string;
    name: string;
    url: string;
    type: string;
    uploadedAt: Date;
}
