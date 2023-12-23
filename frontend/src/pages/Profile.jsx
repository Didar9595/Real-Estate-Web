import { Avatar, Button, Stack, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import LogoutIcon from '@mui/icons-material/Logout';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signoutStart, signoutFailure, signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';


const Profile = () => {
  const fileRef = useRef(null)
  const { currentUser, loading, error } = useSelector(state => state.user)
  const [file, setFile] = useState(undefined)
  const [percentage, setPercentage] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [showListingsError, setShowListingsError] = useState(false)
  const [userListings, setUserListings] = useState([])
  
  const navigate=useNavigate()

  const dispatch = useDispatch()

  console.log(formData)
  console.log(percentage)
  console.log(fileUploadError)

  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setPercentage(Math.round(progress))
      },
      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
          ((downloadURL) =>
            setFormData({ ...formData, avatar: downloadURL })
          ).catch(err => console.log(err))
      }
    )
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      console.log(currentUser._id)
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      console.log(data)
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }

  }

  const handleLogout = async () => {
    try {
      dispatch(signoutStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutFailure(data.message))
        return;
      }
      dispatch(signoutSuccess(data))
    } catch (error) {
      dispatch(signoutFailure(error.message))
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingsError(false)
      const res = await fetch(`/api/user/listings/${currentUser._id}`)
      const data = await res.json()
      if (data.success === false) {
        setShowListingsError(true)
        return
      }
      setUserListings(data)
    } catch (error) {
      setShowListingsError(true)
    }
  }

  const handleListingDelete=async(listingId)=>{
        try {
          const res=await fetch(`/api/listing/delete/${listingId}`,{
            method:'DELETE',
          })
          const data=await res.json()
          if(data.success==false){
            console.log(data.message)
            return
          }
          setUserListings(prev=>prev.filter(listing=>listing._id!==listingId))
        } catch (error) {
          console.log('Error deleting listing')
        }
  }
  



  return (
    <Stack direction='column' spacing={3} sx={{ width: '100%', display: 'flex', alignItems: 'center' , marginTop:'8em'}}>
      <Stack direction='column' spacing={3} sx={{ width: '30%', border: '0px solid #444d5c', boxShadow: '10px 10px 40px 2px', padding: '2em', borderRadius: '0.5em', background: '#dce8fa' }}>
        <Typography variant='h4' sx={{ fontFamily: 'poppins', fontWeight: 'bold', textAlign: 'center' }}>Profile</Typography>
        <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*' />
        <Stack direction='row' sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
          <Avatar onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='Profile-pic' sx={{ width: '90px', height: '90px' }} />
          <Button variant='contained' color='success' sx={{ fontFamily: 'poppins', fontWeight: 'bold', height: '70%' }} onClick={handleShowListings}>Show Listing</Button>
        </Stack>
        <Typography sx={{ fontFamily: 'poppins', fontWeight: 'bold' }}>{fileUploadError ? ('Error Image Upload') :
          percentage > 0 && percentage < 100 ? (`Uploading ${percentage} %`) : percentage === 100 ? ('Successfully Uploaded') : ('')
        }</Typography>
        <TextField defaultValue={currentUser.username} name='username' type='text' sx={{ background: 'white' }} onChange={handleChange} />
        <TextField defaultValue={currentUser.email} name='email' type='email' sx={{ background: 'white' }} onChange={handleChange} />
        <TextField defaultValue={currentUser.password} label='Password' name='password' type='password' sx={{ background: 'white' }} onChange={handleChange} />
        <Button variant='contained' size='large' disabled={loading} sx={{ fontFamily: 'poppins', fontWeight: 'bold', color: 'white', background: '#444d5c' }} onClick={handleSubmit}>{loading ? "Loading..." : 'Update'}</Button>
        <Link to="/create-listing"><Button variant='contained' size='large' color='success' sx={{ fontFamily: 'poppins', fontWeight: 'bold', width: '100%' }}>Create Listing</Button></Link>
        <Stack direction='row' sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button color='error' size='large' sx={{ fontFamily: "poppins", fontWeight: 'bold' }} onClick={handleDelete}>Delete Account</Button>
          <Button color='error' size='large' sx={{ fontFamily: "poppins", fontWeight: 'bold' }} onClick={handleLogout}>Sign Out<LogoutIcon /></Button>
        </Stack>
        <Typography color='error' sx={{ fontFamily: 'poppins', fontWeight: 'bold' }}>{error ? error : ''}</Typography>
        <Typography color='success' sx={{ fontFamily: 'poppins', fontWeight: 'bold' }}>{updateSuccess ? 'Updated Successfully!!!' : ''}</Typography>
        <Typography color='error' sx={{ fontFamily: 'poppins', fontWeight: 'bold' }}>{showListingsError ? 'Error displaying Listing!!!' : ''}</Typography>
      </Stack>
      <Stack  sx={{width: '80%'}}>
      <Typography variant='h4' sx={{fontFamily:'poppins',fontWeight:'bold',textAlign:'center',marginTop:'2em'}}>Your Listings</Typography>
        {
          userListings.length > 0 &&
          userListings.map((listing) => (
            <Stack key={listing._id} direction='row' sx={{ display: 'flex', justifyContent: 'space-between',borderBottom:'0.5px solid #444d5c',padding:'1.5em'}}>
              <Stack direction='row' spacing={1} sx={{diaplay:'flex',alignItems:'center'}}>
              <Link to={`/listing/${listing._id}`}><Avatar src={listing.imageUrls[0]} alt='flat-img' variant='rounded' sx={{ width: '130px', height: '100px' }} /> </Link>
              <Link to={`/listing/${listing._id}`}><Typography variant='h5' sx={{fontFamily:'poppins',fontWeight:'bold',color:'black'}}>{listing.name}</Typography></Link>
              </Stack>
              <Stack direction='column' spacing={1}>
               <Link to={`/update-listing/${listing._id}`}><Button color='warning' variant='contained' sx={{ fontFamily: 'poppins', fontWeight: 'bold',color:'black' }}>Edit</Button></Link>
                <Button color='error' variant='contained' sx={{ fontFamily: 'poppins', fontWeight: 'bold' }} onClick={()=>handleListingDelete(listing._id)}>Delete</Button>
              </Stack>
            </Stack>
          ))
        }
      </Stack>
    </Stack>
  )
}

export default Profile
