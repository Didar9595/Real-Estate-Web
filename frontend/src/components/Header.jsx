import React from 'react'
import { AppBar, Button, InputAdornment,Stack, TextField, Toolbar, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import {Link} from 'react-router-dom'


const Header = () => {
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
            <Link to='/signin'><Button size='large' variant='text'  sx={{ fontFamily: 'poppins', color: '#161b21' }}>Login</Button></Link>
          </Stack>
          <Stack >
            <TextField placeholder='Search...' size='small' InputProps={{ endAdornment: <InputAdornment position='end'><SearchIcon sx={{ color: '#161b21' }} /></InputAdornment> }} sx={{ background: '#dce8fa', border: 'none', borderRadius: '0.4rem' }} />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Header
