import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export const CreateRaptButton = () => {
    const navigate = useNavigate();

    const handleCreateRapt = () => {
        navigate('/new-rapt');
    };

    return (
        <div>
            <Card className="w-full max-w-full mx-auto mt-8 mb-10">
                <CardHeader>
                    <CardTitle>Create a New Rapt</CardTitle>
                    <CardDescription>Share your thoughts with the world</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                        Ready to start writing? Click the button below to open our Rapt editor and begin crafting your next masterpiece.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button
                        onClick={handleCreateRapt}
                        className="w-full"
                    >
                        <PlusCircle className="mr-2 h-4 w-4" /> Create New Rapt
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );

}