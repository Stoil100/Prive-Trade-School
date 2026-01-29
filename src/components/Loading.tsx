import logo from "@/../public/logo.png";
import Image from "next/image";
export default function LoadingOverlay() {
    return (
        <div className="fixed inset-0 z-[9999] flex h-dvh items-center justify-center bg-gray-900">
            <div className="font-cormorant flex size-40 flex-col items-center justify-center text-center">
                <Image
                    src={logo}
                    alt="Konto Trade Logo"
                    className="size-20 h-auto animate-pulse"
                />
                <span className="mt-4 text-lg text-white">Loading...</span>
            </div>
            <div className="animate-ease absolute size-44 animate-spin animate-duration-[2000ms] md:size-56">
                <div className="absolute inset-0 rotate-180 rounded-full border-r-4 border-t-4 border-white border-opacity-70"></div>
            </div>
        </div>
    );
}
