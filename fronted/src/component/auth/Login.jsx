import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { fetchUsers, logoutUser } from "../../util/http";
import "./auth.css";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth'; // Assuming you have authActions in your Redux store

function Login() {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // These values should come from Redux or any other state management
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const isAuth = useSelector(state => state.auth.isAuthenticated);

    const loginMutation = useMutation({
        mutationFn: (userData) => fetchUsers(userData, dispatch),
        onSuccess: (data) => {
            if (data.message === 'Login successful!') {
                console.log('Login successful');
                navigate("/");
            } else {
                setErrors({ email: data.error });
            }
        },
        onError: (error) => {
            setErrors({ email: error.message });
        }
    });

    const mutateLogout = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            console.log('Logout successful');
            dispatch(authActions.logout());
            localStorage.removeItem('isAuthenticated');
            navigate('/login');
        },
        onError: (error) => {
            console.error('Logout failed:', error);
            alert('Failed to log out. Please try again.');
        }
    });

    function validateLogin(data) {
        let formErrors = {};
        if (!data.email) {
            formErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            formErrors.email = "Email address is invalid";
        }
        if (!data.password) {
            formErrors.password = "Password is required";
        }
        return formErrors;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());

        const formErrors = validateLogin(data);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        if (isAdmin || isAuth) {
            mutateLogout.mutate();
        } else {
            loginMutation.mutate(data);
        }
    }

    return (
        <div className="login grid" id="login-content">
            <form onSubmit={handleSubmit} className="login__form grid">
                <h3 className="login__title">Log In</h3>
                <div className="login__group grid">
                    <div>
                        <label htmlFor="login-email" className="login__label">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Write your email"
                            className="login-input"
                            id="login-email"
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor="login-pass" className="login__label">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your Password"
                            id="login-pass"
                            className="login-input"
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                </div>
                <div>
                    <span className="login__signup">
                        Don't have an account? <Link to="../register" id="sign-up">Sign Up</Link>
                    </span>
                    <button type="submit" className="login__button button">Log In</button>
                </div>

                {/* Social Media Login Options */}
                <div className="social-login">
                    <p>Or log in with</p>
                    <div className="social-icons">
                        <a href="#" className="social-btn facebook">Facebook</a>
                        <a href="#" className="social-btn twitter">Twitter</a>
                        <a href="#" className="social-btn google">Google</a>
                    </div>
                </div>
            </form>
            <Link to="../" className="ri-close-line login__close" id="login-close"></Link>
        </div>
    );
}

export default Login;
