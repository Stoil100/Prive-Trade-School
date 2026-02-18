import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../config";

interface Props {
    file: File;
    type: "news" | "projects" | "headers";
}

export const uploadImage = async ({ file, type }: Props) => {
    if (!file.type.startsWith("image/")) {
        throw new Error("Only image files are allowed");
    }

    if (file.size > 3 * 1024 * 1024) {
        throw new Error("Image must be under 3MB");
    }

    const uniqueName = `${uuidv4()}.${file.type.split("/")[1]}`;
    const imageRef = ref(storage, `${type}/${uniqueName}`);

    await uploadBytes(imageRef, file, {
        cacheControl: "public, max-age=86400",
        contentType: file.type,
    });

    return (await getDownloadURL(imageRef)).trim();
};
