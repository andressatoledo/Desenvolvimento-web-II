import { createContext, useState } from "react";
import { ContextoProps } from "../types";


interface ChildrenProps {
    children: React.ReactNode;
}

const defaultValue: ContextoProps = {
    numbers: [],
    setNumbers: () => { },
};


export const Contexto = createContext<ContextoProps>(defaultValue);

export function Provedor({ children }: ChildrenProps) {
    const [numbers, setNumbers] = useState<number[]>([]);

    return <Contexto.Provider value={{ numbers, setNumbers }}>
        {children}
    </Contexto.Provider>
}