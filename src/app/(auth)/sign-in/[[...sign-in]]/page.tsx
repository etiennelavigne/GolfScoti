import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#F9F9F7] pt-20 pb-12">
            <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
        </div>
    );
}
