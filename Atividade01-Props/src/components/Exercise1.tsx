import { CSSProperties, useState } from "react";
import Ball from "./Ball"

export default function Exercise1() {

    const [listaNumeros, setNumeroAleatorio] = useState<number[]>([]);
    const [listaNumerosOrdenados, setListaOrdenada] = useState<number[]>([]);

    function limparListaNumeros() {
        setNumeroAleatorio([]);
        setListaOrdenada([]);
    };

    function gerarNumeros(props: PropsGerarNumero) {
        const listaNumerosNovos: number[] = [];
        limparListaNumeros();
        if (props.qtdNumeros <= props.maxNumbers) {
            for (let i = 0; i < props.qtdNumeros; i++) {
                const numeroAleatorio: number = Math.floor(Math.random() * props.random);
                listaNumerosNovos.push(numeroAleatorio);
            }

            // Atualiza o estado com os novos números gerados
            setNumeroAleatorio((prev) => [...prev, ...listaNumerosNovos]);
            listaOrdemCrescente(listaNumerosNovos);
            
        } else {
            alert(`Não é possível sortear mais que ${props.maxNumbers} números.`);

        }
    };

    function listaOrdemCrescente(listaNumeros: number[]) {
        listaNumeros.sort()
        listaNumeros.sort((a, b) => a - b);
        setListaOrdenada(listaNumeros);
    }

    
    function ColecaoBall() {
        return (
          <div style={ColunaNumerosStyle}>
            {listaNumerosOrdenados.map((numero, index) => (
              <Ball key={index} numero={numero} index= {0} remove={() => {}} /> 
            ))}
          </div>
        )};

    return (
        <div style={PanelStyle}>
            <h2>Exercício 1</h2>
            <input
                id="numero"
                type="number"
                onChange={(e) => {
                    const value = Number(e.target.value);
                    gerarNumeros({ qtdNumeros: value, maxNumbers: 12, random:99 });
                }}
                placeholder="Quantidade de números"
                style={InputStyle}
            />
            {/* <Ball lista={listaNumerosOrdenados} /> */}
            <ColecaoBall /> 
        </div>
    );
}



interface PropsGerarNumero{
    qtdNumeros: number;
    maxNumbers: number;
    random: number;
  }
  

const InputStyle: CSSProperties = {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    borderColor: "red",
    borderRadius: "4px",
    marginBottom: "20px",
    width: "200px",
    display: "block",
    margin: "0 auto",
};

const PanelStyle: CSSProperties = {
    backgroundColor: "black",
    width: "400px",
    height: "250px",
    padding: "30px",
    borderRadius: "10px",
    margin: "50px auto",
    color: "white",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "50%"
};

const ColunaNumerosStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap", 
    maxWidth: "100%"
};

const BolaStyle: CSSProperties = {
    backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50px",
    height: "50px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "50%",
    textAlign: "center",
    userSelect: "none",
    marginTop: "10px"
};