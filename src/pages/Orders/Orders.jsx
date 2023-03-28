import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getCurrentUser } from '../../utils/getCurrentUser'
import newRequest from '../../utils/newRequest';
import Order from './Order';
import './Orders.scss'
const Orders = () => {
  const currentUser = getCurrentUser();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.post('/orders', {}, { withCredentials: true }).then(res => { return res.data }).catch(err => {
        console.log(err);
      })

  });
  console.log(isLoading);

  return (
    <div className='orders'>
      <div className="container">
        <div className="head">
          <h1>Orders</h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>{currentUser?.isSeller ? 'Buyer' : 'Seller'}</th>
            <th>Contact</th>
          </tr>
          {

            isLoading ? "..Loading" : error ? "Something went wrong" : data.map((order, index) => {
              return <Order order={order} key={index} />
            })
          }
        </table>
      </div>
    </div>
  )
}

export default Orders