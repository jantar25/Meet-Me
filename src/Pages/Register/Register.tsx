import React,{ useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth,db } from '../../firebase/firebase'
import { setDoc,doc,Timestamp } from 'firebase/firestore'


const Register = () => {
    const [user,setUser] = useState({
        names:'',
        email:'',
        password:'',
        confirmPassword:'',
        error:'',
        loading:false,
    })
    const {names,email,password,confirmPassword,error,loading} = user;
    const history=useHistory();
    const handleChange = (e:any) =>{
        setUser({ ...user, [e.target.name] : e.target.value })
    };
    const handleSubmit = async (e:any) =>{
        e.preventDefault();
        setUser({ ...user,error:'',loading:true });

        if(!names || !email || !password || !confirmPassword) {
            setUser({ ...user,error: '*All fields are required*' })
        } else if (password !== confirmPassword) {
            setUser({ ...user,error: '*Confirm password must be equal to password*' })
        }
        try {
            const result =  await createUserWithEmailAndPassword(auth,email,password);
            await setDoc(doc(db,'users',result.user.uid),{
                uid:result.user.uid,
                names,
                email,
                createdAt:Timestamp.fromDate(new Date()),
                isOnline:true,
            });
            setUser({
                names:'',
                email:'',
                password:'',
                confirmPassword:'',
                error:'',
                loading:false,
            });
            history.replace('/');
        } catch (error:any) {
            setUser({ ...user,error:error.message,loading:false });
        }
    }

  return (
<div className='h-screen flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center p-4'>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex'>
                    <p className='mr-2 font-[700] text-2xl md:text-3xl'>Welcom to</p>
                    <span className='text-pink-500 font-[900] text-2xl md:text-3xl'>We Meet</span>
                </div>
                <p className='text-gray-500 text-md mt-2 italic'>Where you will find your soulmate</p>
                <p className='text-pink-400 text-lg mt-8'>Fill the form to get registered</p>
            </div>
            <form className='flex flex-col w-[300px] p-2' onSubmit={handleSubmit}>
                <input className='border bg-gray-100 py-1 px-4 rounded-full text-sm my-2' 
                placeholder='Enter your Names' type="text" name='names' value={names} onChange={handleChange} />
                <input className='border bg-gray-100 py-1 px-4 rounded-full text-sm my-2' 
                placeholder='Enter Email Address' type="text" name='email' value={email} onChange={handleChange} />
                <input className='border bg-gray-100 py-1 px-4 rounded-full text-sm my-2' 
                placeholder='Enter Password' type="password" name='password' value={password} onChange={handleChange} />
                <input className='border bg-gray-100 py-1 px-4 rounded-full text-sm my-2' 
                placeholder='Confirm Password' type="password" name='confirmPassword' value={confirmPassword} onChange={handleChange} />
                {error? <p className='text-red-700 font-bold text-sm'>{user.error}</p> : null}
                <button className='my-2 bg-pink-500 p-2 rounded-full text-md text-white font-bold' type='submit' disabled={loading} >
                    {loading?'Creating...' : 'Sign Up'}</button>
            </form>
            <div className='flex'>
                <p className='mr-2'>Do you have an account?</p>
                <Link to="/login" >
                    <span className='font-bold text-pink-500'>Sign In</span>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Register