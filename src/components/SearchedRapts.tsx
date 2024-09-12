import { useSearchParams } from "react-router-dom"
import { Navbar } from "./Navbar";
import { BASE_URL } from "@/config";
import axios from "axios";
import { useEffect } from "react";
import { Blog } from "./Blog";
// import { rapt } from "@/types/rapt";
import { useRecoilState } from "recoil";
import { searchedRaptsAtom, searchedRaptsByIdSelector } from "@/recoil/atoms/blogAtoms";

export const SearchedRapts = () => {
    const [searchParams] = useSearchParams();
    // const [searchResults, setSearchResults] = useState<rapt[]>([]);
    const [searchResults, setSearchResults] = useRecoilState(searchedRaptsAtom);
    const query = searchParams.get('query');



    useEffect(() => {
        async function getSearchResults() {
            try {
                const res = await axios.get(`${BASE_URL}/search/rapts/${query}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }
                })
                console.log(res.data);
                setSearchResults(res.data)
            } catch (error) {
                console.log(error);
            } finally {
                console.log("Search results fetched");
            }
        }
        getSearchResults();
    }, [query])

    return (
        <>
            <Navbar />
            <div className="">
                {
                    searchResults.map((rapt) => {
                        return <Blog key={rapt.id} id={rapt.id} raptSelector={searchedRaptsByIdSelector} />;
                    })
                }
            </div>
        </>
    )
}