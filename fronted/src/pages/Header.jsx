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
                        <Link to='/'>
                        <li>
                            <a href="">movie</a>
                        </li>
                        </Link>
                        <li>
                            <a href="">tv show</a>
                        </li>
                        <li>
                            <a href="">web series</a>
                        </li>
                        <li>
                            <a href="">pricing</a>
                        </li>
                        <button className="btn">SIGN IN</button>
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