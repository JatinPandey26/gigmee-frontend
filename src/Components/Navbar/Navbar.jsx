import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import './Navbar.scss'
import { SwiperSlider } from '../Slides/Slide';
import { SwiperSlide, Swiper } from 'swiper/react';


const Navbar = () => {

    const [lowerMenuActive, setLowerMenuActive] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [navbarOpen, setNavbarOpen] = useState(false);
    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        window.addEventListener('scroll', toggleLowerMenu)

        return () => {
            window.removeEventListener('scroll', toggleLowerMenu)
        }
    }, [])

    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    const toggleLowerMenu = () => {
        window.scrollY > 0 ? setLowerMenuActive(true) : setLowerMenuActive(false);
    }


    const handleLogout = async () => {
        try {
            await newRequest.post('/auth/logout');
            localStorage.setItem('currentUser', null);
            navigate('/')
        } catch (error) {

        }
    }


    return (
        <div className={lowerMenuActive || pathname !== '/' ? 'active navbar' : 'navbar'}>
            <div className="container">
                <div className="logo">
                    <Link to='/' className='link' >
                        <span className='text'>Gigmee</span>
                    </Link>
                    <span className='dot'>.</span>
                </div>
                <button >
                    <img onClick={() => { setNavbarOpen(!navbarOpen) }} src="/assets/Images/down.png" alt="" /
                    >
                </button>
                <div className={navbarOpen ? 'menu open' : 'menu'}>
                    <span>Buisness</span>
                    <span><Link className='link exploreTab' to='/gigs'>Explore</Link></span>
                    <span>English</span>
                    {!currentUser?.isSeller && <span>Become a seller</span>}
                    {!currentUser && <Link to='/login' className='link'><span>Sign in</span></Link>}
                    {!currentUser && <Link to='/register' className='link'><button className={'button'}>Join</button></Link>}
                    {currentUser && (
                        <div className="user" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                            <img src={currentUser.img || '/assets/Images/noavtar.png'} alt="" />
                            <span>{currentUser?.username}</span>
                            {
                                userMenuOpen && (<div className="options">
                                    {currentUser.isSeller && (
                                        <>
                                            <Link to='/mygigs' className='link'><span>Gigs</span></Link>
                                            <Link to='/add' className='link'><span>Add gigs</span></Link>
                                        </>
                                    )}
                                    <Link to='/orders' className='link'><span>Orders</span></Link>
                                    <Link to='/messages' className='link'><span>Messages</span></Link>
                                    <Link onClick={handleLogout} className='link'><span>Logout</span></Link>
                                </div>)
                            }
                        </div>
                    )}
                </div>
            </div>

            {
                lowerMenuActive && (<>
                    <div className="lower-menu-wrapper">
                        <div className='lower-menu'>
                            <Swiper
                                style={{ zIndex: 10 }}
                                slidesPerView={6}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                    },
                                    400: {
                                        slidesPerView: 2,
                                    },
                                    639: {
                                        slidesPerView: 3,
                                    },
                                    865: {
                                        slidesPerView: 4
                                    },
                                    1000: {
                                        slidesPerView: 5
                                    },
                                    1500: {
                                        slidesPerView: 6
                                    },
                                    1700: {
                                        slidesPerView: 7
                                    }
                                }}
                            >
                                <SwiperSlide><Link to='/' className='link'><span>Graphics & Design</span></Link></SwiperSlide>
                                <SwiperSlide><Link to='/' className='link'><span>Video Animnaion</span></Link></SwiperSlide>
                                <SwiperSlide><Link to='/' className='link'><span>AI Services</span></Link></SwiperSlide>
                                <SwiperSlide><Link to='/' className='link'><span>Digital Marketing</span></Link></SwiperSlide>
                                <SwiperSlide><Link to='/' className='link'><span>Music & Video</span></Link></SwiperSlide>
                                <SwiperSlide><Link to='/' className='link'><span>Web Development</span></Link></SwiperSlide>
                            </Swiper>
                        </div>
                    </div></>)

            }
        </div>
    )
}

export default Navbar