import { CSSProperties, useContext, useState, useEffect } from "react";
import { LotteryContext } from "../contexts/LotteryContext";
import Ball from "../components/Ball";
import { FaMoon, FaSun } from "react-icons/fa";
import { getLotteryByNumber } from "../services/lottery";
import { Props } from "../types";
import {formatarDataPorExtenso} from "../controllers/FormatDate"

export default function MegaSena() {
    const { megasena } = useContext(LotteryContext);
    const [darkMode, setDarkMode] = useState(true);
    const [concursoInput, setConcursoInput] = useState<string>("");
    const [selectedConcurso, setSelectedConcurso] = useState<Props | undefined>(megasena);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const toggleTheme = () => setDarkMode((prev) => !prev);

    const fetchConcurso = async (concurso: string) => {
        try {
            setErrorMessage(null);
           
            if (!concurso) {
                setSelectedConcurso(megasena);
                return;
            }
            const result = await getLotteryByNumber(Number(concurso));
            setSelectedConcurso(result);

        } catch (error: any) {
            setErrorMessage(`Não existem dados do concurso ${concurso}.`);
            setSelectedConcurso(undefined);
        }
    };

    useEffect(() => {
            fetchConcurso(concursoInput);
    }, [concursoInput]);

    const containerStyle: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: darkMode ? "#121212" : "#ffffff",
        color: darkMode ? "#ffffff" : "#121212",
        transition: "background-color 0.3s, color 0.3s",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        boxSizing: "border-box",
    };

    const cardStyle: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "20px",
        borderRadius: "12px",
        border: darkMode ? "2px solid rgb(255, 255, 255)" : "2px solid rgb(186, 186, 186)",
        backgroundColor: darkMode ? "#121212" : "#ffffff",
        width: "50%",
        color: darkMode ? "#ffffff" : "#121212",
    };

    const inputStyle: CSSProperties = {
        position: "fixed",
        top: "20px",
        left: "20px",
        padding: "10px",
        borderRadius: "5px",
        border: darkMode ? "1px solid rgb(255, 255, 255)" : "1px solid rgb(186, 186, 186)",
        backgroundColor: darkMode ? "#121212" : "#ffffff",
        color: darkMode ? "white" : "black",
        width: "200px",
        fontSize: "16px",
    };

    const ballContainerStyle: CSSProperties = {
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        flexWrap: "wrap",
    };

    const GETBolasConcurso = (data: Props) => {
        const dezenas = [
            data.bola1,
            data.bola2,
            data.bola3,
            data.bola4,
            data.bola5,
            data.bola6,
        ];

        return (
            <div style={cardStyle}>
                <h2>MEGA-SENA - Concurso {data.concurso} </h2>
                <div style={ballContainerStyle}>
                    {dezenas.map((value, index) => (
                        <Ball key={index} input={value} />
                    ))}
                </div>
                <p>{formatarDataPorExtenso(data.data_do_sorteio)}</p>
            </div>
        );
    };

    const Error = (message: string) => {
        return (
            <div style={cardStyle}>
                <p>{message}</p>
            </div>
        );
    };

    useEffect(() => {
        if (!selectedConcurso && megasena) {
            setSelectedConcurso(megasena);
        }
    }, [megasena, selectedConcurso]);

    return (
        <div style={containerStyle}>
            {errorMessage
                ? Error(errorMessage)
                : selectedConcurso
                ? GETBolasConcurso(selectedConcurso)
                : <p>Carregando...</p>}
            <input
                type="number"
                placeholder="Número do concurso"
                value={concursoInput}
                onChange={(e) => setConcursoInput(e.target.value)}
                style={inputStyle}
            />
            <button
                style={{
                    position: "fixed",
                    bottom: "20px",
                    left: "20px",
                    backgroundColor: darkMode ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)",
                    color: darkMode ? "#121212" : "#ffffff",
                    border: "none",
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                }}
                onClick={toggleTheme}
            >
                {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
        </div>
    );
}
