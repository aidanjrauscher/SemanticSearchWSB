import fetch from "node-fetch"
import format from "node.date-time"
import {createClient} from "@supabase/supabase-js"

export function fetchPosts(req, res){
  const extractPosts = async(children)=>{
    const filteredChildren = children.filter((child) =>
      child.data.selftext!="" && child.data.selftext!="."
    )
    const posts = filteredChildren.map((child) =>{
      const data = child.data
      const post = {
      id: data.id,
      author: data.author,
      url: data.url,
      title: data.title,
      content: data.selftext,
      createdat: data.created,
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
    for(let i=0; i<posts.length; i++){
      const { data, error } = await supabase
        .from('post')
        .select("id")
        .eq("id", posts[i].id)
      if(data?.length==0){
        await supabase.from("post").insert(posts[i])
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