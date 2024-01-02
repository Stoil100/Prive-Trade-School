import React from "react";
import { AtSign, Facebook, Instagram, PhoneCall, Twitter } from "lucide-react";

export default function TopSocialMedia() {
    return (
        <div className="h-[32px] max-w-full items-center bg-gradient-to-r from-[#4576F7] to-[#0606cc] p-2 text-center text-white flex lg:w-screen justify-between lg:px-12 lg:py-2">
            <div className="flex flex-col items-start justify-center w-1/2 lg:w-1/4">
                <div className="flex gap-2 items-center">
                    <PhoneCall  size={15}/>
                    <p className="text-xs">+359 000 000 000</p>
                </div>
                <div className="flex gap-2 items-center">
                    <AtSign size={15}/>
                    <p className="text-xs">test@gmail.com</p>
                </div>
                <div></div>
            </div>
            <h5 className="hidden lg:block">Официален сайт на Часнта търговска гимназия - гр. Варна</h5>
            <div className="flex w-1/4 justify-end gap-3">
                <Facebook />
                <Instagram />
                <Twitter/>
            </div>
        </div>
    );
}
