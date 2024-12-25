import { type ReactNode, useEffect, useState } from "react";
import { get } from "./util/http.ts";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import fetchingImg from "./assets/data-fetching.png";

type RawDataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
  useEffect(() => {
    async function fetchPosts() {
      
      const data = (await get(
        "https://jsonplaceholder.typicode.com/posts"
      )) as RawDataBlogPost[];
      const blogPosts: BlogPost[] = data.map((rawpost) => {
        return {
          id: rawpost.id,
          title: rawpost.title,
          text: rawpost.body,
          
        };
        
      });
      setFetchedPosts(blogPosts);
      console.log("ok");

    }
    fetchPosts();
  }, []);

  let content: ReactNode;
  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />;
  }

  return (
    <main>
      <img src={fetchingImg} alt=" An abstract of fetching data"></img>
      {content}
    </main>
  );
}

export default App;
