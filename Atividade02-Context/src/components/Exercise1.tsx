import { CSSProperties, useContext, useState } from "react";
import Display from './Display'
import Input from './Input'

export default function Exercise1() {

    return (
        <div style={PanelStyle}>
            <Input/>
            <Display/>
        </div>
    );
}


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
    border: "1px solid white",
    marginLeft: "50%"
};
