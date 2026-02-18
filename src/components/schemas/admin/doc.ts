import { z } from "zod";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ACCEPTED_FILE_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const uploadDocSchema = (
    t: (key: string, values?: Record<string, any>) => string,
) =>
    z.object({
        title: z
            .string()
            .min(1, { message: t("title.required") })
            .max(100, { message: t("title.tooLong") }),
        description: z
            .string()
            .max(500, { message: t("description.tooLong") })
            .optional(),
        file: z
            .custom<FileList>()
            .refine((files) => files?.length === 1, {
                message: t("file.required"),
            })
            .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
                message: t("file.size"),
            })
            .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), {
                message: t("file.type"),
            }),
    });
export type UploadDocSchemaType = z.infer<ReturnType<typeof uploadDocSchema>>;
