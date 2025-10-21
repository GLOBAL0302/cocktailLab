import { useState } from 'react';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserLogin from './features/user/UserLogin';
import UserRegister from './features/user/UserRegister';
import Cocktails from './features/cocktail/Cocktails';

function App() {
  return (
    <div>
      <div className="max-w-3xl mx-auto p-4">
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
