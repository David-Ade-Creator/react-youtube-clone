import React, { useState } from 'react'
import { Grid, Avatar } from '@material-ui/core'
import Likedislikes from './Likedislikes'
import { useSelector } from 'react-redux';
import Axios from 'axios';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

export default function Comments(props) {
    const [Comment,setComment] = useState("");
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: Comment,
            writer: userInfo.user._id,
            postId: props.postId
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    return (
        <Grid item lg={10} md={10} sm={10} xs={10} style={{marginTop:'20px'}}>
                           <Grid container>
                               <Grid item lg={12} md={12} sm={12} xs={12}>
                                   <span>{props.CommentLists.length} Comments</span><br/><br/>
                                   <form onSubmit={onSubmit} style={{display:'flex'}}>
                                       <div>
                                           <Avatar />
                                       </div>
                                       <div style={{margin:'10px 0 0 10px'}}>
                                           <div>
                                           <input onChange={(e)=>setComment(e.target.value)} style={{width:'50vw',height:'30px',outlineWidth:'0',border:'0'}}/>
                                           </div>
                                           <div style={{float:'right'}}>
                                           <button type="submit" style={{backgroundColor:'red',outlineWidth:'0',border:'0',color:'white',fontSize:'15px'}}>
                                               Comment
                                           </button>
                                       </div>
                                       </div>
                                   </form>
                                   {console.log(props.CommentLists)}
                               </Grid>

                               {props.CommentLists && props.CommentLists.map((comment,i) => (
                                   (!comment.responseTo &&
                                    <React.Fragment>
                                   <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                                   <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                                   </React.Fragment>
                                   )
                               ))
                               }
                           </Grid>
                        </Grid>
    )
}
