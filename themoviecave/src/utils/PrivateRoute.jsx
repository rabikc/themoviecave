import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'

import React from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({children, ...rest}) => {

  let {contextData} = useContext(AuthContext)

  return (
    <Routes>
          <Route {...rest}> 
      {!contextData.user 
      ? <Navigate to = "/"/> 
      : children 
      }
    </Route>
    </Routes>
  )
}

export default PrivateRoute