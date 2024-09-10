import { CreateRaptButton } from "@/components/CreateRaptButton";
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
            <div className="grid grid-cols-3 gap-4 p-4">

                <div className="col-span-3 md:col-span-2 p-4">
                    <CreateRaptButton />
                    <LatestBlogs />
                </div>
                <div className="hidden md:block col-span-1 bg-gray-50">
                    Top Picks of the week goes here!
                </div>
            </div>
        </>
    );
}
