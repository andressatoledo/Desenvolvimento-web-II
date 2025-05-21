export function formatarDataPorExtenso(data: string): string {
    const dataObj = new Date(data);
    return new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(dataObj);
}

