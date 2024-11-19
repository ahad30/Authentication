import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FiEyeOff } from "react-icons/fi";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');

        axios.post(`http://localhost:5000/register`, { name, email, photo, password })
            .then((response) => {
                const data = response?.data;
                if (data?.message) {
                    toast.success(data?.message); // Display success toast
                    navigate('/login'); // Navigate to login page
                }
            })
            .catch((error) => {
                const errorMsg = error?.response?.data?.message || 'An error occurred.';
                toast.error(errorMsg); // Display error toast
            });
    };

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <Toaster /> {/* Hot toast container */}
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Register Now!</h1>
            </div>

            <form onSubmit={handleRegister} className="mx-auto mb-0 mt-8 max-w-md space-y-4">

                <div>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <div className="form-control">
                        <input
                            type="text"
                            name="name"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter name"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <div className="form-control">
                        <input
                            type="email"
                            name="email"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter email"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="photo" className="sr-only">Photo Url</label>
                    <div className="form-control">
                        <input
                            type="text"
                            name="photo"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Photo Url"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <div className="form-control relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter password"
                        />
                        {showPassword ? (
                            <FiEyeOff
                                size={35}
                                className="absolute inset-y-2 right-0 pr-4 cursor-pointer"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <FaEye
                                size={35}
                                className="absolute inset-y-2 right-0 pr-4 cursor-pointer"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Already register?
                        <Link to="/login">
                            <button className="underline">Log in</button>
                        </Link>
                    </p>

                    <button
                        type="submit"
                        className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
