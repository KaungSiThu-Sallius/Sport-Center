import React from 'react';
import { API_ENDPOINT } from '../../config/constants';
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

type Inputs = {
    email: string
    password: string
}

const SigninForm = () => {


    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        localStorage.setItem('authToken', "");
        localStorage.setItem('userData', "");
        const { email, password } = data
        try {
            const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });



            if (!response.ok) {
                // Display a SweetAlert when sign-in fails
                await Swal.fire({
                    icon: 'error',
                    title: 'Sign-in failed',
                    text: 'Please check your credentials and try again.',
                });
                return;
            }
            console.log('Sign-in successful');

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
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-semibold mb-4">Sign In</h2>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">Email</label>
                        <input {...register("email", { required: true })} type="email" name="email" id="email" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                        />
                        {errors.email && <span>This field is required</span>}

                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                        <input {...register("password", { required: true })} type="password" name="password" id="password" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400" />
                        {errors.password && <span>This field is required</span>}

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                    >
                        Sign In
                    </button>
                    <div className="mt-4 text-center">
                        <Link to="/">Back to Home</Link>
                    </div>
                </form>

            </div>


        </>

    );
};


export default SigninForm;