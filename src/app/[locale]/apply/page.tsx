"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Apply() {
    const t = useTranslations("Applypage");
    return (
        <section className="space-y-10 bg-white px-4 py-6 md:px-12">
            <div className="space-y-2">
                <div>
                    <h2 className="text-center text-3xl font-bold lg:text-7xl">
                        {t("title")}
                    </h2>
                    <p className="text-md px-6 py-3 md:text-xl">
                        {t("description")}
                        <a
                            href="mailto:privatetradeschool@gmail.com"
                            className="cursor-pointer font-bold text-blue-500"
                        >
                            privatetradeschool@gmail.com
                        </a>
                    </p>
                </div>
                <div>
                    <h4 className="text-xl font-bold lg:text-4xl">
                        {t("application_documents")}
                    </h4>
                    <ul className="list-disc px-10 py-4">
                        <li>{t("download_application")}</li>
                        <li>{t("parent_declaration")}</li>
                        <li>{t("education_certificate")}</li>
                    </ul>
                    <h4 className="text-xl font-bold lg:text-4xl">
                        {t("enrollment_documents")}
                    </h4>
                    <ul className="list-disc px-10 py-4">
                        <li>{t("download_application")}</li>
                        <li>{t("original_certificate")}</li>
                        <li>{t("transfer_certificate")}</li>
                        <li>{t("student_characteristic")}</li>
                        <li>{t("medical_record")}</li>
                        <li>{t("parent_survey")}</li>
                        <li>{t("photos")}</li>
                        <li>{t("contract_and_fee")}</li>
                        <li>{t("data_processing_declaration")}</li>
                        <li>{t("video_surveillance_declaration")}</li>
                        <li>{t("photo_video_consent_declaration")}</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-xl font-bold lg:text-4xl">
                        {t("submission_deadlines")}
                    </h4>
                    <ul className="list-disc px-10 py-4">
                        <li>{t("individual_exam")}</li>
                    </ul>
                    <p className="text-lg">{t("results_announcement")}</p>
                    <p className="text-xl font-bold">{t("success")}</p>
                </div>
            </div>
            <Button className="w-full rounded-lg bg-blue-600 text-xl hover:bg-blue-800">
                {t("to_form")}
            </Button>
        </section>
    );
}
