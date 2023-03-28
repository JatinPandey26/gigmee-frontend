import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import newRequest from '../../utils/newRequest'
import Reviews from '../Reviews/Reviews'
import './ReviewsBox.scss'
const ReviewsBox = ({ gigId }) => {


    const queryClient = useQueryClient()

    const { isLoading, error, data } = useQuery({
        queryKey: ["reviews"],
        queryFn: () => newRequest.get(`reviews/${gigId}`).then(res => {
            return res.data
        })

    })

    const mutation = useMutation({
        mutationFn: (review) => {
            return newRequest.post(`reviews/`, review)
        },
        onSuccess: () => {

            queryClient.invalidateQueries(["reviews"])
            queryClient.invalidateQueries(["GigCreator"])
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const desc = e.target[0].value;
        const star = e.target[1].value;
        mutation.mutate({ gigId, desc, star })
    }

    return (
        <div className="reviews">

            <h2>Reviews</h2>

            {
                data?.map(review => <Reviews key={review} review={review} />)
            }

            <div className="createReview">
                <h2>Add a review</h2>
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" placeholder='Write your opinion' />
                    <select name="" id="" >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <button type='submit'>Send</button>
                </form>
            </div>

        </div>
    )
}

export default ReviewsBox