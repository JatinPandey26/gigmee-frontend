import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Link } from 'react-router-dom'
import { getCurrentUser } from '../../utils/getCurrentUser';
import newRequest from '../../utils/newRequest';
import './Messages.scss'
import SingleMessageBanner from './SingleMessageBanner';
const Messages = () => {

  const user = getCurrentUser();

  const { isLoading, error, data } = useQuery({
    queryKey: ["Conversations"],
    queryFn: () =>
      newRequest.get(`/conversations/`).then(res => { return res.data })
    
  });

  return (
    <div className='messages'>
      {
        isLoading ? "...Loading" : error ? "Something went wrong" : (
          <div className="container">
            <div className="head">
              <h1>Messages</h1>
            </div>
            <table>
              <tr>
                <th>{user.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>

              {
                data.map((item , index) => {
                  return <SingleMessageBanner key={index} conversation = {item}/>
                })
              }
              

            </table>
          </div>
        )
      }
    </div>
  )
}

export default Messages