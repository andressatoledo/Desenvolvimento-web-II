import { SolarProvider } from "../contexts/SolarContext";
import {CityList} from "../components/CityList";
import {IrradiationPanel} from "../components/IrradiationPanel";
import Mapa from "../components/Map";
import { PageLayout, Sidebar, MapWrapper } from "../styles/PageStyle";

export default function Home() {
  return (
    <SolarProvider>
      <PageLayout>
        <Sidebar>
          <CityList />
        </Sidebar>

        <IrradiationPanel />
        
        <MapWrapper>
          <Mapa />
        </MapWrapper>
      </PageLayout>
    </SolarProvider>
  );
}
