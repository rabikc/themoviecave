import { Navigate } from 'react-router-dom'
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PublicRoute = ({children}) => {

  let {contextData} = useContext(AuthContext)

  return contextData.user ? <Navigate to = "/"/> : children 
}

export default PublicRoute