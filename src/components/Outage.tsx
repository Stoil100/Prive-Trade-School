import logo from "@/../public/logo.png";
import Image from "next/image";

export default function OutageOverlay() {
    return (
        <div className="fixed inset-0 z-9999 flex h-dvh items-center justify-center bg-gray-900">
            <div className="font-cormorant flex size-40 flex-col items-center justify-center text-center">
                <Image
                    src={logo}
                    alt="Konto Trade Logo"
                    className="size-20 h-auto animate-pulse"
                />
                <span className="mt-4 text-lg text-white">
                    The website is currently under development. Please come back
                    again later.
                </span>
            </div>
        </div>
    );
}
