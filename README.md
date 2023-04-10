# Semantic Search for Wall Street Bets

This a simple implementation of semantic search for a subet of the [Wall Street Bets Posts](https://www.kaggle.com/datasets/gpreda/reddit-wallstreetsbets-posts) data set on Kaggle.

The text embeddings are created using LangChain's OpenAIEmbeddings [wrapper](https://python.langchain.com/en/latest/reference/modules/embeddings.html).

Embeddings are stored in Supabase, which provides a function for the semantic search based on this [guide](https://supabase.com/blog/openai-embeddings-postgres-vector). 

###TODO:
1. Find a way to map company names and stock tickers. 
2. Finish settings so query embeddings are done with user's API key.
3. Upload fresh WSB posts to Supabase to create a current semantic search. 
4. Combine titles with content for embedding?
5. Text post-processing to fix markdown links and escaping of special characters. 
