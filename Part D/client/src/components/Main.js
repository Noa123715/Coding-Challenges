import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import OrdersList from "./OrdersList";
import OrderDetails from "./OrderDetails";
import NewOrder from "./NewOrder";

export default function Main() {

    const [userData, setUserData] = useState({
        'id': '',
        'type': 'store_owner',
        'company': '',
        'username': 'noa',
        'telephone': '',
        'contact': '',
        'merchandise': '',
        'password': ''
    });

    async function getValuesFromInput(e) {
        e.preventDefault();
        let { name, value } = e.target;

        if (name === 'telephone') {
            // a filter to take only number
            value = value.replace(/\D/g, "");
        }
        if (name === 'merchandise' || name === 'username' || name === 'company' || name === 'contact') {
            // a filter to take only letter
            value = value.replace(/[^a-zA-Z]/g, "");
        }

        setUserData({ ...userData, [name]: value });
    };

    return (
        <>
            <Routes>
                <Route exact element={<LogIn userData={userData} getValuesFromInput={getValuesFromInput} />} path='/' />
                <Route exact element={<SignUp userData={userData} getValuesFromInput={getValuesFromInput} />} path='/SignUp' />
                <Route exact element={<OrdersList userData={userData}/>} path='/OrderList' />
                <Route exact element={<NewOrder userData={userData}/>} path='/OrderList/NewOrder' />
            </Routes>
        </>
    )
}