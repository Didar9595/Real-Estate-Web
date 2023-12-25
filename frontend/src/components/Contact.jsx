import React, { useEffect, useState } from 'react'
import {Button, Stack, TextField, Typography} from '@mui/material'
import {Link} from 'react-router-dom'

const Contact = ({listing}) => {
  const [owner,setOwner]=useState(null)
  const [message,setMessage]=useState('')

  useEffect(()=>{
     const fetchOwner=async()=>{
      try {
        const res=await fetch(`/api/user/${listing.userRef}`)
        const data=await res.json()
        setOwner(data)
      } catch (error) {
        console.log(error)
      }
     }
     fetchOwner()
     console.log(owner)
     console.log(listing)
  },[listing.userRef])

  const handleMessage=(e)=>{
       setMessage(e.target.value)
  }
  
  return (
    <Stack>
      {
        owner && (
          <Stack direction='column' spacing={2}>
            <Stack direction='row' spacing={2} sx={{display:'flex',alignItems:'center'}}>
                <Typography sx={{fontFamily:'poppins'}}>Contact</Typography>
                <Typography variant='h6' sx={{fontFamily:'poppins',fontWeight:'bold'}}>{owner.username}</Typography>
                <Typography sx={{fontFamily:'poppins'}}>for</Typography>
                <Typography variant='h6' sx={{fontFamily:'poppins',fontWeight:'bold'}}>{listing.name.toLowerCase()}</Typography>
            </Stack>
            <TextField multiline maxRows={10} type='text' name='message' sx={{background:'white'}} value={message} onChange={handleMessage} placeholder='Enter your message here for the owner...'/>
            <Link to={`mailto:${owner.email}?subject=Regarding ${listing.name}&body=${message}`}><Button sx={{fontFamily:'poppins',color:'white',background:'#161b21',width:'100%'}}>Send Message</Button></Link>
          </Stack>  
        )
      }
    </Stack>
  )
}

export default Contact
