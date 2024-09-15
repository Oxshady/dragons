import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <>
            <header>
                <nav className="navbar">
                    <div className="logo">
                        <Link to='/'>
                            <img src="/images/logo.svg" alt="" />
                        </Link>
                    </div>
                    <ul className="nav-list">
                        <div className="logo">
                            <Link to='/'>
                                <img src="images/logo.svg" alt="" />
                            </Link>
                            <button className="close">
                                <i className="fa-solid fa-xmark" />
                            </button>
                        </div>
                        <Link to='/'>
                            <li className="home">
                                <a href="">home</a>
                            </li>
                        </Link>
                        
        

                        <Link to='/want_to_watch'>
                            <li>
                                <a href="">Want to watch </a>
                            </li>
                        </Link>
                        <Link to='/watched_before'>
                            <li>
                                <a href="">WatchList</a>
                            </li>
                        </Link>
                        <Link to='/favorite_movies'>
                            <li>
                                <a href="">Favourites</a>
                            </li>
                        </Link>
                        <Link to="/survay">
                            <li>
                                <a href="">survey</a>
                            </li>
                        </Link>
                        <Link to='/login'>
                            <button className="btn">SIGN IN</button>
                        </Link>
                    </ul>
                    <div className="hamburger">
                        <div className="line" />
                        <div className="line" />
                    </div>
                </nav>
            </header>

        </>
    )
}

export default Header