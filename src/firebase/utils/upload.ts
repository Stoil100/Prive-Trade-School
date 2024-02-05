import {
    getDownloadURL,
    getStorage,
    ref,
    updateMetadata,
    uploadBytes,
} from "firebase/storage";
import { storage } from "../config";


export const uploadImage = async (
    file: Blob | ArrayBuffer | File,
    fileName: string,
) => {
    try {
        // Upload image.
        const imageRef = ref(storage, `news/${fileName}`);
        const uploadImage = await uploadBytes(imageRef, file);

        // Create file metadata.
        const newMetadata = {
            cacheControl: "public,max-age=500", //3 mins - test / 3 months - 7890000000
            contentType: uploadImage.metadata.contentType,
        };

        await updateMetadata(imageRef, newMetadata);

        // Get the image URL.
        return await getDownloadURL(imageRef);
    } catch (error) {
        throw error;
    }
};
