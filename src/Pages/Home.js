
import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';

function Home({ isAuth }) {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getPosts();
    }, []); // Empty dependency array to ensure this runs only once

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
        // Refresh the list after deletion
        const updatedData = await getDocs(postsCollectionRef);
        setPostList(updatedData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    return (
        <div className='homePage'>
            {postLists.map((post) => (
                <div className='post' key={post.id}>
                    <div className='postHeader'>
                        <div className='title'>
                            <h1>{post.title}</h1>
                        </div>
                        <div className='deletePost'>
                            {isAuth && post.author.id === auth.currentUser.uid && (
                                <button onClick={() => deletePost(post.id)}>
                                    &#128465;
                                </button>
                            )}
                        </div>
                    </div>
                    <div className='postTextContainer'>{post.postText}</div>
                    <h3>@{post.author.name}</h3>
                </div>
            ))}
        </div>
    );
}

export default Home;




















// //import React, { useEffect, useState } from 'react'
// import {collection, getDocs,deleteDoc , doc} from 'firebase/firestore'
// import { db,auth } from '../firebase-config';

// function Home({isAuth}) {
//     const [postLists,setPostList] =useState([]);
//     const postsCollectionRef=collection(db,"posts");
//     useEffect(() =>{
//         const getPosts =async () =>{
//             const data =await getDocs(postsCollectionRef);
//             setPostList(data.docs.map((doc) =>({...doc.data(),id: doc.id})));
//         };
//         getPosts();
//     });

//     const deletePost =async (id) =>
//     {
//         const postDoc =doc(db ,"posts",id)
//       await deleteDoc(postDoc);
//     };
//   return (
//     <div className='homePage'>
//         {postLists.map((post) =>{
//         return <div className='post'>
//           <div className='postHeader'>
//            <div className='title'>
//           <h1>{post.title}</h1>
//            </div>
//             <div className='deletePost'>
//                {isAuth && post.author.id ===auth.currentUser.uuid && ( <button onClick={() =>{
//                     deletePost(post.id);
                    
//                     }}>&#128465;</button>
//                 )}
//             </div>
//             </div>  
//             <div className='postTextContainer'>{post.postText}</div>
//             <h3>@{post.author.name}</h3>

//             </div>
//     })}
//     </div>
//   )
// }

// export default Home

