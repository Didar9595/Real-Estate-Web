import { Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Signin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  }
  const handleClick = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await fetch("api/auth/signin",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        }
      )
      const data = await res.json()
      if (data.success === false) {
        setError(data.message)
        setLoading(false)
        return;
      }
      setLoading(false)
      setError(null)
      navigate('/')
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }

  }


  return (
    <Stack sx={{ display: 'flex', alignItems: 'center' }}>
      <Stack direction='column' spacing={3} sx={{ width: '50%', marginTop: '4em', border: '0px solid #444d5c', boxShadow: '10px 10px 40px 2px', padding: '2em', borderRadius: '0.5em', background: '#dce8fa' }}>
        <Typography variant='h3' sx={{ fontFamily: 'poppins', fontWeight: 'bold', color: '#161b21', textAlign: 'center' }}>Sign In</Typography>
        <TextField label='Email' type='email' name='email' sx={{ background: 'white', color: '#161b21' }} onChange={handleChange} />
        <TextField label='Password' type='password' name='password' sx={{ background: 'white', color: '#161b21' }} onChange={handleChange} />
        <Button variant='contained' size='large' sx={{ background: '#161b21', color: 'white', fontFamily: 'poppins', fontWeight: 'bold' }} onClick={handleClick}>{loading ? 'Loading...' : 'Sign In'}</Button>
        <Stack direction='row' spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='body1' sx={{ fontFamily: 'poppins' }}>Don't Have an Account?</Typography>
          <Link to='/signup'><Button variant='text' size='large' sx={{ fontFamily: 'poppins', color: '#444d5c' }}>Sign Up</Button></Link>
        </Stack>
        {
          error && <Typography color='error' sx={{ fontFamily: 'poppins' }}>{error}</Typography>
        }
      </Stack>
    </Stack>
  )
}

export default Signin
