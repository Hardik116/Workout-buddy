import { AuthContext } from "../context/Authcontext";
import { useContext } from "react";


export const useauthcontext=()=> {
    const context = useContext(AuthContext)
    if(!context) {
        throw Error('useauthsContext must be used inside an authContextProvider')
      }    
    return context
}

