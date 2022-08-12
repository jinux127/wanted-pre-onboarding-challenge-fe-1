import { useRef } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { ITodoData } from 'types/interfaces';
import Button from './Button';

interface IProps {
  setTodoList: React.Dispatch<React.SetStateAction<ITodoData[] | undefined>>;
}

const Header = (props: IProps) => {
  const navigate = useNavigate();
  const { setTodoList } = props;

  const handleLogout = () => {
    localStorage.removeItem('token');
    setTodoList(undefined);
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
