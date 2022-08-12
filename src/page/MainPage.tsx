import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { Header, SubmitButton, TodoForm, TodoList } from 'components';
import { createTodo, getTodo } from 'api';
import { ITodos, ITodoData } from 'types/interfaces';
import TodoRouter from 'router/TodoRouter';

const MainPage = () => {
  const [todoList, setTodoList] = useState<ITodoData[]>();

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
  border: 1px solid;
  padding: 1rem 0;
  height: 60vh;
`;
const StyledTodoDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 60vh;
`;

const StyledMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default MainPage;
