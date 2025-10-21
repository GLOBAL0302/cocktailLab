import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserLogin from './features/user/UserLogin';
import UserRegister from './features/user/UserRegister';
import Cocktails from './features/cocktail/Cocktails';
import AppBarComponent from './components/AppToolBar/AppBarComponent';

function App() {
  return (
    <div className="overflow-hidden h-screen w-screen">
      <AppBarComponent />
      <div className="max-w-3xl mx-auto">
        <Routes>
          <Route path="/" element={<Cocktails />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
