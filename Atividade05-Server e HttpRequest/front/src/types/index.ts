import { ReactNode } from "react";
export interface LotteryContextProps {
    megasena: Props | undefined;
}
export interface LotteryProps {
    megasena: Props;
}

export interface Props {
    concurso: number;
    data_do_sorteio: string;
    bola1: number;
    bola2: number;
    bola3: number;
    bola4: number;
    bola5: number;
    bola6: number;
    ganhadores_6_acertos: number;
    cidade_uf?: string;
    rateio_6_acertos: number;
    ganhadores_5_acertos: number;
    rateio_5_acertos: number;
    ganhadores_4_acertos: number;
    rateio_4_acertos: number;
    acumulado_6_acertos: number;
    arrecadacao_total: number;
    estimativa_premio: number;
    acumulado_sorteio_especial_mega_da_virada: number;
    observacao?: string;
}


export interface ProviderProps {
    children: ReactNode;
} 