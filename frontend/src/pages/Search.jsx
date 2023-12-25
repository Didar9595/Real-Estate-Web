import { Stack, TextField, Typography, FormControlLabel, Checkbox ,Select,MenuItem, Button} from '@mui/material'
import React from 'react'

const Search = () => {
    return (
        <Stack direction='column'>
            <Stack direction='row' spacing={6} sx={{ borderBottom: '0.1px solid #444d5c', height: '25vh', display: 'flex', alignItems: 'center',justifyContent:'center', padding: '1.5em 4em' }}>
                <Stack direction='row' spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='h6' sx={{ fontFamily: 'poppins', fontWeight: 'bold' }}>Search Term:</Typography>
                    <TextField size='small' sx={{ background: 'white' }} />
                </Stack>
                <Stack direction='column' >
                    <Typography variant='h6' sx={{ fontFamily: 'poppins', fontWeight: 'bold' }}>Type:</Typography>
                    <FormControlLabel control={<Checkbox name='sar' />} label="Sale and Rent" sx={{ fontSize: '1.2em' }} />
                    <FormControlLabel control={<Checkbox name='sale' />} label="Sale" sx={{ fontSize: '1.2em' }} />
                    <FormControlLabel control={<Checkbox name='rent' />} label="Rent" sx={{ fontSize: '1.2em' }} />
                    <FormControlLabel control={<Checkbox name='offer' />} label="Offer" sx={{ fontSize: '1.2em' }} />
                </Stack>
                <Stack direction='column' spacing={2}>
                    <Typography variant='h6' sx={{ fontFamily: 'poppins', fontWeight: 'bold' }}>Amenities:</Typography>
                    <FormControlLabel control={<Checkbox name='parking' />} label="Parking" sx={{ fontSize: '1.2em' }} />
                    <FormControlLabel control={<Checkbox name='furnished' />} label="Furnished" sx={{ fontSize: '1.2em' }} />
                </Stack>
                <Stack direction='row' spacing={1} sx={{ display: 'flex', alignItems: 'center',width:'20%'}}>
                    <Typography variant='h6' sx={{ fontFamily: 'poppins', fontWeight: 'bold' }}>Sort :</Typography>
                    <Select label="" name='sort' size='small' sx={{background:'white',width:'70%'}}>
                        <MenuItem >Price high to low</MenuItem>
                        <MenuItem >Price low to high</MenuItem>
                        <MenuItem >Latest</MenuItem>
                        <MenuItem >Oldest</MenuItem>
                    </Select>
                </Stack>
                <Button variant='contained' size='small' sx={{background:'#444d5c',color:'white',fontFamily:'poppins',fontWeight:'bold',width:'20%'}}>Search</Button>
            </Stack>
            <Stack direction='column' spacing={2} sx={{padding:'1em 5em'}}>
               <Typography variant='h4' sx={{fontFamily:'poppins',fontWeight:'bold'}}>Listings:</Typography> 
               
            </Stack>
        </Stack>
    )
}

export default Search
