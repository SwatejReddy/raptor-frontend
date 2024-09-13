import { useEffect, useState } from "react"
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
import MDEditor from '@uiw/react-md-editor';
import { Navbar } from "@/components/Navbar"
import {
    commands,
} from "@uiw/react-md-editor";

export const CreateRapt = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(content);
    }, [content])

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
        <>
            <Navbar />
            <div className="flex items-center w-full flex-col p-4 max-h-full">

                <div className="w-3/4 h-16 text-3xl font-bold mb-4">
                    <input onChange={(e) => { setTitle(e.target.value) }}
                        className="h-full w-full outline-none placeholder-gray-500"
                        type="text"
                        placeholder="Enter your title here"
                    />
                </div>
                <div className="w-3/4 mb-5 overflow-hidden " data-color-mode="light">
                    <MDEditor
                        value={content}
                        onChange={(val) => {
                            setContent(val!);
                        }}
                        commands={[
                            commands.bold,
                            commands.italic,
                            commands.codeBlock,
                            commands.quote,
                            commands.unorderedListCommand,
                            commands.orderedListCommand,
                            commands.group(
                                [
                                    commands.title1,
                                    commands.title2,
                                    commands.title3,
                                    commands.title4,
                                    commands.title5,
                                    commands.title6
                                ],
                                {
                                    name: "title",
                                    groupName: "title",
                                    buttonProps: { "aria-label": "Insert title" }
                                }
                            ),
                        ]}
                        height={400}
                        enableScroll={false}
                        previewOptions={{
                            className: "bg-background text-foreground"
                        }}
                        style={{
                            border: 'none',
                            boxShadow: 'none',
                            background: 'transparent',
                            overflow: 'hidden'
                        }}
                        visibleDragbar={false}
                    />
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
        </>
    )
}