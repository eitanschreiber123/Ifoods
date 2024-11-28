"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Header from '../../components/header'
import { useUserContext } from "../../context/userContext";

export default function Home() {
  const {users, activeUser} = useUserContext()
  const router = useRouter();
  const [display, setDisplay] = useState("info")
   const [name, setName] = (activeUser && activeUser.name) ? useState(activeUser.name) : useState('');
   const [email, setEmail] = (activeUser && activeUser.email) ? useState(activeUser.email) : useState('');
   const [password, setPassword] = (activeUser && activeUser.password) ? useState(activeUser.password) : useState('');
   const [address, setAddress] = (activeUser && activeUser.address) ? useState(activeUser.address) : useState('');

const changeInfo = () => {
    const updatedUsers = users.map(u => {
        if (u.email == activeUser.email && u.password == activeUser.password) {
          return {
            ...u,
            name ,
            email ,
            password ,
            address 
          }
        }
        return u
      })
      localStorage.setItem("users", updatedUsers)
}

  return (
    <div className={styles.page}>
      <Header signed={activeUser}/>
      <main style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <section style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'20px'}}>
        <button onClick={()=>setDisplay('info')} style={{padding: '50px', margin:'10px', flex:1, borderBottom: display == 'info' ? '1px solid blue' : 'none' }}>Info</button>
        <button onClick={()=>setDisplay('purchases')} style={{padding: '50px', margin:'10px', flex:1, borderBottom: display == 'purchases' ? '1px solid blue' : 'none' }}>Purchases</button>
        </section>
        {
            display == "info" ? <section>
        <p>Name</p>
        <input type="text"
        name="name"
        placeholder="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <p>Email</p>
        <input type="text"
        name="email"
        placeholder="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <p>Password</p>
        <input type="text"
        name="password"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <p>Address</p>
        <input type="text"
        name="address"
        placeholder="address"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
        <button style={{backgroundColor: 'blue',
    color: 'white',
    padding: '5px 22px',
    fontSize: '1.1em',
    borderRadius: '5px',
    margin: '0 10px'}} onClick={() => changeInfo()}>change</button>
            </section>
             : <section style={{display:'flex',width:'100%',justifyContent:'space-evenly'}}>
              <div>
                <p>One time</p>
                {activeUser.purchases.filter(p => p.type == "one time").map(p => <div>
                    <p>{p.date}</p>
                    <p>{p.type}</p>
                    <p>{p.price}</p>
                    <div>
                        {
                            p.items.map(i => <div>
                                <p>{i.item}: {i.weight} lbs</p>
                                <p>{i.price}</p>
                            </div>)
                        }
                    </div>
                </div>)}
              </div>
              <div>
                <p>Subscription</p>
                {activeUser.purchases.filter(p => p.type == "subscription").map(p => <div>
                    <p>{p.date}</p>
                    <p>{p.type}</p>
                    <p>{p.price}</p>
                    <div>
                        {
                            p.items.map(i => <div>
                                <p>{i.item}: {i.weight} lbs</p>
                                <p>{i.price}</p>
                            </div>)
                        }
                    </div>
                </div>)}
              </div>
             </section>
        }
        
      </main>
    </div>
  );
}
