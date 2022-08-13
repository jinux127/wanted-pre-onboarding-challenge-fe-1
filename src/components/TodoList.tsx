import { useQuery } from '@tanstack/react-query';
import { deleteTodo, getTodo, getTodoById } from 'api';
import { useTodos } from 'hooks/useTodos';
import { useTodosDelete } from 'hooks/useTodosDelete';
import { responseInterceptor } from 'http-proxy-middleware';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import { ITodoData } from 'types/interfaces';
import Button from './Button';

interface IProps {
  children?: React.ReactNode;
}

const TodoList = (props: IProps) => {
  const navigate = useNavigate();
  const sampleLocation = useLocation();
  const { isLoading, isError, data, error, status } = useTodos();
  const { mutate } = useTodosDelete();

  const handleDeleteTodo = async (id: string) => {
    mutate(id);
    if (sampleLocation.pathname === `/${id}`) navigate('/');
  };

  const handleClick = (id: string) => {
    navigate(`${id}`);
  };

  return (
    <StyledTodoListDiv>
      {data &&
        data.map((item) => (
          <StyledTodoEleDiv key={item.id}>
            <StyledTodoDiv onClick={() => handleClick(item.id)}>{item.title}</StyledTodoDiv>
            <Button onClick={() => handleDeleteTodo(item.id)} text='삭제' />
          </StyledTodoEleDiv>
        ))}
    </StyledTodoListDiv>
  );
};

const StyledTodoDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 1rem;
  width: 100%;
  overflow: hidden;
  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
const StyledTodoEleDiv = styled.div`
  display: flex;
  width: 100%;
`;

const StyledTodoListDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20vw;
  overflow: auto;
  border-right: 1px solid;
  margin: 15px;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export default TodoList;
