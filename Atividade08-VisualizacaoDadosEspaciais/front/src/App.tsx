// src/App.tsx
import React from 'react';
import Map from './components/Map';
import CityList from './components/CityList';
import SectorInfo from './components/SectorInfo'; 
import styled from 'styled-components';

const AppContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

function App() {
  return (
    <AppContainer>
      <Map />
      <CityList />
      <SectorInfo /> 
    </AppContainer>
  );
}

export default App;