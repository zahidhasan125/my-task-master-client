import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const Login = () => {
    // const { user, loading, createUser, providerLogin, userLogin, verifyUserEmail, logOut } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Form submitted.');
    }

    const handleGoogle = () => {
        console.log('Google clicked.');
    }
    return (
        <>
            <form className='w-[60%] md:w-[40%] mx-auto flex flex-col items-center justify-center gap-2 border rounded-md p-8' onSubmit={handleLogin}>
                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                    <span>Email</span>
                    <input className='md:py-2 rounded-md dark:bg-gray-600 dark:text-white pl-1' type="email" name='email' placeholder='Your Email' />
                </div>
                <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                    <span>Password</span>
                    <input className='md:py-2 rounded-md dark:bg-gray-600 dark:text-white pl-1' type="password" name='password' placeholder='Your Password' />
                </div>
                <button type='submit' className='md:py-2 border font-bold w-[90%] bg-gradient-to-tr from-[#1d3557] via-sky-600  to-sky-900 rounded-md text-white'>Login</button>

            </form>

            <div className='flex flex-col gap-1 w-[90%] mx-auto'>
                <span className='text-center'>Login With</span>
                <button type='submit' onClick={handleGoogle} className='md:py-2 rounded-md font-bold bg-green-600 text-white'>GOOGLE</button>
            </div>
        </>
    );
};

export default Login;