import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Avatar, Button, Stack, Typography } from '@mui/material'
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import ChairIcon from '@mui/icons-material/Chair';
import { useSelector } from 'react-redux'
import Contact from '../components/Contact'

const Listing = () => {
    SwiperCore.use([Navigation])
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [contact,setContact]=useState(false)

    const {currentUser}=useSelector(state=>state.user);



    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/listing/get/${params.id}`)
                const data = await res.json()
                if (data.success === false) {
                    setError(true)
                    setLoading(false)
                    return;
                }
                setListing(data)
                setLoading(false)
                setError(false)
            } catch (error) {
                setError(true)
                setLoading(false)
            }

        }
        fetchListing()
    }, [params.id])
    return (
        <Stack sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            {
                loading ? (
                    <Typography variant='h4' sx={{ textAlign: 'center', fontFamily: 'poppins', marginTop: '2em' }}>Loading...</Typography>
                ) : error?(
                    <Typography variant='h4' sx={{ textAlign: 'center', fontFamily: 'poppins', marginTop: '2em' }}>Something went Wrong!!!</Typography>
                ):(
                    <Stack direction='column' spacing={1} sx={{width:'100%'}}>
                        <Swiper navigation>
                            {
                                listing.imageUrls.map(url=>(
                                    <SwiperSlide key={url}>
                                      <Stack sx={{padding:'0em 8em'}}><Avatar variant='square' src={url} alt="listing-images" sx={{width:'100%',height:'550px'}}/></Stack>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        <Stack direction='column' spacing={4} sx={{padding:'3em 8em'}}>
                           <Typography variant='h4' sx={{fontFamily:'poppins',fontWeight:'bold'}}>
                            {listing.name} - ${' '}
                            {listing.offer?listing.discountPrice.toLocaleString('en-US'):listing.regularPrice.toLocaleString('en-US')}
                            {listing.type==='rent' && '/Month'} 
                           </Typography>
                           <Typography sx={{fontFamily:'poppins'}}><LocationOnIcon color='success'/>  {listing.address}</Typography>
                           <Stack direction='row' spacing={3}>
                            <Typography sx={{fontFamily:'poppins',padding:'0.5em 4.5em',borderRadius:'0.4em',background:'#fa9bb9',color:'white'}}>{listing.type==='rent'?'For Rent':'For Sale'}</Typography>
                            {
                                listing.offer && (
                                    <Typography sx={{fontFamily:'poppins',padding:'0.5em 4.5em',borderRadius:'0.4em',background:'green',color:'white'}}>${+listing.regularPrice- +listing.discountPrice} discount</Typography>
                                )
                            }
                           </Stack>
                           <Stack>
                            <Typography variant='h5' sx={{fontFamily:'poppins',fontWeight:'bold'}}>Description:</Typography>
                            {listing.description}
                           </Stack>
                           <Stack direction='row' spacing={4}>
                             <Typography sx={{fontFamily:'poppins',color:'green'}}><LocalHotelIcon color='success'/> {listing.bedrooms>1?`${listing.bedrooms} bedrooms`:`${listing.bedrooms} bedroom`}</Typography>
                             <Typography sx={{fontFamily:'poppins',color:'green'}}><BathtubIcon color='success'/> {listing.bathrooms>1?`${listing.bathrooms} bathrooms`:`${listing.bathrooms} bathroom`}</Typography>
                             <Typography sx={{fontFamily:'poppins',color:'green'}}><LocalParkingIcon color='success'/> {listing.parking?"Parking":"No Parking"}</Typography>
                             <Typography sx={{fontFamily:'poppins',color:'green'}}><ChairIcon color='success'/> {listing.furnished?'Furnished':'Not Furnished'}</Typography>
                           </Stack>
                           {
                              currentUser && listing.userRef !==currentUser._id && !contact &&(
                                <Button variant='contained' size='large' onClick={()=>setContact(true)} sx={{fontFamily:'poppins',color:'white',background:'#161b21'}}>Contact Owner</Button>
                              )
                           }
                           {
                            contact && <Contact listing={listing}/>
                           }
                        </Stack>
                    </Stack>
                )
            }
        </Stack>
    )
}

export default Listing
