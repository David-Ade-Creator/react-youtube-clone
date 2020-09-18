import React, { useState, useEffect } from 'react'
import { Grid, Avatar } from '@material-ui/core'
import { useSelector } from 'react-redux';
import Axios from 'axios';

export default function Subscribe(props) {

  //start codes to subscribe
  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;


  const description = props.description;
  const firstname = props.firstname;
  const lastname = props.lastname;
  const userTo = props.userTo;
  const userFrom = userInfo.user._id;

  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

const onSubscribe = () => {
  let subscribeVariables = {
              userTo : userTo,
              userFrom : userFrom
  }
  if(subscribed) {
      //when we are already subscribed 
      Axios.post('/api/subscribe/unSubscribe', subscribeVariables)
          .then(response => {
              if(response.data.success){ 
                  setSubscribeNumber(subscribeNumber - 1)
                  setSubscribed(!subscribed)
              } else {
                  alert('Failed to unsubscribe')
              }
          })

  } else {
      // when we are not subscribed yet
      
      Axios.post('/api/subscribe/subscribe', subscribeVariables)
          .then(response => {
              if(response.data.success) {
                  setSubscribeNumber(subscribeNumber + 1)
                  setSubscribed(!subscribed)
              } else {
                  alert('Failed to subscribe')
              }
          })
  }

}

useEffect(()=>{
  const subscribeNumberVariables = { userTo: userTo, userFrom: userFrom }
  Axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
      .then(response => {
          if (response.data.success) {
              setSubscribeNumber(response.data.subscribeNumber)
          } else {
              alert('Failed to get subscriber Number')
          }
      })

  Axios.post('/api/subscribe/subscribed', subscribeNumberVariables)
      .then(response => {
          if (response.data.success) {
              setSubscribed(response.data.subcribed)
          } else {
              alert('Failed to get Subscribed Information')
          }
      })
},[])
// end codes to subscribe


    return (
      <Grid item lg={10} md={10} sm={10} xs={10} style={{marginTop:'20px'}}>
      <Grid container>
          <Grid item lg={10} md={10} sm={10} xs={10} style={{display:'flex'}}>
              <span style={{padding:'15px'}}>
              <Avatar/>
              </span>
              <span>
                  <span style={{fontSize:'15px',fontWeight:'bold'}}>{firstname + ' ' + lastname}</span><br/>
                 <span>{subscribeNumber} Subscribers</span>
                 <p>{description}</p>
              </span>
          </Grid>
          <Grid item lg={2} md={2} sm={2} xs={2}>
  { userTo!==userFrom && <div>{subscribed ?
<button onClick={onSubscribe} style={{backgroundColor:'#d9d2d2',color:'black',fontSize:'16px',padding:'8px',border:'none',cursor:'pointer',outlineWidth:'0'}}>Subscribed</button> :
<button onClick={onSubscribe} style={{backgroundColor:'#bd2a15',color:'white',fontSize:'16px',padding:'8px',border:'none',cursor:'pointer',outlineWidth:'0'}}>Subscribe</button> }</div>}
</Grid>
      </Grid>
   </Grid> 
    )
}
