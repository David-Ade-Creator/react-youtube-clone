import React, { useState } from 'react'
import { Grid, Button, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';



const Private = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' }
]

const Category = [
    { value: 0, label: "Film & Animation" },
    { value: 0, label: "Autos & Vehicles" },
    { value: 0, label: "Music" },
    { value: 0, label: "Pets & Animals" },
    { value: 0, label: "Sports" },
]

export default function Upload(props) {
    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState(0)
    const [Categories, setCategories] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [Thumbnail, setThumbnail] = useState("")

    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    console.log(userInfo.user._id);

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files)
        formData.append("file", files[0])

        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {

                    let variable = {
                        filePath: response.data.filePath,
                        fileName: response.data.fileName
                    }
                    setFilePath(response.data.filePath)

                    //gerenate thumbnail with this filepath ! 

                    Axios.post('/api/video/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {
                                setDuration(response.data.fileDuration)
                                setThumbnail(response.data.thumbsFilePath)
                                alert('Thumbnails created');
                            } else {
                                alert('Failed to make the thumbnails');
                            }
                        })


                } else {
                    alert('failed to save the video in server')
                }
            })

    }

    const onSubmit = (e) => {

        e.preventDefault();

        if (!userInfo) {
            return alert('Please Log in First')
        }

        if (title === "" || Description === "" ||
            Categories === "" || FilePath === "" ||
            Duration === "" || Thumbnail === "") {
            return alert('Please first fill all the fields')
        }

        const variables = {
            writer: userInfo.user._id,
            title: title,
            description: Description,
            privacy: privacy,
            filePath: FilePath,
            category: Categories,
            duration: Duration,
            thumbnail: Thumbnail
        }

        Axios.post('/api/video/uploadVideo', variables)
            .then(response => {
                if (response.data.success) {
                    alert('video Uploaded Successfully')
                    props.history.push('/')
                } else {
                    alert('Failed to upload video')
                }
            })

    }


    return (
        <div>
           <form onSubmit={onSubmit}>
              <Grid container justify="center" spacing={3}>
                  <Grid item lg={8} md={8} sm={12} xs={12}>
                      <h3 style={{fontSize:'20px',fontWeight:'lighter',textAlign:'center'}}>Upload a video</h3>
                  </Grid>
               <Grid item lg={8}  md={8} sm={12} xs={12} style={{display:'flex', justifyContent:'space-between'}}>
               <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                   <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center',color:'black' }} 
                   {...getRootProps()} >
                     <input {...getInputProps()} />
                      <IconButton><AddIcon /></IconButton>
                   </div> )}
                   </Dropzone>
                 {Thumbnail !== "" &&
                        <div>
                            <img src={`http://localhost:4000/${Thumbnail}`} alt="haha" />
                        </div>
                    }
                   
               </Grid>
               <Grid item lg={8}  md={8} sm={12} xs={12}>
                 <input type="text" onChange={(e)=>setTitle(e.target.value)} placeholder="Video Title"  style={{width:'100%',height:'40px',padding:'5px',outlineWidth:'0'}}/>
               </Grid>
               <Grid item lg={8}  md={8} sm={12} xs={12}>
                   <textarea  onChange={(e)=>setDescription(e.target.value)} style={{width:'100%', height:'40vh',padding:'20px',outlineWidth:'0'}}></textarea>
               </Grid>
               <Grid item lg={8}  md={8} sm={12} xs={12}>
               <select style={{outlineWidth:'0'}} onChange={(e)=>setPrivacy(e.target.value)}>
                    {Private.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
               </Grid>
               <Grid item lg={8}  md={8} sm={12} xs={12}>
               <select style={{outlineWidth:'0'}} onChange={(e)=>setCategories(e.target.value)}>
                    {Category.map((item, index) => (
                        <option key={index} value={item.label}>{item.label}</option>
                    ))}
                </select>
               </Grid>

               <Grid item lg={8}  md={8} sm={12} xs={12}>
                 <Button type="submit" >
                    Submit
                  </Button>
               </Grid>
              </Grid>
           </form> 
        </div>
    )
}
