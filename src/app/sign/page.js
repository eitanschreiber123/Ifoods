"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { useUserContext } from "../../context/userContext";

export default function Home() {
  const {users, addUser, setActiveUser} = useUserContext()
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    const newUser = {name, email, password, purchases: [], address: "", payment: {
      number: null, date: null, code: null}}
    addUser(newUser)
    setActiveUser(newUser)
    router.push("/");
  };
  return (
    <div className={styles.page}>
      <main style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <div style={{ padding: "20px" }}>
      <h1>Sign Up</h1>
      <input type="text"
        name="name"
        placeholder="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
    <p>Already have an account <Link href="/login">log in</Link></p>
      </main>
    </div>
  );
}
