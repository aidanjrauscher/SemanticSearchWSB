import useSearchStore from "@/hooks/useSearchStore"
import Link from "next/link"

export default function Posts(){

    const {posts} = useSearchStore()

    return(
        <div className="flex flex-col gap-8 overflow-auto mb-8 w-full items-center mt-8">
            {posts?.length>0 ? (
            posts.map((post)=>(
                <div key={post.id} className="bg-reddit-white border border-reddit-black rounded-md w-3/5 p-2">
                    <div className="flex flex-row justify-between pb-4 items-center pt-2">
                        <h2 className="text-2xl sm:text-xl font-semibold">{post.title}</h2>
                        <Link 
                            href={post.url}
                            rel="noopener noreferrer" 
                            target="_blank"
                            className="bg-reddit-blue text-reddit-white border-none rounded-full px-4 py-1 shadow-black shadow-md hover:opacity-75 hover:cursor-pointer hover:shadow-none"
                        >
                                See Post
                        </Link>
                    </div>
                    <p>{post.content}</p>
                </div>
            ))) : (
                <h1 className="text-reddit-black font-semibold text-2xl">Loading...</h1>
            )
            }
        </div>
    )
}