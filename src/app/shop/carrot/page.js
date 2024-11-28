"use client"
import React, {useState, useEffect} from "react"
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Header from '../../../components/header'
import { useUserContext } from "../../../context/userContext";

export default function Home() {
  const {users, addUser, activeUser, setActiveUser} = useUserContext()
    const [purchase, setPurchase] = useState('one time')
    const [price, setPrice] = useState(0)
    const [items, setItems] = useState([
      {item:'Whole', weight:0, image:'carrot'},
      {item:'Shredded', weight:0, image:'shredded'},
      {item:'Spread', weight:0, image:'spread_1'}
    ])
    const router = useRouter();
    const onCheckout = () => {
      // Save chosen items and purchase type to localStorage
      if (!activeUser) {
        router.push("/sign")
      }
      localStorage.setItem("chosenItems", JSON.stringify(items.filter(i => i.weight > 0).map(i =>{ return {item: i.item, weight: i.weight, price:i.weight * .45}})));
      localStorage.setItem("purchaseType", purchase);
      localStorage.setItem("price", items.filter(i => i.weight > 0).map(i =>{ return {price:i.weight * .45}}).map(c => c.price).reduce((a, b) => a + b));
      router.push("/checkout", "/checkout"); // Redirect to the checkout page
    };
  return (
    <div className={styles.page}>
      <Header signed={activeUser}/>
      <main style={{display:'flex',flexDirection:'column',alignItems:'center', marginTop:'50px'}}>
      <h1 style={{fontSize:'2em',fontWeight:'bold'}}>We sell carrots in 3 different forms</h1>
      <section style={{display:'flex', marginTop:'20px',marginBottom:'50px',flexWrap:'wrap',justifyContent:'center'}}>
        {items.map(i => <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <Image
      src={`/${i.image}.jpg`}
      width={300}
      height={200}
      alt="Picture of the author" style={{height:'200px'}}
    />
    <h2>{i.item}</h2>
        </div>)}
      </section>
      <h1 style={{fontSize:'2em',fontWeight:'bold'}}>Order now</h1>
      <div style={{display:'flex'}}>
        <p style={{padding: '50px', borderBottom: purchase == 'one time' ? '1px solid blue' : 'none' }} onClick={()=>{
          setPurchase('one time')
          setItems([
            {item:'Whole', weight:0, image:'carrot'},
            {item:'Shredded', weight:0, image:'shredded'},
            {item:'Spread', weight:0, image:'spread_1'}
          ])
          }}>One time purchase</p>
        <p style={{padding: '50px', borderBottom: purchase == 'subscription' ? '1px solid blue' : 'none' }} onClick={()=>{
          setPurchase('subscription')
          setItems([
            {item:'Whole', weight:0, image:'carrot'},
            {item:'Shredded', weight:0, image:'shredded'},
            {item:'Spread', weight:0, image:'spread_1'}
          ])
          }}>Subscription</p>
      </div>
      <section style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
        {items.map(i => <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <Image
      src={`/${i.image}.jpg`}
      width={300}
      height={200}
      alt="Picture of the author" style={{height:'200px'}}
    />
    <h2>{i.item}</h2>
    <div>
      <p>
        <button style={{backgroundColor: 'blue',
    color: 'white',
    padding: '5px 22px',
    fontSize: '1.1em',
    borderRadius: '5px',
    margin: '0 10px'}} onClick={()=>setItems(items.map(j => {return j.item == i.item ? {...j, weight:Math.max(0, j.weight - 1)} : j}))}>-</button>
        <span>{i.weight}</span>
        <button style={{backgroundColor: 'blue',
    color: 'white',
    padding: '5px 22px',
    fontSize: '1.1em',
    borderRadius: '5px',
    margin: '0 10px'}} onClick={()=>setItems(items.map(j => {return j.item == i.item ? {...j, weight:j.weight + 1} : j}))}>+</button>
      </p>
      <p>lbs</p>
    </div>
        </div>)}
      </section>
      {items.filter(i => i.weight > 0).length && <>{items.filter(i => i.weight > 0).map(i =>{ return {item: i.item, weight: i.weight, price:i.weight * .45}}).map(c => <div>
        <p>{c.item}</p>
        <p>{c.weight}</p>
        <p>{c.price}</p>
      </div>)}
      {items.filter(i => i.weight > 0).length && <h2>{items.filter(i => i.weight > 0).map(i =>{ return {price:i.weight * .45}}).map(c => c.price).reduce((a, b) => a + b)}</h2>}
      <button style={{backgroundColor: 'blue',
    color: 'white',
    padding: '5px 22px',
    fontSize: '1.1em',
    borderRadius: '5px',
    margin: '0 10px'}} onClick={() => onCheckout()}>Checkout</button></>}
      </main>
    </div>
  );
}
