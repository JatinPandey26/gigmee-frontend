import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getCurrentUser } from '../../utils/getCurrentUser'
import newRequest from '../../utils/newRequest';

const SingleMessage = ({ message }) => {
    const currentUser = getCurrentUser();

    const { isLoading, error, data } = useQuery({
        queryKey: ['messageUser'],
        queryFn: () =>
            newRequest.get(`/users/${message.userId}`).then(res => { return res.data })

    });


    return (
        <div className={`${currentUser._id === message.userId ? 'message-box owner' : 'message-box'}`}>
            {
                isLoading ? "...Loading" : error ? "Something went wrong" : (
                    <>
                        <img src={data.image || '/assets/Images/noavtar.png'} alt="" />
                        <div className="text">
                            {message.description}
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default SingleMessage