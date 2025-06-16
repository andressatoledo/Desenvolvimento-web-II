
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { getCensoDataByCity, getCensoDataByPoint } from '../services/censoService';
import type { CensoCityData, SectorDetails } from '../services/censoService';


interface CensoContextType {
  selectedCity: string;
  censoData: CensoCityData | null;
  selectedSector: SectorDetails | null;
  loading: boolean;
  error: string | null;
  setSelectedCity: (city: string) => void;
  setSelectedSector: (sector: SectorDetails | null) => void;
  fetchCensoData: (city: string) => Promise<void>;
  fetchSectorDetails: (x: number, y: number) => Promise<void>;
}

interface CensoProviderProps {
  children: ReactNode;
}

const CensoContext = createContext<CensoContextType | undefined>(undefined);

export const CensoProvider: React.FC<CensoProviderProps> = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState<string>('Jacareí'); 
  const [censoData, setCensoData] = useState<CensoCityData | null>(null);
  const [selectedSector, setSelectedSector] = useState<SectorDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCensoData = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCensoDataByCity(city);
      setCensoData(data);
      setSelectedSector(null); 
    } catch (err) {
      setError('Não foi possível carregar os informações do município.');
    } finally {
      setLoading(false);
    }
  }, []);


  const fetchSectorDetails = useCallback(async (x: number, y: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCensoDataByPoint(x, y);
      setSelectedSector(data);
    } catch (err) {
      setError('Não foi possível carregar as informações do setor.');
      setSelectedSector(null);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchCensoData(selectedCity);
  }, [selectedCity, fetchCensoData]); 

  const contextValue: CensoContextType = {
    selectedCity,
    censoData,
    selectedSector,
    loading,
    error,
    setSelectedCity,
    setSelectedSector,
    fetchCensoData,
    fetchSectorDetails,
  };

  return (
    <CensoContext.Provider value={contextValue}>
      {children}
    </CensoContext.Provider>
  );
};

export const useCenso = () => {
  const context = useContext(CensoContext);
  if (context === undefined) {
    throw new Error('Use dentro de um provider.');
  }
  return context;
};