import { useEffect } from "react"
import { BASE_URL } from "@/config"
import axios from "axios"
import { useRecoilState } from "recoil";
import { latestRaptByIdSelector, latestRaptsAtom } from "@/recoil/atoms/blogAtoms";
import { Blog } from "@/components/Blog";

export const LatestBlogs = () => {
    const [latestRapts, setLatestRapts] = useRecoilState(latestRaptsAtom);

    useEffect(() => {
        const fetchLatestBlogs = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/rapt/allLatest`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }
                });
                const data = res.data.rapts;
                setLatestRapts(data);
            } catch (error) {
                console.error("Error fetching latest blogs", error);
            } finally {
                console.log("Latest blogs fetched");
            }
        };
        fetchLatestBlogs();
    }, []);

    return (

        <div className="">
            {
                latestRapts.map((rapt) => {
                    return <Blog key={rapt.id} id={rapt.id} raptSelector={latestRaptByIdSelector} />;
                })
            }
        </div>
    )
}