import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '@/lib/supabase'
import { OpenAIEmbeddings } from "langchain/embeddings"
import { start } from 'repl'


type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>){

  let {query, startTimestamp, endTimestamp} = req.body 
  
  if(!query){
    res.status(400).end()
  }

  if(!startTimestamp){
    startTimestamp = new Date(0).toISOString().substr(0, 10);
  }
  else{
    startTimestamp+=" 00:00:00"
  }

  if(!endTimestamp){
    endTimestamp = new Date().toISOString().substr(0, 10);
  }
  else{
    endTimestamp+=" 59:59:59"
  }

  try{
    const embeddings = new OpenAIEmbeddings()
    const queryEmbedding = await embeddings.embedQuery(query)
    const { data: posts } = await supabase.rpc('match_posts', {
      query_embedding: queryEmbedding,
      similarity_threshold: 0.8, // Choose an appropriate threshold for your data
    })
      .gte("timestamp", startTimestamp)
      .lte("timestamp", endTimestamp)
    res.status(200).json(posts)
  }
  catch(error){
    console.log(error)
    res.status(400).end()
  }
}
