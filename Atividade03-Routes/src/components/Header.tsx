import { Link } from "react-router";
import { CSSProperties } from "react";

export default function Header() {

    return (
        <>
            <header style={headerStyle}>

                <div>
                    <img src="..\src\assets\imagem.jpg" alt="Logo" style={logoStyle} />
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                    <Link to="/palpite" style={linkStyle}>
                        Palpite
                    </Link>
                    <Link to="/historico" style={linkStyle}>
                        Histórico
                    </Link>
                </div>
            </header>
        </>
    );
}

const headerStyle: CSSProperties = {
    padding: "50px",
    backgroundColor: "#1f2937",
    color: "#ffffff",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "64px",
};

const logoStyle: CSSProperties = {
    height: "30%",
    width: "5%",
    padding: "0px"
};

const linkStyle: CSSProperties = {
    color: "white"
};