/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Disclosure } from '@headlessui/react'

import Logo from "../../assets/images/logo.png"
import { Link, useLocation } from "react-router-dom"


// const userNavigation = [
//     { name: 'Profile', href: '#' },
//     { name: 'Sign out', href: '/logout' },
// ]

// const classNames = (...classes: string[]): string => classes.filter(Boolean).join(' ');

const Appbar = () => {
    // const { pathname } = useLocation()


    const token = localStorage.getItem("authToken") ?? "";


    // const navigation = [
    //     { name: 'Projects', href: '/account/projects', current: false },
    //     { name: 'Members', href: '/account/members', current: false },
    // ]

    return (
        <Disclosure as="nav" className="border-b border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex h-16 items-center justify-between">
                    <div>
                        <img
                            className="logo mx-auto"
                            src={Logo}
                            alt="Smarter Tasks"
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        {token ? (
                            <div className="sm:flex space-x-3" >
                                <Link to="/userPreferences" className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>

                                </Link>
                                <Link to="/logout" className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
                                    Logout
                                </Link>
                            </div>

                        ) : (
                            <div className="sm:flex space-x-3">
                                <Link to="/signin" className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
                                    Sign In
                                </Link>
                                <Link to="/register" className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </Disclosure >
    )
}


export default Appbar;