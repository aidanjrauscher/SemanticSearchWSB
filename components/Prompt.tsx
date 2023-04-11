import { Settings } from "tabler-icons-react"
import useSearchStore from "@/hooks/useSearchStore"
import useSearchPosts from "@/hooks/useSearchPosts"
import { KeyboardEvent } from "react"

export default function Prompt(){

    const {query, updateQuery} = useSearchStore()
    const handleSearchPosts = useSearchPosts()

    const onEnterKey = (event: KeyboardEvent<HTMLInputElement>)=>{
        if(event.key == "Enter"){
            handleSearchPosts()
        }
    }

    return (
        <div className="mt-8 flex flex-row w-screen justify-center items-center gap-2 flex-wrap">
            <div className="relative">
                <input
                    placeholder="GameStop to the moon..."
                    value={query}
                    onChange={(e)=>updateQuery(e.target.value)}
                    onKeyDown={onEnterKey}
                    className="bg-reddit-light-gray w-[60vw] h-10 rounded-md border border-reddit-black shadow-reddit-black shadow-sm px-2 focus:outline-none"
                />
            </div>
            <button 
                onClick={handleSearchPosts}
                disabled={!query}
                className={`bg-reddit-blue text-reddit-white border-none rounded-full px-6 py-1 shadow-black shadow-md 
                               ${query ? "hover:opacity-75 hover:cursor-pointer hover:shadow-sm" : ""}`}
            >
                Find
            </button>
            {/* <Settings 
                onClick={()=>{}}
                size="30"
                className="hover:scale-110 hover:opacity-75 hover:cursor-pointer"
            /> */}
        </div>
    )
}