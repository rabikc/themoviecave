import { Navigate } from 'react-router-dom'
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({children}) => {

  let {contextData} = useContext(AuthContext)

  return !contextData.user ? <Navigate to = "/signin"/> : children 
}

export default PrivateRoute