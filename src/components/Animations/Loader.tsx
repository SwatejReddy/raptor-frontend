import { Loader as LoaderIcon } from 'lucide-react';

export const Loader = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <LoaderIcon className="w-12 h-12 text-black-500 animate-spin" />
        </div>
    )
}