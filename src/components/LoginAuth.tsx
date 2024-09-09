import { useNavigate } from "react-router-dom"
import { LoginForm } from "./forms/LoginForm";
import { Button } from "./ui/button";


export const LoginAuth = () => {
    const navigate = useNavigate();

    // navigates to signup page
    function handleSignupRedirect() {
        navigate("/signup");
    }

    return (
        <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-sm sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
                <div className="text-center mt-5 mb-2 sm:mt-0">
                    <div className="font-bold mb-1 text-2xl sm:text-3xl">
                        Login
                    </div>
                    <div className="text-gray-500">
                        Don't have an account?<Button variant={"link"} onClick={handleSignupRedirect}>Sign Up</Button>
                    </div>
                </div>
                <div className="mb-5 mt-8"> {/* Added mt-8 here for margin top */}
                    <LoginForm />
                </div>
            </div>
        </div>
    )

}