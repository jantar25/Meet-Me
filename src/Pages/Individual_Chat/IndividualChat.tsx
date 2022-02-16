import React,{useState} from 'react'
import Navbar from '../../Components/Navbar/Navbar'


const IndividualChat = () => {
    const [input, setInput] = useState<string>('');
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

    const handleSend = (e:any) =>{
        e.preventDefault();
        setMessages([...messages, {message:input}]);
        setInput("");
    }

  return (
    <div>
        <Navbar BackButton="/chats" />
        <div>
            <h2 className='text-center p-2 text-gray-300 mb-4'>You matched with Ellen on 10/03/2021</h2>
            {messages.map((message,index) => (
                message.name? (
                    <div key={index} className='flex items-center px-4 py-2'>
                        <div className='h-[24px] w-[24px] mr-4'>
                            <img src={message.image} alt={message.name} className='h-full w-full object-cover rounded-full ring-2 ring-gray-300'/>
                        </div>
                        <p className='bg-gray-300 p-2 rounded-2xl text-[12px] text-black font-bold'>{message.message}</p>
                    </div>
                ) : (
                    <div key={index} className='flex items-center px-4 py-2'>
                        <p className='bg-pink-500 p-2 rounded-2xl text-[12px] text-white font-bold ml-auto'>{message.message}</p>
                    </div>
                )
            ))}
        </div>
        <div>
            <form className='flex p-1 fixed bottom-0 w-full border-t border-gray-500'>
                <input value={input} onChange={e => setInput(e.target.value)} type='text' placeholder='Type a message...' 
                className='flex-1 p-1 text-black'/>
                <button onClick={handleSend} type='submit' className='mx-2 font-[700] text-pink-500'>SEND</button>
            </form>
        </div>
    </div>
  )
}

export default IndividualChat