import React from 'react'
import { Link } from 'react-router-dom'


const Register = () => {
  return (
<div className='h-screen flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center p-4'>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex'>
                    <p className='mr-2 font-[700] text-2xl md:text-3xl'>Welcom to</p>
                    <span className='text-pink-500 font-[900] text-2xl md:text-3xl'>We Meet</span>
                </div>
                <p className='text-gray-500 text-md mt-2 italic'>Where you will find your soulmate</p>
                <p className='text-pink-400 text-lg mt-8'>Fill the form to get registered</p>
            </div>
            <form className='flex flex-col w-[300px] p-2'>
                <input className='border bg-gray-100 py-1 px-4 rounded-full text-sm my-2' placeholder='Enter your Names' />
                <input className='border bg-gray-100 py-1 px-4 rounded-full text-sm my-2' placeholder='Enter Email Address' />
                <input className='border bg-gray-100 py-1 px-4 rounded-full text-sm my-2' placeholder='Enter Password' />
                <input className='border bg-gray-100 py-1 px-4 rounded-full text-sm my-2' placeholder='Confirm Password' />
                <button className='my-2 bg-pink-500 p-2 rounded-full text-md text-white font-bold'>Sign Up</button>
            </form>
            <div className='flex'>
                <p className='mr-2'>Do you have an account?</p>
                <Link to="/login" >
                    <span className='font-bold text-pink-500'>Sign In</span>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Register