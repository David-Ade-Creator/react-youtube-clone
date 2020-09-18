import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import VidCard from '../components/Card';
import Axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';


function Subscribedvids() {
    const [videos,setVideos] = useState([]);

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;

    let variable = { userFrom : userInfo.user._id  }

    useEffect(()=>{
        Axios.post('/api/video/getSubscriptionVideos', variable)
            .then(response => {
                if (response.data.success) {
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get subscription videos')
                }
            })
    },[])
    return (
        <div style={{padding:'30px', backgroundColor:'#f5f3f0',minHeight:'91vh'}}>
            <Grid container spacing={2}>
                {
                    videos.map((video,index) => {
                        const minutes = Math.floor(video.duration / 60);
                        const seconds = Math.floor(video.duration - minutes * 60);

                      return <VidCard 
                        key={video._id}
                        id={video._id}
                        minutes={minutes}
                        seconds={seconds}
                        image = {`http://localhost:4000/${video.thumbnail}`}
                        title={video.title}
                        writername = {video.writer.firstname}
                        writerLname = {video.writer.lastname}
                        views = {video.views}
                        time = {moment(video.createdAt).format("DD MMM YY")}
                         />
                    })
                }
            </Grid>
        </div>
    )
}

export default Subscribedvids;