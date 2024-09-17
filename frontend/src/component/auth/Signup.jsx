import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { NewUser } from "../../util/http.js";
import "./auth.css";

function Signup() {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phoneNumber: "",
        address: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: NewUser,
        onSuccess: () => {
            // Clear form data on success
            setFormData({
                first_name: "",
                last_name: "",
                phoneNumber: "",
                address: "",
                email: "",
                password: "",
            });
            navigate("/login");
        },
    });

    function validateForm(data) {
        let formErrors = {};

        // Validate first_name and last_name
        if (!data.first_name) formErrors.first_name = "First name is required";
        if (!data.last_name) formErrors.last_name = "Last name is required";

        // Validate phoneNumber
        // if (!data.phoneNumber) {
        //     formErrors.phoneNumber = "Phone number is required";
        // } else if (!/^\d{10}$/.test(data.phoneNumber)) {
        //     formErrors.phoneNumber = "Phone number must be 10 digits";
        // }

        // Validate address
        if (!data.address) formErrors.address = "Address is required";

        // Validate email
        if (!data.email) {
            formErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            formErrors.email = "Email address is invalid";
        }

        // Validate password
        if (!data.password) {
            formErrors.password = "Password is required";
        }  

        return formErrors;
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Validate the form data
        const formErrors = validateForm(formData);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // Send data to the server
        mutate({
            first_name: formData.first_name,
            last_name: formData.last_name,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
            email: formData.email,
            password: formData.password,
        });
    }

    return (
        <div className="signup grid" id="signup-content">
            <form onSubmit={handleSubmit} className="signup__form grid" aria-live="assertive">
                <h3 className="signup__title">Sign Up</h3>
                <div className="signup__group grid">
                    <div>
                        <label htmlFor="signup-first-name" className="signup__label">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                            className="signup-input"
                            id="signup-first-name"
                        />
                        {errors.first_name && <span className="error">{errors.first_name}</span>}
                    </div>
                    <div>
                        <label htmlFor="signup-last-name" className="signup__label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                            className="signup-input"
                            id="signup-last-name"
                        />
                        {errors.last_name && <span className="error">{errors.last_name}</span>}
                    </div>
                    <div>
                        <label htmlFor="signup-phone" className="signup__label">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter your phone"
                            className="signup-input"
                            id="signup-phone"
                        />
                        {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                    </div>
                    <div>
                        <label htmlFor="signup-address" className="signup__label">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your address"
                            className="signup-input"
                            id="signup-address"
                        />
                        {errors.address && <span className="error">{errors.address}</span>}
                    </div>
                    <div>
                        <label htmlFor="signup-email" className="signup__label">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Write your email"
                            className="signup-input"
                            id="signup-email"
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div>
                        <label htmlFor="signup-pass" className="signup__label">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="signup-input"
                            id="signup-pass"
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                </div>
                <div>
                    <span className="signup__login">
                        Already have an account?{" "}
                        <Link to="../login" id="log-in">Log In</Link>
                    </span>
                    <button type="submit" className="signup__button button">
                        Sign Up
                    </button>
                </div>
                <div className="social-login">
                    <p>Or log in with</p>
                    <div className="social-icons">
                        <a href="#" className="social-btn facebook">Facebook</a>
                        <a href="#" className="social-btn twitter">Twitter</a>
                        <a href="#" className="social-btn google">Google</a>
                    </div>
                </div>
            </form>
            <Link to="../" className="ri-close-line signup__close" id="signup-close"></Link>
        </div>
    );
}

export default Signup;
