import { useQuery } from '@tanstack/react-query'
import React from 'react'
import newRequest from '../../utils/newRequest'
import './Reviews.scss'
const Reviews = ({ review }) => {

    const { isLoading, error, data } = useQuery({
        queryKey: [review.userId],
        queryFn: () => newRequest.get(`users/${review.userId}`).then(res => {
            return res.data
        })

    })

    return (
        <div className="review">
            <div className="user">
                <img src={data?.img} alt="" />
                <div className="details">
                    <h6>{data?.username}</h6>
                    <div className='location'>
                        <img src="https://images.unsplash.com/photo-1597058712635-3182d1eacc1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWElMjBmbGFnfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                        <span>{data?.country}</span>
                    </div>

                </div>



            </div>

            <div className="stars">
                {
                    Array(review.star).fill().map((_, i) => {
                        return <img src="/assets/Images/star.png" key={i} alt="" />
                    })
                }
                <span>{review.star}</span>
            </div>

            <p>
                {review.desc}
            </p>

            <div className="reaction">
                <span>Helpful?</span>
                <div className="react">
                    <img src="/assets/Images/like.png" alt="" />
                    <span>Yes</span>
                </div>
                <div className="react">
                    <img src="/assets/Images/dislike.png" alt="" />
                    <span>No</span>
                </div>

            </div>
        </div>
    )
}

export default Reviews