import { LoginAuth } from "@/components/LoginAuth"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            navigate("/home");
        }
    }, []);

    return (
        <div>
            <LoginAuth />
        </div>
    )
}