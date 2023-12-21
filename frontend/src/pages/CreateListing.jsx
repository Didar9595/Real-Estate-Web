import { Checkbox, Stack, TextField, Typography, FormControlLabel, Button } from '@mui/material'
import React from 'react'

const CreateListing = () => {
    return (
        <Stack sx={{ display: 'flex', alignItems: 'center',padding:'1em' }}>
            <Stack direction='column' spacing={3} sx={{ marginTop: '3em', width: '60%' }}>
                <Typography variant='h4' sx={{ fontFamily: 'poppins', fontWeight: 'bold', textAlign: 'center' }}>Create a Property Listing</Typography>
                <Stack direction='row' spacing={2} >
                    <TextField type='text' label='Name' name='name' required sx={{ width: '30%', background: 'white' }} />
                    <TextField type='text' label='Address' name='address' required sx={{ width: '70%', background: 'white' }} />
                </Stack>
                <TextField type='text' name='description' label='Description' required multiline maxRows={20} sx={{ background: 'white' }} />
                <Stack direction='row' spacing={4}>
                    <FormControlLabel control={<Checkbox name='sale' />} label="Sale" />
                    <FormControlLabel control={<Checkbox name='rent' />} label="Rent" />
                    <FormControlLabel control={<Checkbox name='parking' />} label="Parking Spot" />
                    <FormControlLabel control={<Checkbox name='furnished' />} label="Furnished" />
                    <FormControlLabel control={<Checkbox name='offer' />} label="Offer" />
                </Stack>
                <Stack direction='row' spacing={5}>
                    <Stack direction='row' spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField type='number' name='bedrooms' required sx={{ background: 'white' }} />
                        <Typography variant='h6' sx={{ fontFamily: 'poppins', fontWeight: 'bold', }}>Bedrooms</Typography>
                    </Stack>
                    <Stack direction='row' spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField type='number' name='bathrooms' required sx={{ background: 'white' }} />
                        <Typography variant='h6' sx={{ fontFamily: 'poppins', fontWeight: 'bold', }}>Bathrooms</Typography>
                    </Stack>
                </Stack>
                <Stack direction='row' spacing={3}>
                <TextField type='number' name='regularPrice' required sx={{ background: 'white' }} />
                <Stack direction='column'>
                    <Typography variant='h6' sx={{ fontFamily: 'poppins', fontWeight: 'bold', }}>Regular Price</Typography>
                    <Typography sx={{ fontFamily: 'poppins', fontWeight: 'bold', }}>($/Month)</Typography>
                </Stack>
                </Stack>
                <Stack direction='row' spacing={3}>
                <TextField type='number' name='regularPrice' required sx={{ background: 'white' }} />
                <Stack direction='column'>
                    <Typography variant='h6' sx={{ fontFamily: 'poppins', fontWeight: 'bold', }}>Discount Price</Typography>
                    <Typography sx={{ fontFamily: 'poppins', fontWeight: 'bold', }}>($/Month)</Typography>
                </Stack>
                </Stack>
               <Stack direction='column' spacing={2}>
                <Stack direction='row' spacing={1} sx={{display:'flex',alignItems:'center'}}>
                    <Typography variant='h6' sx={{ fontFamily: 'poppins', fontWeight: 'bold', }}>Upload Images:</Typography>
                    <Typography>First Image will be the Cover(max allowed is 6)</Typography>
                </Stack>
                <Stack direction='row' spacing={3}>
                <input type='file' name='images' accept='image/*' multiple style={{border:'0.4px solid #161b21',padding:'1em',width:'70%',fontSize:'18px'}}/>
                <Button variant='filled' sx={{fontFamily:'poppins',fontWeight:'bold',background:'#161b21',color:'white'}}>Upload</Button>
                </Stack>
                </Stack>
                <Button variant='contained' sx={{fontFamily:'poppins',fontWeight:'bold',color:'white',background:'#444d5c'}}>Create Listing</Button>
            </Stack>
        </Stack>
    )
}

export default CreateListing
