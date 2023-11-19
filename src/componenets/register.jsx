import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { sendPostRequest } from '../services/data';

const Register = () => {
    const [email, setEmail] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [solde, setSolde] = useState();
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const save = async (e) => {
        e.preventDefault();
        try {
            setError('')
            const res = await sendPostRequest('/register', {
                nom, prenom,
                email, password,
                confirmedPassword: passwordConfirmation, solde: 0
            });
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message)
            } else {
                setError(JSON.stringify(error.message))
            }
        }
    }

    
    return (
        <div className='flex flex-col gap-y-8'>
            <form className='flex flex-col w-full px-64'>
                <h1 className="text-3xl font-semibold py-5 text-center">
                    Registration
                </h1>
                <div className="mb-6">
                    <label htmlFor="nom" className="block capitalize mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        nom
                    </label>
                    <input
                        type="text"
                        id="nom"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Entrer le nom"
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="prenom" className="block mb-2 capitalize text-sm font-medium text-gray-900 dark:text-white">
                        prenom
                    </label>
                    <input
                        type="text"
                        id="prenom"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Entrer le prenom"
                        onChange={(e) => setPrenom(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block capitalize mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        email
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
                    disabled={!nom.length || !prenom.length || !email.length || solde < 0 || !password.length || !passwordConfirmation.length }
                    onClick={(e) => save(e)}
                    type="submit"
                    className="text-white capitalize mt-5 disabled:bg-blue-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Register
                </button>

                <button
                onClick={() => navigate('/login')}
                type="button"
                className="py-2.5 px-5 me-2 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
            >
                Sign in here
            </button>


            </form>
        </div>

    )
}

export default Register