import React from 'react';
import { TbIndentIncrease } from "react-icons/tb";
import logo from '../assets/FES.svg';
import {auth, db} from '../firebase/init';
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';



const Nav = () => {


  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  
  
  
  function register() {
    createUserWithEmailAndPassword(auth, 'email@email.com', 'test123')
      .then(({user}) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, 'email@email.com', 'test123')
      .then(({user}) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });
  }
    function logout() {
    signOut(auth);
    setUser({});
  }


    async function updatePost() {
      const hardcodedId = "6qbhyacnWYQP8cVEE4uA";
      const postRef = doc(db, "posts", hardcodedId);
      const post = await getPostById(hardcodedId);
      const newPost = {
        ...post,
        title: "This is the updated title",
      };

      updateDoc(postRef, newPost);
    }

    function deletePost() {
      const hardcodedId = "6qbhyacnWYQP8cVEE4uA";
      const postRef = doc(db, "posts", hardcodedId);
      deleteDoc(postRef);
      
    }


    async function createPost() {
      const post = {
        title: "Finish Frontend Simplified",
        description: "Complete the React tutorial",
        uid: user.uid,
      };
      await addDoc(collection(db, "posts"), post);
    }

    async function getAllPosts() {
      const { docs } = await getDocs(collection(db, "posts"));
      const posts = docs.map((elem) => ({...elem.data(), id: elem.id }));
      console.log(posts);
    }

    async function getPostById() {
      const hardcodedId = "6qbhyacnWYQP8cVEE4uA";
      const postRef = doc(db, "posts", hardcodedId);
      const postSnap = await getDoc(postRef);
      console.log(postSnap.data());
      return postSnap.data();
    }

    async function getPostByUid() {
      const postCollectionRef = await query(
        collection(db, "posts"),
        where("uid", "==", user.uid)
      );
      const { docs } = await getDocs(postCollectionRef);
      console.log(docs.map(doc => doc.data()));
    }





    React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);







  return (
    <nav>
      <div className="nav__container">
        <div className="nav__logo">
            <TbIndentIncrease className='icon' />
            <img src={logo} alt="" className="logo" />
        </div>
        <div className="nav__log">
            <button
              className={user ? "user btn" : "login btn"}
              onClick={login}
            >
              {loading
                ? "Loading..."
                : user
                ? user?.email?.[0]?.toUpperCase()
                : "Login"}
            </button>
            {!user && (
                <button className='register btn' onClick={register}>
                     Register
                </button>
            )}
            <button className='logout btn' onClick={logout} >Logout</button>
          </div>
        </div>
        <div className='posts'>
          <button onClick={createPost}>Create Post</button>
          <button onClick={getAllPosts}>Get All Posts</button>
          <button onClick={getPostById}>Get Post By Id</button>
          <button onClick={getPostByUid}>Get Post By Uid</button>
          <button onClick={updatePost}>Update Post</button>
          <button onClick={deletePost}>Delete Post</button>
        </div>
    </nav>
  );
};

export default Nav;