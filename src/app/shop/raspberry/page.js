"use client"
import React, {useState} from "react"
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  const [showDrop, setDrop] = useState(false);
  const [signed, signIn] = useState(false)
  return (
    <div className={styles.page}>
      <section>
        <div style={{display:'flex',width:'100%',justifyContent:'space-evenly',alignItems:'center'}}>
        <h1>Ifoods</h1>
          <div 
      className={styles.dropdown_button} 
      onMouseEnter={() => setDrop(true)}
      onMouseLeave={() => setDrop(false)}
    >
      <button>Shop</button>

      {showDrop && (
        <div className={styles.dropdown_menu}>
          <Link href="/shop/carrot">Carrots</Link>
          <Link href="/shop/raspberry">Raspberries</Link>
        </div>
      )}
    </div>

          <Link href="/about">About us</Link>
          {signed ? <Link href="/account">My account</Link> : <div style={{display:'flex'}}>
            <Link style={{margin: '0 10px'}} href="/sign">Sign in</Link>
            <Link href="/log">Log in</Link>
            </div>}
        </div>
      </section>
      <main style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <h1>Coming soon</h1>
      </main>
    </div>
  );
}
