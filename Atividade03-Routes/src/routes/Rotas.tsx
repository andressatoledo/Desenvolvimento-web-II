import { Route, Routes } from "react-router";
import Palpite from '../components/Palpite';
import Historico from '../components/Historico';
import Home from '../components/Home';

export default function Rotas() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/palpite" element={<Palpite />} />
      <Route path="/historico" element={<Historico />} />
    </Routes>
  );
} 