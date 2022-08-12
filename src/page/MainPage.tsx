import { customAxios, createTodo, getTodo } from 'api';
import { Button, Header, SubmitButton, TodoForm } from 'components';
import DetailTodo from 'components/DetailTodo';
import DetailTodoMidfy from 'components/DetailTodoModify';
import TodoList from 'components/TodoList';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm, UseFormReset } from 'react-hook-form';
import { Route, Routes, useNavigate } from 'react-router';
import TodoRouter from 'router/TodoRouter';
import styled from 'styled-components';
import { ITodos, ITodoData } from 'types/interfaces';

const MainPage = () => {
  const navigate = useNavigate();

  const [todoList, setTodoList] = useState<ITodoData[]>();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setTodoList(undefined);
    navigate('/');
  };

  useEffect(() => {
    (async () => {
      const res = await getTodo();
      setTodoList(res?.data.data);
    })();
  }, []);

  const handleCreateTodo = async (data: ITodos) => {
    const newContent = await createTodo(data);
    if (newContent) {
      setTodoList((cur) => {
        if (cur) {
          return [...cur, newContent.data.data];
        } else {
          return [newContent.data.data];
        }
      });
    }
  };

  return (
    <StyledMainDiv>
      <Header setTodoList={setTodoList} />
      <TodoForm onSubmit={handleCreateTodo}>
        <SubmitButton text='생성' />
      </TodoForm>
      <StyledTodosDiv>
        <TodoList setTodoList={setTodoList} todos={todoList} />
        <StyledTodoDetailDiv>
          <TodoRouter />
        </StyledTodoDetailDiv>
      </StyledTodosDiv>
    </StyledMainDiv>
  );
};

const StyledTodosDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledTodoDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default MainPage;
