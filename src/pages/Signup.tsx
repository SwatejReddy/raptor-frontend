import { SignupAuth } from "../components/SignupAuth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const Signup = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            navigate("/home");
        }
    }, []);


    return (
        <div className="">
            <SignupAuth />
        </div>
    )
}