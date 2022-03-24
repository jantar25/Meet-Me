import React,{ useEffect,useState} from 'react'
import { db, auth } from '../../firebase/firebase'
import { collection,query,where,onSnapshot} from 'firebase/firestore'
import Ipage from '../../Interfaces/page'
import Navbar from '../../Components/Navbar/Navbar'
import MachedUser from '../../Components/MachedUser/MachedUser'


const Chats:React.FunctionComponent<Ipage> = () => {
  const [peoples,setPeoples] = useState<any[]>([]);
  const currentUser:any=auth.currentUser?.uid
  
  useEffect(() => {
    const usersRef = collection(db,"matches")
    const q = query(usersRef,where('usersMatched','array-contains',currentUser))
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
      {peoples.length? (
      <div className='py-8'>
      {peoples.map((people:any,index) =>(
        <div key={index}>
          <MachedUser people={people} currentUser={currentUser} />
        </div>
      ))}
    </div>
      ) : (
        <div className='flex flex-col items-center justify-center h-[65vh]'>
        <p className='font-[600] text-lg mb-4' >No Matching Yet</p>
     </div>
      )}

    </div>
  )
}

export default Chats