import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { UserPlus, UserMinus } from "lucide-react"

// import Blog from "./blog-card"

import { Blog } from '@/components/Blog'
import UserList from '@/components/UserList'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '@/config'
import { useRecoilState } from 'recoil'
import { userLatestRaptsAtom, userLatestRaptsByIdSelector, userLikedRaptsAtom, userLikedRaptsByIdSelector } from '@/recoil/atoms/blogAtoms'
import { Navbar } from '@/components/Navbar'

interface userDetails {
    id: string,
    name: string,
    username: string,
    email: string,
    verified: boolean,
}

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

export const ProfilePage = () => {
    // to open the followers and following dialog
    const [isFollowersOpen, setIsFollowersOpen] = useState(false)
    const [isFollowingOpen, setIsFollowingOpen] = useState(false)
    // to switch between latest and liked rapts
    // const [raptSection, setRaptSection] = useState("latest")

    // to enable edit view if the profile opened is of the current user
    // const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);

    // user details of the profile being visited
    const [userDetails, setUserDetails] = useState<userDetails>({ id: "", name: "", username: "", email: "", verified: false })

    // followers details of the profile being visited
    const [followers, setFollowers] = useState<followerDetails[]>([{ id: "", dateFollowed: "", followingId: "", userId: "", user: { id: "", name: "", username: "" } }])

    // following details of the profile being visited
    const [following, setFollowing] = useState<followingDetails[]>([{ id: "", dateFollowed: "", followingId: "", userId: "", following: { id: "", name: "", username: "" } }])

    // rapts of this user are stored here:
    // const [rapts, setRapts] = useState<rapt[]>([])
    const [latestRapts, setLatestRapts] = useRecoilState(userLatestRaptsAtom);
    const [likedRapts, setLikedRapts] = useRecoilState(userLikedRaptsAtom);

    // extract the profile id from the url
    const requestedProfileId = useParams<{ id: string }>()


    useEffect(() => {
        // check if the profile being visited is of the current user
        async function checkIfCurrentUserProfile() {
            console.log(requestedProfileId)
            var res = await axios.post(`${BASE_URL}/user/profile/me`, {
                requestedProfileId: requestedProfileId.id
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            })
            console.log(res.data);
            // set the state to enable edit view if the profile being visited is of the current user
            // setIsCurrentUserProfile(res.data.isCurrentUserProfile);
        }

        // get the profile data of the profile being visited
        async function getProfileData() {
            // get the user details of the profile being visited
            var userData = await axios.get(`${BASE_URL}/user/profile/${requestedProfileId.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });
            // get the followers and following details of the profile being visited
            var followersFollowingData = await axios.get(`${BASE_URL}/user/getFollowersFollowing/${requestedProfileId.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });
            console.log(userData.data);
            // set the user details of the profile being visited
            setUserDetails(userData.data.user)

            console.log(followersFollowingData.data);

            // set the followers and following details of the profile being visited
            setFollowers(followersFollowingData.data.followers);
            setFollowing(followersFollowingData.data.following);
        }

        // fetch all latest rapts of the profile being visited
        async function getLatestRapts() {
            var res;
            // if (raptSection === "latest") {
            res = await axios.get(`${BASE_URL}/rapt/${requestedProfileId.id}/all`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });
            setLatestRapts(res.data.rapts);

        }

        async function getLikedRapts() {
            // } else {
            var res = await axios.get(`${BASE_URL}/rapt/liked/${requestedProfileId.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });
            setLikedRapts(res.data.likedRapts)
            // }
            console.log(res.data.rapts);
        }

        checkIfCurrentUserProfile();
        getProfileData();
        getLatestRapts();
        getLikedRapts();
    }, [requestedProfileId])

    useEffect(() => {
        console.log({ followers, following })
    }, [followers, following])

    // function switchToLatestRapts() {
    //     setRaptSection("latest");
    // }

    // function switchToLikedRapts() {
    //     setRaptSection("liked");
    // }

    const user = {
        name: "Jane Doe",
        username: "@janedoe",
        avatar: "/placeholder.svg?height=100&width=100",
        description: "Passionate writer | Coffee enthusiast | Travel lover",
        followers: 1234,
        following: 567,
        isFollowing: false
    }

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/3">
                        <Card className="border-none shadow-none">
                            <CardContent className="flex flex-col items-center p-6">
                                <Avatar className="w-32 h-32 mb-4">
                                    <AvatarImage src={user.avatar} alt={userDetails.name} />
                                    <AvatarFallback>{userDetails.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <h2 className="text-2xl font-bold mb-1">{userDetails.name}</h2>
                                <p className="text-sm text-muted-foreground mb-4">@{userDetails.username}</p>
                                <p className="text-center text-sm mb-6">{user.description}</p>
                                <div className="flex gap-8 mb-6">
                                    <Dialog open={isFollowersOpen} onOpenChange={setIsFollowersOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" className="text-center">
                                                <div>
                                                    <p className="font-semibold">{followers.length}</p>
                                                    <p className="text-sm text-muted-foreground">Followers</p>
                                                </div>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Followers</DialogTitle>
                                            </DialogHeader>
                                            <UserList type="followers" followers={followers} following={following} />
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog open={isFollowingOpen} onOpenChange={setIsFollowingOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" className="text-center">
                                                <div>
                                                    <p className="font-semibold">{following.length}</p>
                                                    <p className="text-sm text-muted-foreground">Following</p>
                                                </div>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Following</DialogTitle>
                                            </DialogHeader>
                                            <UserList type="following" followers={followers} following={following} />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <Button className="w-full">
                                    {user.isFollowing ? (
                                        <>
                                            <UserMinus className="mr-2 h-4 w-4" /> Unfollow
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="mr-2 h-4 w-4" /> Follow
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:w-2/3">
                        <Tabs defaultValue="latest" className="w-full">
                            <TabsList className="mb-5 grid w-full grid-cols-2">
                                <TabsTrigger value="latest">Latest Rapts</TabsTrigger>
                                <TabsTrigger value="liked">Liked Rapts</TabsTrigger>
                            </TabsList>
                            <TabsContent value="latest" className="h-[calc(100vh-160px)] overflow-y-auto scrollbar-hide ">
                                <div className="">
                                    {latestRapts.map((rapt) => (
                                        <Blog key={rapt.id} id={rapt.id} raptSelector={userLatestRaptsByIdSelector} />
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="liked" className="h-[calc(100vh-160px)] overflow-y-auto scrollbar-hide">
                                <div className="">
                                    {likedRapts.map((rapt) => (
                                        <Blog key={rapt.id} id={rapt.id} raptSelector={userLikedRaptsByIdSelector} />
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </>
    );
}