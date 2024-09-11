import { useState } from "react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { BASE_URL } from "@/config"
import { useNavigate } from "react-router-dom"
import { ReloadIcon } from "@radix-ui/react-icons"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export const CreateRapt = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    async function submitRapt() {
        if (title.trim() === '' || content.trim() === '') {
            // set showAlert to true to show the alert box
            setShowAlert(true);
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
            <AlertDialog open={showAlert}>
                <AlertDialogContent className="flex flex-col items-center justify-center max-w-[300px] p-4">
                    <AlertDialogHeader className="text-center">
                        <AlertDialogTitle className="text-lg font-semibold mb-2">Invalid Input</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-muted-foreground">
                            Title or Content cannot be empty.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex justify-center mt-4">
                        <AlertDialogAction onClick={() => setShowAlert(false)}>
                            Okay
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}