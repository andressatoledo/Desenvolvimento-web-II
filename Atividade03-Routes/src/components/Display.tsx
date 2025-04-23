import { CSSProperties, useContext } from "react";
import { Contexto } from "../contexts/LetterContexto";
import Ball from "./Ball"


export default function Display() {

    const { numbers } = useContext(Contexto);

    return (
        <div style={ColunaNumerosStyle}>
            {numbers.map((value: number, index: number) => (

                <Ball key={index} input={value} />
            ))}
        </div>
    );
}

const ColunaNumerosStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
    maxWidth: "100%",
    borderColor: "red",
    border: "1px solid white",
    borderRadius: "10px",
    margin: "20px",
    padding: "10px"
};

