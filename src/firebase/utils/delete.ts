import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config";

export const deleteImageByUrl = async (url: string) => {
    try {
        const imageRef = ref(storage, url);
        await deleteObject(imageRef);
    } catch (error) {
        console.error("Failed to delete image:", error);
    }
};
