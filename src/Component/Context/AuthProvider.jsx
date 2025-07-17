import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';

import { AuthContext } from './AuthContext';
import { auth } from './Firebase';
import axios from 'axios';


const googleProvider=new GoogleAuthProvider();;
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
 const [loading,setLoading]=useState(true)
   const createUser=(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
   }

   const signUser=(email,password)=>{
     setLoading(true)
   return signInWithEmailAndPassword(auth, email, password)
   }
   

   const updateProfiles=(profile)=>{
    return updateProfile(auth.currentUser,profile)
   }


 const googleSign=()=>{
        setLoading(true)
return signInWithPopup(auth, googleProvider)
 }

const logout=()=>{
  return signOut(auth)
}

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, currentUser => {
    setUser(currentUser);
     
    if (currentUser?.email) {
     
      axios.post("https://forum-server-site.vercel.app/jwt",
        { email: currentUser?.email },
        { withCredentials: true }).
        then((result) => {
        console.log("JWT SET:", result.data);
      }).catch((err) => {
        console.error("JWT ERROR:", err);
      });
    }
   setLoading(false);
  });

  return () => unsubscribe();
},[]);



   const userInfo={
    updateProfiles,
    createUser,
    googleSign,
    signUser,
    setUser,
    loading,
    logout,
    user,
   }
    return (
        <AuthContext value={userInfo}> {children}  </AuthContext>
    );
};

export default AuthProvider;