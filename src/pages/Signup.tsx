import { SignupAuth } from "../components/SignupAuth"
import { useNavigate } from "react-router-dom"
import { loggedInAtom } from "@/recoil/atoms/authAtoms"

export const Singup = () => {
    const navigate = useNavigate()

    if (loggedInAtom) {
        navigate("/dashboard")
    }
    return (
        <div className="">
            <SignupAuth />
        </div>
    )
}