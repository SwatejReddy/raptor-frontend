import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "@/config";
import axios from "axios";
import { Navbar } from '@/components/Navbar';
import { Loader } from '@/components/Animations/Loader';
import Markdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';


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
    const [viewerIsAuthor, setViewerIsAuthor] = useState(false);


    const navigate = useNavigate();

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

    useEffect(() => {
        const checkIfViewerIsAuthor = async () => {
            if (!rapt?.userId) return;
            try {
                const res = await axios.post(`http://127.0.0.1:8787/api/v1/user/profile/me`, {
                    requestedProfileId: rapt.userId,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token"),
                    },
                });

                if (res.data.isCurrentUserProfile) {
                    setViewerIsAuthor(true);
                    console.log("Viewer is author:", true);  // Logs after setting state
                } else {
                    setViewerIsAuthor(false);
                    console.log("Viewer is author:", false);  // Logs after setting state
                }
            } catch (err) {
                console.error("Error checking if viewer is author:", err);
            }
        };

        if (rapt) {
            checkIfViewerIsAuthor();
        }
    }, [rapt]);


    if (loading) return <><Navbar /><div>
        <Loader />
    </div></>;
    if (error) return <><Navbar /><div>Error: {error}</div></>;
    if (!rapt) return <><Navbar /><div>Rapt not found</div></>;

    return (
        <>
            <Navbar />
            <div className="max-w-2xl mx-auto p-4 mt-3">
                <div className='mb-7'>
                    <h1 className="scroll-m-20 font-extrabold tracking-tight text-6xl">{rapt.title}</h1>
                </div>
                <div className='mb-3'>
                    <div onClick={() => { navigate(`/profile/${rapt.userId}`) }}
                        className='mb-5 flex items-center cursor-pointer'>

                        <div className="relative w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <svg className="absolute w-8 h-8 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                        </div>
                        <p className="text-sm text-muted-foreground ml-3" >{rapt.user.name}</p>
                    </div>
                    <Separator />
                </div>


                {viewerIsAuthor && (
                    <div className='mb-3'>
                        <div className="flex justify-start space-x-2 mt-4 mb-4">
                            <Button variant="outline" className="w-8 h-8 group" size="icon" >
                                <Pencil className="h-3 w-3 group-hover:h-4 group-hover:w-4 transition-all duration-100" />
                                <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="outline" className="w-8 h-8 group" size="icon" >
                                <Trash2 className="h-3 w-3 group-hover:h-4 group-hover:w-4 transition-all duration-100 " />
                                <span className="sr-only">Delete</span>
                            </Button>
                        </div>
                        <Separator />
                    </div>
                )}
                <div>
                    <Markdown className="prose prose-l">{rapt.content}</Markdown>

                </div>
            </div>
        </>
    );
};