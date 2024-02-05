import {
    AtSign,
    MapPin,
    PhoneCall,
    Search,
} from "lucide-react";

export default function TopSocialMedia() {
    return (
        <div className="flex md:h-[32px] text-xs flex-wrap items-center justify-around bg-white text-blue-500 p-2 text-center lg:w-screen lg:px-20 lg:py-2 gap-2">
            <a href="https://maps.app.goo.gl/PCDdCJbaF5vfMTY98" className="flex items-center gap-2">
                <MapPin size={15}/>
                <p>ул. „Преспа“ 1, 9000 Гръцки квартал, гр. Варна</p>
            </a>
            <a href="tel:0893344539" className="flex items-center gap-2">
                <PhoneCall size={15} />
                <p>+359 893 344 539</p>
            </a>
            <a href="mailto:privatetradeschool@gmail.com" className="flex items-center gap-2">
                <AtSign size={15} />
                <p>privatetradeschool@gmail.com</p>
            </a>
            <div className="flex items-center gap-3">
                <Search size={15}/>
                <p>EN</p>
                <p>BG</p>
            </div>
        </div>
    );
}
