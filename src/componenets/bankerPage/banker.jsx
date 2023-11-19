import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../loadingSpinner'
import NavbarHeader from '../navbarHeader'
import { useNavigate } from 'react-router-dom'
import { sendDeleteRequest, sendGetRequest, sendPostRequest } from '../../services/data'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Banker = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState([]);
    useEffect(() => {
        getClients();
    }, [])
    const getClients = async () => {
        try {
            setLoading(true)
            const res = await sendGetRequest('/users/all');
            console.log(res.data.sort((a, b) => a.solde - b.solde));
            setClients([...res.data.sort((a, b) => a.solde - b.solde)]);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const activeClient = async (id, index) => {
        try {
            const res = await sendPostRequest(`/users/${id}/activate`);
            clients[index].actived = !clients[index].actived;
            setClients([...clients]);
        } catch (error) {
            console.log(error);
        }
    }
    const deleteClient = async (id, index) => {
        try {
            const res = await sendGetRequest(`/users/${id}`);
            clients.splice(index, 1);
            setClients([...clients]);
        } catch (error) {
            console.log('delete Client unsuccessfully' + index);
        }
    }

    const getColor = (solde) => {
        if(solde > 20000){
            return "bg-blue-50"
        }
        if(solde <= 3000){
            return "bg-red-100"
        }
        return "bg-white";
    }
    return (
        <div className='flex flex-col gap-y-8'>
            <NavbarHeader />
            {loading ? (
                <LoadingSpinner loadingSize={12} />
            ) : (
                <div className='flex flex-col gap-y-4 px-20'>
                    <div className='flex justify-end'>
                        <button
                            onClick={() => navigate('/banker/clientForm')}
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Ajouter un nouveau client
                        </button>
                    </div>

                    <div className="relative overflow-x-auto w-3/4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nom
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Preonm
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Montant
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th>

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client, index) => (
                                    <tr key={index} className={`border-b ${getColor(client.solde)}` }>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {client.id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {client.nom}
                                        </td>
                                        <td className="px-6 py-4">
                                            {client.prenom}
                                        </td>
                                        <td className="px-6 py-4">
                                            {client.solde} DH
                                        </td>
                                        <td onClick={() => activeClient(client.id, index)} className="px-6 py-4">
                                            {client.actived == true ? (
                                                <span className="bg-blue-100 cursor-pointer text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="bg-red-100 cursor-pointer text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                                                    No active
                                                </span>
                                            )}
                                        </td>
                                        <td >
                                            <div className='flex gap-x-4 items-center'>
                                                <span onClick={() => deleteClient(client.id, index)} className='text-xl text-red-700 cursor-pointer'>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </span>
                                                <span onClick={() => navigate('/banker/clientForm?client=' + JSON.stringify(client))} className='text-xl text-gray-500 cursor-pointer'>
                                                    <FontAwesomeIcon icon={faPencilAlt} />
                                                </span>
                                            </div>

                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Banker