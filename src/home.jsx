/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        navigate("/fr/mmorpg/actualites/hécatombe-de-qutan")
    },[]);

  return (
    <div>
      
    </div>
  )
}

export default Home
