import Markdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"

import { BlogProps } from "@/types/props";

export function Blog({ id, raptSelector }: BlogProps) {

    const rapt = useRecoilValue(raptSelector(id))
    console.log(id)

    const navigate = useNavigate()

    if (!rapt) {
        return <div>Rapt Loading...</div>
    }
    // const dateCreated = new Date(rapt?.dateCreated ?? "").toLocaleDateString()
    const year = new Date(rapt?.dateCreated ?? "").getFullYear()
    const month = new Date(rapt?.dateCreated ?? "").toLocaleString("default", { month: "short" })
    const day = new Date(rapt?.dateCreated ?? "").getDate()
    const displayContent = rapt?.content.substring(0, 300) + "..."

    return (
        <article className="flex bg-white transition hover:shadow-xl mb-5">
            <div className="sm:z-0 rotate-180 p-2 [writing-mode:_vertical-lr]">
                <time
                    dateTime="2022-10-10"
                    className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
                >
                    <span>{year}</span>
                    <span className="w-px flex-1 bg-gray-900/10"></span>
                    <span>{month} {day}</span>
                </time>
            </div>

            <div className="hidden sm:block sm:basis-56 w-2/3">
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                    className="aspect-square h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col justify-between w-2/4">
                <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                    <a href="#">
                        <h3 className="font-bold uppercase text-gray-900">
                            {rapt?.title}
                        </h3>
                    </a>

                    <div className='mt-2 flex items-center'>
                        <div onClick={() => { navigate(`/profile/${rapt.userId}`) }} className="relative w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer">
                            <svg className="absolute w-7 h-7 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                        </div>
                        <p onClick={() => { navigate(`/profile/${rapt.userId}`) }} className="ml-3 text-xs text-muted-foreground cursor-pointer">{rapt.user.name}</p>
                    </div>
                    <div className="">
                        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                            <Markdown>{displayContent}</Markdown>
                        </p>
                    </div>
                </div>

                <div className="sm:flex sm:items-end sm:justify-end">
                    <Link
                        to={`/rapt/${rapt?.id}`}
                        className="block bg-black px-5 py-3 text-center text-xs font-bold uppercase text-white transition hover:bg-black"
                    >
                        Open Rapt
                    </Link>
                </div>
            </div>

        </article>
    )
}