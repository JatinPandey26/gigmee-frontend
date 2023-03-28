import React, { useState } from 'react'
import './Featured.scss'
import {useNavigate} from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'

const Featured = () => {
    const [input, setInput] = useState('');
    const navigate = useNavigate()
    const handleSubmit = () => {

        navigate('gigs?search='+input)
    }
    return (
        <div className='featured'>
            <div className="container">
                <div className="left">
                    <h1>Find the perfect <span className='thin-italic'>freelance</span> services for your buisness</h1>
                    <div className="searchBar">
                        <BsSearch className='icon' />
                        <input type="text" placeholder='Try "web Development" ... ' value={input} onChange={e => setInput(e.target.value)} />
                        <button onClick={handleSubmit}>Search</button>
                    </div>
                    <div className="lowerBar">
                        <h4>Popular: </h4>
                        <span>Web Design</span>
                        <span>WordPress</span>
                        <span>Logo Design</span>
                        <span>AI Services</span>
                    </div>
                </div>
                <div className="right">
                    <img src='./assets/Images/man.png' alt="" />
                    <span>Jack Ryan</span>
                </div>
            </div>
        </div>
    )
}

export default Featured