import React,{ useEffect,useState,useContext,useRef } from 'react'
import Moment from 'react-moment'
import { db,storage } from '../../firebase/firebase'
import { ref,getDownloadURL,uploadBytes } from 'firebase/storage' 
import { collection,query,where,onSnapshot,addDoc,Timestamp,orderBy } from 'firebase/firestore'
import { useHistory } from 'react-router-dom'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { BsCameraVideoFill } from 'react-icons/bs'
import { useLocation } from 'react-router-dom'
import { GrAttachment } from 'react-icons/gr';
import { IoIosSend } from 'react-icons/io'
import {AuthContext} from '../../Contex/Auth'
const avatarImg = require("../../images/avatar.png")



const IndividualChat = () => {
    const location = useLocation();
    const history = useHistory();
    const currentUser= useContext<any>(AuthContext);
    const user1=currentUser?.uid
    const user2 = location.pathname.split('/')[2];
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    const [input, setInput] = useState<string>('');
    const [userChat,setUserChat] = useState<any>({});
    const [image,setImage] = useState<any>('');
    const [messages,setMessages] =useState<any[]>([]);
    const scrollRef= useRef()
    

    useEffect(() => {
        const usersRef = collection(db,"users")
        const q = query(usersRef,where('uid','==',user2))
        const onSub = onSnapshot(q,(snap:any) =>{
            snap.forEach((doc:any) => {
            setUserChat(doc.data())   
          })
        })
        return ()=> onSub()
      },[])

      useEffect(() => {
        const messagesRef = collection(db,"messages", id, 'chat')
        const q = query(messagesRef,orderBy('createdAt','asc'))
        onSnapshot(q,(snap:any) =>{
            let msgs:any= [];
            snap.forEach((doc:any) => {
            msgs.push(doc.data())   
          })
          setMessages(msgs);
        })  
    },[])


    const handleSend = async (e:any) =>{
        e.preventDefault();
        let urlPath;
        if(image){
            const imgRef = ref(storage,`images/${new Date().getTime()}-${image.name}`);
            const snap = await uploadBytes(imgRef,image);
            const dbUrl = await getDownloadURL(ref(storage,snap.ref.fullPath));
            urlPath=dbUrl;
        }
        await addDoc(collection(db, 'messages', id,'chat'),{
            text:input,
            from:user1,
            to:user2,
            createdAt: Timestamp.fromDate(new Date()),
            media:urlPath || '',
        })
        setInput("");
        setImage("");
    }

  return (
    <div>
        <div className='mb-[30px]'>
            <div className='flex flex-col fixed top-0 w-full bg-white'>
                <div className='flex justify-evenly px-4 pt-2 md:mx-16 lg:mx-24 text-pink-500'>
                    <div className='flex-1 flex justify-start items-center text-2xl' onClick={() => history.replace('/chats')}>
                        <RiArrowGoBackFill style={{cursor:'pointer'}} />
                    </div>
                    <div className='flex p-2 items-center'>
                        <div className='h-[35px] w-[35px] mr-2'>
                            <img src={userChat.avatar || avatarImg} alt='' className='h-full w-full object-cover rounded-full ring-2 ring-gray-300'/>
                        </div>
                        <span className='text-black font-[700]'>{userChat.names}</span>
                    </div>
                    <div className='flex-1 flex justify-end items-center text-2xl' onClick={() => history.replace('')}>
                        <BsCameraVideoFill style={{cursor:'pointer'}} />
                    </div>
                </div>
                <h2 className='text-[12px] text-center text-gray-300 mb-4'>You matched on {userChat.createdAt?.toDate().toDateString()}</h2>
            </div>
            { messages.length? messages.map((message,index) => (
                    <div key={index} className='flex flex-col items-center px-4 py-2 my-2'>
                            <p className={`${message.from===user1? "bg-pink-500 p-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl text-[12px] text-white font-bold ml-auto"
                           : "bg-gray-300 p-2 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl text-[12px] text-black font-bold mr-auto"}`}>
                                { message.media? <img className='w-full md:w-[500px] rounded-lg mb-1' src={message.media} alt='chatImage' /> : null }
                                {message.text}
                            </p>
                            <small className={`${message.from===user1? 'text-[10px] ml-auto':'text-[10px] mr-auto'  }`}>
                                <Moment fromNow>{message.createdAt.toDate()}</Moment>
                            </small>
                    </div>
            )) : null } 
        </div>
        <div>
            <form className='flex fixed bottom-0 w-full border-t border-gray-500' onSubmit={handleSend}>
                <input required value={input} onChange={e => setInput(e.target.value)} type='text' placeholder='Type a message...' 
                className='flex-1 p-1 text-black'/>
                <div className='text-pink-600 bg-white flex justify-center items-center px-2'>
                    <input type="file" accept='Image/*' style={{display:'none'}} id="file" onChange={(e:any)=>setImage(e.target.files[0])} />
                    <label htmlFor="file"><GrAttachment style={{fontSize:'20px',cursor:'pointer'}}/></label>
                </div>
                <div className='h-full bg-pink-500 flex justify-center items-center p-1'>
                    <button type='submit' className='font-[700] mx-2'>
                    <IoIosSend style={{fontSize:'30px',color:'white',cursor:'pointer'}} /></button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default IndividualChat