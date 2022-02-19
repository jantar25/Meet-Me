import { createContext,useEffect,useState } from "react";
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from "../firebase/firebase";

export const AuthContext = createContext(null);

const AuthProvider = ({children}:any) =>{
    const [user,setUser] = useState<any | null>(null);
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        onAuthStateChanged(auth, (user) =>{
                setUser(user);
                setLoading(false)
        })
    },[])

    if(loading) {
        return (<div className="relative ">
                    <h2 className="fixed top-1/2 left-1/2 ">Loading ...</h2>
                </div>)}

    return <AuthContext.Provider value={user}>
                {children}
            </AuthContext.Provider>
}

export default AuthProvider