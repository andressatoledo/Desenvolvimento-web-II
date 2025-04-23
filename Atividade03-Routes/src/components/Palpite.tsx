// src/pages/Palpite.tsx
import { CSSProperties, useEffect } from "react";
import Header from "../components/Header";
import Display from "../components/Display";
import useGenerateNumbers from "../components/GenerateNumbers";


export default function Palpite() {
    const generateNumbers = useGenerateNumbers();

    useEffect(() => {
        generateNumbers();
    }, []);

    return (
        <>
            <Header />
            <div style={ColunaNumerosStyle}>
                <h3 style={PalpiteStyle}>Palpites para a mega-sena</h3>
                <Display />
                <button onClick={generateNumbers}>Nova sugestão</button>
            </div>
        </>
    );
}

const ColunaNumerosStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    border: "1px solid white",
    borderRadius: "10px",
    padding: "10px"
};

const PalpiteStyle: CSSProperties = {
    textAlign: "center"
};