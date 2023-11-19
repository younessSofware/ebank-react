import React, { useEffect, useState } from 'react'
import { sendGetRequest, sendPostRequest } from '../../services/data';
import LoadingSpinner from '../loadingSpinner';
import NavbarHeader from '../navbarHeader';
import Operation from './operation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import VerificationCodeModal from './verificationCodeModal';
const Client = () => {
    useEffect(() => {
        getClients();
    }, [])
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState('');
    const [operationId, setOperationId] = useState();
    const [openModal, setOpenModal] = useState(false);
    const getClients = async () => {
        try {
            const res = await sendGetRequest('/users/profile');
            setUser({ ...user, ...res.data })
        } catch (error) {
            console.log(error);
        }
    }

    const addVer = async () => {
        try {
            setError('')
            setLoadingBtn(true)
            const res = await sendPostRequest('/operations/verser', { emailBenificaire: email, amount });
            setLoadingBtn(false)
            console.log(res.data);
            setOperationId(res.data.id);
            setOpenModal(true)
            // window.location.reload();
        } catch (error) {
            setLoadingBtn(false)

            if(error.response && error.response.data){
                setError(error.response.data.message)
            }else{
                setError(JSON.stringify(error.message))
            }
        }
    }

    return (
        <div className='flex flex-col gap-y-8'>
            <NavbarHeader />
            {loading ? (
                <LoadingSpinner loadingSize={12} />
            ) : (
                <div className='flex flex-col gap-y-4 px-20'>
                    {user && (
                        <div>
                            <div className='flex flex-col items-center gap-y-2'>
                                <span className='text-3xl  block'> Bonjour Mr "{user.prenom} {user.nom} "</span>
                                <span className='text-3xl block'> Votre solde est de {user.solde} DH </span>
                            </div>
                            <div className='flex flex-col mt-5'>
                                <div className='grid grid-cols-2 gap-8'>
                                    <div className="mb-6">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            email sender
                                        </label>
                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="name@flowbite.com"
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            montant
                                        </label>
                                        <input
                                            type="number"
                                            id="number"
                                            onChange={(e) => setAmount(e.target.value)}

                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                </div>
                                { error.length ? (
                                    <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50" role="alert">
                                        {error}  
                                    </div>
                                ) : null }
                                
                                <button
                                    onClick={() => addVer()}
                                    disabled={amount <= 0 || !email.length || loadingBtn} 
                                    type="submit"
                                    className="text-white  flex justify-center items-center gap-4 disabled:bg-blue-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    {loadingBtn && (
                                        <FontAwesomeIcon icon={faCog} spin />
                                    )}
                                    Verser
                                </button>

                            </div>
                        </div>
                    )}

                    <div className='my-10'>
                        <Operation type={'versements'} />
                    </div>
                    <div>
                        <Operation type={'beneficiaires'} />
                    </div>
                </div>
            )}
            {operationId && openModal && (
                <div>
                    <VerificationCodeModal open={openModal} setOpen={setOpenModal} id={operationId} />
                </div>
            )}
        </div>


    )
}

export default Client