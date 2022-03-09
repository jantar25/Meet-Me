import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase/firebase'
import { doc,getDoc,onSnapshot,updateDoc} from 'firebase/firestore'
const avatarImg = require("../../images/avatar.png")



const MachedUser = ({people,currentUser}:any) => {
    const [data,setData] =useState<any>('');
    const user1=currentUser;
    const user2=people.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

    useEffect(()=>{
        let unsub = onSnapshot(doc(db, 'lastMessages',id) , (doc:any) =>{
            setData(doc.data())
        })
        return ()=>unsub();
    },[])

    const handleRead = async () =>{
        const docSnap = await getDoc(doc(db,'lastMessages',id));
        const docData:any = docSnap.data();
        if(docData && docData.from !== currentUser) {
            await updateDoc(doc(db,'lastMessages',id),{unread:false})
        }
    }

  return (
    <Link to={`/chats/${people.uid}`} onClick={handleRead}>
    <div className='flex justify-between items-center p-4 h-[70px] border-b border-gray-100'>
        <div className='h-[48px] w-[48px]'>
            <img src={people.avatar || avatarImg} alt={people.names} className='h-full w-full object-cover rounded-full ring-2 ring-gray-300'/>
        </div>
        <div className='flex-1 ml-4'>
            <h1 className='font-[700] text-black mr-2'>{people.names}</h1>
            {data && (
                <p className='text-gray-600 text-[12px] w-[160px] truncate'>
                    <strong>{data?.from === currentUser ? "Me: " : null}</strong>
                    {data.text}</p>
            )}
        </div>
        <div className='flex flex-col'>
            {data?.from !== currentUser && data?.unread &&
                 (<small className='text-[14px] text-green-500 font-[800] text-right'>new</small>) }
            <span className='text-gray-400 text-[10px]'>{people.createdAt.toDate().toDateString()}</span>
        </div>
    </div>
</Link>
  )
}

export default MachedUser