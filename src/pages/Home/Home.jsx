import React from 'react'
import Featured from '../../Components/Featured/Featured'
import Slide from '../../Components/Slides/Slide'
import TrustedBy from '../../Components/TrustedBy/TrustedBy'
import './Home.scss'
import { cards, gigs, projects } from '../../data'
import Features from '../../Components/Features/Features'
import Buisness from '../../Components/Buisness/Buisness'
import ProjectCard from '../../Components/ProjectCard/ProjectCard'
import Card from '../../Components/CategoryCards/Card'
import GigCard from '../../Components/GigCard/GigCard'
const Home = () => {
  return (
    <div className='home'>
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={2} >
        {
          cards.map((item, index) => {
            return <Card key={index} item={item} />
          })
        }
      </Slide>
  
      <Features />
      <Slide slidesToShow={4} arrowsScroll={2} >
        {
          projects.map((item, index) => {
            return <ProjectCard key={index} item={item} />
          })
        }
      </Slide>
      <Buisness />

    </div>
  )
}

export default Home