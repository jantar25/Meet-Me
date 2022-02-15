import React from 'react'
import { SiGooglechat } from 'react-icons/si'
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const wemeet = require("../../images/we meet.png")


const Navbar = () => {
  return (
    <div className='flex justify-center'>
        <div className='flex text-2xl p-4 w-[100vw] md:max-w-[80vw] lg:max-w-[60vw]'>
            <div className='flex-1 flex justify-start items-center'>
              <Link to="/profile" >
                  <FaUserAlt style={{cursor:'pointer'}} />
                </Link>
            </div>
            <div className='flex-1 flex justify-center items-center'>
                <Link to="/">
                    <img src={wemeet} alt='logo' className='w-[4rem]' />
                </Link>
            </div>
            <div className='flex-1 flex justify-end items-center'>
              <Link to="/chats">
                <SiGooglechat style={{cursor:'pointer'}} />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar