import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdFlash } from 'react-icons/io';
import { MdReplay,MdFavorite,MdStarRate } from 'react-icons/md';


const SwipeButtons = () => {
  return (
    <div>
        <div className='flex justify-center fixed flex w-full bottom-[10px]'>
            <div className='flex justify-center items-center w-[3rem] h-[3rem] bg-gray-100 rounded-full shadow-xl mx-2'>
                <MdReplay style={{fontSize:'2rem'}} />
            </div>
            <div className='flex justify-center items-center w-[3rem] h-[3rem] bg-gray-100 rounded-full shadow-xl mx-2'>
                <AiOutlineClose style={{fontSize:'2rem'}} />
            </div>
            <div className='flex justify-center items-center w-[3rem] h-[3rem] bg-gray-100 rounded-full shadow-xl mx-2'>
                <MdStarRate style={{fontSize:'2rem'}} />
            </div>
            <div className='flex justify-center items-center w-[3rem] h-[3rem] bg-gray-100 rounded-full shadow-xl mx-2'>
                <MdFavorite style={{fontSize:'2rem'}} />
            </div>
            <div className='flex justify-center items-center w-[3rem] h-[3rem] bg-gray-100 rounded-full shadow-xl mx-2'>
                <IoMdFlash style={{fontSize:'2rem'}} />
            </div>
        </div>
    </div>
  )
}

export default SwipeButtons