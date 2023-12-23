import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Avatar, Stack, Typography } from '@mui/material'
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'

const Listing = () => {
    SwiperCore.use([Navigation])
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

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
                                      <Stack><Avatar variant='square' src={url} alt="listing-images" sx={{width:'100%',height:'550px'}}/></Stack>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </Stack>
                )
            }
        </Stack>
    )
}

export default Listing
