# Semantic Search for Wall Street Bets

This a simple implementation of semantic search for a subet of the [Wall Street Bets Posts](https://www.kaggle.com/datasets/gpreda/reddit-wallstreetsbets-posts) data set on Kaggle.

The text embeddings are created using LangChain's OpenAIEmbeddings [wrapper](https://python.langchain.com/en/latest/reference/modules/embeddings.html).

Embeddings are stored in Supabase, which provides a function for the semantic search based on this [guide](https://supabase.com/blog/openai-embeddings-postgres-vector). 

### TODO:
- [x] Text post-processing to fix markdown links and escaping of special characters.
- [x] Fetch new WSB posts from Reddit and upload to supabase via Google Cloud Funcrtion - 
- [x] Create embeddings for new posts fetched via Google Cloud Function 
- [x] Allow filtering by time 
- [x] Add author to post_embedding table and Post type 
- [ ] Filter out "*Processing img" content  
- [ ] Alternative to OpenAI for creating embeddings?
- [ ] Store embeddings somewhere other than supabase - maybe chroma?
- [ ] Run sentiment anlaysis on each post and then return collective sentiment for queries
- [ ] Filter posts based on descriptiveness/usefulness - perhaps using ChatGPT? 