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
        return (<div className="flex h-[65vh] item-center justify-center">
                    <h2 className="text-2xl font-[800]">Loading ...</h2>
                </div>)}

    return <AuthContext.Provider value={user}>
                {children}
            </AuthContext.Provider>
}

export default AuthProvider