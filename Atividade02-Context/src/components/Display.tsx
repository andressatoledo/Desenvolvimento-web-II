import { CSSProperties, useContext} from "react";
import { Contexto } from "../contexts/LetterContexto";
import Ball from "./Ball"

export default function Display() {

    const {input} = useContext(Contexto);
    const CollectionInput: string[] = input.split('');

    if (!input) {
        return <div style={ColunaNumerosStyle}>Sem entrada</div>;
    }

    return (
        <div style={ColunaNumerosStyle}>
            {CollectionInput.map((value: string, index: number) => (
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

