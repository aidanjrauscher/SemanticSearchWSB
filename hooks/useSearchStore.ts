import { Post } from "@/types/global";
import {create} from "zustand"

export interface SearchStoreInterface{
    query: string;
    updateQuery: (query: string)=>void;
    posts: Post[];
    updatePosts: (posts: Post[])=>void
}

const useSearchStore = create<SearchStoreInterface>((set)=>({
    query: "",
    updateQuery: (query)=>set({query: query}),
    posts: [],
    updatePosts: (posts)=>set({posts:posts})
}))

export default useSearchStore