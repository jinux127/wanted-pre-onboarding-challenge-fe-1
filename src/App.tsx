import { SignUpPage, LoginPage, MainPage } from 'page';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<MainPage />} />
        <Route path='/auth/signup' element={<SignUpPage />} />
        <Route path='/auth/login' element={<LoginPage />} />
        <Route path='*' element={<div>404 NOT FOUND</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
