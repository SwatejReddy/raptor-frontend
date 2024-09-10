// import { useState } from "react"
// import { Button } from "./ui/button"
// import axios from "axios"

// export const RaptEditor = () => {
//     const [title, setTitle] = useState('')
//     const [content, setContent] = useState('')

//     return (
//         <div className="flex items-center w-full flex-col p-4 max-h-full">
//             <div className="w-3/4 h-16 text-3xl font-bold mb-4">
//                 <input onChange={(e) => { setTitle(e.target.value) }}
//                     className="h-full w-full outline-none placeholder-gray-500"
//                     type="text"
//                     placeholder="Enter your title here"
//                 />
//             </div>
//             <div className="w-3/4 mb-5">
//                 <textarea onChange={(e) => { setContent(e.target.value) }} className="w-full min-h-96 text-base leading-relaxed outline-none placeholder-gray-500" placeholder="Start writing your content here..."></textarea>
//             </div>
//             <div className="content-start w-3/4">
//                 <Button onClick={submitRapt} variant="default">Post</Button>
//             </div>
//         </div>
//     )
// }