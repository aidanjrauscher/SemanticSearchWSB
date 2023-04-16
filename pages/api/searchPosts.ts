import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '@/lib/supabase'
import { OpenAIEmbeddings } from "langchain/embeddings"
import chroma_collection from '@/lib/chroma'
import { Post } from '@/types/global'
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
    startTimestamp = new Date(0).toISOString().substring(0, 10);
  }
  else{
    //startTimestamp=new Date(startTimestamp)
  }

  if(!endTimestamp){
    endTimestamp = new Date().toISOString().substring(0, 10);
  }
  else{
    //endTimestamp=new Date(endTimestamp)
  }
  console.log(startTimestamp)
  console.log(endTimestamp)
  try{
    const collection = await chroma_collection("wsb-search")
    const results = await collection.query(
      undefined,
      undefined,
      // {
      //   "$and": [
      //     {
      //       "createdat": {
      //         "$gt": startTimeSeconds
      //       }
      //     },
      //     {
      //       "createdat": {
      //         "$lt": endTimeSeconds
      //       }
      //     }
      //   ]
      // },
      undefined,
      query
    )
    let posts : Post[] = []
    if(results?.ids || results.ids?.length>0){
      const ids = results.ids[0]
      const contents = results.documents[0]
      const metadatas = results.metadatas[0]
      for(let i=0; i<ids.length; i++){
        posts.push({
          id: ids[i],
          url: metadatas[i].url,
          title: metadatas[i].title,
          author: metadatas[i].author,
          content: contents[i],
          createdat: metadatas[i].createdat,
          timestamp: metadatas[i].timestamp
        })
      }
    }

    const dateFilteredPosts = posts.filter((post)=>{
      const postDate = post.timestamp.substring(0,10)
      if(startTimestamp<=postDate && postDate<=endTimestamp){
        return true
      }
      return false
    })
    res.status(200).send(dateFilteredPosts)
  }
  catch(error){
    console.log(error)
    res.status(400).end()
  }
}
