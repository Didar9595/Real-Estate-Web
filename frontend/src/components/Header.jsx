import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, InputAdornment,Stack, TextField, Toolbar, Typography, imageListClasses } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import {Link,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';


const Header = () => {
  const {currentUser}=useSelector(state=>state.user)
  const [searchTerm,setSearchTerm]=useState('')
  const navigate=useNavigate()

  const handleSubmit=()=>{
     const urlParams=new URLSearchParams(window.location.search)
     urlParams.set('searchTerm',searchTerm)
     const searchQuery=urlParams.toString()
     navigate(`/search?${searchQuery}`);
  }

  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search)
    const searchTermFromUrl=urlParams.get('searchTerm')
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
  },[location.search])

  return (
    <AppBar position='stick'>
      <Toolbar sx={{ background: '#c5dbfc', height: '10vh' }}>
        <Stack direction='row' sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }} >
          <Stack direction='row'>
            <Typography variant='h5' sx={{ fontFamily: 'poppins', fontWeight: 'bold', color: '#444d5c' }}>Real</Typography>
            <Typography variant='h5' sx={{ fontFamily: 'poppins', fontWeight: 'bold', color: '#161b21' }}>Estate</Typography>
          </Stack>
          <Stack direction='row' spacing={2}>
            <Link to='/'><Button size='large' variant='text' sx={{ fontFamily: 'poppins', color: '#161b21' }}>Home</Button></Link>
            <Link to='/about' > <Button size='large' variant='text' sx={{ fontFamily: 'poppins', color: '#161b21' }}>About</Button></Link>
            <Link to='/profile'>
              {
                currentUser?<Avatar src={currentUser.avatar} alt='Profile-pic' width={50} height={50}/>:<Button size='large' variant='text'  sx={{ fontFamily: 'poppins', color: '#161b21' }}>Login</Button>
              }
            </Link>
          </Stack>
          <Stack >
            <TextField placeholder='Search...' size='small' InputProps={{ endAdornment: <InputAdornment position='end'><SearchIcon sx={{ color: '#161b21' }} onClick={handleSubmit}/></InputAdornment> }} sx={{ background: '#dce8fa', border: 'none', borderRadius: '0.4rem' }} value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Header
