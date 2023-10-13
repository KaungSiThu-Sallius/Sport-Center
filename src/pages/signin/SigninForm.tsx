import React from 'react';
// First we will import the API_ENDPOINT constant from the `config` folder
import { API_ENDPOINT } from '../../config/constants';
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
import { useState, Fragment, useEffect, useRef, } from 'react'
import { Transition, Dialog, Menu } from '@headlessui/react'

type SigninFormProps = {
    active: boolean;
};
type Inputs = {
    email: string
    password: string
}
const SigninForm = React.forwardRef<HTMLElement, SigninFormProps>(({ active }, ref) => {

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    localStorage.setItem('authToken', "");
    localStorage.setItem('userData', "");

    // Then we will define the handle submit function
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { email, password } = data
        try {
            const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Sign-in failed');
            }

            console.log('Sign-in successful');

            // extract the response body as JSON data
            const _data = await response.json();
            console.log(_data);

            // After successful signin, first we will save the token in localStorage
            localStorage.setItem('authToken', _data.auth_token);
            localStorage.setItem('userData', JSON.stringify(_data.user));
            navigate("/");


        } catch (error) {
            console.error('Sign-in failed:', error);
        }
    };

    return (
        <>



            {/* <button
                type="button"
                onClick={openModal}
                className="rounded-md bg-black bg-opacity-20 px-2 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>

            </button> */}

            <button
                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                onClick={openModal}
            >
                {active ? (
                    <SignInActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                    />
                ) : (
                    <SignInInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                    />
                )}
                Sign In
            </button>


            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="mb-8 mt-2 text-3xl font-medium leading-6 text-gray-900 text-center"
                                    >
                                        Sign In <span className='float-right'><button onClick={closeModal}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        </button></span>
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit(onSubmit)} className='mb-4'>
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Email:</label>
                                            <input {...register("email", { required: true })} type="email" name="email" id="email" className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
                                            {errors.email && <span>This field is required</span>}
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Password:</label>
                                            <input {...register("password", { required: true })} type="password" name="password" id="password" className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
                                            {errors.password && <span>This field is required</span>}
                                        </div>
                                        <button type="submit" className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-7">Sign In</button>
                                    </form>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>

    );
});


function SignInInactiveIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            height="1em">
            <path
                d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
                fill="#8B5CF6"
                stroke="#A78BFA"
                strokeWidth="2"
            /></svg>
    )
}

function SignInActiveIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            height="1em">
            <path
                d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
                fill="#EDE9FE"
                stroke="#C4B5FD"
                strokeWidth="2"
            /></svg>

    )
}

export default SigninForm;