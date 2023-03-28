import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Message.scss'
import newRequest from '../../utils/newRequest';
import { getCurrentUser } from '../../utils/getCurrentUser';
import SingleMessage from './SingleMessage';
const Message = () => {

  const [description, setDescription] = useState('')

  const { id } = useParams();

  const queryClient = useQueryClient();

  const currentUser = getCurrentUser();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then(res => { return res.data })

  });

  const mutation = useMutation({
    mutationFn: (message) => newRequest.post(`/messages`, message),
    onSuccess: () => {
      queryClient.invalidateQueries("messages");
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    setDescription('');
    mutation.mutate({
      conversationId: id,
      description: description
    })
  }


  return (
    <div className='message'>
      <div className="container">
        <span className="breadcrumbs">
          <Link to={'/messages'} className='link'>MESSAGES</Link>
          {
            '> JOHNDOE >'
          }
        </span>
        <div className="messages-box">

          {
            isLoading ? "...Loading" : error ? "Something went wrong" : (
              data.map((message, index) => (
                <SingleMessage key={index} message={message} />
              ))
            )
          }

        </div>
        <div className="write">
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} type="text" />
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Message