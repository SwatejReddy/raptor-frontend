import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Lock, Crown } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import axios from 'axios'
import { BASE_URL } from '@/config'
import { useNavigate } from 'react-router-dom'

export function Settings() {
    const [activeTab, setActiveTab] = useState('profile')
    const [isPremium, setIsPremium] = useState(false)
    const [profileInfo, setProfileInfo] = useState({ id: "", name: "", username: "", email: "", verified: false, bio: "" })
    const navigate = useNavigate();


    useEffect(() => {
        async function getProfileInfo() {
            const res = await axios.get(`${BASE_URL}/info/profile`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            })
            setProfileInfo(res.data.user)
        }

        getProfileInfo();
    }, [])

    useEffect(() => {
        console.log(profileInfo)
    }, [profileInfo])

    async function editProfileInfo() {
        console.log("Editing profile info...")
        try {
            var res = await axios.post(`${BASE_URL}/user/editProfile`, {
                name: profileInfo.name,
                username: profileInfo.username,
                email: profileInfo.email,
                bio: profileInfo.bio
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            })
            if (res.status == 200) {
                alert("Profile updated successfully!")
                navigate(`/profile/${localStorage.getItem("id")}`)
            }
            if (res.status == 411) {
                alert("Please fill all the fields")
            }
            if (res.status == 409) {
                alert("Username or email is already taken")
            }
        } catch (error) {
            console.error(error)
            alert("An error occurred. Please try again.")
        }
    }


    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal details here.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input defaultValue={profileInfo.name} onChange={(e) => setProfileInfo(prev => ({ ...prev, name: e.target.value }))} id="name" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input defaultValue={profileInfo.username} onChange={(e) => setProfileInfo(prev => ({ ...prev, username: e.target.value }))} id="username" placeholder="johndoe" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input defaultValue={profileInfo.email} onChange={(e) => setProfileInfo(prev => ({ ...prev, email: e.target.value }))} id="email" placeholder="johndoe" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea defaultValue={profileInfo.bio} onChange={(e) => setProfileInfo(prev => ({ ...prev, bio: e.target.value }))} id="bio" placeholder="Tell us about yourself" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={editProfileInfo} className="w-full sm:w-auto">Update Profile</Button>
                        </CardFooter>
                    </Card>
                )
            case 'password':
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>Update your password to keep your account secure.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm New Password</Label>
                                <Input id="confirm-password" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full sm:w-auto">Change Password</Button>
                        </CardFooter>
                    </Card>
                )
            case 'premium':
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>Premium Features</CardTitle>
                            <CardDescription>Upgrade to access exclusive features.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="space-y-0.5 mb-2 sm:mb-0">
                                    <Label htmlFor="premium-switch">Premium Status</Label>
                                    <p className="text-sm text-muted-foreground">
                                        {isPremium ? "You have premium access" : "Upgrade to premium"}
                                    </p>
                                </div>
                                <Switch
                                    id="premium-switch"
                                    checked={isPremium}
                                    onCheckedChange={setIsPremium}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" disabled={isPremium} className="w-full sm:w-auto">
                                {isPremium ? "Premium Active" : "Upgrade to Premium"}
                            </Button>
                        </CardFooter>
                    </Card>
                )
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="md:flex md:space-x-8">
                    <div className="md:w-1/4">
                        <h1 className="text-3xl font-bold pb-6 md:pl-5">Settings</h1>
                        <nav className="mb-6 md:mb-0">
                            <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0">
                                <Button
                                    variant={activeTab === 'profile' ? 'default' : 'ghost'}
                                    className="flex-1 md:flex-none justify-start"
                                    onClick={() => setActiveTab('profile')}
                                >
                                    <User className="mr-2 h-4 w-4" />
                                    <span className="hidden sm:inline">Profile Info</span>
                                </Button>
                                <Button
                                    variant={activeTab === 'password' ? 'default' : 'ghost'}
                                    className="flex-1 md:flex-none justify-start"
                                    onClick={() => setActiveTab('password')}
                                >
                                    <Lock className="mr-2 h-4 w-4" />
                                    <span className="hidden sm:inline">Password</span>
                                </Button>
                                <Button
                                    variant={activeTab === 'premium' ? 'default' : 'ghost'}
                                    className="flex-1 md:flex-none justify-start"
                                    onClick={() => setActiveTab('premium')}
                                >
                                    <Crown className="mr-2 h-4 w-4" />
                                    <span className="hidden sm:inline">Premium</span>
                                </Button>
                            </div>
                        </nav>
                    </div>
                    <div className="w-full md:w-3/4">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    )
}