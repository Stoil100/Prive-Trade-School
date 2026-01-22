export const Header = ({
    variant,
    t,
}: {
    variant: "register" | "login";
    t: (arg: string) => string;
}) => (
    <>
        <h3 className="font-playfairDSC z-10 text-center text-4xl font-bold capitalize ">
            {variant === "register" ? t("headerRegister") : t("headerLogin")}
        </h3>
        <p className="w-full text-center">{t("usingSocialNetworks")}</p>
    </>
);
