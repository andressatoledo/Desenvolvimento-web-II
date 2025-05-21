import { createContext, useEffect, useState } from "react"; 
import { LotteryContextProps, Props, ProviderProps } from "../types"; 
import { getLottery } from "../services/lottery"; 
 
export const LotteryContext = createContext({} as LotteryContextProps); 
 
export function LotteryProvider({ children }: ProviderProps) {
  const [megasena, setMegasena] = useState<Props>();

  useEffect(() => {
    (async () => {
      const result = await getLottery();
      setMegasena(result);
      console.log("result", result);
    })();
  }, []);

  return (
    <LotteryContext.Provider value={{ megasena }}>
      {children}
    </LotteryContext.Provider>
  );
}
