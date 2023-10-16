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
                            <Link to="/logout" className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
                                Logout
                            </Link>
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
            </div>
        </Disclosure>
    )
}


export default Appbar;