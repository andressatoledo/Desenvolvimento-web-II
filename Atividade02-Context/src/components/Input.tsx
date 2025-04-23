import { useContext, CSSProperties } from "react";
import { Contexto } from "../contexts/LetterContexto"; // Adjust the import path as necessary

export default function Input(){
    const {setInput} = useContext(Contexto);

    return <>
        <div>
            <input style={InputStyle} placeholder = "Entre com o nome" onChange={(e) => { 
                 const newName = e.target.value; 
                 setInput(newName); 
            }}/>
        </div>

    </>
}



const InputStyle: CSSProperties = {
    borderRadius: 10,
    height: "40px",
    backgroundColor: "white",
    color: "black"
};