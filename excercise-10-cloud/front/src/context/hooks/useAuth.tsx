import React from "react";
import AuthContext from "../AuthContext/AuthContext";

const useAuth = () => {
    return React.useContext(AuthContext)
}

export default useAuth;