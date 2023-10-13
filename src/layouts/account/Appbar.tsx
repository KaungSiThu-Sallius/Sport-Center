/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useContext, Fragment, useRef } from 'react'
import { Disclosure, Menu, Transition, Switch, Dialog } from '@headlessui/react'

import Logo from "../../assets/images/logo.png"
import { Link, useLocation } from "react-router-dom"
import Signin from '../../pages/signin'
import { ChevronDownIcon } from '@heroicons/react/20/solid'


// const userNavigation = [
//     { name: 'Profile', href: '#' },
//     { name: 'Sign out', href: '/logout' },
// ]

const classNames = (...classes: string[]): string => classes.filter(Boolean).join(' ');

const Appbar = () => {
    const { pathname } = useLocation()
    const token = localStorage.getItem("authToken") ?? "";
    const signInRef = useRef();

    // const navigation = [
    //     { name: 'Projects', href: '/account/projects', current: false },
    //     { name: 'Members', href: '/account/members', current: false },
    // ]

    return (
        <>
            <Disclosure as="nav" className="border-b border-slate-200">
                {({ open }) => (
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
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-violet-500  px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                            </svg>
                                            <ChevronDownIcon
                                                className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="px-1 py-1 ">
                                                <Menu.Item >
                                                    {/* {token ? null : <Signin ref={signInRef} />} */}
                                                    {({ active }) => (
                                                        token ? null : <Signin active={active} ref={signInRef} />
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                        >
                                                            {active ? (
                                                                <RegisterActiveIcon
                                                                    className="mr-2 h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <RegisterInactiveIcon
                                                                    className="mr-2 h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                            Register
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                            </div>
                        </div>
                    </div>
                )}
            </Disclosure>
        </>
    )
}



function RegisterInactiveIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 576 512"
        >
            <path d="M0 96l576 0c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96zm0 32V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128H0zM64 405.3c0-29.5 23.9-53.3 53.3-53.3H234.7c29.5 0 53.3 23.9 53.3 53.3c0 5.9-4.8 10.7-10.7 10.7H74.7c-5.9 0-10.7-4.8-10.7-10.7zM176 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm176 16c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16z"
                fill="#8B5CF6"
                stroke="#A78BFA"
                strokeWidth="2"
            />
        </svg>
    )
}

function RegisterActiveIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 576 512"
        >
            <path d="M0 96l576 0c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96zm0 32V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128H0zM64 405.3c0-29.5 23.9-53.3 53.3-53.3H234.7c29.5 0 53.3 23.9 53.3 53.3c0 5.9-4.8 10.7-10.7 10.7H74.7c-5.9 0-10.7-4.8-10.7-10.7zM176 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm176 16c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16z"
                fill="#EDE9FE"
                stroke="#C4B5FD"
                strokeWidth="2"
            />
        </svg>
    )
}


export default Appbar;