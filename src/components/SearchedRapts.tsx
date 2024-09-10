import { useSearchParams } from "react-router-dom"
import { Navbar } from "./Navbar";
import { BASE_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { Blog } from "./Blog";
import { rapt } from "@/types/rapt";

export const SearchedRapts = () => {
    const [searchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState<rapt[]>([]);
    const query = searchParams.get('query');

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

    useEffect(() => {
        getSearchResults();
    }, [query])




    return (
        <>
            <Navbar />
            <div className="">
                {
                    searchResults.map((rapt) => {
                        return <Blog key={rapt.id} id={rapt.id} />;
                    })
                }
            </div>
        </>
    )
}