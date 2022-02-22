import React,{useState,useEffect} from 'react'
import Ipage from '../../Interfaces/page'
import TinderCards from "react-tinder-card"
import { db, auth } from '../../firebase/firebase'
import { collection,query,where,onSnapshot } from 'firebase/firestore'
import SwipeButtons from '../../Components/Buttons/SwipeButtons'
import Navbar from '../../Components/Navbar/Navbar'
const avatarImg = require("../../images/avatar.png")



const Home:React.FunctionComponent<Ipage> = () => {

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
      <Navbar />
      <div className='flex justify-center my-4'>
        {peoples.map((people)=>(
          <TinderCards key={people.uid} className='swipe absolute' preventSwipe={['up','down']}>
            <div style={{backgroundImage:`url(${people.avatar || avatarImg})`}} 
            className='relative w-[600px] max-w-[80vw] h-[65vh] p-8 rounded-lg bg-center bg-cover shadow-2xl shadow-gray-500'>
              <h2 className='absolute bottom-4 left-4 text-2xl text-white font-[700]'>{people.names}</h2>
            </div>
          </TinderCards>
        ))}
      </div>
      <SwipeButtons />
    </div>
  )
}

export default Home