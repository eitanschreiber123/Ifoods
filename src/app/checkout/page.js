"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Header from '../../components/header'
import { useUserContext } from "../../context/userContext";

export default function Home() {
  const {users, addUser, activeUser, setActiveUser} = useUserContext()
  const router = useRouter();
  const [chosenItems, setChosenItems] = useState([]);
  const [price, setPrice] = useState([]);
  const [purchaseType, setPurchaseType] = useState("");
  const [purchaseDate, setDate] = useState(null)
  const [address, setAddress] = (activeUser && activeUser.address) ? useState(activeUser.address) : useState('');
  const [cardNumber, setCardNumber] = (activeUser && activeUser.payment) ? useState(activeUser.payment.number) : useState('');
  const [expiryDate, setExpiryDate] = (activeUser && activeUser.payment) ? useState(activeUser.payment.date) : useState('');
  const [cvv, setCvv] = (activeUser && activeUser.payment) ? useState(activeUser.payment.code) : useState('');
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("chosenItems")) || [];
    const price = JSON.parse(localStorage.getItem("price")) || 0;
    const purchase = localStorage.getItem("purchaseType") || "one time";
    setChosenItems(items);
    setPurchaseType(purchase);
    setPrice(price);
    const timestamp = Date.now()
    const date = new Date(timestamp)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const finalDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    setDate(finalDate)
  }, []);

  const handlePlaceOrder = () => {
    if (!address || !cardNumber || !expiryDate || !cvv) {
      alert("Please provide shipping and payment information.");
      return;
    }
    const updatedUsers = users.map(u => {
      if (u.email == activeUser.email && u.password == activeUser.password) {
        return {
          ...u,
          address ,
          payment: {
            number: cardNumber, date: expiryDate, code: cvv
          },
          purchases: [...u.purchases, {
            date: purchaseDate,
            type: purchaseType,
            items: chosenItems,
            price
          }]
        }
      }
      return u
    })
    localStorage.removeItem("chosenItems");
    localStorage.removeItem("purchaseType");
    localStorage.removeItem("price");
    localStorage.setItem("users", updatedUsers)
    setActiveUser(updatedUsers.filter(u => u.email == activeUser.email && u.password == activeUser.password)[0])
    router.push("/");
  };
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setCardNumber(value);
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2, 4); // Add slash for MM/YY format
    setExpiryDate(value);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setCvv(value);
  };
  return (
    <div className={styles.page}>
      <Header signed={activeUser}/>
      <main style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <div style={{ padding: "20px" }}>
      <h1>Checkout</h1>
      <h2>Order Summary</h2>
      <ul>
        {chosenItems.map((item, index) => (
          <li key={index}>
            <p>{item.item}: {item.weight} lbs</p>
            <p>{item.price}</p>
          </li>
        ))}
      </ul>
      <p>Purchase Type: {purchaseType}</p>
      <p>{price}</p>

      <h2>Shipping and Payment</h2>
      <p>Shipping Address</p>
      <input type="text"
        name="address"
        placeholder="address"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <p>Price: {price}</p>
      <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            id="cardNumber"
            type="text"
            maxLength={16}
            value={cardNumber}
            onChange={handleCardNumberChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="1234 5678 9123 4567"
          />
        </div>

        {/* Expiry Date Input */}
        <div className="mb-4">
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
            Expiry Date (MM/YY)
          </label>
          <input
            id="expiryDate"
            type="text"
            maxLength={5}
            value={expiryDate}
            onChange={handleExpiryDateChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="MM/YY"
          />
        </div>

        {/* CVV Input */}
        <div className="mb-4">
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
            CVV
          </label>
          <input
            id="cvv"
            type="text"
            maxLength={3}
            value={cvv}
            onChange={handleCvvChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="123"
          />
        </div>
      
    </div>
    <button style={{backgroundColor: 'blue',
    color: 'white',
    padding: '5px 22px',
    fontSize: '1.1em',
    borderRadius: '5px',
    margin: '0 10px'}} onClick={handlePlaceOrder}>complete purchase</button>
      </main>
    </div>
  );
}
