"use client"
import React, {useState} from "react"
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Header from '../../components/header'
import {useUserContext} from '../../context/userContext'

export default function Home() {
  const {activeUser, logout} = useUserContext()
  return (
    <div className={styles.page}>
      <Header signed={activeUser}/>
      <main style={{display:'flex',flexDirection:'column',alignItems:'center', marginTop:'50px'}}>
        <h1 style={{marginBottom:'20px', fontSize:'2em',fontWeight:'bold'}}>About us</h1>
        <aricle style={{display:'flex',flexDirection:'column',alignItems:'center', margin:'20px 0'}}>
        <h2 style={{marginBottom:'10px', fontSize:'2em',fontWeight:'bold',textAlign:'center'}}>Making fresh produce available to everyone</h2>
        <p>Our innovative technology allows us to use 3d printing to mass produce fresh produce for cheap ship it all over the world</p>
        </aricle>
        <article style={{display:'flex',flexDirection:'column',alignItems:'center', margin:'20px 0'}}>
        <h2 style={{marginBottom:'10px', fontSize:'2em',fontWeight:'bold'}}>Our process</h2>
        <p>Using a process called plant cell culture, carrot cells are grown in a lab and the soils nutrients are mimicked in the lab so they have the same nutritional value as conventionality grown carrots then with a technology called (name) that uses a custom 3d printer and uv light they are able to turn the cells into a printable ink that is used to mass produce carrots</p>
        </article>
        <article style={{display:'flex',flexDirection:'column',alignItems:'center', margin:'20px 0'}}>
        <h2 style={{marginBottom:'10px', fontSize:'2em',fontWeight:'bold'}}>Whats to come</h2>
        <p>We started with carrots because they are the most researched vegetable with regard to stem cells, but the process can be adapted to any fruit or vegetable so get ready for many more fruits and vegetables in the future</p>
        </article>
      </main>
    </div>
  );
}
