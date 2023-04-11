import useSearchStore from "@/hooks/useSearchStore"
import Link from "next/link"
import { NewtonsCradle } from '@uiball/loaders'
import parseMarkdownLinks from "@/components/ParsedContent"
import ParsedContent from "@/components/ParsedContent"

export default function Posts(){

    const {posts, loading} = useSearchStore()

    return(
        <div className="flex flex-col gap-8 overflow-auto mb-8 w-full items-center mt-8">
            {posts?.length>0 ? (
                posts.map((post)=>(
                    <div key={post.id} className="bg-reddit-white border border-reddit-black rounded-md w-3/5 p-2 shadow-md shadow-black">
                        <div className="flex flex-row justify-between pb-4 items-start pt-2 flex-wrap">
                            <h2 className="text-2xl sm:text-xl font-semibold w-3/5">{post.title}</h2>
                            <Link 
                                href={post.url}
                                rel="noopener noreferrer" 
                                target="_blank"
                                className="bg-reddit-blue text-reddit-white border-none rounded-full px-4 py-1 shadow-black shadow-md hover:opacity-75 hover:cursor-pointer hover:shadow-sm"
                            >
                                    See Post
                            </Link>
                        </div>
                        <div>
                            <p className="text-lg py-2">{post.timestamp}</p>
                        </div>
                        <ParsedContent text={post.content}/>
                    </div>
                ))
            ) : ( loading ? (
                <NewtonsCradle size={69} color="#fa4603" /> 
            ) : (
                <p className="text-lg text-semibold text-reddit-black pt-4 px-2">Enter a query to find posts.</p>
            ))}
        </div>
    )
}