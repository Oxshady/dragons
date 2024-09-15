import React from 'react'

function Footer() {
    return (
        <>
            <footer>
                <div className="main">
                    <div className="footer-top">
                        <nav>
                            <div className="logo">
                                <img src="/images/logo.svg" alt="" />
                            </div>
                            <ul className="list">
                                <li>
                                    <a href="">home</a>
                                </li>
                                <li>
                                    <a href="">movie</a>
                                </li>
                                <li>
                                    <a href="">tv show</a>
                                </li>
                                <li>
                                    <a href="">web series</a>
                                </li>
                                <li>
                                    <a href="">pricing</a>
                                </li>
                            </ul>
                        </nav>
                        <hr />
                        <div className="links">
                            <div className="text-links">
                                <a href="">faq</a>
                                <a href="">help center</a>
                                <a href="">terms of use</a>
                                <a href="">privacy</a>
                            </div>
                            <div className="social-links">
                                <a href="">
                                    <i className="fa-brands fa-facebook" />
                                </a>
                                <a href="">
                                    <i className="fa-brands fa-twitter" />
                                </a>
                                <a href="">
                                    <i className="fa-brands fa-pinterest" />
                                </a>
                                <a href="">
                                    <i className="fa-brands fa-linkedin" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="copyright">
                            <p>
                                © 2022 <a href="">pawantech12</a>. All Rights Reserved
                            </p>
                        </div>
                        <div className="img">
                            <img src="/images/footer-bottom-img.png" alt="" />
                        </div>
                    </div>
                </div>
            </footer>


        </>
    )
}

export default Footer