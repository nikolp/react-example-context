import './App.css'
import CountersContextProvider from './store/counters-context'
import CounterList from './components/CounterList'
import AddCounter from './components/AddCounter';
import type { BlogPost } from './components/BlogPosts';
import { useEffect, useState, type ReactNode } from 'react';
import { get } from './util/http';
import BlogPosts from './components/BlogPosts';

type RawDataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  // context managed directly here instead of the context which is for Counters
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // only runs once, since dependencies
  useEffect(() => {
    // inner fuction can be async but not the outer
    async function fetchPosts() {
      setIsFetching(true);
      const data = (await get(
        'https://jsonplaceholder.typicode.com/posts'
      )) as RawDataBlogPost[];  // this is where we typecast the unknown into what we know will come

      // typical quick in-place transformation from api object
      // to what you actually like to use
      const blogPosts: BlogPost[] = data.map((rawPost) => {
        return {
          id: rawPost.id,
          title: rawPost.title,
          text: rawPost.body,
        };
      });

      setFetchedPosts(blogPosts);
      setIsFetching(false);
    }

    fetchPosts();
  }, []); // dependencies list empty so will only run once

  // workaround because TS thinks fetchedPosts could be undefined
  let blogContent: ReactNode;
  if (isFetching) {
    blogContent = <h1>Still Loading...</h1>;
  }
  if (fetchedPosts) {
    // over here TS know fetchedPosts is NOT undefined so does not complain
    blogContent = <BlogPosts posts={fetchedPosts.slice(0, 3)} />;
  }


  return (
    <>
      <h1>Simple project</h1>
      {blogContent}
      <CountersContextProvider>
        <AddCounter/>
        <div className="card">
          <CounterList/>
        </div>
      </CountersContextProvider>
    </>
  );
}

export default App
