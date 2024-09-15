import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
// import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Lock, Crown } from 'lucide-react'
import { Navbar } from '@/components/Navbar'

export function Settings() {
    const [activeTab, setActiveTab] = useState('profile')
    const [isPremium, setIsPremium] = useState(false)

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
                                <Input id="name" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" placeholder="johndoe" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea id="bio" placeholder="Tell us about yourself" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full sm:w-auto">Update Profile</Button>
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