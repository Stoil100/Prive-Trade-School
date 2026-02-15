import { z } from "zod";

export const postSchema = (t: (arg: string) => string) =>
    z.object({
        heroImage: z.string().url(t("heroImage.url")).optional(),
        title: z.string().min(1, t("title.required")),
        titleDescriptions: z
            .array(
                z.object({
                    id: z.number(),
                    value: z
                        .string()
                        .min(1, t("titleDescriptions.value.required")),
                }),
            )
            .optional(),
        descriptions: z
            .array(
                z.object({
                    id: z.number(),
                    value: z.string().min(1, t("descriptions.value.required")),
                }),
            )
            .optional(),
        lists: z
            .array(
                z.object({
                    title: z.string().optional(),
                    items: z
                        .array(
                            z.object({
                                id: z.number(),
                                value: z
                                    .string()
                                    .min(1, t("lists.items.value.required")),
                            }),
                        )
                        .min(1, t("lists.items.min")),
                }),
            )
            .optional(),
        docs: z
            .array(
                z.object({
                    title: z.string().min(1, t("docs.title.required")),
                    images: z
                        .array(
                            z.object({
                                id: z.number(),
                                value: z.url(t("docs.images.value.url")),
                            }),
                        )
                        .optional(),
                    texts: z
                        .array(
                            z.union([
                                z.object({
                                    id: z.number(),
                                    value: z
                                        .string()
                                        .min(1, t("docs.texts.value.required")),
                                }),
                                z.object({
                                    title: z.string().optional(),
                                    listItems: z
                                        .array(
                                            z.object({
                                                id: z.number(),
                                                value: z
                                                    .string()
                                                    .min(
                                                        1,
                                                        t(
                                                            "docs.texts.listItems.value.required",
                                                        ),
                                                    ),
                                            }),
                                        )
                                        .min(1, t("docs.texts.listItems.min")),
                                }),
                            ]),
                        )
                        .optional(),
                }),
            )
            .optional(),
    });
export type PostSchemaType = z.infer<ReturnType<typeof postSchema>>;
