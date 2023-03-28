import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment/moment';
import React from 'react'
import { Link } from 'react-router-dom'
import { getCurrentUser } from '../../utils/getCurrentUser';
import newRequest from '../../utils/newRequest';
import './SingleMessageBanner.scss'
const SingleMessageBanner = ({ conversation }) => {
    const user = getCurrentUser()
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["conversation"],
        queryFn: () =>
            newRequest.get(`/users/${user.isSeller ? conversation.buyerId : conversation.sellerId}`).then(res => { return res.data })

    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id) => {
            return newRequest.put(`conversations/${id}`)
        },
        onSuccess: () => {

            queryClient.invalidateQueries("Conversations");

        }
    })

    const handleRead = (id) => {
        mutation.mutate(id)
    }

    return (
        <>
            {
                isLoading ? "...Loading" : error ? "Something went wrong" : (
                    <tr className={((user.isSeller && !conversation.readBySeller) ||
                        (!user.isSeller && !conversation.readByBuyer)) && 'active'}>
                        <td>
                            {data.username}
                        </td>
                        <td>
                            <Link to={'/message/' + conversation.id} onClick={() => handleRead(conversation.id)} className='link'>
                                {conversation.lastMessage?.substring(0, 100)}...
                            </Link>
                        </td>
                        <td>{moment(conversation.updatedAt).fromNow()}</td>
                        <td>

                            {
                                ((user.isSeller && !conversation.readBySeller) ||
                                    (!user.isSeller && !conversation.readByBuyer)) &&
                                (<button onClick={() => handleRead(conversation.id)}>
                                    Mark as Read
                                </button>)
                            }

                        </td>

                    </tr>
                )
            }
        </>

    )
}

export default SingleMessageBanner