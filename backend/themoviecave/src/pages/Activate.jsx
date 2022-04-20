import React, {useContext}from 'react'
import { useParams } from 'react-router-dom'

import AuthContext from '../context/AuthContext'

const Activate = () => {
  let {contextData} = useContext(AuthContext);

  const {uid, token} = useParams()

  console.log(uid, token)

  const verify = e => {
    contextData.activateUser(uid, token)
    console.log('done')
  }

  return (
    <div className='container'>
      <div className="verivication-section">
        <h1>Verify your account by clickig the button below</h1>
        <button onClick={verify}>Verify</button>
      </div>
    </div>
  )
}

export default Activate