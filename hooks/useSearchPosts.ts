import useSearchStore from "@/hooks/useSearchStore"
import axios from "axios"
import { Post } from "@/types/global"

export default function useSearchPosts(){

    const {query, updatePosts} = useSearchStore()

    const handleSearchPosts = async()=>{
        if(!query){
            return
        }

        const response = await axios.post("/api/searchPosts", {query})

        const posts: Post[] = response.data
        updatePosts(posts)
    }

    return handleSearchPosts
}