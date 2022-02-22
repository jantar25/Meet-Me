import React,{ useEffect,useState } from 'react'
import { db } from '../../firebase/firebase'
import { collection,query,where,onSnapshot } from 'firebase/firestore'
import Navbar from '../../Components/Navbar/Navbar'
import { useLocation } from 'react-router-dom'
import { GrAttachment } from 'react-icons/gr';
import { IoIosSend } from 'react-icons/io'


const IndividualChat = () => {
    const [input, setInput] = useState<string>('');
    const location = useLocation();
    const userChat = location.pathname.split('/')[2];
    const [user2,setUser2] = useState<any>({});
    const [media,setMedia] = useState<any>('');
    const [messages,setMessages] = useState<any[]>([
        {
            name:"Ellen",
            image:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            message:'What the fuck bro'
        },
        {
            name:"Ellen",
            image:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            message:'Dude this is insane'
        },
        {
            message:'Calm down nigger'
        }
    ]);

    useEffect(() => {
        const usersRef = collection(db,"users")
        const q = query(usersRef,where('uid','==',userChat))
        const onSub = onSnapshot(q,(snap:any) =>{
            snap.forEach((doc:any) => {
            setUser2(doc.data())   
          })
        })
        return ()=> onSub()
      },[])

    const handleSend = (e:any) =>{
        e.preventDefault();
        setMessages([...messages, {message:input}]);
        setInput("");
    }

  return (
    <div>
        <Navbar BackButton="/chats" />
        <div>
            <h2 className='text-center text-[12px] p-2 text-gray-300 mb-4'>You matched with <span className='text-black font-[700]'>{user2.names}</span> on {user2.createdAt?.toDate().toDateString()}</h2>
            {messages.map((message,index) => (
                message.name? (
                    <div key={index} className='flex items-center px-4 py-2'>
                        <div className='h-[24px] w-[24px] mr-4'>
                            <img src={user2.avatar} alt={message.name} className='h-full w-full object-cover rounded-full ring-2 ring-gray-300'/>
                        </div>
                        <p className='bg-gray-300 p-2 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl text-[12px] text-black font-bold'>
                            {message.message}</p>
                    </div>
                ) : (
                    <div key={index} className='flex items-center px-4 py-2'>
                        <p className='bg-pink-500 p-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl text-[12px] text-white font-bold ml-auto'>
                            {message.message}</p>
                    </div>
                )
            ))}
        </div>
        <div>
            <form className='flex fixed bottom-0 w-full border-t border-gray-500'>
                <input value={input} onChange={e => setInput(e.target.value)} type='text' placeholder='Type a message...' 
                className='flex-1 p-1 text-black'/>
                <div className='text--pink-600 flex justify-center items-center mx-2'>
                    <input type="file" accept='Image/*' style={{display:'none'}} id="file" onChange={(e:any)=>setMedia(e.target.files[0])} />
                    <label htmlFor="file"><GrAttachment style={{fontSize:'20px',cursor:'pointer'}}/></label>
                </div>
                <div className='h-full bg-pink-500 flex justify-center items-center'>
                    <button onClick={handleSend} type='submit' className='font-[700] mx-2'>
                    <IoIosSend style={{fontSize:'30px',color:'white',cursor:'pointer'}} /></button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default IndividualChat