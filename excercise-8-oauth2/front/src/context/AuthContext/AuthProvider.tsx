import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import {IUser} from "../../interfaces/IUser";

export const AuthProvider = ({children}: any) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser | null>(null);

    const getUserFromStorage = (): IUser|null => {
        const userFromStorage = sessionStorage.getItem('user_shop');

        if ( !!userFromStorage ) {
            const userFromStorageParsed = JSON.parse(userFromStorage);
            const {email, token} = userFromStorageParsed;

            return {email, token} as IUser;
        }

        return null;
    }

    const getDefaultUser = (): IUser | null => {
        return user === null
            ? getUserFromStorage()
            : user;
    }

    const handleLogin = async (userObject: IUser) => {
        const {email, token} = userObject;

        setUser({email, token} as IUser);
        sessionStorage.setItem('user_shop', JSON.stringify(userObject));
        navigate('/');
    }

    const handleLogout = async () => {
        setUser(null);
        sessionStorage.removeItem('user_shop');
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{
            user: getDefaultUser(),
            onLogin: handleLogin,
            onLogout: handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    )
}