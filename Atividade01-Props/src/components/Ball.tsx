import { CSSProperties} from "react";

export default function Ball(props: PropsBall) {

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault(); 
        props.remove(props.index); 
      };

    return (
        <>
            <li style={BolaStyle}  onContextMenu={handleRightClick}>{props.numero}</li>
        </>
    );
  }



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

interface PropsBall {
    numero: number;
    index: number;
    remove: (index: number) => void;
  }