import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"
import { Search, LogOut, Bell, Settings, Menu, X, Home, User } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    async function manageLogOut() {
        console.log("Logging out...");
        localStorage.clear();
        navigate("/login");
    }

    function handleRaptSearch() {
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
        }
    }

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key == 'Enter') {
            handleRaptSearch();
        }
    }


    return (
        <nav className="relative bg-gray-100 border-b">
            <div className="flex items-center justify-between p-4">
                <Link className="text-xl font-bold whitespace-nowrap" to="/home" >Raptor</Link>
                <div className="flex-grow mx-4">
                    <div className="relative max-w-md mx-auto flex">
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="pr-4 py-2 w-full rounded-r-none"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyPress}
                            value={searchQuery}
                        />
                        <Button onClick={handleRaptSearch} className="rounded-l-none" variant="secondary">
                            <Search size={18} />
                        </Button>
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => { navigate("/home") }} >
                        <Home size={20} />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Bell size={20} />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Settings size={20} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => { navigate(`/profile/${localStorage.getItem("id")}`) }} >
                        <User size={20} />
                    </Button>
                    <Button variant="outline" onClick={manageLogOut} >
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                </div>
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
            </div>

            {isMenuOpen && (
                <div className="z-10 absolute top-full left-0 right-0 bg-gray-100 shadow-md md:hidden">
                    <div className="p-4 space-y-2">
                        <Button variant="ghost" onClick={() => { navigate("/home") }} className="w-full justify-start">
                            <Home className="mr-2 h-4 w-4" /> Home
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" onClick={() => { navigate(`/profile/${localStorage.getItem("id")}`) }}>
                            <User className="mr-2 h-4 w-4" /> Profile
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <Bell className="mr-2 h-4 w-4" /> Notifications
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            <Settings className="mr-2 h-4 w-4" /> Settings
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" onClick={manageLogOut}>
                            <LogOut className="mr-2 h-4 w-4" /> Logout
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
};