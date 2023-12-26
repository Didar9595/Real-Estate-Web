import { Stack, Typography,Avatar, Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'
import {Link} from 'react-router-dom'
import ListingItems from '../components/ListingItems'

const Home = () => {
  SwiperCore.use([Navigation])
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])
 



  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4')
        const data = await res.json()
        setOfferListings(data)
        fetchSaleListings()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4')
        const data = await res.json()
        setSaleListings(data)
        fetchRentListings()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4')
        const data = await res.json()
        setRentListings(data)
      } catch (error) {
        console.log(error)
      }
    }


    fetchOfferListings()
  }, [])

  return (
    <Stack direction='column'>
      {/* top */}
      <Stack direction='column' spacing={4} sx={{ padding: '7em 7em', background: 'linear-gradient(to right,white,#c5dbfc)' }}>
        <Stack direction='column' spacing={2}>
          <Stack direction='row' spacing={2}>
            <Typography variant='h3' sx={{ fontFamily: 'poppins', color: '#161b21', fontWeight: 'bold' }}>Navigate your next</Typography>
            <Typography variant='h3' sx={{ fontFamily: 'poppins', color: '#444d5c', fontWeight: 'bold' }}>perfect</Typography>
          </Stack>
          <Stack>
            <Typography variant='h3' sx={{ fontFamily: 'poppins', color: '#161b21', fontWeight: 'bold' }}>house with just a click</Typography>
          </Stack>
        </Stack>
        <Stack direction='column' spacing={1}>
          <Typography sx={{ fontFamily: 'poppins', color: '444d5c' }}>The website will help you to find your home fast with just a click, accurate, comfortable way.</Typography>
          <Typography sx={{ fontFamily: 'poppins', color: '444d5c' }}>Our service is always with you 24*7</Typography>
        </Stack>
        <Typography sx={{ fontFamily: 'poppins', color: '#52e602' }}>Let's started...</Typography>
      </Stack>
      {/* swiper */}
      <Box > 
        <Swiper navigation>
          {
            offerListings && offerListings.length>0 && offerListings.map((listing)=>(
              <SwiperSlide >
                <Avatar key={listing._id} src={listing.imageUrls[0]} variant='square' sx={{width:'100%',height:'550px'}}/>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </Box>
      <Stack direction='column' spacing={10} sx={{padding:'5em 3em',background:'linear-gradient(to left,white,#c5dbfc)'}}>
         {
            offerListings && offerListings.length>0 &&(
              <Stack spacing={2}>
                  <Typography variant='h4' sx={{fontFamily:'poppins'}}>Recent Offers</Typography>
                  <Link to='/search?offer=true'>Show more offers...</Link>
                  <Grid container rowSpacing={4} columnSpacing={2}>
                  {
                    offerListings.map(listing=>(
                      <Grid item xs={3}>
                      <ListingItems listing={listing} key={listing._id}/>
                      </Grid>
                    ))
                  }
                  </Grid>
              </Stack>
            )
         }
         {
            saleListings && saleListings.length>0 &&(
              <Stack spacing={2}>
                  <Typography variant='h4' sx={{fontFamily:'poppins'}}>Recent Sales</Typography>
                  <Link to='/search?type=sale'>Show more Sales...</Link>
                  <Grid container rowSpacing={4} columnSpacing={2}>
                  {
                    saleListings.map(listing=>(
                      <Grid item xs={3}>
                      <ListingItems listing={listing} key={listing._id}/>
                      </Grid>
                    ))
                  }
                  </Grid>
              </Stack>
            )
         }
         {
            rentListings && rentListings.length>0 &&(
              <Stack spacing={2}>
                  <Typography variant='h4' sx={{fontFamily:'poppins'}}>Recent Rents</Typography>
                  <Link to='/search?type=rent'>Show more rents...</Link>
                  <Grid container rowSpacing={4} columnSpacing={2}>
                  {
                    rentListings.map(listing=>(
                      <Grid item xs={3}>
                      <ListingItems listing={listing} key={listing._id}/>
                      </Grid>
                    ))
                  }
                  </Grid>
              </Stack>
            )
         }
      </Stack>

      {/* listing result for offer,sale and rent */}
    </Stack>
  )
}

export default Home
