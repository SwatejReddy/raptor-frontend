import { useEffect } from "react"
import { BASE_URL } from "@/config"
import axios from "axios"
import { useRecoilState, useRecoilValue } from "recoil";
import { raptByIdSelector, raptsAtom } from "@/recoil/atoms/blogAtoms";
import { Blog } from "@/components/Blog";
interface rapt {
    id: string;
    userId: string;
    title: string;
    content: string;
    likes: number;
    bookmarks: number;
    dateCreated: string;
    dateUpdated: string;
}

export const LatestBlogs = () => {
    const [latestRapts, setLatestRapts] = useRecoilState(raptsAtom);
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
        }

        fetchLatestBlogs();
    }, [setLatestRapts]);

    return (
        <div className="">
            {/* {latestRapts.map((rapt) => {
                <Blog key={rapt.id} id={rapt.id} 
            })}
             */}
            {
                latestRapts.map((rapt) => {
                    return <Blog key={rapt.id} id={rapt.id} />;
                })
            }
        </div>
    )
}