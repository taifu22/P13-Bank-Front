import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Erreur_404 from './pages/Erreur_404';
import './styles/style.scss';
import Footer from './pages/Footer';
import SignIn from './pages/SignIn';
import ProfilPage from './pages/ProfilPage';
import Transactons from './pages/Transactons';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Routes> 
          <Route path={'/'} exact element={<Home />}/>
          <Route path={'/signin'} exact element={<SignIn />}/>
          <Route path={'/profilpage'} exact element={<ProfilPage />}/>
          <Route path={'/transaction'} exact element={<Transactons />}/>
          <Route path={'*'} element={<Erreur_404 />}/> 
        </Routes>
        <Footer />
      </BrowserRouter> 
    </div>
  );
}

export default App;
