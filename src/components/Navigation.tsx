"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import {
    ArrowDown,
    ChevronDown,
    Facebook,
    Instagram,
    Map,
    Menu,
    Phone,
    Twitter,
} from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import useVisibility from "@/hooks/useVisibility";
import { cn } from "@/lib/utils";

export default function Navigation() {
    const mobileNavMenuRef = useRef(null);
    const isMobileNavMenuVisible = useVisibility(mobileNavMenuRef.current!);

    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(() => {
        mobileNavMenuRef.current && setHasLoaded(true);
    }, [mobileNavMenuRef]);

    return (
        <div className="sticky top-0 z-50 flex h-[60px] w-screen max-w-full items-center justify-between bg-white px-6 shadow-xl">
            <div className="mr-5">LOGO</div>
            <Sheet>
                <SheetTrigger onClick={()=>{setHasLoaded(true)}}>
                    <Menu />
                </SheetTrigger>
                <SheetContent
                    side="left"
                    className="overflow-y-auto"
                    onChange={()=>{setHasLoaded(false)}}
                >
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <div  className="flex flex-col gap-2">
                        {[200,300,500,700,1000].map((item, index) => (
                            <Collapsible key={index}>
                                <CollapsibleTrigger className={cn(`align-center flex w-full justify-between rounded-md border-2 p-2 text-lg font-bold animate-delay-${item} `,hasLoaded&&" animate-fade-right")}>
                                    Can I use this in my project?
                                    <ChevronDown />
                                </CollapsibleTrigger>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <CollapsibleContent key={index} className="decoration-dot before:content-['-']">
                                        Yes. Free to use for personal and
                                        commercial projects. No attribution
                                        required.
                                    </CollapsibleContent>
                                ))}
                            </Collapsible>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
            <div className="hidden w-full justify-end md:flex">
                <Menubar className="border-none">
                    <MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger>Начало</MenubarTrigger>
                        </MenubarMenu>
                        <MenubarTrigger>Програми</MenubarTrigger>
                        <MenubarContent className="grid grid-flow-col grid-rows-5 divide-x">
                            {Array.from({ length: 50 }).map((_, index) => (
                                <MenubarItem key={index}>{index}</MenubarItem>
                            ))}
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Новини</MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>За нас</MenubarTrigger>
                        <MenubarContent className="grid grid-flow-col grid-rows-4 divide-x">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <MenubarItem key={index}>{index}</MenubarItem>
                            ))}
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Контакти</MenubarTrigger>
                        <MenubarContent className="grid grid-flow-col grid-rows-3 divide-x">
                            <MenubarItem className="flex items-center gap-2">
                                <Map size={20} />
                                <p>ул. Преспа 1, Варна 9000</p>
                            </MenubarItem>
                            <MenubarItem className="flex justify-center gap-2">
                                <Phone size={20} />

                                <p>0894 379 119</p>
                            </MenubarItem>
                            <MenubarItem className="flex items-center justify-evenly">
                                <Instagram />
                                <Facebook />
                                <Twitter />
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </div>
    );
}
