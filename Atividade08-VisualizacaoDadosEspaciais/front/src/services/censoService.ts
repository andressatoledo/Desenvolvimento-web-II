// src/services/censoService.ts
import api from './api';

export interface CensoPolygon {
  geom: string;
  cd_setor: string; // Adicione esta linha
}

export interface CensoCentroid {
  longitude: number;
  latitude: number;
}

export interface CensoCityData {
  centroid: CensoCentroid;
  polygons: CensoPolygon[];
}

export interface SectorDetails { 
  cd_setor: string;
  situacao: string;
  area_km2: number;
  nm_mun: string;
  geom: string; 
}

export async function getCensoDataByCity(city: string): Promise<CensoCityData> {
  try {
    const response = await api.get<CensoCityData>('/censo', {
      params: { city },
    });
    return response.data;
  } catch (error) {
    console.error('Falha ao buscar dados do censo por cidade:', error);
    throw error;
  }
}

export async function getCensoDataByPoint(x: number, y: number): Promise<SectorDetails> {
  try {
    const response = await api.get<SectorDetails>('/censo/point', {
      params: { x, y },
    });
    
    return response.data;
  } catch (error) {
    console.error('Falha ao buscar dados do censo por ponto:', error);
    throw error;
  }
}