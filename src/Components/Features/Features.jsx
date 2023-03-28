import React from 'react'
import './Features.scss'
const Features = () => {
    return (
        <div className='features'>
            <div className="container">
                <div className="left">
                    <h1>A whole world of freelance talent at your fingertips</h1>
                    <div className="title">
                        <img src="./assets/Images/check.png" alt="" />
                        The best for every budget
                    </div>
                    <p>
                        Find high-quality services at every price point. No hourly rates,
                        just project-based pricing.
                    </p>
                    <div className="title">
                        <img src="./assets/Images/check.png" alt="" />
                        Quality work done quickly
                    </div>
                    <p>
                        Find the right freelancer to begin working on your project within
                        minutes.
                    </p>
                    <div className="title">
                        <img src="./assets/Images/check.png" alt="" />
                        Protected payments, every time
                    </div>
                    <p>
                        Always know what you'll pay upfront. Your payment isn't released
                        until you approve the work.
                    </p>
                    <div className="title">
                        <img src="./assets/Images/check.png" alt="" />
                        24/7 support
                    </div>
                    <p>
                        Find high-quality services at every price point. No hourly rates,
                        just project-based pricing.
                    </p>
                </div>
                <div className="right">

                    <video src="./assets/biker.mp4" controls></video>

                </div>
            </div>
        </div>
    )
}

export default Features