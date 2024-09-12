import { useEffect } from "react"
import { BASE_URL } from "@/config"
import axios from "axios"
import { useRecoilState } from "recoil";
import { latestRaptByIdSelector, latestRaptsAtom } from "@/recoil/atoms/blogAtoms";
import { Blog } from "@/components/Blog";
// import { Loader } from "./Animations/Loader";

export const LatestBlogs = () => {
    const [latestRapts, setLatestRapts] = useRecoilState(latestRaptsAtom);
    // const [isLoading, setIsLoading] = useState(true);

    // const getRaptById = useRecoilValue(raptByIdSelector);

    useEffect(() => {
        // Only fetch if latestRapts is empty (i.e., page refresh)
        // if (latestRapts.length === 0) {
        const fetchLatestBlogs = async () => {
            // setIsLoading(true);
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
                // setIsLoading(false);
                console.log("Latest blogs fetched");
            }
        };
        fetchLatestBlogs();
        // } else {
        //     setIsLoading(false);
        // }
    }, []); // No dependencies, so it runs only on mount



    // if (isLoading) return <div>
    //     <Loader />
    // </div>

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