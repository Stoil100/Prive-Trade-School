"use client";

import { useAuth } from "@/components/Providers";
import { useRouter } from "next/router";
import React, {
    useState,
    useRef,
    ChangeEvent,
    useLayoutEffect,
    useEffect,
} from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadImage } from "@/firebase/utils/upload";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { db } from "@/firebase/config";
import {
    setDoc,
    doc,
    Timestamp,
    getDocs,
    collection,
    deleteDoc,
    query,
    onSnapshot,
} from "firebase/firestore";
import { Project } from "@/models/project";

const projectsFormSchema = z.object({
    title: z.string().min(1, { message: "Please enter a valid title." }),
    id: z.string().min(1, { message: "Please enter a valid id." }),
    description: z.string().min(1, { message: "Please enter a valid description." }),
});

export default function NewsAdmin(){
    const [uploadedProjects, setUploadedProjects] = useState<Project[]>();
    const [isLoading, setLoading] = useState(false);
    const [submitValues, setSubmitValues] = useState<
        z.infer<typeof projectsFormSchema>
    >({
        title: "",
        description: "",
        id: "",
    });

    const projectsForm = useForm<z.infer<typeof projectsFormSchema>>({
        resolver: zodResolver(projectsFormSchema),
        defaultValues: {
            title: "",
            description: "",
            id:"",
        },
    });
    useEffect(() => {
        const q = query(collection(db, "projects"));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const docs: Project[] = snapshot.docs.map(doc => ({
            ...doc.data() as Project,
            pid: doc.id,
          }));
          console.log(docs)
          setUploadedProjects(docs);
        }, (error) => {
          console.error("Error fetching documents: ", error);
        });
    
        // Cleanup subscription on unmount
        return () => unsubscribe();
      }, []);
    const handleUpload = async () => {
        setLoading(true);
        await setDoc(doc(db, "projects", `${Date.now()}`), {
            title: submitValues.title,
            description: submitValues.description,
            id: submitValues.id,
            createdAt: Timestamp.now(),
        });
        setLoading(false);
        setSubmitValues({
            title: "",
            description: "",
            id: "",
        });
        projectsForm.reset;
    };
    async function onSubmit(values: z.infer<typeof projectsFormSchema>) {
        const submitValues = {
            title: values.title,
            description: values.description,
            id: values.id,
        };
        setSubmitValues(submitValues);
    }
    async function deleteProjects(id: string) {
        await deleteDoc(doc(db, "projects", id));
    }
    return (
        <div className="w-full">
            <div className="flex w-full flex-col items-center justify-around md:flex-row">
                <div className="flex w-fit flex-col rounded-lg border text-center">
                    <h2 className="text-2xl">
                        Enter projects information here:
                    </h2>
                    <Form {...projectsForm}>
                        <form
                            onSubmit={projectsForm.handleSubmit(onSubmit)}
                            className="flex h-full w-full flex-col justify-between space-y-2 p-10 text-left text-black"
                        >
                            <FormField
                                control={projectsForm.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter project title here..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={projectsForm.control}
                                name="id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Id:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter project id here..."
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={projectsForm.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter project description here..."
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="w-full"
                                type="submit"
                                disabled={isLoading}
                            >
                                Preview
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="flex h-full w-fit flex-col items-center justify-between gap-2">
                    <h2 className="text-center text-4xl font-bold">Result:</h2>
                    {submitValues.title !== "" && (
                        <div>
                            <h2 className="text-xl font-bold">
                                {submitValues.title}
                            </h2>
                            <p className="px-2 text-gray-400">
                                {submitValues.id}
                            </p>
                            <p className="text-md px-5 py-3">
                                {submitValues.description}
                            </p>
                        </div>
                    )}
                    <Button
                        disabled={submitValues.title === "" || isLoading}
                        className="w-full"
                        onClick={handleUpload}
                    >
                        Upload
                    </Button>
                </div>
            </div>
            <div className="w-full">
                <div className="flex h-[500px] w-full">
                    {uploadedProjects?.map((project, index) => (
                        <div
                            key={index}
                            className="flex h-full flex-col items-center justify-center gap-1 p-3 sm:w-1/2 md:w-1/3"
                        >
                            <div className=" flex flex-col items-center justify-center gap-2">
                                <h2 className="text-4xl ">{project.title}</h2>
                            </div>
                            <Button
                                className="w-full"
                                onClick={() => {
                                    deleteProjects(project.pid!);
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
