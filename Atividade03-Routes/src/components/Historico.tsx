import { useContext } from "react";
import { CSSProperties } from "react";
import { Contexto } from "../contexts/LetterContexto";
import Display from "../components/Display";
import Header from '../components/Header';

export default function Historico() {

    const { setNumbers } = useContext(Contexto);
    const historyNumbers: number[][] = JSON.parse(
        localStorage.getItem("numbers") || "[]"
    );

    setNumbers(historyNumbers.flat());

    return (
        <>
            <Header />
            <h1 style={HistoricoStyle}>Palpites</h1>
            <Display />
        </>

    );
}


const HistoricoStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};
