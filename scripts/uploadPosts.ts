import fs from "fs"
import csv from "csv-parser"
import path from "path"
import { Post, PostEmbedding } from "@/types/global"
import { OpenAIEmbeddings } from "langchain/embeddings"
import supabase from "@/lib/supabase";
import * as dotenv from 'dotenv' 
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
  const posts = await getPosts()
  const filteredPosts = posts.filter((post)=>(
    (post.content.trim() != "" && post.content.trim()!=".")
  ))

  const embeddings = new OpenAIEmbeddings()

  const postEmbeddings: PostEmbedding[] = []
  for(let i=0; i<1000; i++){
    const embedding = await embeddings.embedQuery(filteredPosts[i].content)
    const postEmbedding = {...filteredPosts[i], embedding}
    const upload = await supabase.from("post_embedding").insert(postEmbedding)
  }
})()
