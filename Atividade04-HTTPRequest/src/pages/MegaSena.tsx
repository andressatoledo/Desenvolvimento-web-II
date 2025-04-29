import { CSSProperties, useContext, useState } from "react";
import { LotteryContext } from "../contexts/LotteryContext";
import Ball from "../components/Ball";
import { FaMoon, FaSun } from "react-icons/fa";

export default function MegaSena() {
    const { megasena } = useContext(LotteryContext);
    const [darkMode, setDarkMode] = useState(true);

    const toggleTheme = () => setDarkMode((prev) => !prev);

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
    };

    const buttonStyle: CSSProperties = {
        position: "fixed",
        bottom: "20px",
        left: "20px",
        backgroundColor: darkMode ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)" ,
        color: darkMode ? "#121212" : "#ffffff",
        border: "none",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    };

    const titleStyle: CSSProperties = {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "10px",
    };

    const dateStyle: CSSProperties = {
        fontSize: "16px",
    };

    const ballContainerStyle: CSSProperties = {
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        flexWrap: "wrap",
    };

    if (!megasena) {
        return (
            <div style={containerStyle}>
                <div style={cardStyle}>
                    <h2 style={{ textAlign: "center" }}>Carregando...</h2>
                </div>
                <button style={buttonStyle} onClick={toggleTheme}>
                    {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                </button>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h1 style={titleStyle}>MEGA-SENA</h1>
                <div style={ballContainerStyle}>
                    {megasena.dezenas.map((value, index) => (
                        <Ball key={index} input={Number(value)} />
                    ))}
                </div>
                <p style={dateStyle}>{megasena.dataPorExtenso}</p>
            </div>
            <button style={buttonStyle} onClick={toggleTheme}>
                {darkMode ? <FaSun size={40} /> : <FaMoon size={40} />}
            </button>
        </div>
    );
}
