import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import OrdersList from "./OrdersList";
import NewOrder from "./NewOrder";

export default function Main() {

    const [userData, setUserData] = useState({
        'id': '',
        'type': '',
        'company': '',
        'username': '',
        'telephone': '',
        'contact': '',
        'merchandise': '',
        'password': ''
    });

    async function getUserValues(user) {
        setUserData(user);
    };

    return (
        <>
            <Routes>getUserValues
                <Route exact element={<LogIn userData={userData} getUserValues={getUserValues} />} path='/' />
                <Route exact element={<SignUp userData={userData} setUserData={setUserData} getUserValues={getUserValues} />} path='/SignUp' />
                <Route exact element={<OrdersList userData={userData}/>} path='/OrderList' />
                <Route exact element={<NewOrder userData={userData}/>} path='/NewOrder' />
            </Routes>
        </>
    )
}