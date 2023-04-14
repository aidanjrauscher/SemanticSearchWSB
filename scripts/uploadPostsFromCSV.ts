import fs from "fs"
import csv from "csv-parser"
import path from "path"
import { Post, PostEmbedding } from "@/types/global"
import { ChromaClient, OpenAIEmbeddingFunction} from "chromadb"
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
  const client = new ChromaClient(process.env.CHROMA_URL);  
  const collections = await client.listCollections()
  const embedder = new OpenAIEmbeddingFunction(process.env.OPENAI_API_KEY || "")
  let collection
  console.log(collections)
  if(collections.includes("wsb-search")){
    collection = await client.createCollection("wsb-search", {}, embedder)
  }
  else{
    collection = await client.getCollection("wsb-search", embedder)
  }
  console.log(collection)

  const posts = await getPosts()
  let filteredPosts = posts.filter((post)=>(
    (post.content.trim() != "" && post.content.trim()!=".")
  ))

  filteredPosts = filteredPosts.slice(0,2001)
  const ids = filteredPosts.map((post)=>post.id)
  const contents = filteredPosts.map((post)=>post.content)
  const metadatas = filteredPosts.map((post)=>({
    url: post.url,
    title: post.title,
    author: "",
    createdat: post.createdat,
    timestamp: post.timestamp,
  }))
  const postEmbeddings: PostEmbedding[] = []
  await collection.add(
      ids,
      undefined,
      metadatas,
      contents
  )

  const count = await collection.count()
  console.log(count)
})()
