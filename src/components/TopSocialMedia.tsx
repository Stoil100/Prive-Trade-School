import React from "react";
import {
    AtSign,
    MapPin,
    PhoneCall,
    Search,
} from "lucide-react";

export default function TopSocialMedia() {
    return (
        <div className="flex md:h-[32px] text-xs flex-wrap items-center justify-around bg-white text-blue-500 p-2 text-center lg:w-screen lg:px-20 lg:py-2 gap-2">
            <div className="flex items-center gap-2">
                <MapPin size={15}/>
                <p>ул. „Преспа“ 1, 9000 Гръцки квартал, гр. Варна</p>
            </div>
            <div className="flex items-center gap-2">
                <PhoneCall size={15} />
                <p>+359 000 000 000</p>
            </div>
            <div className="flex items-center gap-2">
                <AtSign size={15} />
                <p>test@gmail.com</p>
            </div>
            <div className="flex items-center gap-3">
                <Search size={15}/>
                <p>EN</p>
                <p>BG</p>
            </div>
        </div>
    );
}
