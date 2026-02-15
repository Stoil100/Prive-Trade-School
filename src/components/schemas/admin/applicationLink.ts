import { z } from "zod";

export const applicationLinkSchema = (
    t: (key: string, values?: Record<string, any>) => string,
) =>
    z.object({
        link: z
            .url({ message: t("invalid") })
            .min(1, { message: t("required") }),
    });

export type ApplicationLinkFormValues = z.infer<
    ReturnType<typeof applicationLinkSchema>
>;
