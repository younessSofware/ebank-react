import React, { useState } from 'react';
import { sendPostRequest } from '../services/data';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const save = async (e) => {
        e.preventDefault();
        try {
            setError('')
            const res = await sendPostRequest('/login', { email, password });
            const token = res.headers.getAuthorization();
            const [header, payload, signature] = token.split(".");
            const decodedPayload = JSON.parse(atob(payload));
            localStorage.setItem('token', token);
            localStorage.setItem('role', decodedPayload.roles[0]);
            if (decodedPayload.roles[0] == 'CUSTOMER') {
                window.location.href = 'http://localhost:3000/client'
                navigate('/client');
            } else {
                window.location.href = 'http://localhost:3000/banker'

            }

        } catch (error) {
            if (error.response.status == 403) {
                setError('Authentication failed, email and password incorrect');
            } else
                if (error.response && error.response.data) {
                    setError(error.response.data.message);
                } else {
                    setError(JSON.stringify(error.message))
                }
        }
    }
    return (
        <form className='flex flex-col w-full px-64'>
            <h1 className="text-3xl font-semibold py-10 text-center">
                Authentification
            </h1>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                </label>
                <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your password
                </label>
                <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="xxxxxxxxxxxx"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className='py-0'>
                <span onClick={() => navigate('/auth/forgotPassword')}
                    className="font-medium text-blue-600 cursor-pointer  hover:underline">Forget password ?</span>
            </div>
            {error.length ? (
                <div className="my-2 p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50" role="alert">
                    {error}
                </div>
            ) : null}
            <button
                disabled={!email.length || !password.length}
                onClick={(e) => save(e)}
                type="submit"
                className="text-white mt-5 disabled:bg-blue-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Login
            </button>
            <button
                onClick={() => navigate('/register')}
                type="button"
                className=" mt-2 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
            >
                Create new Account
            </button>
        </form>
    );
};

export default Login;
