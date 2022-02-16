import React from 'react'
import Ichat from '../../Interfaces/chat'

const Chat = (chat:Ichat) => {
  return (
    <div>
        <div className='flex justify-between px-2 py-4 mx-4 my-2 rounded bg-gray-100'>
            <div className='flex'>
                <div className='bg-gray-500 h-12 w-12'>
                    <img src={chat.profilePic} alt='profile pic' className='h-full w-full object-cover rounded-full ring-2 ring-white'/>
                </div>
                <div className='mx-4'>
                    <h1 className='font-[600] text-black'>{chat.name}</h1>
                    <p className='text-gray-500 text-[12px]'>{chat.message}</p>
                </div>
            </div>
            <div>
                <span className='text-gray-300 text-[10px]'>{chat.timestamp}</span>
            </div>
        </div>
    </div>
  )
}

export default Chat