import React from 'react'
import Sidebar from './Sidebar'
import Middle from './Middle'
import { Grid } from '@mui/material'
import RightBar from './RightBar'


function Home({userData}) {
    return (
        <div style={{backgroundColor:"#F6F7F3",height:"100%",padding:"20px"}}>
            <Grid container spacing={4}>
                <Grid item xs={3}>
                    <Sidebar userData={userData}/>
                </Grid>
                <Grid item xs={6}>
                    <Middle  userData={userData}/>
                </Grid>
                <Grid item xs={3}>
                    <RightBar/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home
