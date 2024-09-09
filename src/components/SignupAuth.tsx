import { SignupForm } from "./forms/SignupForm";

export const SignupAuth = () => {
    return (
        <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
                <div className="text-center mt-5 mb-2 sm:mt-0">
                    <div className="font-bold mb-1 text-2xl sm:text-3xl">
                        Create an account
                    </div>
                    <div className="text-gray-500">
                        Already have an account?
                    </div>
                </div>
                <div className="mb-5">
                    <SignupForm />
                </div>
            </div>
        </div>
    );
};
