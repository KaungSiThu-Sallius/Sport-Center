/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Disclosure } from '@headlessui/react'

import Logo from "../../assets/images/logo.png"
// import { Link, useLocation } from "react-router-dom"
import Signin from '../../pages/signin'
import Register from '../../pages/register'


// const userNavigation = [
//     { name: 'Profile', href: '#' },
//     { name: 'Sign out', href: '/logout' },
// ]

// const classNames = (...classes: string[]): string => classes.filter(Boolean).join(' ');

const Appbar = () => {
    // const { pathname } = useLocation()
    const [token, setToken] = React.useState(localStorage.getItem("authToken") ?? "");
    React.useEffect(() => {
    }, [token]);


    // const navigation = [
    //     { name: 'Projects', href: '/account/projects', current: false },
    //     { name: 'Members', href: '/account/members', current: false },
    // ]

    return (
        <>
            <Disclosure as="nav" className="border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex h-16 items-center justify-between">
                        <div></div>
                        <div className="flex items-center">
                            <img
                                className='logo mx-auto'
                                src={Logo}
                                alt="Smarter Tasks"
                            />
                        </div>

                        <div className="">
                            {token ? null : <Signin />}
                            <span className='ml-3' >{token ? null : <Register />}</span>
                        </div>
                    </div>
                </div>
            </Disclosure >
        </>
    )
}


export default Appbar;