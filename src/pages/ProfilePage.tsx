import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"


import { Blog } from '@/components/Blog'
import UserList from '@/components/UserList'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '@/config'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { userLatestRaptsAtom, userLatestRaptsByIdSelector, userLikedRaptsAtom, userLikedRaptsByIdSelector } from '@/recoil/atoms/blogAtoms'
import { Navbar } from '@/components/Navbar'
import { ProfileCard } from '@/components/ProfileCard'
import { isCurrentUserAtom } from '@/recoil/atoms/userAtoms'
import { triggerProfileDataFetchAtom } from '@/recoil/atoms/triggerAtoms'
import { profileLoadingAtom } from '@/recoil/atoms/loadingAtoms'
import { followingDetails, followerDetails, userDetails } from '@/types/types'

export const ProfilePage = () => {

    const [isFollowersOpen, setIsFollowersOpen] = useState(false)
    const [isFollowingOpen, setIsFollowingOpen] = useState(false)

    const [userDetails, setUserDetails] = useState<userDetails>({ id: "", name: "", username: "", email: "", verified: false, bio: "" })

    const [followers, setFollowers] = useState<followerDetails[]>([{ id: "", dateFollowed: "", followingId: "", userId: "", user: { id: "", name: "", username: "" } }])

    const [following, setFollowing] = useState<followingDetails[]>([{ id: "", dateFollowed: "", followingId: "", userId: "", following: { id: "", name: "", username: "" } }])

    const [latestRapts, setLatestRapts] = useRecoilState(userLatestRaptsAtom);
    const [likedRapts, setLikedRapts] = useRecoilState(userLikedRaptsAtom);
    const setIsCurrentUser = useSetRecoilState(isCurrentUserAtom)
    // const [isCurrentUser, setIsCurrentUser] = useState(false);
    // const [isFollowing, setIsFollowing] = useState(false);
    const [triggerProfileDataFetch] = useRecoilState(triggerProfileDataFetchAtom);

    const setProfileLoading = useSetRecoilState(profileLoadingAtom);

    const requestedProfileId = useParams<{ id: string }>()


    useEffect(() => {
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
            console.log('isCurrent user profile:', res.data.isCurrentUserProfile);
            setIsCurrentUser(res.data.isCurrentUserProfile);
        }

        async function getProfileData() {
            setProfileLoading(true);
            var userData = await axios.get(`${BASE_URL}/user/profile/${requestedProfileId.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });
            var followersFollowingData = await axios.get(`${BASE_URL}/user/getFollowersFollowing/${requestedProfileId.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });
            console.log(userData.data);
            setUserDetails(userData.data.user)

            console.log(followersFollowingData.data);

            setFollowers(followersFollowingData.data.followers);
            setFollowing(followersFollowingData.data.following);
            setProfileLoading(false);
        }

        async function getLatestRapts() {
            var res;
            res = await axios.get(`${BASE_URL}/rapt/${requestedProfileId.id}/all`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });
            setLatestRapts(res.data.rapts);

        }

        async function getLikedRapts() {
            var res = await axios.get(`${BASE_URL}/rapt/liked/${requestedProfileId.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });
            setLikedRapts(res.data.likedRapts)
            console.log(res.data.rapts);
        }

        checkIfCurrentUserProfile();
        getProfileData();
        getLatestRapts();
        getLikedRapts();
    }, [requestedProfileId, triggerProfileDataFetch])

    useEffect(() => {
        console.log({ followers, following })
    }, [followers, following])

    useEffect(() => {
        console.log({ userDetails })
    }, [userDetails])

    function onFollowersClick() {
        setIsFollowersOpen(true)
    }

    function onFollowingClick() {
        setIsFollowingOpen(true)
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    <ProfileCard userDetails={userDetails} followers={followers} following={following} onFollowersClick={onFollowersClick} onFollowingClick={onFollowingClick} />

                    <Dialog open={isFollowersOpen} onOpenChange={setIsFollowersOpen}>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Followers</DialogTitle>
                            </DialogHeader>
                            <UserList type="followers" followers={followers} following={following} />
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isFollowingOpen} onOpenChange={setIsFollowingOpen}>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Following</DialogTitle>
                            </DialogHeader>
                            <UserList type="following" followers={followers} following={following} />
                        </DialogContent>
                    </Dialog>

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
            {/* To hide scrollbar in the rapt section */}
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