import React from 'react'
import Featured from '../../Components/Featured/Featured'
import Slide, { SwiperSlider } from '../../Components/Slides/Slide'
import TrustedBy from '../../Components/TrustedBy/TrustedBy'
import './Home.scss'
import { cards, gigs, projects } from '../../data'
import Features from '../../Components/Features/Features'
import Buisness from '../../Components/Buisness/Buisness'
import ProjectCard from '../../Components/ProjectCard/ProjectCard'
import Card from '../../Components/CategoryCards/Card'
import GigCard from '../../Components/GigCard/GigCard'
import { SwiperSlide } from 'swiper/react'
const Home = () => {
  return (
    <div className='home'>
      <Featured />
      <TrustedBy />
      <SwiperSlider>
        {
          cards.map((item, index) => {
            return <SwiperSlide> <Card key={index} item={item} /></SwiperSlide>
          })
        }
      </SwiperSlider>
    

      <Features />
      <SwiperSlider>
        {
          projects.map((item, index) => {
            return <SwiperSlide><ProjectCard key={index} item={item} /></SwiperSlide>
          })
        }
      </SwiperSlider>
     
      <Buisness />

    </div>
  )
}

export default Home