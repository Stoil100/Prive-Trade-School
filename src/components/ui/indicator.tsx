import React from "react";

export default function Indicator() {
    return (
        <>
            <div className="fixed left-0 top-10 z-50 m-8 flex h-7 w-7 items-center justify-center rounded-full border border-white bg-gray-700 p-3 font-mono text-xs text-white shadow-md sm:bg-pink-500 md:bg-orange-500 lg:bg-green-500 xl:bg-blue-500 2xl:bg-yellow-300 2xl:text-gray-500">
                <div className="block  sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
                    xs
                </div>
                <div className="hidden sm:block  md:hidden lg:hidden xl:hidden 2xl:hidden">
                    sm
                </div>
                <div className="hidden sm:hidden md:block  lg:hidden xl:hidden 2xl:hidden">
                    md
                </div>
                <div className="hidden sm:hidden md:hidden lg:block  xl:hidden 2xl:hidden">
                    lg
                </div>
                <div className="hidden sm:hidden md:hidden lg:hidden xl:block  2xl:hidden">
                    xl
                </div>
                <div className="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block">
                    2xl
                </div>
            </div>
        </>
    );
}
