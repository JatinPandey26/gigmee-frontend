import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/getCurrentUser';
import newRequest from '../../utils/newRequest';
import './Order.scss'
const Order = ({ order }) => {

    const currentUser = getCurrentUser()


    const { isLoading, error, data } = useQuery({
        queryKey: [order._id],
        queryFn: () => {
            return newRequest.get(`/users/${currentUser.isSeller ? order.buyerId : order.sellerId}`).then(res => { return res.data })
        }
    });
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn: (id) => {
            newRequest.post('/conversations', { to: id }, { withCredentials: true });
        }
        ,
        onSuccess: () => {
            navigate('/messages')
        }
    })

    const createConversation = () => {
        mutation.mutate(order.sellerId)
    }


    return (
        <tr >
            <td>
                <img src={order.image} alt="" />
            </td>
            <td>{order.title?.substring(0, 100)}...</td>
            <td>{order.price}</td>
            {isLoading ? "Loading..." : <td>{data.username}</td>}
            <td>
                <img onClick={createConversation} src="/assets/Images/message.png" alt="" />
            </td>
        </tr>
    )
}

export default Order