import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { BASE_URL } from "@/config";
import axios from "axios";
import { Navbar } from '@/components/Navbar';


interface Rapt {
    id: number;
    userId: number;
    title: string;
    content: string;
    likes: number;
    bookmarks: number;
    dateCreated: string;
    dateUpdated: string;
    user: {
        name: string;
    }
}

async function getRaptById(id: string) {
    const res = await axios.get(`${BASE_URL}/rapt/view/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });
    return res.data.rapt;
}

export const Rapt: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [rapt, setRapt] = useState<Rapt | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRapt = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await getRaptById(id);
                setRapt(data);
            } catch (err) {
                console.error("Error fetching rapt:", err);
                setError("Failed to fetch rapt. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchRapt();
    }, [id]);

    if (loading) return <><Navbar /><div>Loading...</div></>;
    if (error) return <><Navbar /><div>Error: {error}</div></>;
    if (!rapt) return <><Navbar /><div>Rapt not found</div></>;

    return (
        <>
            <Navbar />
            <div className="max-w-2xl mx-auto p-4 mt-3">
                <div className='mb-5'>
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{rapt.title}</h1>
                </div>
                <div className='mb-5 flex items-center'>
                    <div className="relative w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg className="absolute w-8 h-8 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    </div>
                    {/* <small className="text-sm font-medium leading-none ml-3">{rapt.user.name}</small> */}
                    <p className="text-sm text-muted-foreground ml-3">{rapt.user.name}</p>
                </div>
                <div>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">{rapt.content}</p>
                </div>
            </div>
        </>
    );
};