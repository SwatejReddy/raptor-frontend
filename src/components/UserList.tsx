import { useMemo } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"

// type UserListProps = {
//     type: 'followers' | 'following'
// }

interface followerDetails {
    id: string,
    dateFollowed: string,
    followingId: string, //this has the person being followed id.
    userId: string, //this has the follower user id.
    user: {
        id: string,
        name: string,
        username: string,
    }
}

interface followingDetails {
    id: string,
    dateFollowed: string,
    followingId: string, //this has the person being followed id.
    userId: string, //this has the follower user id.
    following: {
        id: string,
        name: string,
        username: string,
    }
}

interface UserListProps {
    type: string; // Example: could be "followers" or "following"
    followers: followerDetails[];
    following: followingDetails[];
}


export default function UserList({ type, followers, following }: UserListProps) {
    const followersList = useMemo(() => (type === "followers" ? followers : []), [type, followers]);
    const followingList = useMemo(() => (type === "following" ? following : []), [type, following]);


    // const toggleFollow = (userId: number) => {
    //     setUsers(users.map(user =>
    //         user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
    //     ))
    // }

    if (type === "followers") {
        return (
            <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                    {followersList.map((user) => (
                        <div key={user.id} className="flex items-center justify-between py-2">
                            <div className="flex items-center space-x-4">
                                {/* <Avatar className="w-10 h-10">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar> */}
                                <div>
                                    <p className="text-sm font-medium leading-none">{user.user.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.user.username}</p>
                                </div>
                            </div>
                            {/* <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleFollow(user.id)}
                            >
                                {user.isFollowing ? (
                                    <>
                                        <UserMinus className="mr-2 h-4 w-4" /> Unfollow
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="mr-2 h-4 w-4" /> Follow
                                    </>
                                )}
                            </Button> */}
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
                            <div className="flex items-center space-x-4">
                                {/* <Avatar className="w-10 h-10">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar> */}
                                <div>
                                    <p className="text-sm font-medium leading-none">{user.following.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.following.username}</p>
                                </div>
                            </div>
                            {/* <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleFollow(user.id)}
                            >
                                {user.isFollowing ? (
                                    <>
                                        <UserMinus className="mr-2 h-4 w-4" /> Unfollow
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="mr-2 h-4 w-4" /> Follow
                                    </>
                                )}
                            </Button> */}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        )
    }

}