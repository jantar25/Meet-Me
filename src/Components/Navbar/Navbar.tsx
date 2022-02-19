import React,{ useState,useEffect,useRef } from 'react'
import { signOut } from 'firebase/auth'
import { updateDoc,doc } from 'firebase/firestore'
import { auth,db } from '../../firebase/firebase' 
import { Link,useHistory } from 'react-router-dom'
import { SiGooglechat } from 'react-icons/si'
import { FaUserAlt } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
const wemeet = require("../../images/we meet.png")



const Navbar = ({BackButton}:any) => {
  const [toggleProfile,setToggleProfile] = useState(false);
  const history = useHistory();
  const menuRef = useRef<any>([]);
  const menu = () =>{setToggleProfile(!toggleProfile)} 

  useEffect(()=>{  
    let handeler = (event:any) => {if(!menuRef?.current?.contains(event.target)){setToggleProfile(false)}} 
    document.addEventListener('mousedown',handeler,{ capture: true })
    return ()=> document.removeEventListener('mousedown',handeler,{ capture: true })
  },[])

  const handleSignOut = async () =>{
    if (auth.currentUser!==null){
      await updateDoc(doc(db,'users',auth.currentUser.uid),{
        isOnline:false,
       });
      await signOut(auth);
      history.push('/login')
    }
  }

  return (
    <div className='text-pink-500'>
        <div className='flex justify-evenly text-2xl p-4 md:mx-16 lg:mx-24'>
          {BackButton? (
            <div className='flex-1 flex justify-start items-center' onClick={() => history.replace(BackButton)}>
              <RiArrowGoBackFill style={{cursor:'pointer'}} />
          </div>
          ) : (
            <div className='flex-1 flex justify-start items-center'>
                <FaUserAlt style={{cursor:'pointer'}} onClick={menu} />
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
        <div className='flex'>
            {toggleProfile && (
              <div ref={menuRef} className="flex z-30 justify-start items-start flex-col bg-[#040311] absolute
              top-0 left-0 min-w-[250px] md:min-w-[400px] rounded h-screen" onClick={menu} >
                   <div className='p-4 w-full h-full'>
                     <div className='flex flex-col items-center'>
                        <div className='w-[200px] h-[200px] '>
                          <img className='h-full w-full rounded-full object-cover' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&usqp=CAU' alt='profile' />
                        </div>
                        <div>
                          <h1>Names</h1>
                          <p>Email</p>
                          <hr />
                          <small>joined on:....</small>
                        </div>
                     </div>
                     <div className='my-4'>
                      <p className="text-white my-2 text-base hover:text-gray-300">
                      <Link className="cursor-pointer" to="Projects" onClick={menu}>Who likes you</Link></p>
                      <p className="text-white my-2 text-base hover:text-gray-300">
                      <Link className="cursor-pointer" to="technologies" onClick={menu}>Who you likes</Link></p>
                      <p className="text-white my-2 text-base hover:text-gray-300">
                      <Link className="cursor-pointer" to="about" onClick={menu}>About you</Link></p>
                      <p className="text-white my-2 text-base hover:text-gray-300" >
                      <Link className="cursor-pointer" to="contact" onClick={menu}>Contacts</Link></p>
                      <p className="text-white my-2 text-base hover:text-gray-300">
                      <Link className="cursor-pointer" to="blog" onClick={menu}>Blog</Link></p>
                      <p className="text-white my-2 text-xl font-[700] hover:text-gray-300" onClick={handleSignOut}>
                        Sign Out</p>
                     </div>
                  </div>
              </div>
            )}
          </div>
    </div>
  )
}

export default Navbar