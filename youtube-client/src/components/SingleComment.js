import React, { useState } from 'react'
import { Grid, Avatar } from '@material-ui/core';
import moment from 'moment';
import Likedislikes from './Likedislikes';
import CommentIcon from '@material-ui/icons/Comment';
import { useSelector } from 'react-redux';
import Axios from "axios";

export default function SingleComment(props) {
    const [CommentValue,setCommentValue] = useState("");
    const [OpenReply, setOpenReply] = useState(false);

    const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: userInfo.user._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue,
        }


        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("")
                    setOpenReply(!OpenReply)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    return (
        <Grid item lg={12} md={12} sm={12} xs={12} style={{marginTop:'30px'}}>
                                   <div style={{display:'flex'}}>
                                       <span style={{padding:'20px'}}>
                                           <Avatar/>
                                       </span>
                                       <span style={{alignItems:'center'}}>
                                       <span>{props.comment.writer.firstname + ' ' + props.comment.writer.lastname + ' '}</span>
                                        <span>{moment(props.comment.createdAt).format("DD MMM YY")}</span>
                                        <p>{props.comment.content}</p>
                                           <span style={{display:'flex', justifyContent:'space-between', width:'120px'}}>
                                               <Likedislikes comment commentId={props.comment._id} userId={userInfo.user._id}/> <CommentIcon onClick={ openReply} /> </span>
                                           {OpenReply &&
                <form onSubmit={onSubmit} style={{display:'flex'}}>
                <div style={{margin:'10px 0 0 10px'}}>
                    <div>
                    <input onChange={(e)=>setCommentValue(e.target.value)} style={{width:'40vw',height:'30px',outlineWidth:'0',border:'0'}}/>
                    </div>
                    <div style={{float:'right'}}>
                    <button type="submit" style={{backgroundColor:'red',outlineWidth:'0',border:'0',color:'white',fontSize:'15px'}}>
                        Reply
                    </button>
                </div>
                </div>
            </form>
            }
                                       </span>
                                   </div>
        </Grid>
    )
}
