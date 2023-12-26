import { Stack,Typography} from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <Stack direction='column' sx={{marginTop:'4em',display:'flex',alignItems:'center',padding:'2em 0em',borderTop:'0.1px solid #444d5c'}}>
            <Stack direction='row'>
                <Typography variant='h5' sx={{ fontFamily: 'poppins', fontWeight: 'bold', color: '#444d5c' }}>Real</Typography>
                <Typography variant='h5' sx={{ fontFamily: 'poppins', fontWeight: 'bold', color: '#161b21' }}>Estate</Typography>
            </Stack>
            <Typography variant='h6' sx={{fontFamily:'poppins'}}>Copyright &copy; - All Rights Reserved</Typography>
            <Stack direction='row' spacing={1}>
            <Typography variant='h6' sx={{fontFamily:'poppins'}}>Created and Maintained by</Typography>
            <Typography variant='h6' sx={{fontFamily:'poppins',color:'green',transition:'transform 0.3s ease-in-out','&:hover':{transform:'translateX(20px)'}}}>Didar Abbas</Typography>
            </Stack>
        </Stack>
    )
}

export default Footer
