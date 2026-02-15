import { DocumentUploadForm } from "./forms/documentUpload";
import { PostForm } from "./forms/post/main";
import DocumentPreview from "./previews/Document";
import PostPreview from "./previews/Post";

type PostUploadSectionProps = {
    type: "headers" | "news" | "projects" | "docs";
    t: (key: string, values?: Record<string, any>) => string;
};

export default function PostUpload({ type, t }: PostUploadSectionProps) {
    return (
        <div className="rounded-xl border p-4 shadow-sm">
            <h3 className="mb-4 text-3xl font-semibold">
                {t(`forms.posts.headers.${type}`)}
            </h3>
            {(type === "headers" || type === "news" || type === "projects") && (
                <>
                    <PostForm
                        type={type}
                        t={(key) => t(`forms.posts.${key}`)}
                    />
                    <PostPreview t={(key) => t(`preview.${key}`)} type={type} />
                </>
            )}
            {type === "docs" && (
                <>
                    <DocumentUploadForm t={(key) => t(`forms.docs.${key}`)} />
                    <DocumentPreview t={(key) => t(`preview.${key}`)} />
                </>
            )}
        </div>
    );
}
