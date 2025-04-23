// src/hooks/useGenerateNumbers.ts
import { useContext } from "react";
import { Contexto } from "../contexts/LetterContexto";

export default function useGenerateNumbers() {
  const { setNumbers } = useContext(Contexto);
  const historyNumbers: number[][] = JSON.parse(
    localStorage.getItem("numbers") || "[]"
  );

  return () => {
    const randomNumbers: number[] = [];
    while (randomNumbers.length < 6) {
      const randomNumber = Math.floor(Math.random() * 60) + 1;
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }
    const updatedNumbers = [...historyNumbers, ...randomNumbers];

    setNumbers(randomNumbers);

    // Salvar no localStorage
    localStorage.setItem("numbers", JSON.stringify(updatedNumbers));
  };
}

