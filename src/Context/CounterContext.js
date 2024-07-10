import { createContext, useState } from "react";

export let CounterContext = createContext();

export default function CounterContextProvider(props) {

    function chaneCounter() {
        setCounter(Math.random())
    }
    
    const[Counter ,setCounter] =useState(0)
    return <CounterContext.Provider value={{Counter, chaneCounter}}>
        {props.children}
    </CounterContext.Provider>
}