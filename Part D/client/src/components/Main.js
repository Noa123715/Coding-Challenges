import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import OrdersList from "./OrdersList";
import NewOrder from "./NewOrder";
import POS from "./POS";

export default function Main() {

    const [userData, setUserData] = useState({
        'user_id': '',
        'user_type_id': '',
        'company_name': '',
        'username': '',
        'phone_number': '',
        'contact_person': '',
        'catalog_id': '',
        'password': ''
    });

    async function getUserValues(user) {
        setUserData(user);
    };

    return (
        <>
            <Routes>getUserValues
                <Route exact element={<LogIn userData={userData} getUserValues={getUserValues} />} path='/' />
                <Route exact element={<SignUp userData={userData} setUserData={setUserData} />} path='/SignUp' />
                <Route exact element={<POS userData={userData} />} path='/PointOfSales' />
                <Route exact element={<OrdersList userData={userData}/>} path='/OrderList' />
                <Route exact element={<NewOrder />} path='/NewOrder' />
            </Routes>
        </>
    )
}