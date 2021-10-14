import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from '../../layout/PageLayout';
import PropTypes from 'prop-types';

/**
 * Post
 * @author Sushen Kumar "su@sushen.dev"
 * @param {*} {location: { pathname } } route path
 * @return {*} 
 */
const Post = ({location: { pathname } }) => {
  const [post, setPost] = useState({});
  console.log("Pathame:", pathname)
  const id = pathname.split('/')[2]
  console.log("id:", id)
  useEffect(() => {
    const getPost = async () => {
      const resp = await fetch(
        `https://post_worker.sushenk.workers.dev?id=${id}`
      );
      const postResp = await resp.json();
      setPost(postResp);
    };

    getPost();
  }, [id]);

  if (Object.keys(post).length===0) return <div />;

  return (
    <div>
      <PageLayout title={post.title}>
      <h3>User: {post.username}</h3>
      <h4>{post.content}</h4>
      </PageLayout>
      <p>
        <em>Published {new Date(post.published_at).toLocaleString()}</em>
      </p>
      <p>
      <Link
            to={{pathname: `/`}}
          >Go Home</Link>
      </p>
    </div>
  );
};


Post.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Post;
