import React from 'react'
import { SiGooglechat } from 'react-icons/si'
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const wemeet = require("../../images/we meet.png")


const Navbar = () => {
  return (
    <div>
        <div className='flex text-2xl justify-between items-center p-4 md:p-8'>
            <Link to="/profile"><FaUserAlt style={{cursor:'pointer'}} /></Link>
            <div className='w-[80px]'>
                <Link to="/">
                    <img src={wemeet} alt='logo' />
                </Link>
            </div>
            <Link to="/chats"><SiGooglechat style={{cursor:'pointer'}} /></Link>
        </div>
    </div>
  )
}

export default Navbar