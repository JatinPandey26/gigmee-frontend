import React from 'react'
import './ProjectCard.scss'
const ProjectCard = ({ item }) => {
    return (
        <div className='project-card'>
            <div className='imgWrapper'>
            <img src={item.img} alt="" />
            </div>
            <div className='details'>
                <img src={item.pp} alt="" />
                <div className='info'>
                    <h5>  {`Gig ` + item.id}</h5>
                    <p>{item.username}</p>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard