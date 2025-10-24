import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserLogin from './features/user/UserLogin';
import UserRegister from './features/user/UserRegister';
import Cocktails from './features/cocktail/Cocktails';
import AppBarComponent from './components/AppToolBar/AppBarComponent';
import AddCocktail from './features/cocktail/AddCocktail';
import ProtectedRouter from './components/ProtectedRouter/ProtectedRouter';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/user/userSlice';

function App() {
  const user = useAppSelector(selectUser);
  return (
    <div className="overflow-hidden h-screen w-screen">
      <AppBarComponent />
      <div className="max-w-3xl mx-auto">
        <Routes>
          <Route path="/" element={<Cocktails />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
          <Route
            path="/addCocktail"
            element={
              <ProtectedRouter isAllow={user !== null}>
                <AddCocktail />
              </ProtectedRouter>
            }
          />
          <Route path="*" element={<h1>No Page such</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
