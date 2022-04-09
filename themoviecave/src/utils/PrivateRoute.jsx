import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'

import React from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({children}) => {

  let {contextData} = useContext(AuthContext)

  return !contextData.user ? <Navigate to = "/signin"/> : children 
}

export default PrivateRoute