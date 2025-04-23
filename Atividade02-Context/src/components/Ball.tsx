import { CSSProperties} from "react";

export default function Ball(props: PropsBall) {

    return (
        <>
            <li style={BolaStyle}>{props.input}</li>
        </>
    );
  }


interface PropsBall {
    input: string;
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