import React,{ useState,useEffect,useRef } from 'react'
import { signOut } from 'firebase/auth'
import { updateDoc,doc,getDoc } from 'firebase/firestore'
import { auth,db,storage } from '../../firebase/firebase'
import { ref,getDownloadURL,uploadBytes,deleteObject } from 'firebase/storage' 
import { Link,useHistory } from 'react-router-dom'
import { SiGooglechat } from 'react-icons/si'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { AiOutlineClose } from 'react-icons/ai';
import { BsCamera } from 'react-icons/bs'
// import { io } from 'socket.io-client'

// const socket = io('http://localhost:7000/')
const wemeet = require("../../images/we meet.png")
const avatarImg = require("../../images/avatar.png")



const Navbar = ({BackButton}:any) => {
  const [toggleProfile,setToggleProfile] = useState(false);
  const [img,setImg] = useState<any>("");
  const [user,setUser] = useState<any>("");
  const history = useHistory();
  const menuRef = useRef<any>([]);
  const menu = () =>{setToggleProfile(!toggleProfile)} 
  const currentUser:any = auth.currentUser?.uid;

  // const handleSocketUser = () =>{
  //   socket.emit('new_user',currentUser);
  // }
  
  useEffect(()=>{      
    if(img){
        const uploadImg = async () =>{
        const imgRef = ref(storage,`avatar/${new Date().getTime()}-${img.name}`);
        try {
          const snap = await uploadBytes(imgRef,img);
          const url = await getDownloadURL(ref(storage,snap.ref.fullPath));
          if(user.avatarPath){
            await deleteObject(ref(storage,user.avatarPath))
          } 
            await updateDoc(doc(db,"users",currentUser),{
              avatar:url,
              avatarPath:snap.ref.fullPath,
            })
            setUser('')
          
        } catch (error:any) {
          console.log(error.message)}
        };
        uploadImg();
      }

      getDoc(doc(db,'users',currentUser)).then((docSnap)=>{
        if(docSnap.exists()){
          setUser(docSnap.data())
        }
      }) 
  },[img])


  useEffect(()=>{  
    let handeler = (e:any) => {if(menuRef.current && !menuRef.current.contains(e.target)){setToggleProfile(false)}} 
    document.addEventListener('mousedown',handeler,{ capture: true })
    return ()=> document.removeEventListener('mousedown',handeler,{ capture: true })
  },[])

  const handleSignOut = async () =>{
      await updateDoc(doc(db,'users',currentUser),{
        isOnline:false,
       });
      await signOut(auth);
      history.push('/login')
  }

  return (
    <div className='sticky top-0 z-50 bg-white text-pink-500'>
        <div className='flex justify-evenly text-2xl p-4 md:mx-16 lg:mx-24'>
          {BackButton? (
            <div className='flex-1 flex justify-start items-center' onClick={() => history.replace(BackButton)}>
              <RiArrowGoBackFill style={{cursor:'pointer'}} />
          </div>
          ) : (
            <div className='flex-1 flex justify-start items-center'>
                <img className='h-[40px] w-[40px] rounded-full object-cover cursor-pointer' 
                          src={user.avatar || avatarImg } alt='profile' onClick={menu} /> 
            </div>
          )}
            <div className='flex-1 flex justify-center items-center'>
                <Link to="/">
                    <img src={wemeet} alt='logo' className='w-[5rem]' />
                </Link>
            </div>
            <div className='flex-1 flex justify-end items-center'>
              <Link to="/chats" /*{onClick={handleSocketUser}}*/ >
                <SiGooglechat style={{cursor:'pointer'}} />
              </Link>
            </div>
        </div>
        <div className='flex'>
            {user?
              (<div ref={menuRef} className={`flex justify-center items-center flex-col bg-[#F5F0F0] fixed top-0 left-[-75vw] sm:left-[-35vw] overflow-y-auto
              w-[75vw] sm:w-[35vw] rounded-r-lg h-screen ${toggleProfile? 'translate-x-full' : 'translate-x-0'} ease-in-out duration-500`}>
                   <div className='p-4 w-full h-full relative'>
                     <div className='flex flex-col items-center relative'>
                        <div className='w-[120px] md:w-[200px] h-[120px] md:h-[200px] relative'>
                          <img className='h-full w-full rounded-full object-cover ring-2 ring-white' 
                          src={user.avatar || avatarImg} alt='profile' />
                          <div className='absolute w-[40px] h-[40px] rounded-full text-white bg-pink-600 bottom-[2px] right-[2px] flex justify-center items-center'>
                            <input type="file" accept='Image/*' style={{display:'none'}} id="file" onChange={(e:any)=>setImg(e.target.files[0])} />
                            <label htmlFor="file"><BsCamera style={{fontSize:'25px',cursor:'pointer'}}/></label>
                          </div>
                        </div>
                     </div>
                     <div onClick={menu}>
                        <div className='flex flex-col justify-between items-center'>
                          <h1 className='text-2xl text-black font-[900] mr-4'>{user && user.names}</h1>
                          <p className='text-sm text-black font-[100]'>{user && user.email}</p>
                        </div>
                        <p className='text-sm text-gray-900 my-4'>joined on: {user && user.createdAt.toDate().toDateString()}</p>
                        <hr />
                      </div>
                     <div className='flex flex-col' onClick={menu}>
                      <Link className="cursor-pointer" to="Projects" onClick={menu}>
                          <div className=" flex flex-col my-1 bg-white rounded-lg items-center drop-shadow-lg">
                            <h3 className='text-md text-gray-500 font-[700]'>Matches</h3>
                            <span className='text-pink-700 font-[700]'>469</span>
                          </div>
                        </Link>
                        <Link className="cursor-pointer" to="Projects" onClick={menu}>
                          <div className=" flex flex-col my-1 bg-white rounded-lg items-center drop-shadow-lg">
                            <h3 className='text-md text-gray-500 font-[700]'>Followers</h3>
                            <span className='text-pink-700 font-[700]'>469</span>
                          </div>
                        </Link>
                        <Link className="cursor-pointer" to="Projects" onClick={menu}>
                          <div className=" flex flex-col my-1 bg-white rounded-lg items-center drop-shadow-lg">
                            <h3 className='text-md text-gray-500 font-[700]'>Follows</h3>
                            <span className='text-pink-700 font-[700]'>469</span>
                          </div>
                        </Link>
                      <button className="text-xl mt-4 text-white p-2 rounded-lg font-[700] bg-pink-700 rounded-lg" 
                      onClick={handleSignOut}>Sign Out</button>
                     </div>
                     <button className='absolute top-4 right-4' onClick={menu}>
                      <AiOutlineClose style={{fontSize:'20px'}} />
                    </button>
                  </div>
              </div>):null}
          </div>
    </div>
  ) 
}

export default Navbar