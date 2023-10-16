import React from 'react';
// First we will import the API_ENDPOINT constant from the `config` folder
import { API_ENDPOINT } from '../../config/constants';
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
import { useState, Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'

type Inputs = {
    name: string
    email: string
    password: string
}
const SigninForm: React.FC = () => {

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



    // Then we will define the handle submit function
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        localStorage.setItem('authToken', "");
        localStorage.setItem('userData', "");
        const { name, email, password } = data
        try {
            const response = await fetch(`${API_ENDPOINT}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                throw new Error('Register failed');
            }

            console.log('Register successful');

            // extract the response body as JSON data
            const _data = await response.json();
            console.log(_data);

            // After successful signin, first we will save the token in localStorage
            localStorage.setItem('authToken', _data.auth_token);
            localStorage.setItem('userData', JSON.stringify(_data.user));
            closeModal();
            navigate("/");


        } catch (error) {
            console.error('Sign-in failed:', error);
        }
    };

    return (
        <>



            <button
                type="button"
                onClick={openModal}
                className="rounded-md bg-black bg-opacity-70  px-2 py-2 text-md font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
                Register
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
                                        Register <span className='float-right'><button onClick={closeModal}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        </button></span>
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit(onSubmit)} className='mb-4'>
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Name:</label>
                                            <input {...register("name", { required: true })} type="text" name="name" id="name" className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
                                            {errors.name && <span>This field is required</span>}
                                        </div>
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
};


export default SigninForm;