import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import BlogPost from "./components/BlogPost";
import PostForm from "./components/PostForm";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [addingFormVissible, setAddingFormVissible] = useState(false);

  const formattedDate = () => {
    const currDate = new Date();

    const year = formatNumber(currDate.getFullYear());
    const month = formatNumber(currDate.getMonth() + 1);
    const day = formatNumber(currDate.getDate());
    const hour = formatNumber(currDate.getHours());
    const minutes = formatNumber(currDate.getMinutes());

    return `${day}.${month}.${year} ${hour}:${minutes}`;
  }

  const formatNumber = number => {
    return number > 9 ? number.toString() : `0${number}`;
  }

  const createPost = (nickname, text) => {
    console.log(posts);
    setPosts(
      [
        ...posts,
        {
          id: uuidv4(),
          nickname: nickname,
          text: text,
          date: formattedDate()
        }
      ]
    )
  }
  const toggleForm = () => {
    setAddingFormVissible(!addingFormVissible);
  }

  const deletePost = (id) => {
    setPosts(
      posts.filter(post => {
        return post.id !== id;
      })
    );
  }

  const editPost = (id, text) => {
    setPosts(
      posts.map(post => {
        return post.id === id ? { ...post, text: text } : post;
      })
    );
  }

  return (
    <main className="main-page">
      {
        posts.map(post => {
          return <BlogPost post={post} formattedDate={formattedDate} deletePost={deletePost} editPost={editPost} key={post.id} />
        })
      }
      {
        !addingFormVissible ? <button className="add-post-button" onClick={toggleForm}>Dodaj Post!</button> :
          <PostForm createPost={createPost} toggleForm={toggleForm} />
      }

    </main>
  )
}

export default App;
