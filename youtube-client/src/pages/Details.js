import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import Sidenav from '../components/Sidenav';
import Comments from '../components/Comments';
import Likedislikes from '../components/Likedislikes';
import Subscribe from '../components/Subscribe';
import Axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';

export default function Details(props) {

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;

    const videoId = props.match.params.id;
    const [Video, setVideo] = useState([]);
    const [CommentLists, setCommentLists] = useState([])

    const videoVariable = {
        videoId: videoId
    }

    

    useEffect(()=>{
        Axios.post('/api/video/getVideo', videoVariable)
        .then(response => {
            if (response.data.success) {
                setVideo(response.data.video)
            } else {
                alert('Failed to get video Info')
            }
        })

        Axios.post('/api/comment/getComments', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log('response.data.comments',response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get video Info')
                }
            })
    },[])

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }


    if(Video.writer) {
    return (
        <div style={{backgroundColor:'#f5f3f0',paddingTop:'30px'}}>
           <Grid container spacing={2}>

               <Grid item lg={8} md={8} sm={12} xs={12}>
                   <Grid container justify="center">

                       <Grid item lg={10} md={10} sm={10} xs={10}>
                           <video src={`http://localhost:4000/${Video.filePath}`} style={{width:'100%', height:'70vh'}} controls></video>
                        </Grid>

                        <Grid item lg={10} md={10} sm={10} xs={10}>
                            <h4>{Video.title}</h4>
                           <div style={{display:'flex', justifyContent:'space-between'}}>
                               <span>{Video.views} views. {moment(Video.createdAt).format("DD MMM YY")}</span>
                               <Likedislikes video videoId={videoId} userId={userInfo.user._id}/>
                           </div>
                        </Grid>

                        <Subscribe userTo = {Video.writer._id}  description={Video.description} firstname={Video.writer.firstname} lastname={Video.writer.lastname}/>

                        <Comments CommentLists={CommentLists} postId={Video._id} refreshFunction={updateComment}/>

                   </Grid>
               </Grid>
              
              <Sidenav/>
           </Grid> 
        </div>
    )} else {
        return <div>Loading...</div>
    }
}
