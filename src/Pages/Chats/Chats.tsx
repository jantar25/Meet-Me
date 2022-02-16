import React from 'react'
import Ipage from '../../Interfaces/page'
import Navbar from '../../Components/Navbar/Navbar'
import Chat from '../../Components/Chat/Chat'

const Chats:React.FunctionComponent<Ipage> = () => {
  return (
    <div>
      <Navbar BackButton="/" />
      <div className='py-8'>
        <Chat 
          name='Kate Morgan'
          message="Hey Handsome!!"
          timestamp="6 minutes ago"
          profilePic='https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
        />
        <Chat 
          name='Fred Tomson'
          message="Give me my money dude"
          timestamp="12 minutes ago"
          profilePic='https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
        />
        <Chat 
          name='John Morgan'
          message="Where is my sister you mother fucker"
          timestamp="46 minutes ago"
          profilePic='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
        />
        <Chat 
          name='Tinash Tray'
          message="Hookups only"
          timestamp="1 hour 26 minutes ago"
          profilePic='https://media.istockphoto.com/photos/overjoyed-pretty-asian-woman-look-at-camera-with-sincere-laughter-picture-id1311084168?b=1&k=20&m=1311084168&s=170667a&w=0&h=mE8BgXPgcHO1UjSmdWYa21NIKDzJvMrjOffy39Ritpo='
        />
      </div>
    </div>
  )
}

export default Chats