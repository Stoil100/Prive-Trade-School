import { PostSchemaType } from "@/components/schemas/admin/post";
import { Timestamp } from "firebase/firestore";

interface PostT extends PostSchemaType {
    id: string;
    createdAt: Timestamp;
}

export type { PostT };

