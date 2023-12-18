import React from 'react'
import {Button, Stack, TextField, Typography} from '@mui/material'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
       <Stack sx={{display:'flex',alignItems:'center'}}>
        <Stack direction='column' spacing={3} sx={{width:'50%',marginTop:'4em'}}>
          <Typography variant='h3' sx={{fontFamily:'poppins',fontWeight:'bold',color:'#161b21',textAlign:'center'}}>Sign Up</Typography>
          <TextField label='Username' type='text' name='username' sx={{background:'white',color:'#161b21'}}/>
          <TextField label='Email' type='email' name='email' sx={{background:'white',color:'#161b21'}}/>
          <TextField label='Password' type='password' name='password' sx={{background:'white',color:'#161b21'}}/>
          <Button variant='contained' size='large' sx={{background:'#161b21',color:'white',fontFamily:'poppins',fontWeight:'bold'}}>Sign Up</Button>
          <Stack direction='row' spacing={2} sx={{display:'flex',alignItems:'center'}}>
            <Typography variant='body1' sx={{fontFamily:'poppins'}}>Already Have an Account?</Typography>
            <Link to='/signin'><Button variant='text' size='large' sx={{fontFamily:'poppins',color:'#444d5c'}}>Sign in</Button></Link>
          </Stack>
          </Stack>
       </Stack>
  )
}

export default Signup
