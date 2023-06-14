import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Main} from "./components/common/Main";
import {Products} from "./components/pages/products/Products";
import {Cart} from "./components/pages/cart/Cart";
import {Payments} from "./components/pages/payments/Payments";

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<Main/>}>
                <Route index element={<Products/>}/>
                <Route path={'cart'} element={<Cart />}/>
                <Route path={'payments'} element={<Payments />}/>
            </Route>
        </Routes>
    );
}

export default App;
