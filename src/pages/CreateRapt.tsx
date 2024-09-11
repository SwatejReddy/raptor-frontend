import { useState } from "react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { BASE_URL } from "@/config"
import { useNavigate } from "react-router-dom"
import { ReloadIcon } from "@radix-ui/react-icons"

export const CreateRapt = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function submitRapt() {
        if (title.trim() === '' || content.trim() === '') {
            alert('Title and content cannot be empty');
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${BASE_URL}/rapt/create`, {
                title,
                content
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem('token')}`
                }
            })
            console.log(res);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
            navigate('/home');
        }

    }

    return (
        <div className="flex items-center w-full flex-col p-4 max-h-full">
            <div className="w-3/4 h-16 text-3xl font-bold mb-4">
                <input onChange={(e) => { setTitle(e.target.value) }}
                    className="h-full w-full outline-none placeholder-gray-500"
                    type="text"
                    placeholder="Enter your title here"
                />
            </div>
            <div className="w-3/4 mb-5">
                <textarea onChange={(e) => { setContent(e.target.value) }} className="w-full min-h-96 text-base leading-relaxed outline-none placeholder-gray-500" placeholder="Start writing your content here..."></textarea>
            </div>
            <div className="content-start w-3/4">
                {
                    loading ?
                        (
                            <Button disabled>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Posting
                            </Button>
                        ) :
                        (
                            <Button onClick={submitRapt} variant="default">Post</Button>
                        )
                }
            </div>
        </div>
    )
}