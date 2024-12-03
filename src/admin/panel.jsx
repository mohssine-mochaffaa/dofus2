/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { doc, getDoc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import db  from '../Firebase';
import styles from '../styles/Panel.module.css'
import { useRef } from 'react';


import mp3 from "../assets/sound2.mp3" 
import { Helmet } from 'react-helmet';
function Admin() {
    const [logged,setLogged] = useState(false)
    const [pass,setPass] = useState("");
    const [dbPass,setDbPass] = useState("");
    const [data,setData] = useState([]);
    const [ip,setIp] = useState();
    const audioRef = useRef();

    const [ids,setIds] = useState([]);


    const play = () => {
     try{
      if (audioRef.current) {
        audioRef.current.play()
      } else {
        // Throw error
        console.log("error")
      }
     }catch(e){
      console.log(e)
     }
    }
   

    const getPassword= async()=>{
        const docRef = doc(db, "admin", "password");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setDbPass(docSnap.data().password)
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
    }

   

    const getData = async()=>{
       if (logged) {
        const q = query(collection(db, "users"), where("text", "!=", ""), orderBy("timestamp"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const array = [];
            const arrayId = [];

            querySnapshot.forEach((doc) => {
                arrayId.push(doc.id)
                array.push(doc?.data());

                const stored = localStorage.getItem(doc?.data().text);
                setIp(stored)
                if (stored !== 'exist') {
                  //play();
                  localStorage.setItem(doc?.data()?.text, JSON.stringify("exist"));
                }else{
                  console.log("already stored")

                }


            });
            setIds(arrayId);
            setData(array);

            setTimeout(()=>{
              play();
            },1000)
          });
       }

    }

    
  

    const deleteData = async(uid)=>{
      await deleteDoc(doc(db, "users", uid));
      localStorage.removeItem(ip)
    }





    useEffect(()=>{
        getPassword();  
    },[])
    useEffect(()=>{
        getData()
    },[logged])

    const valide =()=>{
        if (pass === dbPass) {
            setLogged(true)
            localStorage.setItem("user", JSON.stringify(true));

        }else{
            setLogged(false)
        }
    }

    const logout = ()=>{
      localStorage.setItem("user", JSON.stringify(false));
      setLogged(false);
    }
    useEffect(()=>{
      const stored = localStorage.getItem("user");
        
      if (stored === "true") {
        setLogged(true);
      }
    },[]);


    const deleteAlldata=async()=>{
      for (let i = 0; i < ids.length; i++) {
        await deleteDoc(doc(db, "users", ids[i]));
      }
    }   

  return (
    <div className={styles.admin}>
      <Helmet>
      <title>Admin Panel</title>
      <meta name="description" content=" DOFUS – Les Baumes Martegels" />
    </Helmet>
      {!logged && (
        <div className={styles.login}>
            <div className={styles.loginBox}>
                <div className={styles.header}>
                    <p>Sign up</p>
                </div>
                <div className={styles.loginContent}>
                    <div className={styles.conten}>
                    <p>Enter your password</p>
                    <input onChange={(e)=> setPass(e.target.value)} type="text" /><br />
                    <button onClick={valide} className={styles.log}>Valider</button>
                    </div>
                    
                </div>
            </div>
        </div>
      )}
      {logged && (
        <div className={styles.login2}>
            <div className={styles.heading}>
                <h4>Admin panel</h4>
                <button onClick={logout} >logout</button>
            </div>
            <div style={{marginTop:"10px"}} className={styles.conten2}>
              <br />
              <center>
                <button onClick={()=> deleteAlldata()} style={{cursor:"pointer",width:"100px",height:"25px"}}>Clear logs</button>
              </center>
              <br />
              <br />
              {data.map((item,index)=>{return(
                <p>{item?.text}</p>
              )})}

            </div>
            <audio ref={audioRef} src={mp3} />

        </div>
      )}
    </div>
  )
}

export default Admin
