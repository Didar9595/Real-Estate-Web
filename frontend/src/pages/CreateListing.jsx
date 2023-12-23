import { Checkbox, Stack, TextField, Typography, FormControlLabel, Button, Avatar, IconButton, fabClasses } from '@mui/material'
import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'

const CreateListing = () => {
    const navigate=useNavigate()

    const { currentUser } = useSelector(state => state.user)
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '', address: '', description: '', type: 'rent', bedrooms: 1, bathrooms: 1, regularPrice: 0, discountPrice: 0, offer: false,
        parking: false, furnished: false,
    })
    const [imageUploadError, setImageUploadError] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)


    console.log(formData)
    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true)
            setImageUploadError(false)
            const promises = []
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]))
            }
            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
                setImageUploadError(false)
                setUploading(false)
            }).catch(error => {
                setImageUploadError("Image upload failed (max 2MB per image)")
                setUploading(false)
            })

        }
        else {
            setImageUploadError("Max 6 Images are allowed")
            setUploading(false)
        }
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log(`${progress}% is done`)
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                }
            )
        })
    }

    const handleRemoveImage = (index) => {
        setFormData({ ...formData, imageUrls: formData.imageUrls.filter((url, i) => i !== index) })
    }

    const handleChange = (e) => {
        if (e.target.name === 'sale' || e.target.name === 'rent') {
            setFormData({
                ...formData, type: e.target.name
            })
        }
        if (e.target.name === 'parking' || e.target.name === 'furnished' || e.target.name === 'offer') {
            setFormData({
                ...formData, [e.target.name]: e.target.checked
            })
        }
        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData({
                ...formData, [e.target.name]: e.target.value
            })
        }
    }

    const handleSubmit = async () => {
        try {
            if (formData.imageUrls.length < 1) return setError("You must upload atleast an image")
            if (formData.regularPrice < formData.discountPrice) return setError("Discount price must be less than Regular price")
            setLoading(true)
            setError(false)
            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData, userRef: currentUser._id
                })
            })
            const data = await res.json()
            setLoading(false)
            if (data.success === false) {
                setError(data.message)
            }
            navigate(`/listing/${data._id}`)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }


    return (
        <Stack sx={{ display: 'flex', alignItems: 'center', padding: '1em' }}>
            <Stack direction='column' spacing={3} sx={{ marginTop: '3em', width: '60%' }}>
                <Typography variant='h4' sx={{ fontFamily: 'poppins', fontWeight: 'bold', textAlign: 'center' }}>Create a Property Listing</Typography>
                <Stack direction='row' spacing={2} >
                    <TextField type='text' label='Name' name='name' required sx={{ width: '30%', background: 'white' }} onChange={handleChange} value={formData.name} />
                    <TextField type='text' label='Address' name='address' required sx={{ width: '70%', background: 'white' }} onChange={handleChange} value={formData.address} />
                </Stack>
                <TextField type='text' name='description' label='Description' required multiline maxRows={20} sx={{ background: 'white' }} onChange={handleChange} value={formData.description} />
                <Stack direction='row' spacing={4}>
                    <FormControlLabel control={<Checkbox name='sale' onChange={handleChange} checked={formData.type === "sale"} />} label="Sale" sx={{ fontSize: '1.2em' }} />
                    <FormControlLabel control={<Checkbox name='rent' onChange={handleChange} checked={formData.type === "rent"} />} label="Rent" sx={{ fontSize: '1.2em' }} />
                    <FormControlLabel control={<Checkbox name='parking' onChange={handleChange} checked={formData.parking} />} label="Parking Spot" sx={{ fontSize: '1.2em' }} />
                    <FormControlLabel control={<Checkbox name='furnished' onChange={handleChange} checked={formData.furnished} />} label="Furnished" sx={{ fontSize: '1.2em' }} />
                    <FormControlLabel control={<Checkbox name='offer' onChange={handleChange} checked={formData.offer} />} label="Offer" sx={{ fontSize: '1.2em' }} />
                </Stack>
                <Stack direction='row' spacing={5}>
                    <Stack direction='row' spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField type='number' name='bedrooms' required sx={{ background: 'white' }} onChange={handleChange} value={formData.bedrooms} />
                        <Typography variant='h6' sx={{ fontFamily: 'poppins', fontWeight: 'bold', }}>Bedrooms</Typography>
                    </Stack>
                    <Stack direction='row' spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField type='number' name='bathrooms' required sx={{ background: 'white' }} onChange={handleChange} value={formData.bathrooms} />
                        <Typography variant='h6' sx={{ fontFamily: 'poppins', fontWeight: 'bold', }}>Bathrooms</Typography>
                    </Stack>
                </Stack>
                <Stack direction='row' spacing={3}>
                    <TextField type='number' name='regularPrice' required sx={{ background: 'white' }} onChange={handleChange} value={formData.regularPrice} />
                    <Stack direction='column'>
                        <Typography variant='h6' sx={{ fontFamily: 'poppins', fontWeight: 'bold', }}>Regular Price</Typography>
                        <Typography sx={{ fontFamily: 'poppins', fontWeight: 'bold', }}>{formData.type==='rent'?'( $ / Month )':'($)'}</Typography>
                    </Stack>
                </Stack>
                {formData.offer && (
                    <Stack direction='row' spacing={3}>
                        <TextField type='number' name='discountPrice' required sx={{ background: 'white' }} onChange={handleChange} value={formData.discountPrice} />
                        <Stack direction='column'>
                            <Typography variant='h6' sx={{ fontFamily: 'poppins', fontWeight: 'bold', }}>Discount Price</Typography>
                            <Typography sx={{ fontFamily: 'poppins', fontWeight: 'bold', }}>{formData.type==='rent'?'( $ / Month )':'($)'}</Typography>
                        </Stack>
                    </Stack>
                )}

                <Stack direction='column' spacing={2}>
                    <Stack direction='row' spacing={1} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='h6' sx={{ fontFamily: 'poppins', fontWeight: 'bold', }}>Upload Images:</Typography>
                        <Typography>First Image will be the Cover(max allowed is 6)</Typography>
                    </Stack>
                    <Stack direction='row' spacing={3}>
                        <input onChange={e => setFiles(e.target.files)} type='file' name='images' accept='image/*' multiple style={{ border: '0.4px solid #161b21', padding: '1em', width: '70%', fontSize: '18px' }} />
                        <Button variant='filled' disabled={uploading} sx={{ fontFamily: 'poppins', fontWeight: 'bold', background: '#161b21', color: 'white', width: '20%' }} onClick={handleImageSubmit}>{uploading ? 'Uploading...' : 'Upload'}</Button>
                    </Stack>
                    <Typography variant='body1' color='error' sx={{ fontFamily: 'poppins', fontWeight: 'bold' }}>
                        {
                            imageUploadError && imageUploadError
                        }
                    </Typography>
                    <Stack spacing={3}>
                        {
                            formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                                <Stack direction='row' key={url} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Avatar src={url} alt='listing-image' variant='rounded' sx={{ width: '150px', height: '150px' }} />
                                    <Stack sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <IconButton color='error' onClick={() => handleRemoveImage(index)}><ClearIcon fontSize='large' /></IconButton>
                                    </Stack>
                                </Stack>

                            ))
                        }
                    </Stack>
                </Stack>
                <Button variant='contained' size='large' disabled={loading||uploading} sx={{ fontFamily: 'poppins', fontWeight: 'bold', color: 'white', background: '#444d5c' }} onClick={handleSubmit}>{loading ? 'Creating a listing...' : 'Create Listing'}</Button>
                <Typography color='error' sx={{ fontFamily: 'poppins', }}>
                    {
                        error && error
                    }
                </Typography>
            </Stack>
        </Stack>
    )
}

export default CreateListing
