import Iroute from "../Interfaces/route";
import Chats from "../Pages/Chats/Chats";
import Home from "../Pages/Home/Home";
import Profile from "../Pages/Profile/Profile";
import IndividualChat from "../Pages/Individual_Chat/IndividualChat";


const routes: Iroute[] =[
    {
        path:'/',
        name:'Home Page',
        component: Home,
        exact:true
    },
    {
        path:'/chats',
        name:'Chats Page',
        component: Chats,
        exact:true
    },
    {
        path:'/profile',
        name:'Profile Page',
        component: Profile,
        exact:true
    },
    {
        path:'/chats/:person',
        name:'Individual chat Page',
        component: IndividualChat,
        exact:true
    }

]

export default routes;