import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { UserPlus } from "lucide-react"
// import { UserMinus } from "lucide-react"

interface ProfileCardProps {
    userDetails: {
        id: string;
        name: string;
        username: string;
        email: string;
        verified: boolean;
    };
    followers: Array<{
        id: string;
        dateFollowed: string;
        followingId: string; //this has the person being followed id.
        userId: string; //this has the follower user id.
        user: {
            id: string;
            name: string;
            username: string;
        }
    }>;
    following: {
        id: string;
        dateFollowed: string;
        followingId: string; //this has the person being followed id.
        userId: string; //this has the follower user id.
        following: {
            id: string;
            name: string;
            username: string;
        }
    }[];
    // isFollowersOpen: boolean;
    // setIsFollowersOpen: (open: boolean) => void;
    // isFollowingOpen: boolean;
    // setIsFollowingOpen: (open: boolean) => void;
    onFollowersClick: () => void;
    onFollowingClick: () => void;
}

export const ProfileCard = ({ userDetails, followers, following, onFollowersClick, onFollowingClick }: ProfileCardProps) => {
    return (
        <div className="lg:w-1/3">
            <Card className="border-none shadow-none">
                <CardContent className="flex flex-col items-center p-6">
                    <Avatar className="w-32 h-32 mb-4 flex items-center justify-center  rounded-full overflow-hidden bg-gray-100">
                        <AvatarImage src="./img" alt={userDetails.name} />
                        <AvatarFallback>{userDetails.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <h2 className="text-2xl font-bold mb-1">{userDetails.name}</h2>
                    <p className="text-sm text-muted-foreground mb-4">@{userDetails.username}</p>
                    <p className="text-center text-sm mb-6">{userDetails.name}</p>
                    <div className="flex gap-8 mb-6">
                        <Button variant="ghost" className="text-center" onClick={onFollowersClick}>
                            <div>
                                <p className="font-semibold">{followers.length}</p>
                                <p className="text-sm text-muted-foreground">Followers</p>
                            </div>
                        </Button>
                        <Button variant="ghost" className="text-center" onClick={onFollowingClick}>
                            <div>
                                <p className="font-semibold">{following.length}</p>
                                <p className="text-sm text-muted-foreground">Following</p>
                            </div>
                        </Button>
                    </div>
                    <Button className="w-full">
                        {/* {user.isFollowing ? (
                            <>
                                <UserMinus className="mr-2 h-4 w-4" /> Unfollow
                            </>
                        ) : (
                            <>
                                <UserPlus className="mr-2 h-4 w-4" /> Follow
                            </>
                        )} */}
                        <UserPlus className="mr-2 h-4 w-4" /> Follow

                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}