import React from 'react'
import { SiGooglechat } from 'react-icons/si'
import { FaUserAlt } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { Link,useHistory } from 'react-router-dom'
const wemeet = require("../../images/we meet.png")


const Navbar = ({BackButton}:any) => {
  const history = useHistory()
  return (
    <div className='text-pink-500'>
        <div className='flex justify-evenly text-2xl p-4 md:mx-16 lg:mx-24'>
          {BackButton? (
            <div className='flex-1 flex justify-start items-center' onClick={() => history.replace(BackButton)}>
              <RiArrowGoBackFill style={{cursor:'pointer'}} />
          </div>
          ) : (
            <div className='flex-1 flex justify-start items-center'>
              <Link to="/profile" >
                <FaUserAlt style={{cursor:'pointer'}} />
              </Link>
            </div>
          )}
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