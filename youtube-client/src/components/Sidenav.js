import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import Axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function Sidenav() {

    const [videos,setVideos] = useState([]);

    useEffect(()=>{
        Axios.get('/api/video/getvideos')
        .then(response => {
            if(response.data.success){
                setVideos(response.data.videos)
            } else {
                alert('Failed to retrieve videos')
            }
        })
    },[])

    
    return (
        <Grid item lg={4} md={4} sm={12} xs={12}>
        <Grid container>

        {
            videos.map((video,index) => {
                const minutes = Math.floor(video.duration / 60);
                        const seconds = Math.floor(video.duration - minutes * 60);

            return <Link to={`/video/${video._id}`} key={video._id} style={{textDecoration:'none',color:'black'}}>
            <Grid item lg={12} style={{display:'flex',marginTop:'10px'}}>
                <img src={`http://localhost:4000/${video.thumbnail}`} width="50%" height='160px' style={{margin:'0 10px 0 10px'}}/>
            <div>
                <span>{video.title}</span><br/>
                <span>{video.writer.firstname}{video.writer.lastname}</span><br/>
                <span>{video.views}views .{moment(video.createdAt).format("DD MMM YY")}</span>
             </div>
        </Grid>
        </Link>
            })
        }
        
        </Grid>
    </Grid>
    )
}
