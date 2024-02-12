import { ReactNode } from "react";

type Profile = {
    type: string;
    image:string;
    icon:ReactNode;
    pdf: string;
};
type Profiles = Profile[];

export type {Profile,Profiles};
