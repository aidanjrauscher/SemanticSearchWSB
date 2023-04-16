import { ChromaClient, OpenAIEmbeddingFunction} from "chromadb"
import * as dotenv from 'dotenv' 
dotenv.config()


const openai_embedder = ()=>{
  return new OpenAIEmbeddingFunction(process.env.OPENAI_API_KEY || "")
}

const chroma_collection = async (name: string)=>{
    const client = new ChromaClient(process.env.CHROMA_URL);
    let collections = await client.listCollections()
    let collectionNames = collections.map((collection: any)=>collection.name) 
    const embedder = openai_embedder()
    if(collectionNames.includes("wsb-search")){
      return await client.getCollection("wsb-search", embedder)
    }
    else{
      return await client.createCollection("wsb-search", {}, embedder)
    }
}

export default chroma_collection