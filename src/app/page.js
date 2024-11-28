"use client"
import { useRouter } from "next/navigation";
import React, {useState, useEffect} from "react"
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Header from '../components/header'
import {useUserContext} from '../context/userContext'

export default function Home() {
  const router = useRouter()
  const {activeUser, logout} = useUserContext()
  return (
    <div className={styles.page}>
      <Header signed={activeUser}/>
      <main style={{display:'flex',flexDirection:'column',alignItems:'center', marginTop:'50px'}}>
      <h1 style={{fontSize:'2em',fontWeight:'bold'}}>The future of food</h1>
      <p>Experience the future of food with our 3D-printed fruits and vegetables</p>
        <h1 style={{marginTop:'50px',fontSize:'2em',fontWeight:'bold'}}>Our products</h1>
        <p style={{margin:'20px 0'}}>Currently, we're offering high-quality carrots and raspberries crafted for sustainability, with more varieties to come</p>
        <section style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
          <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <p>Carrots</p>
            <Image
      src="/carrot.jpg"
      width={300}
      height={200}
      alt="Picture of the author" style={{height:'200px'}}
    />
            <Link href="/shop/carrot">Shop</Link>
          </div>
          <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <p>Raspberries</p>
            <Image
      src="/rasp.jpeg"
      width={300}
      height={200}
      alt="Picture of the author" style={{height:'200px'}}
    />
            <Link href="/shop/raspberry">Shop</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
