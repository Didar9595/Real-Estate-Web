import { Stack, TextField, Typography, FormControlLabel, Checkbox ,Select,MenuItem, Button} from '@mui/material'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'


const Search = () => {
    const navigate=useNavigate()

    const [sideBarData,setSideBarData]=useState({
        searchTerm:"",type:'all',parking:false,furnished:false,offer:false,sort:'created_at',order:'desc',
    })
    const [loading,setLoading]=useState(false)
    const [listings,setListings]=useState([])

    console.log(listings)

    const handleChange=(e)=>{
         if(e.target.name==='all'||e.target.name==='rent'||e.target.name==='sale'){
            setSideBarData({...sideBarData,type:e.target.name})
         }
         if(e.target.name==='searchTerm'){
            setSideBarData({...sideBarData,searchTerm:e.target.value})
         }
         if(e.target.name==='parking'||e.target.name==='furnished'||e.target.name==='offer'){
            setSideBarData({...sideBarData,[e.target.name]:e.target.checked ||e.target.checked==='true'?true:false})
         }
         if(e.target.name==='sort_order'){
            const sort=e.target.value.split('_')[0]||'created_at';
            const order=e.target.value.split('_')[1]||'desc';
            setSideBarData({...sideBarData,sort,order})

         }
    }

    useEffect(()=>{
        const urlParams=new URLSearchParams(location.search)
        const searchTermFromUrl=urlParams.get('searchTerm')
        const typeFromUrl=urlParams.get('type')
        const parkingFromUrl=urlParams.get('parking')
        const furnishedFromUrl=urlParams.get('furnished')
        const offerFromUrl=urlParams.get('offer')
        const sortFromUrl=urlParams.get('sort')
        const orderFromUrl=urlParams.get('order')

        if(searchTermFromUrl||typeFromUrl||parkingFromUrl||furnishedFromUrl||offerFromUrl||sortFromUrl||orderFromUrl){
            setSideBarData({
                searchTerm:searchTermFromUrl||'',
                type:typeFromUrl||'all',
                parking:parkingFromUrl==='true'?true:false,
                furnished:furnishedFromUrl==='true'?true:false,
                offer:offerFromUrl==='true'?true:false,
                sort:sortFromUrl||'created_at',
                order:orderFromUrl||'desc',
            })
        }

        const fetchListings=async()=>{
             setLoading(true)
             const searchQuery=urlParams.toString()
             const res=await fetch(`/api/listing/get?${searchQuery}`)
             const data =await res.json()
             setListings(data)
             setLoading(false)
        }
        fetchListings()

    },[location.search])


    const handleSubmit=()=>{
          const urlParams=new URLSearchParams()
          urlParams.set('searchTerm',sideBarData.searchTerm)
          urlParams.set('type',sideBarData.type)
          urlParams.set('parking',sideBarData.parking)
          urlParams.set('furnished',sideBarData.furnished)
          urlParams.set('offer',sideBarData.offer)
          urlParams.set('sort',sideBarData.sort)
          urlParams.set('order',sideBarData.order)
          const searchQuery=urlParams.toString()

          navigate(`/search?${searchQuery}`)
    }


    return (
        <Stack direction='column'>
            <Stack direction='row' spacing={6} sx={{ borderBottom: '0.1px solid #444d5c', height: '25vh', display: 'flex', alignItems: 'center',justifyContent:'center', padding: '1.5em 4em' }}>
                <Stack direction='row' spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='h6' sx={{ fontFamily: 'poppins', fontWeight: 'bold' }}>Search Term:</Typography>
                    <TextField size='small' type='text' name='searchTerm' placeholder='Search...' sx={{ background: 'white' }} value={sideBarData.searchTerm} onChange={handleChange}/>
                </Stack>
                <Stack direction='column' >
                    <Typography variant='h6' sx={{ fontFamily: 'poppins', fontWeight: 'bold' }}>Type:</Typography>
                    <FormControlLabel control={<Checkbox name='all' onChange={handleChange} checked={sideBarData.type==='all'}/>} label="Sale and Rent" sx={{ fontSize: '1.2em' }} />
                    <FormControlLabel control={<Checkbox name='sale' onChange={handleChange} checked={sideBarData.type==='sale'}/>} label="Sale" sx={{ fontSize: '1.2em' }} />
                    <FormControlLabel control={<Checkbox name='rent' onChange={handleChange} checked={sideBarData.type==='rent'}/>} label="Rent" sx={{ fontSize: '1.2em' }} />
                    <FormControlLabel control={<Checkbox name='offer' onChange={handleChange} checked={sideBarData.offer}/>} label="Offer" sx={{ fontSize: '1.2em' }} />
                </Stack>
                <Stack direction='column' spacing={2}>
                    <Typography variant='h6' sx={{ fontFamily: 'poppins', fontWeight: 'bold' }}>Amenities:</Typography>
                    <FormControlLabel control={<Checkbox name='parking' onChange={handleChange} checked={sideBarData.parking}/>} label="Parking" sx={{ fontSize: '1.2em' }} />
                    <FormControlLabel control={<Checkbox name='furnished' onChange={handleChange} checked={sideBarData.furnished}/>} label="Furnished" sx={{ fontSize: '1.2em' }} />
                </Stack>
                <Stack direction='row' spacing={1} sx={{ display: 'flex', alignItems: 'center',width:'20%'}}>
                    <Typography variant='h6' sx={{ fontFamily: 'poppins', fontWeight: 'bold' }}>Sort :</Typography>
                    <Select name='sort_order' size='small' onChange={handleChange} defaultValue={'created_at_desc'} sx={{background:'white',width:'70%'}}>
                        <MenuItem value='regularPrice_desc'>Price high to low</MenuItem>
                        <MenuItem value='regularPrice_asc'>Price low to high</MenuItem>
                        <MenuItem value='createdAt_desc'>Latest</MenuItem>
                        <MenuItem value='createdAt_asc'>Oldest</MenuItem>
                    </Select>
                </Stack>
                <Button variant='contained' size='small' sx={{background:'#444d5c',color:'white',fontFamily:'poppins',fontWeight:'bold',width:'20%'}} onClick={handleSubmit}>Search</Button>
            </Stack>
            <Stack direction='column' spacing={2} sx={{padding:'1em 5em'}}>
               <Typography variant='h4' sx={{fontFamily:'poppins',fontWeight:'bold'}}>Listings:</Typography> 
               
            </Stack>
        </Stack>
    )
}

export default Search
