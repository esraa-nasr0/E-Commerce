import { createContext,  useState } from "react";

 export let UserContext = createContext();

 export default function ContextProvider(props) {

    const [userToken , setUserToken] = useState(null);
    const [userData , setuserData] = useState(null);

    return <UserContext.Provider value={{userToken , setUserToken , setuserData , userData}}>
        {props.children}
    </UserContext.Provider>
}