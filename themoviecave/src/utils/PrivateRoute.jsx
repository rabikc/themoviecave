import { Route, Navigate } from 'react-router-dom'

import React from 'react'

const PrivateRoute = ({children}) => {

    const isAthenticated = true

    if (isAthenticated){
        return children
    }

  return (
    <Navigate to= "/"/>
  )
}

export default PrivateRoute