import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { MdReplay,MdFavorite } from 'react-icons/md';


const SwipeButtons = () => {
  return (
    <div>
        <div className='flex justify-between w-full p-4'>
            <div className='flex justify-center items-center w-[3rem] h-[3rem] bg-gray-100 
            rounded-full shadow-xl shadow-gray-400 text-[#f5b748] cursor-pointer'>
                <MdReplay style={{fontSize:'2rem'}} />
            </div>
            <div className='flex justify-center items-center w-[3rem] h-[3rem] bg-gray-100
             rounded-full shadow-xl shadow-gray-400 text-[#ec5e6f] cursor-pointer'>
                <AiOutlineClose style={{fontSize:'2rem'}} />
            </div>
            <div className='flex justify-center items-center w-[3rem] h-[3rem] bg-gray-100 
            rounded-full shadow-xl shadow-gray-400 text-red-700 cursor-pointer'>
                <MdFavorite style={{fontSize:'2rem'}} />
            </div>
        </div>
    </div>
  )
}

export default SwipeButtons