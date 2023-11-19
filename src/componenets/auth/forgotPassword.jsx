import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPostRequest } from '../../services/data';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const save = async (e) => {
        e.preventDefault();
        try {
            setError('')
            const res = await sendPostRequest('/forgotPassword', { email });
            navigate('/auth/resetPassword?email=' + email);
        } catch (error) {
            if (error.response.status == 404) {
                setError('Authentication failed, email incorrect');
            } 
        }
    }

    return (
        <form className='flex flex-col w-full px-64'>
            <h1 className="text-3xl font-semibold py-10 text-center">
                Forgot Password
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

            {error.length ? (
                <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50" role="alert">
                    {error}
                </div>
            ) : null}
            <button
                disabled={!email.length}
                onClick={(e) => save(e)}
                type="submit"
                className="text-white mt-2 disabled:bg-blue-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Forgot Password
            </button>
            <button
                onClick={() => navigate('/login')}
                type="button"
                className=" mt-4 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
            >
                Go to login page
            </button>
        </form>
    );
};

export default ForgotPassword;
