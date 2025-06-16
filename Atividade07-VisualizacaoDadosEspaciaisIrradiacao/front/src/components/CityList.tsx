import { useContext, useState, CSSProperties } from "react";
import { SolarContext } from "../contexts/SolarContext";
import { List, ListItem } from "../styles/PageStyle";

export function CityList() {
  const { cidades, buscarIrradiacao } = useContext(SolarContext);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleClick = (cidadeId: number) => {
    setSelectedId(cidadeId);
    buscarIrradiacao(cidadeId);
  };

  const styles: { [key: string]: CSSProperties } = {
    cityItem: {
      padding: "10px",
      color: "white",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      borderBottom: "1px solid #f27c00",
    },
    cityItemSelected: {
      backgroundColor: "#f27c00",
    },
    cityItemLast: {
      borderBottom: "none",
    },
  };

  return (
    <List
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        maxHeight: "700px",
        overflowY: "auto",
        border: "1px solid #f27c00",
        borderRadius: "8px",
        backgroundColor: "black",
      }}
    >
      {cidades.map((cidade, index) => (
        <ListItem
          key={cidade.id}
          style={{
            ...styles.cityItem,
            ...(selectedId === cidade.id ? styles.cityItemSelected : {}),
            ...(index === cidades.length - 1 ? styles.cityItemLast : {}),
          }}
          onClick={() => handleClick(cidade.id)}
        >
          {cidade.nome}
        </ListItem>
      ))}
    </List>
  );
}
