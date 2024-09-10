import { Progress } from "@/components/ui/progress";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"


const useAuthRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token === null) {
            navigate("/login");
        } else {
            navigate("/home");
        }
    }, [navigate]);
};


export const Index = () => {
    useAuthRedirect();

    return (
        <div>
            <Progress value={85} />
        </div>
    )
}