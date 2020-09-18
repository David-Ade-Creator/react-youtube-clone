import React, { useState, useEffect } from 'react'
import SingleComment from './SingleComment';

export default function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);

    const toggle = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

    useEffect(() => {

        let commentNumber = 0;
        props.CommentLists.map((comment) => {

            if (comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.CommentLists, props.parentCommentId])

    let renderReplyComment = (parentCommentId) => 
    props.CommentLists.map((comment, index)=> (
          <React.Fragment>
                {comment.responseTo === parentCommentId &&
                    <div>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} parentCommentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction} />
                    </div>
                }
            </React.Fragment>
    ))



    return (
        <div>
             {ChildCommentNumber > 0 && 
              <p style={{cursor:'pointer'}} onClick={toggle}>View {ChildCommentNumber} replies</p>
             }
             {
                 OpenReplyComments && 
                 renderReplyComment(props.parentCommentId)
             }
        </div>
    )
}
