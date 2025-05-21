import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "../src/controllers/db"; 

/*Configurações*/
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/*Rotas*/

/*Concurso mais recente*/
app.get("/", async (req, res) => {
    try {
        const concurso = await db.query("SELECT * FROM MEGASENA ORDER BY CONCURSO DESC LIMIT 1");
        if (concurso.rows.length > 0) {
            const resultado = concurso.rows[0];
            res.json({ ...resultado });
        } else {
            res.status(404).json({ message: "Falha ao encontrar concurso." });
        }
    } catch (error) {
        res.status(500).json({ message: "Falha ao buscar o concurso mais recente." });
    }
});

/*Concurso pelo número*/
app.get("/:numero", async (req, res) => {
    const { numero } = req.params;

    try {
        const result = await db.query(
            "SELECT * FROM megasena WHERE concurso = $1",
            [numero]
        );

        if (!result.rows.length) {
            res.status(404).json({ message: `Não existem dados do concurso ${numero}` });
        }

        const resultado = result.rows[0];
        res.json({ ...resultado });
    } catch (error) {
        res.status(500).json({ message: "Falha ao buscar o concurso." });
    }
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
