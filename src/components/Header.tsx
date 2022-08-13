import { useRef } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { ITodoData } from 'types/interfaces';
import Button from './Button';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');

    navigate('/');
  };

  return (
    <Wrapper>
      <StyledHomeDiv>
        <Button onClick={() => navigate('/')} text='🏠' />
      </StyledHomeDiv>
      <StyledButtonDiv>
        {localStorage.getItem('token') ? (
          <Button onClick={handleLogout} text='로그아웃' />
        ) : (
          <Button onClick={() => navigate('/auth/login')} text='로그인' />
        )}
      </StyledButtonDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const StyledHomeDiv = styled.div``;
const StyledButtonDiv = styled.div``;

export default Header;
