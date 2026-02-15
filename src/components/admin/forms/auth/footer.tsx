import MainButton from "@/components/MainButton";

export const Footer = ({
    isLoading,
    t,
}: {
    isLoading: boolean;
    t: (key: string, values?: Record<string, any>) => string;
}) => (
    <MainButton
        className="w-fit self-center"
        type="submit"
        disabled={isLoading}
    >
        {t("submit")}
    </MainButton>
);
