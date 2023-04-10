import { Post } from "@/types/global";
import {create} from "zustand"

export interface SearchStoreInterface{
    query: string;
    updateQuery: (query: string)=>void;
    posts: Post[];
    updatePosts: (posts: Post[])=>void;
    loading: boolean;
    startLoading: ()=>void;
    endLoading: ()=>void;
}

const useSearchStore = create<SearchStoreInterface>((set)=>({
    query: "",
    updateQuery: (query)=>set({query: query}),
    posts: [],
    updatePosts: (posts)=>set({posts:posts}),
    loading: false,
    startLoading: ()=>set({loading:true}),
    endLoading: ()=>set({loading:false}),
}))

export default useSearchStore