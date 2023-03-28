import { useQuery } from '@tanstack/react-query';
import React from 'react'
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



    return (
        <tr >
            <td>
                <img src={order.image} alt="" />
            </td>
            <td>{order.title}</td>
            <td>{order.price}</td>
            {isLoading ? "Loading..." : <td>{data.username}</td>}
            <td>
                <img src="/assets/Images/message.png" alt="" />
            </td>
        </tr>
    )
}

export default Order