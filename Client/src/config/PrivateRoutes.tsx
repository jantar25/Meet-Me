import React,{useContext} from 'react'
import { AuthContext } from '../Contex/Auth'
import { Redirect,Route } from 'react-router-dom'

const PrivateRoutes = ({component:Component,...rest}:any) => {
  const user = useContext(AuthContext)
  return (
    <Route 
    {...rest}
    exact
    render={(props)=>user? <Component {...props} /> : <Redirect to='/login' />}
    />
  )
}

export default PrivateRoutes