"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { useUserContext } from "../../context/userContext";

export default function Home() {
  const router = useRouter();
  const {users, addUser, setActiveUser} = useUserContext()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (users.filter(u => u.email == email).length && users.filter(u => u.email == email)[0].password == password ){
      const newUser = {email, password, name: users.filter(u => u.email == email)[0].name}
      setActiveUser(newUser)
      router.push("/");
    } else {
      alert("Invalid email or password");
    }
  };
  return (
    <div className={styles.page}>
      <main style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <div style={{ padding: "20px" }}>
      <h1>Login</h1>
      <input
        type="email"
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
      <button onClick={handleLogin}>Login</button>
    </div>
    <p>Dont have an account <Link href="/sign">sign up</Link></p>
      </main>
    </div>
  );
}
