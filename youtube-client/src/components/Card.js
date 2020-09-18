import React from 'react'
import { Grid, Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default function VidCard({
    id,
    minutes,
    seconds,
    image,
    title,
    writername,
    writerLname,
    views,
    time }) {
    return (
        <Grid item lg={3} md={3} sm={6} xs={12}>
            <Link to={`/video/${id}`} style={{textDecoration:'none',color:'black'}}>
                    <div style={{position:'relative',width:'20vw', height:'200px'}}>
                        <img src={image} alt="cardimg" width="100%" height="100%"/>
                        <div style={{position:'absolute',bottom:'0',right:'0',color:'white',padding:'5px',margin:'10px',backgroundColor:'black'}}>
                         {minutes}:{seconds}</div>
                    </div></Link>
                    <div style={{display:'flex',marginTop:'10px'}}>
                        <Avatar style={{padding:'10px',marginRight:'10px'}}/>
                    <div>
                        <div>{title}</div>
                        <div>{writername}{writerLname}</div>
                        <div>{views } views.{time}</div>
                    </div>
                    </div>
                </Grid>
    )
}
