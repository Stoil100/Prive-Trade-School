import MainButton from "@/components/MainButton";

export const Footer = ({
    isLoading,
    t,
}: {
    isLoading: boolean;
    t: (arg: string) => string;
}) => (
    <MainButton
        className="w-fit self-center"
        type="submit"
        disabled={isLoading}
    >
        {t("submit")}
    </MainButton>
);
