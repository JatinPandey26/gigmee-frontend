import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { gigReducer, INITIAL_STATE } from '../../Reducers/gigReducer'
import newRequest from '../../utils/newRequest';
import { upload } from '../../utils/upload';
import './AddGig.scss'
const AddGig = () => {
    const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
    const [coverFile, setCoverFile] = useState(undefined);
    const [imageFiles, setImageFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleChange = async (e) => {
        dispatch({ type: 'CHANGE_INPUT', payload: { name: e.target.name, value: e.target.value } })
    }

    const handleFeature = async (e) => {
        e.preventDefault();
        dispatch({ type: 'ADD_FEATURE', payload: e.target[0].value })
        e.target[0].value = '';
    }
    const handleUpload = async (e) => {
        setUploading(true)
        try {
            const cover = await upload(coverFile);

            const images = await Promise.all(
                [...imageFiles].map(async (file) => {
                    const url = await upload(file);
                    return url;
                })
            )

            setUploading(false)

            dispatch({ type: 'ADD_IMAGES', payload: { cover, images } })
        } catch (error) {
            console.log(error);
        }
    }
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (gig) => {
            return newRequest.post('/gigs', gig)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['get_gigs'])
        }
    })

    const navigate = useNavigate();


    const handleSubmit = async (e) => {

        mutation.mutate(state);
        navigate('/mygigs')
    }

    return (
        <div className='add-gig'>
            <div className="container">
                <h2>Add New Gig</h2>

                <div className='wrapper'>
                    <div className="left">
                        <h4>Title</h4>
                        <input type="text" name='title' placeholder="e.g. I will do something I'm really good at" onChange={handleChange} />
                        <h4>Category</h4>
                        <select name="category" id="category" onChange={handleChange}>
                            <option value="music">Music</option>
                            <option value="ai">AI</option>
                            <option value="design">Design</option>
                            <option value="editing">Editing</option>
                        </select>
                        <h4>Cover Image</h4>
                        <input type="file" onChange={e => setCoverFile(e.target.files[0])} />
                        <h4>Upload Images</h4>
                        <input type="file" multiple onChange={e => setImageFiles(e.target.files)} />
                        <button onClick={handleUpload}>Upload</button>
                        <h4>Description</h4>
                        <textarea name="desc" id="" onChange={handleChange} />
                        <button type='submit' onClick={handleSubmit} className={uploading ? 'disable' : ''}>Create</button>
                    </div>
                    <div className="right">
                        <h4>Short Title</h4>
                        <input type="text" name="shortTitle" id="" onChange={handleChange} />
                        <h4>Short Description</h4>
                        <textarea name='shortDesc' id='' onChange={handleChange} />
                        <h4>Delivery Time(e.g. 3 days)</h4>
                        <input type="text" name="deliveryTime" id="" onChange={handleChange} />
                        <h4>Revision Number</h4>
                        <input type="text" name="revisionNumber" id="" onChange={handleChange} />
                        <h4>Add Features</h4>
                        <form action="" onSubmit={handleFeature}>
                            <input type="text" name="" id="" placeholder='e.g page design' />
                            <button type='submit'>add</button>
                        </form>
                        <div className="addedFeatures">
                            {state?.features?.map((feature) => {
                                return (
                                    <div className="item" key={feature}>
                                        <button>
                                            {feature}
                                            <span
                                                onClick={() => {
                                                    dispatch({ type: 'REMOVE_FEATURE', payload: feature })
                                                }}
                                            >x</span>
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                        <h4>Price</h4>
                        <input type="text" name="price" id="" onChange={handleChange} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AddGig