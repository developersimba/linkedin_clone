import React from 'react'
import reactjs from "../images/reactjs.png"
import profile from "../images/profile.png"
import { Link } from 'react-router-dom'

function Sidebar({userData}) {
  
  console.log(userData._document?.data?.value.mapValue.fields.username.stringValue)

  return (
    <div style={{backgroundColor:"white",border:"1px solid #D6D6D6",width:"230px",height:"370px",borderRadius:"10px",marginLeft:"55px"}}>
      <img style={{height:"65px",width:"230px",borderTopRightRadius:"10px",borderTopLeftRadius:"10px"}} src={reactjs}/>
      <div style={{textAlign:"center"}}>
      <img src={userData._document?.data?.value.mapValue.fields.profile_image.stringValue ?? profile} style={{width:"65px",borderRadius:"40px"}}/>
      <h3 >{userData._document?.data?.value.mapValue.fields.username.stringValue}</h3>
      </div>
      <h4 style={{color:"#6F6F6F",textAlign:"center"}}>{userData._document?.data?.value.mapValue.fields.designation.stringValue}</h4>
      <div style={{color:"#6F6F6F",borderTop:"1px solid #D6D6D6",paddingLeft:"10px"}}>
        <Link to="/connect" style={{textDecoration:"none"}} state={{username:userData._document?.data?.value.mapValue.fields.username.stringValue,
          designation:userData._document?.data?.value.mapValue.fields.designation.stringValue,
          profile_img:userData._document?.data?.value.mapValue.fields.profile_image.stringValue}}><h5 style={{fontWeight:"100"}}>Connections</h5></Link>
        <Link to="/invite" style={{textDecoration:"none",color:"grey"}} state={{username:userData._document?.data?.value.mapValue.fields.username.stringValue,
          designation:userData._document?.data?.value.mapValue.fields.designation.stringValue,
          profile_img:userData._document?.data?.value.mapValue.fields.profile_image.stringValue}} ><h5  style={{fontWeight:"100"}}>Invitations</h5></Link>
      </div>
    </div>
  )
}

export default Sidebar
