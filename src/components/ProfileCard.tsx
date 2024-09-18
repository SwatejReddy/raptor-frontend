import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { UserMinus, UserPlus } from "lucide-react"
import { useRecoilState, useRecoilValue } from "recoil";
import { isCurrentUserAtom } from "@/recoil/atoms/userAtoms";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/config";
import { triggerProfileDataFetchAtom } from "@/recoil/atoms/triggerAtoms";
import { ReloadIcon } from "@radix-ui/react-icons";
import { profileLoadingAtom } from "@/recoil/atoms/loadingAtoms";

import { ProfileCardProps } from "@/types/props";

export const ProfileCard = ({ userDetails, followers, following, onFollowersClick, onFollowingClick }: ProfileCardProps) => {
    const isCurrentUser = useRecoilValue(isCurrentUserAtom);
    const currentUserId = localStorage.getItem("id");
    const [isFollowing, setIsFollowing] = useState(false);
    const [triggerProfileDataFetch, setTriggerProfileDataFetch] = useRecoilState(triggerProfileDataFetchAtom);

    // when user follows/unfollows, show loading animation
    const [followButtonLoading, setFollowButtonLoading] = useState(false);

    // until the profile info is fetched, show loading animation
    const profileLoading = useRecoilValue(profileLoadingAtom);

    // Check if the current user is following the profile user.
    useEffect(() => {
        if (currentUserId) {
            for (const follower of followers) {
                if (follower.userId == currentUserId) {
                    setIsFollowing(true);
                    break;
                }
            }
            console.log("isFollowing:", isFollowing);
        }
    }, [followers, currentUserId]);

    useEffect(() => {
        setTriggerProfileDataFetch(!triggerProfileDataFetch);
    }, [isFollowing])

    // Handle follow / unfollow
    const handleFollowToggle = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            };

            if (isFollowing) {
                setFollowButtonLoading(true);
                // Unfollow request
                await axios.post(`${BASE_URL}/user/followUnfollow/${userDetails.id}`, {}, config);
                setIsFollowing(false);
                setFollowButtonLoading(false);
            } else {
                setFollowButtonLoading(true);
                // Follow request
                await axios.post(`${BASE_URL}/user/followUnfollow/${userDetails.id}`, {}, config);
                setIsFollowing(true);
                setFollowButtonLoading(false);
            }
        } catch (error) {
            console.error("Error following/unfollowing user:", error);
            if (axios.isAxiosError(error) && error.response) {
                console.log("Response data:", error.response.data);
                console.log("Response status:", error.response.status);
                console.log("Response headers:", error.response.headers);
            }
        }
    };

    return (
        <div className="lg:w-1/3">
            <Card className="border-none shadow-none">
                <CardContent className="flex flex-col items-center p-6">
                    <Avatar className="w-32 h-32 mb-4 flex items-center justify-center rounded-full overflow-hidden bg-gray-100">
                        <AvatarImage src="./img" alt={userDetails.name} />
                        <AvatarFallback>{userDetails.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <h2 className="text-2xl font-bold mb-1">{userDetails.name}</h2>
                    <p className="text-sm text-muted-foreground mb-4">@{userDetails.username}</p>
                    <p className="text-center text-sm mb-6">{userDetails.bio}</p>
                    <div className="flex gap-8 mb-6">
                        <Button variant="ghost" className="text-center" onClick={onFollowersClick} disabled={profileLoading}>
                            <div>
                                {profileLoading ? (
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        <p className="font-semibold">{followers.length}</p>
                                        <p className="text-sm text-muted-foreground">Followers</p>
                                    </>
                                )}
                            </div>
                        </Button>
                        <Button variant="ghost" className="text-center" onClick={onFollowingClick} disabled={profileLoading}>
                            <div>
                                {profileLoading ? (
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        <p className="font-semibold">{following.length}</p>
                                        <p className="text-sm text-muted-foreground">Following</p>
                                    </>
                                )}
                            </div>
                        </Button>
                    </div>

                    {!isCurrentUser && (
                        <Button className="w-full" onClick={handleFollowToggle} disabled={followButtonLoading || profileLoading}>
                            {followButtonLoading || profileLoading ? (
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            ) : isFollowing ? (
                                <>
                                    <UserMinus className="mr-2 h-4 w-4" /> Unfollow
                                </>
                            ) : (
                                <>
                                    <UserPlus className="mr-2 h-4 w-4" /> Follow
                                </>
                            )}
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
