import { Button, Grid } from '@mui/material'
import React from 'react'
import linked from "../images/linked.png"
import lens from "../images/lens.png"
import home from "../images/home.png"
import message from "../images/message.png"
import network from "../images/network.png"
import profile from "../images/profile.png"
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth, googleProvider } from '../firebase/setup'

function Navbar({userData}) {

  const navigate = useNavigate()

  const logout = async()=>{
    try{
      await signOut(auth,googleProvider)
      navigate("/")
    }catch(err){
      console.error(err)
    }
  }

  return (
    <div style={{padding:"10px",borderBottom:"1px solid #D6D6D6"}}>
      <Grid container>
        <Grid item xs={5}>
         <img style={{width:"35px",marginLeft:"80px"}} src={linked}/>
         <img style={{width:"25px",marginLeft:"20px"}} src={lens}/>
        </Grid>
        <Grid item xs={6}>
        <Link to="/main"><img style={{width:"25px",marginLeft:"20px"}} src={home}/></Link> 
         <Link to="/network" state={{currentUserProImg:userData._document?.data?.value.mapValue.fields.profile_image.stringValue,
           currentUserName:userData._document?.data?.value.mapValue.fields.username.stringValue}}><img style={{width:"25px",marginLeft:"50px"}} src={network}/></Link>
         <Link to="/network" state={{currentUserProImg:userData._document?.data?.value.mapValue.fields.profile_image.stringValue,
           currentUserName:userData._document?.data?.value.mapValue.fields.username.stringValue}}><img style={{width:"25px",marginLeft:"50px"}} src={message}/></Link>
         <img style={{width:"25px",marginLeft:"50px",borderRadius:"40px"}} src={userData._document?.data?.value.mapValue.fields.profile_image.stringValue ?? profile}/>
        </Grid>
        <Grid item sx={1}>
          <Button onClick={logout} variant="contained" size="small" sx={{color:"black",backgroundColor:"white"}}>Logout</Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Navbar
