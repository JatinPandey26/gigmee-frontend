import { useQuery } from '@tanstack/react-query'
import { Slider } from 'infinite-react-carousel/lib'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Reviews from '../../Components/Reviews/Reviews'
import ReviewsBox from '../../Components/ReviewsBox/ReviewsBox'
import { getCurrentUser } from '../../utils/getCurrentUser'
import newRequest from '../../utils/newRequest'
import './Gig.scss'

const Gig = () => {


  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: [id],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then(res => {
        return res.data
      })
  })



  const userId = data?.userId

  const {
    isLoading: isLoadingUser,
    error: userError,
    data: userData,

  }
    = useQuery({
      queryKey: ["GigCreator"],
      queryFn: () =>
        newRequest.get(`/users/${data.userId}`).then(res => {
          return res.data
        }),
      enabled: !!userId
    })



  return (
    <div className='gig'>
      {
        isLoading ? "...Loading" : error ? "Something went wrong" : <div className="container">
          <div className="left">
            <span className="breadcrumb">{"GIGMEE > " + data?.category}</span>
            <h1>I will create AI generated art for you</h1>
            {
              isLoadingUser ? "...Loading" : userError ? "Something went wrong" : <div className="details">
                <img src={userData.image || '/assets/Images/noavtar.png'} alt="" />
                <h6>{userData.username}</h6>
                {
                  !isNaN(data.totalStars / data.starNumber) && <div className="stars">
                    {
                      Array(Math.floor(data.totalStars / data.starNumber)).fill().map((item, i) => {
                        return <img key={i} src="/assets/Images/star.png" alt="" />
                      })
                    }
                    <span>{Math.floor(data.totalStars / data.starNumber)}</span>
                  </div>
                }

              </div>
            }
            <Slider slidesToShow={1} arrowsScroll={1}>
              {/* <img src="https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
              <img src="https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
              <img src="https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" /> */}

              {
                data?.images?.map((img, index) => {
                  return <img src={img} key={index} alt="" />
                })
              }
            </Slider>
            <h2>About This Gig</h2>
            <p>
              {data?.desc}
            </p>

            {
              isLoadingUser ? "...Loading" : userError ? "Something went wrong" : <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={userData.image || '/assets/Images/noavtar.png'} alt="" />
                  <div className="user-details">
                    <h6>{userData.username}</h6>
                    {
                      !isNaN(data.totalStars / data.starNumber) && <div className="stars">
                        {
                          Array(Math.floor(data.totalStars / data.starNumber)).fill().map((item, i) => {
                            return <img key={i} src="/assets/Images/star.png" alt="" />
                          })
                        }
                        <span>{Math.floor(data.totalStars / data.starNumber)}</span>
                      </div>
                    }
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="more-user-details">
                  <div className="info-cards">
                    <div className="info-card">
                      <h6>From</h6>
                      <h6>{userData.country}</h6>
                    </div>
                    <div className="info-card">
                      <h6>Member since</h6>
                      <h6>{userData.createdAt.split('T')[0]}</h6>
                    </div>
                    <div className="info-card">
                      <h6>Avg response time</h6>
                      <h6>3 hours</h6>
                    </div>
                    <div className="info-card">
                      <h6>Last delivery</h6>
                      <h6>2 day</h6>
                    </div>
                    <div className="info-card">
                      <h6>Languages</h6>
                      <h6>English</h6>
                    </div>
                  </div>
                  <p>My name is Abhi, and I run a graphic design Studio from last 7 years in India. I have worked with thousands of buyers in my career, by which I have acquired a wealth of experience in terms of design and communication, which will exactly meet your expectation.</p>
                </div>
              </div>
            }

            {isLoading ? "...Loading" : <ReviewsBox gigId={data?._id} />}
          </div>
          <div className="right">
            <div className="box">
              <div className="head">
                <div className="left-head">
                  <h5>{data?.shortTitle}</h5>
                </div>
                <div className="right-head">
                  <span>$</span>
                  <span>{data?.price}</span>
                </div>
              </div>
              <p> {data?.shortDesc}</p>
              <div className="middle">
                <div className="left-middle">
                  <img src="/assets/Images/clock.png" alt="" />
                  <span>{data?.deliveryTime} days Delivery</span>
                </div>
                <div className="right-middle">
                  <img src="/assets/Images/recycle.png" alt="" />
                  <span>{data?.revisionNumber} Revisions</span>
                </div>
              </div>
              {
                data?.features.map((item, index) => {
                  return (<div key={index} className="promises">
                    <img src="/assets/Images/greencheck.png" alt="" />
                    <span>{item}</span>
                  </div>)
                })
              }
              <Link to={'/pay/' + id}>
                <button>Continue</button>
              </Link>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Gig