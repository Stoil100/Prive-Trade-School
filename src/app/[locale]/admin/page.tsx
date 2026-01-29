"use client";

import { useAuth } from "@/components/providers/auth";

import LoadingOverlay from "@/components/Loading";
import MainButton from "@/components/MainButton";
import NoPermissionView from "@/components/admin/NoPermission";
import PostUploadSection from "@/components/admin/PostUploadSection";
import { ApplicationLinkForm } from "@/components/admin/forms/applicationLinkForm";
import AuthForm from "@/components/admin/forms/auth/main";
import { AdminCreateForm } from "@/components/admin/forms/createAdmin";
import { useRouter } from "@/components/navigationSetup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOutIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Admin() {
    const { user, loading, logOut } = useAuth();
    const router = useRouter();
    const t = useTranslations("Pages.Admin");

    if (!user.uid) {
        return (
            <main className="flex min-h-screen-nav items-center justify-center md:p-4">
                {loading && <LoadingOverlay />}
                <div className="flex flex-col items-center justify-center gap-4">
                    <Tabs
                        defaultValue="login"
                        className="w-full max-w-lg rounded-md bg-white p-4"
                    >
                        <TabsList className="grid w-full grid-cols-2 bg-blue-200">
                            <TabsTrigger value="login">
                                {t("tabs.login")}
                            </TabsTrigger>
                            <TabsTrigger value="register">
                                {t("tabs.register")}
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="login" className="">
                            <AuthForm
                                variant="login"
                                t={(key) => t(`forms.auth.${key}`)}
                            />
                        </TabsContent>
                        <TabsContent value="register">
                            <AuthForm
                                variant="register"
                                t={(key) => t(`forms.auth.${key}`)}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        );
    }

    if (user.role !== "admin" && !loading) {
        return (
            <NoPermissionView
                t={(key) => t(`noPermission.${key}`)}
                router={router}
                logOut={logOut}
            />
        );
    }

    return (
        <section className="flex flex-col bg-white p-2">
            <PostUploadSection t={t} type="headers" />
            <PostUploadSection t={t} type="news" />
            <PostUploadSection t={t} type="projects" />
            <PostUploadSection t={t} type="docs" />
            <AdminCreateForm t={(key) => t(`forms.adminCreate.${key}`)} />
            <ApplicationLinkForm
                t={(key) => t(`forms.applicationLink.${key}`)}
            />
            <MainButton onClick={logOut} className="mt-2">
                {t("logOut")}
                <LogOutIcon />
            </MainButton>
        </section>
    );
}
