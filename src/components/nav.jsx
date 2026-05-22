import React from 'react';
import { TbIndentIncrease } from "react-icons/tb";
import logo from '../assets/FES.svg';
import {auth, db} from '../firebase/init';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';



const Nav = () => {


const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
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

    function createPost() {
      const post = {
        title: "Land a $200k job",
        description: "Finish Frontend Simplified",
      };
      addDoc(collection(db, "posts"), post);
      console.log("Post created");
    }



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
            <button onClick={createPost}>Create Post</button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;