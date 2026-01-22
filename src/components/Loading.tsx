import logo from "@/../public/logo.png";
import Image from "next/image";
export default function LoadingOverlay() {
    return (
        <div className="fixed inset-0 z-[9999] flex h-dvh items-center justify-center bg-white">
            <div className="font-cormorant text-green flex size-40 items-center justify-center text-center text-4xl md:text-5xl">
                Konto Trade
            </div>
            <div className="animate-ease absolute size-44 animate-spin animate-duration-[2000ms] md:size-56">
                <div className="border-green absolute inset-0 rotate-180 rounded-full border-r-4 border-t-4 border-opacity-70"></div>

                <div className="absolute left-1/2 top-0 flex -translate-x-1/2 transform items-center justify-center">
                    <Image
                        src={logo}
                        alt="Konto Trade Logo"
                        className="w-1/3 -translate-y-1/2 animate-pulse"
                    />
                </div>
            </div>
        </div>
    );
}
