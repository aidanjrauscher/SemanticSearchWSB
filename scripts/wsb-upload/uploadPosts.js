import fetch from "node-fetch"
import format from "node.date-time"
import chroma_collection from "./chroma"

export function fetchPosts(req, res){
  const extractPosts = async(children)=>{
    const filteredChildren = children.filter((child) =>
      child.data.selftext!="" && child.data.selftext!="."
    )
    //fix to check if 
    const posts = filteredChildren.map((child) =>{
      const data = child.data
      const post = {
      id: data.id,
      author: data.author,
      url: data.url,
      title: data.title,
      content: data.selftext,
      createdat: Math.round(Number(data.created)),
      timestamp: new Date(data.created*1000).format("Y-MM-dd HH:mm:SS")
      }
      return post
    })
    console.log("Extraction done.")
    return posts
  }

  const uploadPosts = async(posts)=>{
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE
    )
    const collection = chroma_collection("wsb-search")
    for(let i=0; i<posts.length; i++){
      const post = posts[i]
      let existanceCheck = await collection.get(post.id)
      if(existanceCheck.ids.length == 0){
        await collection.add(
          post.id,
          undefined,
          {
            url: post.url,
            title: post.title,
            author: "",
            createdat: Number(post.createda),
            timestamp: post.timestamp,
          },
          post.content
      )
      }
    }
    console.log("Upload done.")
  }

  try{
    const response = fetch("https://www.reddit.com/r/wallstreetbets/new/.json?limit=100")
    response
      .then((res) => res.json())
      .then((json) => json.data.children)
      .then((children) => {
        return extractPosts(children)
      })
      .then((posts) => {
        return uploadPosts(posts)
      })
    .then(()=>{
      res
        .status(200)
        .send("WBS Posts successfully uploaded.");
    })
  }
  catch(error){
    console.log(error)
    res
      .status(500)
      .send(`Something went wrong`);
  }
};