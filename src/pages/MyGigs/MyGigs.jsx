import { useMutation, useQuery, useQueryClient, } from '@tanstack/react-query';
import React from 'react'
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../utils/getCurrentUser'
import newRequest from '../../utils/newRequest';
import './MyGigs.scss'
const MyGigs = () => {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["get_gigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then(res => { return res.data })

  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete('/gigs/' + id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['get_gigs'])
    }
  })

  const handleDelete = async (id) => {
    mutation.mutate(id)
  }

  return (
    <div className='mygigs'>
      <div className="container">
        <div className="head">
          <h1>Gigs</h1>
          <button><Link to={'/add'} className='link'>Add New Gig</Link></button>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Orders</th>
            <th>Action</th>
          </tr>


          {
            isLoading ? "...Loading..." : error ? "Something went wrong" : data.map((gig, index) => {
              return (<tr key={index}>
                <td>
                  <img src={gig.cover} alt="" />
                </td>
                <td>{gig.title}</td>
                <td>{gig.price}</td>
                <td>{gig.salesNumber}</td>
                <td>
                  <img onClick={() => handleDelete(gig._id)} src="/assets/Images/delete.png" alt="" />
                </td>
              </tr>)
            })
          }

        </table>
      </div>
    </div>
  )
}

export default MyGigs