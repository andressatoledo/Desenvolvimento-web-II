import './App.css'
import { LotteryProvider } from "./contexts/LotteryContext";
import MegaSena from "./pages/MegaSena";

function App() {
  return (
    <LotteryProvider>
        <MegaSena/>
    </LotteryProvider>
  )
}

export default App
