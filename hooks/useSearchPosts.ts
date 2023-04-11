import useSearchStore from "@/hooks/useSearchStore"
import axios from "axios"
import { Post } from "@/types/global"
import useSettingsStore from "./useSettingsStore"
import { useEffect } from "react"

export default function useSearchPosts(){

    const {query, updatePosts, startLoading, endLoading} = useSearchStore()
    const {startTimestamp, endTimestamp} = useSettingsStore()

    const handleSearchPosts = async()=>{
        if(!query){
            return
        }

        startLoading()

        const response = await axios.post("/api/searchPosts", {
            query,
            startTimestamp,
            endTimestamp
        })

        const posts: Post[] = response.data

        updatePosts(posts)
        endLoading()
    }

    useEffect(() => {
        if(query){
            handleSearchPosts();
        }
    }, [startTimestamp, endTimestamp]);

    return handleSearchPosts
}