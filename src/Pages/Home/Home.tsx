import React,{useState,useEffect} from 'react'
import Ipage from '../../Interfaces/page'
import TinderCards from "react-tinder-card"
import firebaseApp from '../../firebase/firebase'
import SwipeButtons from '../../Components/Buttons/SwipeButtons'

const Home:React.FunctionComponent<Ipage> = () => {

  const [peoples,setPeoples] = useState<any[]>([]);
  
  const database = firebaseApp.firestore();
  useEffect(() => {
    database.collection('People').onSnapshot((snapshot:any) =>(setPeoples(snapshot.docs.map((doc:any) => doc.data()))))
  },[])

  return (
    <div>
      <div className='flex justify-center my-4'>
        {peoples.map((people)=>(
          <TinderCards key={people.name} className='swipe absolute' preventSwipe={['up','down']}>
            <div style={{backgroundImage:`url(${people.url})`}} 
            className='relative w-[600px] max-w-[80vw] h-[70vh] p-8 rounded-lg bg-center bg-cover shadow-2xl'>
              <h2 className='absolute bottom-4 left-4 text-2xl text-white font-[600]'>{people.name}</h2>
            </div>
          </TinderCards>
        ))}
      </div>
      <SwipeButtons />
    </div>
  )
}

export default Home