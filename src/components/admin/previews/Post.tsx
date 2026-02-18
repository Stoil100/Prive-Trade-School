"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { db } from "@/firebase/config";
import { PostT } from "@/models/post";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PostPreviewProps {
    type: "headers" | "news" | "projects";
    t: (key: string, values?: Record<string, any>) => string;
}

export default function PostPreview({ type, t }: PostPreviewProps) {
    const [posts, setPosts] = useState<PostT[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const q = query(collection(db, type), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const postsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as PostT[];
            setPosts(postsData);
        } catch (error) {
            console.error("Error fetching posts:", error);
            toast.error("Failed to fetch posts");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, title: string) => {
        try {
            setDeletingId(id);
            await deleteDoc(doc(db, type, id));
            setPosts(posts.filter((post) => post.id !== id));
            toast.success(t("success.delete"));
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.error("Failed to delete post");
        } finally {
            setDeletingId(null);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="mx-auto py-10 md:container">
            <Card>
                <CardHeader>
                    <CardTitle className="capitalize">
                        {t(`title.${type}`)}
                    </CardTitle>
                    <CardDescription>{t(`view.${type}`)}</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-muted-foreground py-8 text-center">
                            {t(`noPostsFound.${type}`)}
                        </div>
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            {t("table.title")}
                                        </TableHead>
                                        <TableHead>
                                            {t("table.heroImage")}
                                        </TableHead>
                                        <TableHead>
                                            {t("table.createdAt")}
                                        </TableHead>
                                        <TableHead className="text-right">
                                            {t("table.actions.title")}
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {posts.map((post) => (
                                        <TableRow key={post.id}>
                                            <TableCell className="font-medium">
                                                {post.title}
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                <Image
                                                    src={
                                                        post.heroImage ||
                                                        "/placeholder.png"
                                                    }
                                                    alt={post.title}
                                                    width={100}
                                                    height={50}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {post.createdAt
                                                    ? new Date(
                                                          post.createdAt
                                                              .seconds * 1000,
                                                      ).toLocaleDateString()
                                                    : "N/A"}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            disabled={
                                                                deletingId ===
                                                                post.id
                                                            }
                                                        >
                                                            {deletingId ===
                                                            post.id ? (
                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                            ) : (
                                                                <>
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    {t(
                                                                        "table.actions.delete",
                                                                    )}
                                                                </>
                                                            )}
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                {t(
                                                                    "table.alert.deleteTitle",
                                                                )}
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                {t(
                                                                    "table.alert.deleteConfirm",
                                                                )}
                                                                &quot;
                                                                {post.title}
                                                                &quot;?
                                                                {t(
                                                                    "table.alert.deleteMessage",
                                                                )}
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                {t(
                                                                    "table.actions.cancel",
                                                                )}
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        post.id,
                                                                        post.title,
                                                                    )
                                                                }
                                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                            >
                                                                {t(
                                                                    "table.actions.delete",
                                                                )}
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
