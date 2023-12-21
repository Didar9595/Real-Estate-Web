import { Avatar, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import LogoutIcon from '@mui/icons-material/Logout';
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { updateUserStart,updateUserSuccess,updateUserFailure,deleteUserStart,deleteUserSuccess,deleteUserFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

const Profile = () => {
  const fileRef=useRef(null)
  const {currentUser,loading,error}=useSelector(state=>state.user)
  const [file,setFile]=useState(undefined)
  const [percentage,setPercentage]=useState(0)
  const [fileUploadError,setFileUploadError]=useState(false)
  const [formData,setFormData]=useState({})
  const [updateSuccess,setUpdateSuccess]=useState(false)
  

  const dispatch=useDispatch()

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

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      console.log(currentUser._id)
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      })
      const data=await res.json()
      console.log(data)
      if(data.success===false){
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDelete=async()=>{
      try {
        dispatch(deleteUserStart())
        const res= await fetch(`/api/user/delete/${currentUser._id}`,{
          method:'DELETE',
        });
        const data=await res.json()
        if(data.success===false){
          dispatch(deleteUserFailure(data.message))
          return
        }
        dispatch(deleteUserSuccess(data))
      } catch (error) {
        dispatch(deleteUserFailure(error.message))
      }

  }


  return (
    <Stack sx={{width:'100%',display:'flex',alignItems:'center'}}>
      <Stack direction='column' spacing={3} sx={{width:'30%',marginTop:'4em',border:'0px solid #444d5c',boxShadow:'10px 10px 40px 2px',padding: '2em', borderRadius: '0.5em', background: '#dce8fa' }}>
         <Typography variant='h4' sx={{fontFamily:'poppins',fontWeight:'bold',textAlign:'center'}}>Profile</Typography>
         <input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/>
         <Avatar onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='Profile-pic' sx={{width:'90px',height:'90px'}} />
         <Typography sx={{fontFamily:'poppins',fontWeight:'bold'}}>{fileUploadError?('Error Image Upload'):
         percentage>0 && percentage<100?(`Uploading ${percentage} %`):percentage===100?('Successfully Uploaded'):('')
        }</Typography>
         <TextField defaultValue={currentUser.username}  name='username' type='text' sx={{background:'white'}} onChange={handleChange}/>
         <TextField defaultValue={currentUser.email}  name='email' type='email' sx={{background:'white'}} onChange={handleChange}/>
         <TextField defaultValue={currentUser.password} label='Password' name='password' type='password' sx={{background:'white'}} onChange={handleChange}/>
         <Button variant='contained' size='large' disabled={loading} sx={{fontFamily:'poppins',fontWeight:'bold',color:'white',background:'#444d5c'}} onClick={handleSubmit}>{loading?"Loading...":'Update'}</Button>
         <Stack direction='row' sx={{display:'flex',justifyContent:'space-between'}}>
          <Button color='error' size='large' sx={{fontFamily:"poppins",fontWeight:'bold'}} onClick={handleDelete}>Delete Account</Button>
          <Button color='error' size='large' sx={{fontFamily:"poppins",fontWeight:'bold'}}>Sign Out<LogoutIcon/></Button>
         </Stack>
         <Typography color='error' sx={{fontFamily:'poppins',fontWeight:'bold'}}>{error?error:''}</Typography>
         <Typography color='success' sx={{fontFamily:'poppins',fontWeight:'bold'}}>{updateSuccess?'Updated Successfully!!!':''}</Typography>
      </Stack>
    </Stack>
  )
}

export default Profile
