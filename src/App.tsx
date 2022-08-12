import { SignUpPage, LoginPage, MainPage } from 'page';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path='/*' element={<MainPage />} />
          <Route path='/auth/signup' element={<SignUpPage />} />
          <Route path='/auth/login' element={<LoginPage />} />
          <Route path='*' element={<div>404 NOT FOUND</div>} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default App;
