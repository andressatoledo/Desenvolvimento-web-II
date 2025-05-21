import { Props } from "../types";
import api from "./api";

/* Api de buscar concurso mais recente */
export async function getLottery(): Promise<Props> {
  await delay(2000);
  const { data } = await api.get<Props>("/");
  return data;
}

/* Api de buscar por número */
export async function getLotteryByNumber(numero: number): Promise<Props> {
  await delay(2000);
  const { data } = await api.get<Props>(`/${numero}`);
  return data;
}


const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
