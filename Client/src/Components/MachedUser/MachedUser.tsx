import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase/firebase'
import { doc,getDoc,onSnapshot,updateDoc} from 'firebase/firestore'
import { Badge } from '@material-ui/core'
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'
const avatarImg = require("../../images/avatar.png")



const MachedUser = ({people,currentUser}:any) => {
    delete people.users[currentUser];
    const [userid,user]=Object.entries(people.users).flat()
    const matchedUser={userid,user}
    const match:any=matchedUser.user
    const [data,setData] =useState<any>('');
    const user1=currentUser;
    const user2=match.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    const theme:any = createTheme({
        palette: {
            primary: {
            main: '#FF1493'
          }
        }
      });

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
    <MuiThemeProvider theme={theme}>
    <Link to={`/chats/${match.uid}`} onClick={handleRead}>
    <div className='flex justify-between items-center p-4 h-[70px] border-b border-gray-100'>
        <div className='h-[48px] w-[48px]'>
            <img src={match.avatar || avatarImg} alt={match.names} className='h-full w-full object-cover rounded-full ring-2 ring-gray-300'/>
        </div>
        <div className='flex-1 ml-4'>
            <h1 className='font-[700] text-black mr-2'>{match.names}</h1>
            {data && (
                <p className='text-gray-600 text-[12px] w-[160px] truncate'>
                    <strong>{data?.from === currentUser ? "Me: " : null}</strong>
                    {data.text}</p>
            )}
        </div>
        <div className='text-right'>
            <div className='flex items-center justify-center mb-4'>
                {data?.from !== currentUser && data?.unread &&
                 (<Badge badgeContent={1} color="primary" /> ) }
            </div>
            <div className='flex items-center justify-center'>
            {data && (<span className='text-gray-400 text-[10px]'>
                {data?.createdAt.toDate().getHours()+ ":" + data?.createdAt.toDate().getMinutes()}
            </span>)}
            </div>
        </div>
    </div>
</Link>
</MuiThemeProvider>
  )
}

export default MachedUser