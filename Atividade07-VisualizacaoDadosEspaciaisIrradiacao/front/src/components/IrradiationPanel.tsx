import { useContext, CSSProperties } from "react";
import { SolarContext } from "../contexts/SolarContext";
import { Panel } from "../styles/PageStyle";
import type { IrradiationData } from "../types";

export function IrradiationPanel() {
  const { irradiacaoSelecionada } = useContext(SolarContext);

  if (!irradiacaoSelecionada) return null;

  const {
    jan, fev, mar, abr, mai, jun,
    jul, ago, set, out, nov, dez, anual,
  } = irradiacaoSelecionada as IrradiationData;

  const styles: { [key: string]: CSSProperties } = {
    panel: {
      backgroundColor: "black",
      color: "white",
      border: "1px solid #f27c00",
      borderRadius: "8px",
      padding: "20px",
      boxSizing: "border-box",
      position: "fixed",  
      top: "100px",       
      right: "20px",      
      width: "200px",     
      zIndex: 1000,       
      overflow: "visible",
    },
    heading: {
      color: "#f27c00",
      fontSize: "1.5rem",
      marginBottom: "1rem",
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    listItem: {
      padding: "6px 0",
      borderBottom: "1px solid #f27c00",
    },
    lastItem: {
      borderBottom: "none",
    },
  };

  return (
    <div style={styles.panel}>
      <h1 style={styles.heading}>Irradiação</h1>
      <ul style={styles.list}>
        <li style={styles.listItem}>Anual: {anual}</li>
        <li style={styles.listItem}>Jan: {jan}</li>
        <li style={styles.listItem}>Fev: {fev}</li>
        <li style={styles.listItem}>Mar: {mar}</li>
        <li style={styles.listItem}>Abr: {abr}</li>
        <li style={styles.listItem}>Mai: {mai}</li>
        <li style={styles.listItem}>Jun: {jun}</li>
        <li style={styles.listItem}>Jul: {jul}</li>
        <li style={styles.listItem}>Ago: {ago}</li>
        <li style={styles.listItem}>Set: {set}</li>
        <li style={styles.listItem}>Out: {out}</li>
        <li style={styles.listItem}>Nov: {nov}</li>
        <li style={{ ...styles.listItem, ...styles.lastItem }}>Dez: {dez}</li>
      </ul>
    </div>
  );
}
