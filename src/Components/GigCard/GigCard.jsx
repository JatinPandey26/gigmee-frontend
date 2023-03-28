import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
import newRequest from '../../utils/newRequest'
import './GigCard.scss'
const GigCard = ({ item }) => {

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: [item.userId],
        queryFn: () =>
            newRequest.get(`/users/${item.userId}`).then(res => {
                return res.data
            })
    })


    return (
        <Link to={'/gig/' + item._id} className='link'>
            <div className='gig-card'>
                <div className="img">
                    <img src={item.cover} alt="" />
                </div>
                <div className="details">
                    {
                        isLoading ? "...Loading": error ? "Something went wrong"  : <div className="info">
                            <img src={data.image || '/assets/Images/noavtar.png'} alt="" />
                            <h5>{data.username}</h5>
                        </div>
                    }
                    <p>{item.title}</p>
                    <p>{item.desc}</p>
                    <div className='star'><img src="/assets/Images/star.png" alt="" /> 
                    <span>{!isNaN(item.totalStars / item.starNumber) && Math.floor(item.totalStars / item.starNumber)}</span></div>
                </div>
                <div className="rating">
                    <div className="left">
                        <img src="/assets/Images/heart.png" alt="" />
                    </div>
                    <div className="right">
                        <p>STARTING AT</p>
                        <p>{`$ ${item.price}`}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default GigCard