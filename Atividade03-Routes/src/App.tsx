import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provedor } from "./contexts/LetterContexto";
import Rotas from './routes/Rotas';
function App() {
  return (
    <Provedor>
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </Provedor>
  )
}

export default App
