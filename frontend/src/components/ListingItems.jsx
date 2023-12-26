import React from 'react'
import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ListingItems = ({listing}) => {
  return (
    <Card sx={{width:'full'}}>
      <Link to={`/listing/${listing._id}`}>
         <CardMedia component='img' image={listing.imageUrls} alt='listing-image' height={220} sx={{'&:hover':{transform:'scale(1.05)'},transition: 'transform 0.3s ease-in-out',}}/>
         <CardContent sx={{color:'black',display:'flex',flexDirection:'column',gap:'1em'}}>
          <Typography variant='h5' sx={{fontFamily:'poppins',fontWeight:'bold',whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}>{listing.name}</Typography>
          <Typography variant='subtitle2' sx={{fontFamily:'poppins',whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}><LocationOnIcon size='small' color='success'/>{listing.address}</Typography>
          <Typography sx={{fontFamily:'poppins',maxHeight:'10vh',overflowY:'scroll',overflowX:'hidden'}}>{listing.description}</Typography>
          <Typography variant='h6' sx={{fontFamily:'poppins',fontWeight:'bold'}}>$
            {
                listing.offer ? listing.discountPrice.toLocaleString('en-US'): listing.regularPrice.toLocaleString('en-US')
            }
            {
                listing.type==='rent'?'/month':''
            }
          </Typography>
          <Stack direction='row' spacing={4}>
             <Typography sx={{fontFamily:'poppins',color:'green'}}>{listing.bedrooms>1?`${listing.bedrooms} beds`:`${listing.bedrooms} bed`}</Typography>
             <Typography sx={{fontFamily:'poppins',color:'green'}}>{listing.bathrooms>1?`${listing.bathrooms} baths`:`${listing.bathrooms} bath`}</Typography>
          </Stack>
         </CardContent>
      </Link>
    </Card>
  )
}

export default ListingItems
