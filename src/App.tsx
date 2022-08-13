import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import { SignUpPage, LoginPage, MainPage } from 'page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Wrapper>
          <Routes>
            <Route path='/*' element={<MainPage />} />
            <Route path='/auth/signup' element={<SignUpPage />} />
            <Route path='/auth/login' element={<LoginPage />} />
            <Route path='*' element={<div>404 NOT FOUND</div>} />
          </Routes>
        </Wrapper>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default App;
