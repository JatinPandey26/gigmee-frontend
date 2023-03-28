import React from 'react'
import './Card.scss'
import { Link } from 'react-router-dom'
const Card = ({ item }) => {
    return (
        <Link to='/gigs?category=design'>
            <div className='category-card'>
                <img src={item.img} alt="" />
                <span className="desc">{item.desc}</span>
                <span className="title">{item.title}</span>
            </div>
        </Link>
    )
}

export default Card