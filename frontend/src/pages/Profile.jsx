import { Avatar, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import LogoutIcon from '@mui/icons-material/Logout';
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';

const Profile = () => {
  const fileRef=useRef(null)
  const {currentUser}=useSelector(state=>state.user)
  const [file,setFile]=useState(undefined)
  const [percentage,setPercentage]=useState(0)
  const [fileUploadError,setFileUploadError]=useState(false)
  const [formData,setFormData]=useState({})

  console.log(formData)
  console.log(percentage)
  console.log(fileUploadError)
  
  useEffect(()=>{
    if(file){
      handleFileUpload(file)
    }
  },[file]);
  const handleFileUpload=(file)=>{
      const storage=getStorage(app)
      const fileName=new  Date().getTime() + file.name;
      const storageRef=ref(storage,fileName)
      const uploadTask=uploadBytesResumable(storageRef,file);

      uploadTask.on('state_changed',
      (snapshot)=>{
           const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
           setPercentage(Math.round(progress))
      },
      (error)=>{
        setFileUploadError(true)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL)=>
         setFormData({...formData,avatar:downloadURL})
        ).catch(err=>console.log(err))
      }
      )
  };

  return (
    <Stack sx={{width:'100%',display:'flex',alignItems:'center'}}>
      <Stack direction='column' spacing={3} sx={{width:'30%',marginTop:'4em',border:'0px solid #444d5c',boxShadow:'10px 10px 40px 2px',padding: '2em', borderRadius: '0.5em', background: '#dce8fa' }}>
         <Typography variant='h4' sx={{fontFamily:'poppins',fontWeight:'bold',textAlign:'center'}}>Profile</Typography>
         <input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/>
         <Avatar onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='Profile-pic' sx={{width:'90px',height:'90px'}} />
         <Typography sx={{fontFamily:'poppins',fontWeight:'bold'}}>{fileUploadError?('Error Image Upload'):
         percentage>0 && percentage<100?(`Uploading ${percentage} %`):percentage===100?('Successfully Uploaded'):('')
        }</Typography>
         <Typography variant='h6' sx={{fontFamily:'poppins',fontWeight:'bold'}}>{currentUser.username}</Typography>
         <Typography variant='h6'  sx={{fontFamily:'poppins',fontWeight:'bold'}}>{currentUser.email}</Typography>
         <Typography variant='h6'  sx={{fontFamily:'poppins',fontWeight:'bold'}}>{currentUser.password}</Typography>
         <Button variant='contained' size='large' sx={{fontFamily:'poppins',fontWeight:'bold',color:'white',background:'#444d5c'}}>Update</Button>
         <Stack direction='row' sx={{display:'flex',justifyContent:'space-between'}}>
          <Button color='error' size='large' sx={{fontFamily:"poppins",fontWeight:'bold'}}>Delete Account</Button>
          <Button color='error' size='large' sx={{fontFamily:"poppins",fontWeight:'bold'}}>Sign Out  <LogoutIcon/></Button>
         </Stack>
      </Stack>
    </Stack>
  )
}

export default Profile
