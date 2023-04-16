import fs from "fs"
import csv from "csv-parser"
import path from "path"
import { Post, PostEmbedding } from "@/types/global"
import chroma_collection from "@/lib/chroma"
import * as dotenv from 'dotenv' 
import { Collection } from "chromadb"
dotenv.config()


const getPosts = async()=>{
  const rows : any[] = []
  let posts : Post[] = []
  const dataPath = path.join(__dirname, "..", "data","reddit_wsb.csv") 

  await new Promise<void>((resolve, reject)=>{
    fs.createReadStream(dataPath)
      .pipe(csv())
      .on('data', (data) => rows.push(data))
      .on('error', (error)=>{
        reject(error)
      })
      .on('end', async () => {
        //create content embeddings
        posts = rows.map((row)=>(
          {
            id: row.id,
            url: row.url,
            title: row.title,
            author: "",
            content: row.body,
            createdat: row.created,
            timestamp: row.timestamp,
          }
        ))

        resolve()
    })
  })
  return posts
}

(async()=>{
  const collection = await chroma_collection("wsb-search")
  const posts = await getPosts()
  let filteredPosts = posts.filter((post)=>(
    (post.content.trim() != "" && post.content.trim()!=".")
  ))
  for (let i=0; i<20; i++){
    const subsetFilteredPosts = filteredPosts.slice(100*i, 100*(i+1))
    const ids = subsetFilteredPosts.map((post)=>post.id)
    const metadatas = subsetFilteredPosts.map((post)=>({
      url: post.url,
      title: post.title,
      author: "",
      createdat: Number(post.createdat),
      timestamp: post.timestamp,
    }))
    const contents = subsetFilteredPosts.map((post)=>post.content)
    await collection.add(
        ids,
        undefined,
        metadatas,
        contents
    )
  }
  const count = await collection.count()
  console.log(count)
})()
