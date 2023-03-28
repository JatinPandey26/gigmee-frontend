import React, { useRef, useState } from 'react'
import './Gigs.scss'
import { gigs } from '../../data.js'
import GigCard from '../../Components/GigCard/GigCard'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import { useLocation } from 'react-router-dom'
const Gigs = () => {
  const [isNewestSort, setNewestSort] = useState(false)
  const [isOptionOpen, setOptionOpen] = useState(false)
  const minRef = useRef();
  const maxRef = useRef();

  let { search } = useLocation()
  search = search.split('?')[1]
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['gigs'],
    queryFn: () =>
      newRequest.get(`/gigs?${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${!isNewestSort ? "createdAt" : "starNumber"}`).then(res => {
        return res.data
      })
  })

  console.log(data);


  return (
    <div className='gigs'>
      <div className="container">
        <span className="breadcrumb">{"GIGMEE > GRAPIHICS & DESIGN"}</span>
        <h1>AI Artists</h1>
        <p>Explore the boundaries of art and technology with Gigmee's AI artists</p>
        <div className="menu">
          <div className="budget">
            <span>Budget</span>
            <input type="number" placeholder='min' ref={minRef} />
            <input type="number" placeholder='max' ref={maxRef} />
            <button onClick={refetch}>Apply</button>
          </div>
          <div className="sort">
            <span>Sort by</span>
            <span >{!isNewestSort ? "Best Selling" : "Newest"}</span>
            <img onClick={() => { setOptionOpen(!isOptionOpen) }} src="/assets/Images/down.png" alt="" /
            >
            {
              isOptionOpen && <div className='options' onClick={() => { refetch(); setNewestSort(!isNewestSort); setOptionOpen(false) }}>
                <span>{isNewestSort ? "Best Selling" : "Newest"}</span>
              </div>
            }
          </div>
        </div>
        <div className="cards">
          {
            isLoading ? "...LOADING" : error ? "Something went wrong" : data.map((gig, index) => {
              return <GigCard item={gig} key={index} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Gigs