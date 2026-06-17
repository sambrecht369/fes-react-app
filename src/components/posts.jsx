    import React from 'react';
    import { onAuthStateChanged } from 'firebase/auth';
    import { TbIndentIncrease } from "react-icons/tb";
    import { user } from '@firebase/auth';
    import {auth, db} from '../firebase/init';
    import { collection, addDoc, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
    
    


const Posts = () => {

const [user, setUser] = React.useState({});
const [loading, setLoading] = React.useState(true);
 



    function createPost() {
      const post = {
        title: "Land a $300k job",
        description: "Finish Frontend Simplified",
        uid: user.uid,
      };
      addDoc(collection(db, "posts"), post);
      
    }

    async function getAllPosts() {
      const { docs } = await getDocs(collection(db, "posts"));
      const posts = docs.map((elem) => ({...elem.data(), id: elem.id }));
      console.log(posts);
    }

    


    


    return (
        <div>
            <button onClick={createPost}>Create Post</button>
            <button onClick={getAllPosts}>Get All Posts</button>
            
        </div>
    )}

    export default Posts;