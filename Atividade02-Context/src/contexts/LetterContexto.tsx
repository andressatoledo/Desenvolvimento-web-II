import { createContext, useState } from "react";
import { ContextoProps } from "../types";


interface ChildrenProps {
    children: React.ReactNode;
}

export const Contexto = createContext({} as ContextoProps);

export function Provedor({children}:ChildrenProps){
    const [input, setInput] =  useState("");

    return <Contexto.Provider value={{input,setInput}}>
        {children}
    </Contexto.Provider>
}