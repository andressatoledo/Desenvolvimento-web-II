import { Request, Response } from "express";
import db from "./db";

export async function list(reg: Request, res: Response) {
  const { city } = reg.query as { city: string };

  if (!city) {
    res.status(400).json({ message: "Cidade não informada" });
  } else {
    try {
      const result = await db.query(
        `SELECT ST_AsText(geom) as geom, cd_setor
        FROM censo 
        WHERE nm_mun = $1`,
        [city]
      );
      const result_center = await db.query(
        `SELECT ST_X(ST_Centroid(ST_Union(geom))) as longitude,
        ST_Y(ST_Centroid(ST_Union(geom))) as latitude
        FROM censo 
        WHERE nm_mun = $1`,
        [city]
      );

      res.json({centroid:result_center.rows[0], polygons:result.rows});
    } catch (error: any) {
      res.json({ message: "Erro interno do servidor" });
    }
  }
}

export async function getByPoint(req: Request, res: Response) {
  const { x, y } = req.query as { x: string; y: string };

  if (!x || !y || isNaN(parseFloat(x)) || isNaN(parseFloat(y))) {
    res.status(400).json({ message: "Cidade não informada" });
  } else {
    try {
      const result = await db.query(
        `SELECT cd_setor, situacao, area_km2, nm_mun, ST_AsText(geom) as geom
      FROM censo 
      WHERE ST_Contains(geom, ST_SetSRID(ST_MakePoint($1, $2), 4326))`,
        [parseFloat(x), parseFloat(y)]
      );

      res.json(result.rows[0]);
    } catch (error: any) {
      res.json({ message: "Erro interno do servidor" });
    }
  }
}
