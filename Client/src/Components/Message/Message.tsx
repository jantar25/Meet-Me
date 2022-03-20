import React,{useRef,useEffect} from 'react'
import Moment from 'react-moment'


const Message = ({message,user1}:any) => {
    const scrollRef:any= useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior:'smooth'})
    },[message])

  return (
    <div className='flex flex-col items-center px-4 py-2 my-2' ref={scrollRef}>
    <p className={`${message.from===user1? "bg-pink-500 p-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl text-[12px] text-white font-bold ml-auto"
   : "bg-gray-300 p-2 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl text-[12px] text-black font-bold mr-auto"}`}>
        { message.media? <img className='w-full md:w-[500px] rounded-lg mb-1' src={message.media} alt='chatImage' /> : null }
        {message.text}
    </p>
    <small className={`${message.from===user1? 'text-[10px] ml-auto':'text-[10px] mr-auto'  }`}>
        <Moment fromNow>{message.createdAt?.toDate()}</Moment>
    </small>
</div>
  )
}

export default Message