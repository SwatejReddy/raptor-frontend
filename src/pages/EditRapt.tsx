import { useState } from "react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { BASE_URL } from "@/config"
import { useLocation, useNavigate, useParams } from "react-router-dom"
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

export const EditRapt = () => {
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showContentLengthAlert, setShowContentLengthAlert] = useState(false);
    const [titleGenerationLoading, setTitleGenerationLoading] = useState(false);


    const params = useParams<{ id: string }>()
    const raptId = params.id;
    const location = useLocation();
    const [title, setTitle] = useState(location.state.rapt.title)
    const [content, setContent] = useState(location.state.rapt.content)
    const navigate = useNavigate();

    async function submitRapt() {
        if (title.trim() === '' || content.trim() === '') {
            // set showAlert to true to show the alert box
            setShowAlert(true);
            return;
        }

        try {
            setLoading(true);
            await axios.post(`${BASE_URL}/rapt/edit/${raptId}`, {
                title,
                content,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem('token')}`
                }
            })
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
            navigate(`/rapt/${raptId}`);
        }

    }

    async function autoGenerateTitle() {
        const contentWordCount = content.split(' ').length;
        if (contentWordCount < 10) {
            setShowContentLengthAlert(true);
        }
        try {
            setTitleGenerationLoading(true);
            // Implement rate limiting in future and take userId from token in BE.
            const res = await axios.post(`${BASE_URL}/ai/get-title`, {
                content
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem('token')}`
                }
            })
            setTitle(res.data.groqData.choices[0].message.content);
            setTitleGenerationLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <Navbar />
            <div className="flex items-center w-full flex-col p-4 max-h-full">

                <div className="w-3/4 h-16 text-3xl font-bold mb-4">
                    <input value={title} autoFocus={true} onChange={(e) => { setTitle(e.target.value) }}
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
                        preview="live"
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

                <div className="flex flex-col sm:flex-row justify-center items-center w-full sm:w-3/4 mx-auto space-y-4 sm:space-y-0 sm:space-x-4 lg:justify-start">
                    <div className="w-full sm:w-1/2 max-w-[200px]">
                        {loading ? (
                            <Button className="w-full" disabled>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Posting
                            </Button>
                        ) : (
                            <Button className="w-full" onClick={submitRapt} variant="default">
                                Edit
                            </Button>
                        )}
                    </div>
                    <div className="w-full sm:w-1/2 max-w-[200px]">
                        {titleGenerationLoading ? (
                            <Button disabled className="w-full" variant="outline">
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Generating
                            </Button>
                        ) : (
                            <Button onClick={autoGenerateTitle} className="w-full" variant="outline">
                                Generate Title (AI)
                            </Button>
                        )}
                    </div>
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

                {/* display this alert when the user tries content is less than 10 words */}
                <AlertDialog open={showContentLengthAlert}>
                    <AlertDialogContent className="flex flex-col items-center justify-center max-w-[300px] p-4">
                        <AlertDialogHeader className="text-center">
                            <AlertDialogTitle className="text-lg font-semibold mb-2">Invalid Content Length</AlertDialogTitle>
                            <AlertDialogDescription className="text-sm text-muted-foreground">
                                Content should be at least of 10 words to generate a title.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex justify-center mt-4">
                            <AlertDialogAction onClick={() => setShowContentLengthAlert(false)}>
                                Okay
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </>
    )
}