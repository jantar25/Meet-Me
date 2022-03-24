import React, { useState,useEffect, useMemo, useRef } from 'react'
import Ipage from '../../Interfaces/page'
import TinderCard from "react-tinder-card"
import { db, auth } from '../../firebase/firebase'
import { collection,query,where,onSnapshot, setDoc, doc, getDocs,getDoc, serverTimestamp } from 'firebase/firestore'
import { AiOutlineClose } from 'react-icons/ai';
import { MdReplay,MdFavorite } from 'react-icons/md';
import Navbar from '../../Components/Navbar/Navbar'
const avatarImg = require("../../images/avatar.png")



const Home:React.FunctionComponent<Ipage> = () => {
  
  const [peoples,setPeoples] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<any | null>(null);
  const [lastDirection, setLastDirection] = useState();
  const user:any = auth.currentUser
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs:any= useMemo(
    () =>
      Array(peoples.length)
        .fill(0)
        .map((i) => React.createRef()),
    [peoples.length]
  )


  const updateCurrentIndex = (val:any) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }
  const userSwiped:any = peoples[currentIndex]

  const canGoBack = currentIndex < peoples.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction:any, nameToDelete:any, index:any) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name:any, idx:any) => {
      console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
      // handle the case in which go back is pressed before card goes outOfFrame
      currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
      // TODO: when quickly swipe and restore multiple times the same card,
      // it happens multiple outOfFrame events are queued and the card disappear
      // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir:any) => {
    if(!peoples[currentIndex]) return;

    if (canSwipe && currentIndex < peoples.length) {
      await childRefs[currentIndex]?.current?.swipe(dir) ;// Swipe the card!
    }

    if(dir==='Left'){
      setDoc(doc(db,"users",user.uid,'passes',userSwiped.uid),userSwiped)
      console.log("Dislike")
    } else {
      const loggedInProfile = await (await getDoc(doc(db, 'users', user.uid))).data();
      console.log("Like")
      getDoc(doc(db, 'users', userSwiped.uid,'swipes', user.uid)).then((documentSnapshot)=>{
        if(documentSnapshot.exists()){
          const generatedId = (id1:any,id2:any) => (id1>id2 ? id1+id2 : id2+id1)

          setDoc(doc(db,"users",user.uid,'swipes',userSwiped.uid),userSwiped)

          setDoc(doc(db,"matches",generatedId(user.uid,userSwiped.uid)),{
            users:{
              [user.uid] : loggedInProfile,
              [userSwiped.uid]:userSwiped,
            },
            usersMatched: [user.uid,userSwiped.uid],
            timestamp: serverTimestamp(),
          })

        } else{
          setDoc(doc(db,"users",user.uid,'swipes',userSwiped.uid),userSwiped)
        }
      })
    }
    
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex]?.current?.restoreCard()
  }

  useEffect(() =>  {
    const fetchCards = async () =>{
      const passes:any = await getDocs(collection(db,"users",user.uid,'passes'))
      .then(snapshot => snapshot.docs.map(doc=>doc.id));
      const swapes:any = await getDocs(collection(db,"users",user.uid,'swipes'))
      .then(snapshot => snapshot.docs.map(doc=>doc.id));
      const passedUserIds = passes.length> 0 ? passes : ['test'];
      const swapedUserIds = swapes.length> 0 ? swapes : ['test'];
      const usersRef = collection(db,"users")
      const q = query(usersRef,where('uid','not-in',[...passedUserIds,...swapedUserIds]))
      const onSub = onSnapshot(q,(snapshot:any) =>{
        let peoples:any = [];
        peoples.push(snapshot.docs.filter((doc:any)=>doc.id !== user.uid)
        .map((doc:any)=>({id:doc.id,...doc.data()})))
        setPeoples(peoples[0]);
        setCurrentIndex(peoples[0].length - 1)
      })
      return ()=> onSub()
    }
    fetchCards()
  },[db])

  return (
    <div>
      <Navbar />
        <div className='flex justify-center my-4'>
           {peoples.map((people, index:any)=>(
             <TinderCard key={people.uid} 
             ref={childRefs[index]} 
             className='swipe absolute'
             onSwipe={(dir:any) => swiped(dir, people.uid, index)}
             onCardLeftScreen={() => outOfFrame(people.uid, index)}
             preventSwipe={['up','down']}>
               <div className='relative w-[600px] max-w-[80vw] h-[65vh] rounded-lg'>
                <div style={{filter:'brightness(80%)',backgroundImage:`url(${people.avatar || avatarImg})`}} 
               className='w-[600px] max-w-[80vw] h-[65vh] p-8 rounded-lg bg-center bg-cover shadow-2xl shadow-gray-500' />
               <h2 className='absolute bottom-4 left-4 text-2xl text-white font-[700]'>{people.names}</h2>
               </div>
             </TinderCard> 
           ))}
             <div className='flex justify-evenly w-full absolute bottom-4 '>
               <div className='flex justify-center items-center w-[3rem] h-[3rem] bg-gray-100
                rounded-full shadow-xl shadow-gray-400 text-[#ec5e6f] cursor-pointer' onClick={() => swipe('Left')}>
                   <AiOutlineClose style={{fontSize:'2rem'}} />
               </div>
               <div className='flex justify-center items-center w-[3rem] h-[3rem] bg-gray-100 
               rounded-full shadow-xl shadow-gray-400 text-[#f5b748] cursor-pointer' onClick={() => goBack()}>
                   <MdReplay style={{fontSize:'2rem'}} />
               </div>
               <div className='flex justify-center items-center w-[3rem] h-[3rem] bg-gray-100 
               rounded-full shadow-xl shadow-gray-400 text-red-700 cursor-pointer' onClick={() => swipe('Right')}>
                   <MdFavorite style={{fontSize:'2rem'}} />
               </div>
             </div>
         </div>     
    </div>
  )
}

export default Home