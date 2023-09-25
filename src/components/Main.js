import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Home from './Home'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { auth, database } from '../firebase/setup'

function Main() {

  const [userData,setUserData] = useState([])



const getUser = ()=>{
  setTimeout(async()=>{
    try{
      const userDocument = doc(database,"Users",`${auth.currentUser?.uid}`)
      const data = await getDoc(userDocument)
      setUserData(data)
    }catch(err){
      console.log(err)
    }
  },1000)
  
}


  useEffect(()=>{
     getUser()
  },[])



  return (
    <div>
      <Navbar userData={userData}/>
      <Home userData={userData}/>
    </div>
  )
}

export default Main
