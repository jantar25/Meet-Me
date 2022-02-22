import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdFlash } from 'react-icons/io';
import { MdReplay,MdFavorite,MdStarRate } from 'react-icons/md';


const SwipeButtons = () => {
  return (
    <div>
        <div className='fixed flex justify-evenly w-full bottom-[20px]'>
            <div className='flex justify-center items-center w-[3rem] h-[3rem] bg-gray-100 
            rounded-full shadow-xl shadow-gray-400 text-[#f5b748] cursor-pointer'>
                <MdReplay style={{fontSize:'2rem'}} />
            </div>
            <div className='flex justify-center items-center w-[3rem] h-[3rem] bg-gray-100
             rounded-full shadow-xl shadow-gray-400 text-[#ec5e6f] cursor-pointer'>
                <AiOutlineClose style={{fontSize:'2rem'}} />
            </div>
            {/* <div className='flex justify-center items-center w-[3rem] h-[3rem] bg-gray-100 
            rounded-full shadow-xl shadow-gray-400 text-[#62b4f9] cursor-pointer'>
                <MdStarRate style={{fontSize:'2rem'}} />
            </div> */}
            <div className='flex justify-center items-center w-[3rem] h-[3rem] bg-gray-100 
            rounded-full shadow-xl shadow-gray-400 text-red-700 cursor-pointer'>
                <MdFavorite style={{fontSize:'2rem'}} />
            </div>
            {/* <div className='flex justify-center items-center w-[3rem] h-[3rem] bg-gray-100
             rounded-full shadow-xl shadow-gray-400 text-[#EF3B24] cursor-pointer'>
                <IoMdFlash style={{fontSize:'2rem'}} />
            </div> */}
        </div>
    </div>
  )
}

export default SwipeButtons