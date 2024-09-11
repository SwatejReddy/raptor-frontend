import { useEffect, useState } from "react"
import { BASE_URL } from "@/config"
import axios from "axios"
import { useRecoilState } from "recoil";
import { raptsAtom } from "@/recoil/atoms/blogAtoms";
import { Blog } from "@/components/Blog";
import { Loader } from "./Animations/Loader";

export const LatestBlogs = () => {
    const [latestRapts, setLatestRapts] = useRecoilState(raptsAtom);
    const [isLoading, setIsLoading] = useState(true);
    // const getRaptById = useRecoilValue(raptByIdSelector);

    useEffect(() => {
        // fetch latest blogs
        const fetchLatestBlogs = async () => {
            const res = await axios.get(`${BASE_URL}/rapt/allLatest`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });
            const data = res.data.rapts;
            console.log(data);
            setLatestRapts(data);
            setIsLoading(false);
        }

        fetchLatestBlogs();
    }, [latestRapts]);

    if (isLoading) return <div>
        <Loader />
    </div>

    return (

        <div className="">
            {
                latestRapts.map((rapt) => {
                    return <Blog key={rapt.id} id={rapt.id} />;
                })
            }
        </div>
    )
}