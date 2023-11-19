import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendPostRequest } from '../../services/data';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    useEffect(() => {
        const email = queryParams.get('email');
        if(email){
            setEmail(email)
        }
    }, [])
    const save = async (e) => {
        e.preventDefault();
        try {
            setError('')
            const res = await sendPostRequest('/resetPassword', { email, code, password, passwordConfirmation });
            navigate('login')
        } catch (error) {
            if (error.response.status == 400) {
                setError('error');
            }
        }
    }
    return (
        <form className='flex flex-col w-full px-64'>
            <h1 className="text-3xl font-semibold py-10 text-center">
                Reset Password
            </h1>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                </label>
                <input
                    type="email"
                    id="email"
                    defaultValue={email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={true}
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Code verification sended in email
                </label>
                <input
                    type="text"
                    id="code"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="XXXX"
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block capitalize mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
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
            <div className="mb-6">
                <label htmlFor="password" className="block capitalize mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your confirmation password
                </label>
                <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="xxxxxxxxxxxx"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                />
            </div>


            {error.length ? (
                <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50" role="alert">
                    {error}
                </div>
            ) : null}
            <button
                disabled={!email.length || !code.length || !password.length || !passwordConfirmation.length}
                onClick={(e) => save(e)}
                type="submit"
                className="text-white mt-5 disabled:bg-blue-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Reset password
            </button>

        </form>
    );
};

export default ResetPassword;
