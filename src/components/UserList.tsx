import { useMemo } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserListProps } from '@/types/props';

export default function UserList({ type, followers, following }: UserListProps) {
    const followersList = useMemo(() => (type === "followers" ? followers : []), [type, followers]);
    const followingList = useMemo(() => (type === "following" ? following : []), [type, following]);

    if (type === "followers") {
        return (
            <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                    {followersList.map((user) => (
                        <div key={user.id} className="flex items-center justify-between py-2 cursor-pointer">
                            <div className="flex items-center space-x-4">
                                <div>
                                    <p className="text-sm font-medium leading-none">{user.user.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.user.username}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        )
    }
    else {
        return (
            <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                    {followingList.map((user) => (
                        <div key={user.id} className="flex items-center justify-between py-2">
                            <div className="flex items-center space-x-4 cursor-pointer">
                                <div>
                                    <p className="text-sm font-medium leading-none">{user.following.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.following.username}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        )
    }

}