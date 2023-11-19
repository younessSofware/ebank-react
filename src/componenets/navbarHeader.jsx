import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavbarHeader = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href="/"
    }
    return (
        <nav className="border-gray-200 bg-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">E-Bank</span>
                </a>

                <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                    <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                        <li onClick={() => logout()}>
                            <a href="#" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700">
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    );
}

export default NavbarHeader