import { Button, List, ListItem, Paper, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {addDoc, collection, doc, getDocs} from "firebase/firestore"
import {auth, database} from "../firebase/setup"
import { useLocation } from 'react-router-dom'

function Message() {

  const location = useLocation()

  console.log(location)

  const [message,setMessage] = useState("")
  const [messageData,setMessageData] = useState([])

  const addMessage = async()=>{
    const userDoc = doc(database,"Users",`${auth.currentUser?.uid}`)
    const messageDoc = doc(userDoc,"Message",`${auth.currentUser?.uid}`)
    const messageRef = collection(messageDoc,`Message-${location.state.id}`)
    try{
      await addDoc(messageRef,{
        message:message,
        username:location.state.currentUserName,
        profile_image:location.state.currentProImg
      })
    }catch(err){
      console.error(err)
    }
  }

  const sendMessage = async()=>{
    const userDoc = doc(database,"Users",`${location.state.id}`)
    const messageDoc = doc(userDoc,"Message",`${location.state.id}`)
    const messageRef = collection(messageDoc,`Message-${auth.currentUser?.uid}`)
    try{
      await addDoc(messageRef,{
        message:message,
        username:location.state.currentUserName,
        profile_image:location.state.currentProImg
      })
      addMessage()
    }catch(err){
      console.error(err)
    }
  }


  const showMessage = async()=>{
    const userDoc = doc(database,"Users",`${auth.currentUser?.uid}`)
    const messageDoc = doc(userDoc,"Message",`${auth.currentUser?.uid}`)
    const messageRef = collection(messageDoc,`Message-${location.state.id}`)
    try{
     const data = await getDocs(messageRef)
     const filteredData = data.docs.map((doc)=>({
      ...doc.data(),
      id:doc.id
     }))
     setMessageData(filteredData)
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    showMessage()
  },[messageData])


  return (
    <div style={{padding:"30px"}}>
      <Paper>
        <List>
          <ListItem>
          <div>
        <TextField onChange={(e)=> setMessage(e.target.value)} variant='outlined' label="Type here" size='small'/>
        <Button onClick={sendMessage} sx={{ml:"30px"}} variant='contained'>Send</Button>
      </div>
          </ListItem>
        </List>
      </Paper>
     
      <div>
        {messageData.map((userMessage)=>{
          return <>
          <div style={{display:"flex",alignItems:"center"}}>
            <img style={{width:"30px",height:"30px",borderRadius:"40px"}} src={userMessage.profile_image}/>
            <h5 style={{marginLeft:"10px"}}>{userMessage.username}</h5>
          </div>
          <h5 style={{marginLeft:"30px",fontWeight:"100"}}>{userMessage.message}</h5>
          </>
        })}
      </div>
    </div>
  )
}

export default Message
