import MainButton from "@/components/MainButton";
import { Icons } from "@/components/ui/icons";
import { Facebook } from "lucide-react";

export const Socials = ({
    googleLogin,
    facebookLogin,
    isLoading,
    t,
}: {
    googleLogin: () => void;
    facebookLogin: () => void;
    isLoading: boolean;
    t: (arg: string) => string;
}) => (
    <>
        <div className="flex gap-3">
            <MainButton
                className="size-[50px]"
                onClick={googleLogin}
                disabled={isLoading}
                type="button"
            >
                <Icons.google />
            </MainButton>
            <MainButton
                className="size-[50px]"
                onClick={facebookLogin}
                disabled={isLoading}
                type="button"
            >
                <Facebook />
            </MainButton>
        </div>
        <div className="flex w-full items-center">
            <div className="w-full border-t-2 border-gray-300" />
            <p className="w-full text-center">{t("orWith")}</p>
            <div className="h-1 w-full border-t-2 border-gray-300" />
        </div>
    </>
);
