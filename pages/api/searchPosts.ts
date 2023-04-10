import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '@/lib/supabase'
import { OpenAIEmbeddings } from "langchain/embeddings"


type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){

  const {query} = req.body 
  if(!query){
    res.status(400).end()
  }
  try{
    const embeddings = new OpenAIEmbeddings()
    const queryEmbedding = await embeddings.embedQuery(query)
    const { data: posts } = await supabase.rpc('match_posts', {
      query_embedding: queryEmbedding,
      similarity_threshold: 0.75, // Choose an appropriate threshold for your data
    })
    res.status(200).json(posts)
  }
  catch(error){
    console.log(error)
    res.status(400).end()
  }
}
