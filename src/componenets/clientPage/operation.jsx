import React, { useEffect, useState } from 'react'
import { formatDate, sendGetRequest } from '../../services/data';
import LoadingSpinner from '../loadingSpinner';

const Operation = ({ type}) => {
    useEffect(() => {
        getOperations();
    }, [type]);
    
    const [operations, setOperations] = useState([]);
    const [loading, setLoading] = useState(false);
    const getOperations = async () => {
        setLoading(true);
        try {
            const res = await sendGetRequest('/operations/' + type);
            setOperations([...res.data])
            setLoading(false)            
        } catch (error) {
            setLoading(false)            
        }

    }


    return (
        <div className='flex flex-col gap-y-4'>
            <h2 className='text-2xl'> Mes operation de {type} </h2>
            {loading ? (
                <LoadingSpinner loadingSize={12} />
            ) : (
                <div className="relative overflow-x-auto w-3/4">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Receiver
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Montant
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {operations.map((operation, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {operation.id}
                                    </th>
                                    <td className="px-6 py-4">
                                         {operation['beneficiaire'].prenom} 
                                          {operation['beneficiaire'].nom} 
                                    </td>
                                    <td className="px-6 py-4">
                                        {type == 'versements' ? '-' : '+'} {operation.amount}
                                    </td>
                                    <td className="px-6 py-4">
                                        {formatDate(operation.date)}
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            )}

        </div>

    );
}

export default Operation;