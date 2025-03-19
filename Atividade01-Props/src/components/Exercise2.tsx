import { CSSProperties, useState } from "react";
import Ball from "./Ball";

interface PropsAdd {
  numero: number;
}

interface PropsRemove {
  maxNumero: number;
  index: number;
  lista: number[];
  action: string;
}

export default function Exercise2() {
  const [listaNumerosDigitados, setNumeroDigitado] = useState<number[]>([]);

  function add(props: PropsAdd) {
    const listaNumerosNovos: number[] = [];
    listaNumerosNovos.push(props.numero);
    setNumeroDigitado((prev) => [...prev, ...listaNumerosNovos]);
  }

  function remove(props: PropsRemove) {
    if (props.lista.length >= props.maxNumero || props.action === "botao") {
      const listaNumerosNovos: number[] = [...props.lista];
      listaNumerosNovos.splice(props.index, 1);
      setNumeroDigitado(listaNumerosNovos);
    }
  }

  function ColecaoBall() {
    return (
      <div style={ColunaNumerosStyle}>
        {listaNumerosDigitados.map((numero, index) => (
          <Ball
            key={index}
            index={index}
            numero={numero}
            remove={() =>
              remove({ maxNumero: 12, index, lista: listaNumerosDigitados, action: "botao" })
            }
          />
        ))}
      </div>
    );
  }

  return (
    <div style={PanelStyle}>
      <h2>Exercício 2</h2>
      <input
        id="numero"
        type="number"
        onBlur={(e) => {
          const value = Number(e.target.value);
          if (value) {
            remove({ maxNumero: 12, index: 0, lista: listaNumerosDigitados, action: "" });
            add({ numero: value });
          }
        }}
        placeholder="Digite um número"
        style={InputStyle}
      />
      <ColecaoBall />
    </div>
  );
}

const ColunaNumerosStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  flexWrap: "wrap",
  maxWidth: "100%",
};

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
  marginLeft: "50%",
};
