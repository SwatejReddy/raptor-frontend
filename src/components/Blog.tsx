import { raptByIdSelector } from "@/recoil/atoms/blogAtoms"
import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"

// interface rapt {
//     id: string;
//     userId: string;
//     title: string;
//     content: string;
//     likes: number;
//     bookmarks: number;
//     dateCreated: string;
//     dateUpdated: string;
// }

export const Blog = ({ id }: { id: string }) => {
    const rapt = useRecoilValue(raptByIdSelector(id))
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

            <div className="hidden sm:block sm:basis-56">
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                    className="aspect-square h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col justify-between">
                <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                    <a href="#">
                        <h3 className="font-bold uppercase text-gray-900">
                            {/* Finding the right guitar for your style - 5 tips */}
                            {rapt?.title}
                        </h3>
                    </a>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                        {displayContent}
                    </p>
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