import './App.css'
import Exercise1 from './components/Exercise1'
import { Provedor } from "./contexts/LetterContexto";

function App() {
  return (
    <>
      <Provedor>
        <Exercise1 />
      </Provedor>
    </>
  )
}

export default App
