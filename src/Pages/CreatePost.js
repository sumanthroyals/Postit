import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const postsCollectionRef = collection(db, "posts");
  const navigate = useNavigate();

  const createPost = async () => {
    try {
      if (!isAuth) {
        navigate("/login");
        return;
      }

      // Check if user is authenticated and displayName exists
      if (!auth.currentUser || !auth.currentUser.displayName) {
        console.error("User not authenticated or displayName not available.");
        return;
      }

      await addDoc(postsCollectionRef, {
        title,
        postText,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid
        },
      });
      
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);
    
  return (
    <div className='createPostPage'>
      <div className='cpContainer'>
        <h1>Create A Post</h1>
        <div className='inputGp'>
          <label>Title:</label>
          <input placeholder='Title....' value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div className='inputGp'>
          <label>Post:</label>
          <textarea placeholder='Post...' value={postText} onChange={(event) => setPostText(event.target.value)} />
        </div>
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;
