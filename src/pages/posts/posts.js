import React, { useEffect, useState } from "react";
import PageLayout from '../../layout/PageLayout';
import { Link } from "react-router-dom";

/**
 * Posts
 * @author Sushen Kumar "su@sushen.dev"
 * @return {*} Layout for Posts
 */
const Posts = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const getPosts = async () => {
      const resp = await fetch("https://post_worker.sushenk.workers.dev")
      const postsResp = await resp.json();
      setPosts(postsResp.posts);
    };

    getPosts();
  }, []);
  const postURL = '/posts'
  return (
    <div>
      <PageLayout title="Posts">
      <h3>Posts</h3>
      <h5>Click a post below to view details. Please refresh the page if a post is not being displayed.</h5>
      </PageLayout>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>
          <Link
            to={{pathname: `/posts/${post.id}`, query: {postURL}}}
          >{post.title}</Link>
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Posts;


