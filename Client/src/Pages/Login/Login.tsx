import React,{ useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth,db } from '../../firebase/firebase'
import { updateDoc,doc } from 'firebase/firestore'
const date1 = require("../../images/date3.png")

const Login = () => {
    const [user,setUser] = useState({
        email:'',
        password:'',
        error:'',
        loading:false,
    })
    const {email,password,error,loading} = user;
    const history=useHistory();

    const handleChange = (e:any) =>{
        setUser({ ...user, [e.target.name] : e.target.value })
    };

    const handleSubmit = async (e:any) =>{
        e.preventDefault();
        setUser({ ...user,error:'',loading:true });

        if(!email || !password) {
            setUser({ ...user,error: '*All fields are required*' })
        } else {
            try {
                const result =  await signInWithEmailAndPassword(auth,email,password);
                await updateDoc(doc(db,'users',result.user.uid),{
                    isOnline:true,
                });
                setUser({
                    email:'',
                    password:'',
                    error:'',
                    loading:false,
                });
                history.replace('/');
            } catch (error:any) {
                setUser({ ...user,error:error.message,loading:false });
            }
        }
        
    }


  return (
    <div className='h-screen flex justify-center items-center overflow-hidden'>
        <div className='flex flex-col justify-center items-center p-4'>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex'>
                    <p className='mr-2 font-[700] text-2xl md:text-3xl'>Welcom to</p>
                    <span className='text-pink-500 font-[900] text-2xl md:text-3xl'>We Meet</span>
                </div>
                <p className='text-gray-500 text-md mt-2 italic'>Where you will find your soulmate</p>
            </div>
            <div className='max-w-[250px] m-2'>
                <img src={date1} alt='date3' className='w-full'/>
            </div>
            <form className='flex flex-col w-[300px] p-2' onSubmit={handleSubmit}>
                <input className='border bg-gray-100 py-1 px-4 rounded-full text-sm my-2' 
                placeholder='Enter Email Address' type="text" name='email' value={email} onChange={handleChange} />
                <input className='border bg-gray-100 py-1 px-4 rounded-full text-sm my-2' 
                placeholder='Enter Password' type="password" name='password' value={password} onChange={handleChange} />
                {error? <p className='text-red-700 font-bold text-sm'>{user.error}</p> : null}
                <button className='my-2 bg-pink-500 p-2 rounded-full text-md text-white font-bold'>
                {loading?'Logging in ...' : 'Sign In'}</button>
            </form>
            <div className='flex'>
                <p className='mr-2'>Don't have an account?</p>
                <Link to="/register" >
                    <span className='font-bold text-pink-500'>Sign Up</span>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Login