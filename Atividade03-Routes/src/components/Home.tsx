
import { CSSProperties } from "react";
import Header from '../components/Header';
import { Link } from "react-router";
export default function Home() {

    return (
        <>
            <Header />
            <div style={HomeStyle}>
                <h1>Bem-vindo</h1>
                <Link to="/palpite">
                    <button style={ButtonStyle}>Clique para começar</button>
                </Link>
            </div>
        </>
    );
}



const HomeStyle: CSSProperties = {

    color: "#ffffff",
    border: "solid 1px white",
    padding: "50px",
    borderRadius: "4px",
    justifyItems: "center",
};

const ButtonStyle: CSSProperties = {
    alignContent: "center",
    alignItems: "center"

};