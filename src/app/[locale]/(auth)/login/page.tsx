import LoginForm from "@/components/forms/auth/login";
import { UnlockKeyhole } from "lucide-react";
import Link from "next/link";

export default function Login() {
    return (
        <div className="flex h-fit flex-col items-center justify-center bg-white p-8">
            <div className=" flex h-10 w-10 items-center justify-center rounded-full border border-black">
                <UnlockKeyhole size={30} />
            </div>
            <h2 className="mb-5 w-full border-b-2 pb-3 text-center text-5xl md:w-[400px]">
                Log in
            </h2>
            <div className="w-full md:w-[400px]">
                <LoginForm />
            </div>
            <Link href="/register" className="text-sm mt-3 underline text-blue-400 underline-offset-2">Don&lsquo;t have an account? Register here</Link>
        </div>
    );
}
