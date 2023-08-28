import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import {IUser} from "../../interfaces/IUser";

export const AuthProvider = ({children}: any) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser | null>(null);

    const handleLogin = async (userObject: IUser) => {
        const {email, token} = userObject;

        setUser({email, token} as IUser);
        localStorage.setItem('user_shop', JSON.stringify(userObject));
        navigate('/');
    }

    const handleLogout = async () => {
        setUser(null);
        localStorage.removeItem('user_shop');
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{
            user: user,
            onLogin: handleLogin,
            onLogout: handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    )
}