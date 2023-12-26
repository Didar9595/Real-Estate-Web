import { Stack, Typography } from '@mui/material'
import React from 'react'

const About = () => {
  return (
    <div>
      <Stack spacing={5} sx={{padding:'4em 5em'}}> 
        <Typography variant='h4' sx={{fontFamily:'poppins'}}>About RealEstate</Typography>
        <Stack spacing={2}>
           <Typography sx={{fontFamily:'poppins'}}>Welcome to <span style={{color:'#444d5c',fontWeight:'bold'}}>RealEstate</span>, your premier destination for all your real estate needs. We understand that buying or selling a home is one of the most significant transactions in your life, and we are here to make the process smooth, seamless, and ultimately rewarding.</Typography>
           <Stack spacing={1}>
             <Typography variant='h6' sx={{fontFamily:'poppins'}}>Who We Are</Typography>
             <Typography sx={{fontFamily:'poppins'}}>At <span style={{color:'#444d5c',fontWeight:'bold'}}>RealEstate</span>, we pride ourselves on being more than just real estate agents; we are your partners in finding or selling your dream property. Our team comprises seasoned professionals with years of experience in the real estate industry. We are dedicated to providing personalized and attentive service, ensuring that your unique needs are met with the utmost care and expertise.</Typography>
           </Stack>
           <Stack spacing={1}>
             <Typography variant='h6' sx={{fontFamily:'poppins'}}>Our Mission</Typography>
             <Typography sx={{fontFamily:'poppins'}}>Our mission is to exceed your expectations by delivering exceptional results and unparalleled service. Whether you are a first-time homebuyer, an experienced investor, or looking to sell your property, we are committed to guiding you through every step of the process. We believe in building lasting relationships with our clients based on trust, integrity, and transparency.</Typography>
           </Stack>
           <Stack spacing={1}>
             <Typography variant='h6' sx={{fontFamily:'poppins'}}>Contact Us</Typography>
             <Typography sx={{fontFamily:'poppins'}}> Ready to embark on your real estate journey? Contact <span style={{color:'#444d5c',fontWeight:'bold'}}>RealEstate</span> today to schedule a consultation. We look forward to helping you achieve your real estate goals and turning your dreams into reality. Thank you for considering us as your trusted real estate partner.</Typography>
           </Stack>
           <Stack direction='row' spacing={1} sx={{display:'flex',alignItems:'center'}}>
           <Typography variant='h5' sx={{fontFamily:'poppins'}}>Email:</Typography>
           <Typography sx={{fontFamily:'poppins'}}>didarabbas@eng.rizvi.edu.in</Typography>
           </Stack>

        </Stack>
      </Stack>




















    </div>
  )
}

export default About
