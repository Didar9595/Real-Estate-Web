import React, { useState } from 'react'
import {Button, Stack, TextField, Typography} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [formData,setFormData]=useState({username:'',email:'',password:''})
  const [error,setError]=useState(null)
  const [loading,setLoading]=useState(false)
  
  const navigate=useNavigate()

  const handleChange=(e)=>{
    setFormData({
      ...formData,[e.target.name]:e.target.value
    })
  }
  const handleClick=async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const res=await fetch("api/auth/signup",
    {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData)
    }    
    )
    const data=await res.json()
    if(data.success===false){
      setError(data.message)
      setLoading(false)
      return;
    }
    setLoading(false)
    setError(null)
    navigate('/signin')
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
    
  }

  return (
       <Stack sx={{display:'flex',alignItems:'center'}}>
        <Stack direction='column' spacing={3} sx={{width:'50%',marginTop:'4em',border:'0px solid #444d5c',boxShadow:'10px 10px 40px 2px',padding:'2em',borderRadius:'0.5em',background:'white'}}>
          <Typography variant='h3' sx={{fontFamily:'poppins',fontWeight:'bold',color:'#161b21',textAlign:'center'}}>Sign Up</Typography>
          <TextField label='Username' type='text' name='username' sx={{color:'#161b21'}} onChange={handleChange}/>
          <TextField label='Email' type='email' name='email' sx={{color:'#161b21'}} onChange={handleChange}/>
          <TextField label='Password' type='password' name='password' sx={{color:'#161b21'}} onChange={handleChange}/>
          <Button variant='contained' size='large' disabled={loading} sx={{background:'#161b21',color:'white',fontFamily:'poppins',fontWeight:'bold'}} onClick={handleClick}>{loading?'Loading...':'Sign up'}</Button>
          <Stack direction='row' spacing={2} sx={{display:'flex',alignItems:'center'}}>
            <Typography variant='body1' sx={{fontFamily:'poppins'}}>Already Have an Account?</Typography>
            <Link to='/signin'><Button variant='text' size='large' sx={{fontFamily:'poppins',color:'#444d5c'}}>Sign in</Button></Link>
          </Stack>
          {
            error && <Typography color='error' sx={{fontFamily:'poppins'}}>{error}</Typography>
          }
          </Stack>
       </Stack>
  )
}

export default Signup
