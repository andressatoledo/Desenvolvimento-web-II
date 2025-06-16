import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L, { type PathOptions } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { useCenso } from '../context/CensoContext';
import type { CensoPolygon } from '../services/censoService';

import type { Feature, FeatureCollection, GeoJsonProperties, Geometry, Position } from 'geojson';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapContainerStyled = styled(MapContainer)`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

interface ChangeViewProps {
  center: [number, number];
  zoom: number;
}

function ChangeView({ center, zoom }: ChangeViewProps) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.5,
      easeLinearity: 0.25,
    });
  }, [center, zoom, map]);
  return null;
}

const Map: React.FC = () => {
  const { censoData, selectedSector, fetchSectorDetails, loading } = useCenso();
  const geoJsonRef = useRef<L.GeoJSON>(null);

  const wktToGeoJSON = (wkt: string, cd_setor_prop: string | undefined | null): Feature => {
    // Garante que cd_setor_prop é uma string. Se for null/undefined, vira uma string vazia.
    const safe_cd_setor = cd_setor_prop ? String(cd_setor_prop).trim() : '';

    // Como todos os dados vêm como MULTIPOLYGON, focamos apenas neste tipo.
    if (wkt.startsWith('MULTIPOLYGON')) {
      const cleanedWkt = wkt.substring(wkt.indexOf('(((') + 3, wkt.lastIndexOf(')))'));
      const polygonStrings = cleanedWkt.split(')),((');

      const multiPolygonCoordinates: Position[][][] = polygonStrings.map(polygonString => {
        const coordsPairStrings = polygonString.replace(/\(|\)/g, '').split(',');
        const coordinates: Position[] = coordsPairStrings.map(pair => {
            const [x, y] = pair.trim().split(' ').map(Number);
            return [x, y];
        });
        return [coordinates];
      });

      return {
        type: 'Feature',
        properties: { cd_setor: safe_cd_setor },
        geometry: {
          type: 'MultiPolygon',
          coordinates: multiPolygonCoordinates,
        },
      };
    }

    // Fallback para Point se não for um MULTIPOLYGON ou se o formato for inesperado.
    return {
      type: 'Feature',
      properties: { cd_setor: safe_cd_setor },
      geometry: {
        type: 'Point',
        coordinates: [],
      },
    };
  };

  const style = (feature: Feature<Geometry, GeoJsonProperties> | undefined): PathOptions => {
  
    const featureCdSetor = feature?.properties?.cd_setor ? String(feature.properties.cd_setor).trim() : '';
    const selectedCdSetor = selectedSector?.cd_setor ? String(selectedSector.cd_setor).trim() : '';
    const isSelected = featureCdSetor === selectedCdSetor && featureCdSetor !== '';

    return {
      fillColor: isSelected ? 'red' : 'blue',
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.6,
    };
  };

  const onEachFeature = (feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) => {
    layer.on({
      click: (e) => {
        const { lat, lng } = e.latlng;
        fetchSectorDetails(lng, lat);
        L.DomEvent.stopPropagation(e);
      },
    });
  };

  useEffect(() => {
    if (geoJsonRef.current && censoData) {
      geoJsonRef.current.clearLayers();
      const features: Feature[] = censoData.polygons.map((p: CensoPolygon) => wktToGeoJSON(p.geom, p.cd_setor));
      const newGeoJsonData: FeatureCollection = { type: 'FeatureCollection', features: features };
      geoJsonRef.current.addData(newGeoJsonData);
    }
  }, [censoData, selectedSector]);

  if (loading && !censoData) {
    return <p>Carregando mapa...</p>;
  }

  if (!censoData) {
    return <p>Selecione uma cidade para visualizar o mapa.</p>;
  }

  const initialCenter: [number, number] = censoData.centroid ? [censoData.centroid.latitude, censoData.centroid.longitude] : [-23.2847, -45.9615];
  const initialZoom = 11;

  const geoJsonFeatures: Feature[] = censoData.polygons.map((p: CensoPolygon) => wktToGeoJSON(p.geom, p.cd_setor));
  const geoJsonData: FeatureCollection = {
    type: 'FeatureCollection',
    features: geoJsonFeatures,
  };

  return (
    <MapContainerStyled center={initialCenter} zoom={initialZoom} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {censoData.centroid && (
        <ChangeView center={[censoData.centroid.latitude, censoData.centroid.longitude]} zoom={initialZoom} />
      )}
      <GeoJSON
        key={`${censoData.centroid.latitude}-${censoData.centroid.longitude}-${selectedSector?.cd_setor || ''}`}
        data={geoJsonData}
        style={style}
        onEachFeature={onEachFeature}
        ref={geoJsonRef}
      />
    </MapContainerStyled>
  );
};

export default Map;