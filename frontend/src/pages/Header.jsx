import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../util/http';
import { authActions } from '../store/auth';





function Header() {
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    function handleOpen() {
        document.querySelector(".nav-list").classList.toggle("open");
      }

    const mutation = useMutation({
      mutationFn: logoutUser,
      onSuccess: () => {

          console.log('Logout successful');
          // Dispatch Redux action to update auth state
          dispatch(authActions.logout());

          // Remove the isAuth value from local storage
          localStorage.removeItem('isAuthenticated');
          // dispatch(clearUserId());
          localStorage.removeItem('user_id');
          navigate('/login');
      },
      onError: (error) => {
          console.error('Logout failed:', error);
          alert('Failed to log out. Please try again.');
      }
  });


    const handleLogout = () => { 
      dispatch(authActions.logout());

      mutation.mutate();

    }
    return (
      <>
        <header>
          <nav className="navbar">
            <div className="logo">
              <Link to="/">
                <img src="/images/logo.svg" alt="" />
              </Link>
            </div>
            <ul className="nav-list">
              <div className="logo">
                <Link to="/">
                  <img src="images/logo.svg" alt="" />
                </Link>
                <button className="close">
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
              <Link to="/">
                <li className="home">
                  <a href="">home</a>
                </li>
              </Link>

              <Link to="/want_to_watch">
                <li>
                  <a href="">Want to watch </a>
                </li>
              </Link>
              <Link to="/watched_before">
                <li>
                  <a href="">WatchList</a>
                </li>
              </Link>
              <Link to="/favorite_movies">
                <li>
                  <a href="">Favourites</a>
                </li>
              </Link>
              <Link to="/survay">
                <li>
                  <a href="">survey</a>
                </li>
              </Link>
              {isAuth && (
                // <Link to="/login">
                  <button className="btn" onClick={handleLogout}>LOG OUT</button>
                // </Link>
              )}
              {!isAuth && (
                <Link to="/register">
                  <button className="btn">SIGN UP</button>
                </Link>
              )}
            </ul>
            <div className="hamburger" onClick={handleOpen}>
              <div className="line" />
              <div className="line" />
            </div>
          </nav>
        </header>
      </>
    );
}

export default Header
