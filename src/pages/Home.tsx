import { Blog } from "@/components/Blog";
import { LatestBlogs } from "@/components/LatestBlogs";
import { Navbar } from "@/components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
export const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/login");
        }
    }, []);

    return (
        <>
            <Navbar />
            <div className="grid grid-cols-3 gap-4 p-4  bg-slate-100">
                <div className="col-span-2 p-4">
                    <LatestBlogs />
                </div>
                <div className="col-span-1 bg-gray-100 p-4">
                    <Blog key={2} id={"4"} />
                </div>
            </div>
        </>
    );
}
