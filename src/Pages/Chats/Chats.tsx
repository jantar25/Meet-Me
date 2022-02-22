import React,{ useEffect,useState} from 'react'
import { db, auth } from '../../firebase/firebase'
import { collection,query,where,onSnapshot } from 'firebase/firestore'
import Ipage from '../../Interfaces/page'
import Navbar from '../../Components/Navbar/Navbar'
import { Link } from 'react-router-dom'
const avatarImg = require("../../images/avatar.png")



const Chats:React.FunctionComponent<Ipage> = () => {
  const [peoples,setPeoples] = useState<any[]>([]);
  
  useEffect(() => {
    const usersRef = collection(db,"users")
    const q = query(usersRef,where('uid','not-in',[auth.currentUser?.uid]))
    const onSub = onSnapshot(q,(snapshot:any) =>{
      let peoples:any = []
      snapshot.forEach((doc:any) => {
      peoples.push(doc.data())
    })
      setPeoples(peoples);
    })
    return ()=> onSub()
  },[])
 
  
  return (
    <div>
      <Navbar BackButton="/" />
      <div className='py-8'>
        {peoples.map((people:any) =>(
          <div key={people.uid}>
          <Link to={`/chats/${people.names}`}>
              <div className='flex justify-between items-center p-4 h-[70px] border-b border-gray-100'>
                  <div className='h-[48px] w-[48px] mr-4'>
                      <img src={people.avatar || avatarImg} alt={people.names} className='h-full w-full object-cover rounded-full ring-2 ring-gray-300'/>
                  </div>
                  <div className='flex-1'>
                      <h1 className='font-[700] text-black'>{people.names}</h1>
                      <p className='text-gray-600 text-[12px]'>Hello there!!!</p>
                  </div>
                  <div className='flex flex-col'>
                      <span className='text-gray-400 text-[10px]'>{people.createdAt.toDate().toDateString()}</span>
                      {people.isOnline? 
                      (<div>
                        <span className='text-[12px] text-green-500 font-[700]'>Online</span>
                      </div>) : null}
                  </div>
              </div>
          </Link>
      </div>
        ))}
      </div>
    </div>
  )
}

export default Chats