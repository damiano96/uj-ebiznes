import { createContext } from "react";
import {IUser} from "../../interfaces/IUser";

interface IAuthContext {
    user: IUser | null,
    onLogin: (data: IUser) => void,
    onLogout: () => void
}

const AuthContext = createContext<IAuthContext>({
    user: null,
    onLogin: userObject => {},
    onLogout: () => {}
});

export default AuthContext;