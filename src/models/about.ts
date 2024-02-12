import { ElementType, ReactElement, ReactNode } from "react";

type AboutItem = {
    title:string | null;
    icon:JSX.Element;
    description:string | null;

};
type AboutItems = AboutItem[];

export type {AboutItem,AboutItems};
