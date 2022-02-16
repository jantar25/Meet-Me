import React from 'react'
import { Link } from 'react-router-dom'
import Ichat from '../../Interfaces/chat'

const Chat = (chat:Ichat) => {
  return (
    <div>
        <Link to={`/chats/${chat.name}`}>
            <div className='flex justify-between items-center p-4 h-[70px] border-b border-gray-100'>
                <div className='h-[48px] w-[48px] mr-4'>
                    <img src={chat.profilePic} alt={chat.name} className='h-full w-full object-cover rounded-full ring-2 ring-gray-300'/>
                </div>
                <div className='flex-1'>
                    <h1 className='font-[700] text-black'>{chat.name}</h1>
                    <p className='text-gray-600 text-[12px]'>{chat.message}</p>
                </div>
                <div>
                    <span className='text-gray-400 text-[10px]'>{chat.timestamp}</span>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Chat