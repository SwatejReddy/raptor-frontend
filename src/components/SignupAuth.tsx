import { SignupForm } from "./forms/SignupForm"

export const SignupAuth = () => {
    return (
        <div className="flex justify-center flex-col items-center ">
            <div className="w-1/4 flex justify-center flex-col">
                <div className="text-center mt-5 mb-2">
                    <div className=" font-bold mb-1 text-3xl">
                        Create an account
                    </div>
                    <div className="text-gray-500  ">
                        Already have an account?
                    </div>
                </div>
                <div className="mb-5">
                    <SignupForm />
                </div>
            </div>
        </div>
    )
}


// function LabelledInput({label, placeholder, onChange})