import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import OrdersList from "./OrdersList";
import OrderDetails from "./OrderDetails";
import NewOrder from "./NewOrder";

export default function Main() {

    return (
        <>
            <Routes>
                <Route exact element={<LogIn />} path='/' />
                <Route exact element={<SignUp />} path='/SignUp' />
                <Route exact element={<OrdersList />} path='/OrderList' />
                <Route exact element={<OrderDetails />} path='/OrderList/OrderDetails' />
                <Route exact element={<NewOrder />} path='/OrderList/NewOrder' />
            </Routes>
        </>
    )
}