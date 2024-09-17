import React, { useState, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { BASE_URL } from '@/config'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { triggerRippleDataFetchAtom } from '@/recoil/atoms/triggerAtoms'

interface NewEchoProps {
    raptId: any,
    name: string
}

export function NewEcho({ raptId, name }: NewEchoProps) {
    console.log("raptId: ", Number(raptId))
    console.log("Name: ", name)
    const [comment, setComment] = useState('')
    const [triggerRippleDataFetch, setTriggerRippleDataFetch] = useRecoilState(triggerRippleDataFetchAtom);
    const textareaRef = useRef<HTMLTextAreaElement>(null)


    async function postRipple() {
        try {
            console.log("making request: ", comment);
            const res = await axios.post(`${BASE_URL}/ripple/create/${raptId}`, {
                content: comment
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            })
            if (res.status === 200) {
                setTriggerRippleDataFetch(!triggerRippleDataFetch)
                console.log("Posted ripple: ", res)

            }
        } catch (error) {
            console.error("Error posting ripple: ", error)
        } finally {
            setComment('')
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto' // reset height after submission
            }
        }
    }

    function getInitials(name: string) {
        // if only 1 word, get first letter of the name, if 2 words, get the first letters of two words.
        const nameSplit = name.split(' ')
        if (nameSplit.length === 1) {
            return nameSplit[0].charAt(0).toUpperCase()
        } else {
            return nameSplit[0].charAt(0).toUpperCase() + nameSplit[1].charAt(0).toUpperCase()
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value)
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto' // reset height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px` // adjust height to fit content
        }
    }

    return (
        <div className="w-full max-w-2xl bg-white border-b border-gray-200 py-4">
            <div className="flex space-x-3">
                <Avatar className="w-10 h-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
                    <AvatarFallback>{getInitials(name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                    <Textarea
                        ref={textareaRef}
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={handleInput}
                        className="w-full min-h-[80px] p-2 text-sm text-gray-700 border-gray-200 focus:border-gray-300 focus:ring-gray-300 overflow-hidden resize-none no-scrollbar"
                    />
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={!comment.trim()}
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-gray-700 p-0"
                            onClick={postRipple}
                        >
                            <Send className="w-4 h-4 mr-1" />
                            <span className="text-xs">Post</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}