import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        navigate("/index.html")
    },[]);

  return (
    <div>
      
    </div>
  )
}

export default Home
