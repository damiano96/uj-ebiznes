import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {Main} from "./components/common/Main";
import {Products} from "./components/pages/products/Products";
import {Cart} from "./components/pages/cart/Cart";
import {Payments} from "./components/pages/payments/Payments";
import {LoginPage} from "./components/pages/login/LoginPage";
import useAuth from "./context/hooks/useAuth";
import {AuthProvider} from "./context/AuthContext/AuthProvider";

export const App = (): React.JSX.Element => {
    const Authenticated = () => {
        const {user} = useAuth();

        if ( !user ) {
            return <Navigate to="/login"/>
        }

        return <Main/>
    };

    return (
        <AuthProvider>
            <Routes>
                <Route path={'/'} element={<Authenticated/>}>
                    <Route index element={<Products/>}/>
                    <Route path={'cart'} element={<Cart/>}/>
                    <Route path={'payments'} element={<Payments/>}/>
                    <Route path={'*'} element={<h1>404</h1>}/>
                </Route>
                <Route path={'/login'} element={<LoginPage/>}/>
            </Routes>
        </AuthProvider>
    );
}