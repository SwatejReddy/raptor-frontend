import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Echo({ ripple }: any) {
    const [likes, setLikes] = useState(42)
    const [liked, setLiked] = useState(false)
    const navigate = useNavigate();

    const handleLike = () => {
        if (liked) {
            setLikes(likes - 1)
            setLiked(false)
        } else {
            setLikes(likes + 1)
            setLiked(true)
        }
    }

    console.log("ripple.: ", ripple.user.name)

    function convertDateToTimeAgo(date: string) {
        const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
        let interval = seconds / 31536000

        if (interval > 1) {
            return Math.floor(interval) + " years"
        }
        interval = seconds / 2592000
        if (interval > 1) {
            return Math.floor(interval) + " months"
        }
        interval = seconds / 86400
        if (interval > 1) {
            return Math.floor(interval) + " days"
        }
        interval = seconds / 3600
        if (interval > 1) {
            return Math.floor(interval) + " hours"
        }
        interval = seconds / 60
        if (interval > 1) {
            return Math.floor(interval) + " minutes"
        }
        return Math.floor(seconds) + " seconds"
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

    function openUserProfile() {
        navigate(`/profile/${ripple.user.id}`)
    }

    return (
        <div className="w-full max-w-2xl bg-white border-b border-gray-200 py-4">
            <div className="flex space-x-3">
                <Avatar onClick={openUserProfile} className="w-10 h-10 cursor-pointer">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="John Doe" />
                    <AvatarFallback>{getInitials(ripple.user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                        <div onClick={openUserProfile} className="cursor-pointer">
                            <p className="text-sm font-medium text-gray-900">{ripple.user.name}</p>
                            <p className="text-xs text-gray-500">@{ripple.user.username}</p>
                        </div>
                        <p className="text-xs text-gray-500">{convertDateToTimeAgo(ripple.dateCreated)}</p>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">
                        {ripple.content}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`text-gray-500 hover:text-gray-700 p-0 ${liked ? 'text-red-500 hover:text-red-600' : ''}`}
                            onClick={handleLike}
                        >
                            <Heart className="w-4 h-4 mr-1" fill={liked ? "currentColor" : "none"} />
                            <span className="text-xs">{likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 p-0">
                            <span className="text-xs">Reply</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}