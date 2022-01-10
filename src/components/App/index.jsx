import HotelMaster from '../HotelMaster/index';
import { Routes, Route } from 'react-router-dom';
import Pages from '../../pages';
import './app.scss';

function App() {
  return (
    <section className="App">
      <Routes>
        <Route path="/" element={<HotelMaster />} />
        <Route path="/home" element={<Pages.Home />} />
      </Routes>
    </section>
  );
}

export default App;
