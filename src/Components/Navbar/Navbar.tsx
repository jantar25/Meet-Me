import React,{ useState,useEffect,useRef } from 'react'
import { signOut } from 'firebase/auth'
import { updateDoc,doc,getDoc } from 'firebase/firestore'
import { auth,db,storage } from '../../firebase/firebase'
import { ref,getDownloadURL,uploadBytes,deleteObject } from 'firebase/storage' 
import { Link,useHistory } from 'react-router-dom'
import { SiGooglechat } from 'react-icons/si'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { BsCamera } from 'react-icons/bs'
const wemeet = require("../../images/we meet.png")
const avatarImg = require("../../images/avatar.png")



const Navbar = ({BackButton}:any) => {
  const [toggleProfile,setToggleProfile] = useState(false);
  const [img,setImg] = useState<any>("");
  const [user,setUser] = useState<any>("");
  const history = useHistory();
  const menuRef = useRef<any>([]);
  const menu = () =>{setToggleProfile(!toggleProfile)} 

  useEffect(()=>{
    if (auth.currentUser!==null){
    getDoc(doc(db,'users',auth.currentUser.uid)).then((docSnap)=>{
      if(docSnap.exists()){
        setUser(docSnap.data())
      }
    })
    } 
    if(img){
      const uploadImg = async () =>{
        const imgRef = ref(storage,`avatar/${new Date().getTime()}-${img.name}`);
        try {
          if(user.avatarPath){
            await deleteObject(ref(storage,user.avatarPath))
          }
          const snap = await uploadBytes(imgRef,img);
          const url = await getDownloadURL(ref(storage,snap.ref.fullPath));

          if (auth.currentUser!==null){
            await updateDoc(doc(db,"users",auth.currentUser.uid),{
              avatar:url,
              avatarPath:snap.ref.fullPath,
            })
            }
            setUser('')
          
        } catch (error:any) {
          console.log(error.message)}
        };
        uploadImg();
      }

  },[img])

  useEffect(()=>{  
    let handeler = (e:any) => {if(menuRef.current && !menuRef.current.contains(e.target)){setToggleProfile(false)}} 
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
                <img className='h-[40px] w-[40px] rounded-full object-cover' 
                          src={user.avatar || avatarImg} alt='profile' onClick={menu} /> 
            </div>
          )}
            <div className='flex-1 flex justify-center items-center'>
                <Link to="/">
                    <img src={wemeet} alt='logo' className='w-[5rem]' />
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
              top-0 left-0 min-w-[250px] md:min-w-[400px] rounded-r-lg h-screen" >
                   <div className='p-4 w-full h-full '>
                     <div className='flex flex-col items-center relative'>
                        <div className='w-[100px] md:w-[200px] h-[100px] md:h-[200px] relative'>
                          <img className='h-full w-full rounded-full object-cover' 
                          src={user? user.avatar : avatarImg} alt='profile' />
                          <div className='absolute w-[40px] h-[40px] rounded-full text-white bg-pink-600 bottom-[2px] right-[2px] flex justify-center items-center'>
                            <input type="file" accept='Image/*' style={{display:'none'}} id="file" onChange={(e:any)=>setImg(e.target.files[0])} />
                            <label htmlFor="file"><BsCamera style={{fontSize:'25px',cursor:'pointer'}}/></label>
                          </div>
                        </div>
                     </div>
                     <div className='my-4' onClick={menu}>
                        <div className='flex flex-col justify-between items-center'>
                          <h1 className='text-xl text-white font-[700] mr-4'>{user && user.names}</h1>
                          <p className='text-sm text-gray-300 font-[100]'>{user && user.email}</p>
                        </div>
                        <p className='text-sm text-gray-600 my-4'>joined on: {user && user.createdAt.toDate().toDateString()}</p>
                        <hr />
                      </div>
                     <div className='my-4'onClick={menu}>
                      <p className="text-white my-2 text-base hover:text-gray-300">
                      <Link className="cursor-pointer" to="Projects" onClick={menu}>Who likes you</Link></p>
                      <p className="text-white my-2 text-base hover:text-gray-300">
                      <Link className="cursor-pointer" to="technologies" onClick={menu}>Who you likes</Link></p>
                      <p className="text-white my-2 text-base hover:text-gray-300">
                      <Link className="cursor-pointer" to="about" onClick={menu}>About you</Link></p>
                      <p className="text-white my-2 text-base hover:text-gray-300" >
                      <Link className="cursor-pointer" to="contact" onClick={menu}>Contacts</Link></p>
                      <button className="absolute bottom-[20px] text-white px-8 text-lg p-2 bg-pink-700 rounded-lg font-[700]" 
                      onClick={handleSignOut}>Sign Out</button>
                     </div>
                  </div>
              </div>
            )}
          </div>
    </div>
  ) 
}

export default Navbar