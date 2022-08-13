import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { Header, SubmitButton, TodoForm, TodoList } from 'components';
import { createTodo, getTodo } from 'api';
import { ITodos, ITodoData } from 'types/interfaces';
import TodoRouter from 'router/TodoRouter';

const MainPage = () => {
  return (
    <StyledMainDiv>
      <Header />
      <TodoForm>
        <SubmitButton text='생성' />
      </TodoForm>
      <StyledTodosDiv>
        <TodoList />
        <StyledTodoDetailDiv>
          <TodoRouter />
        </StyledTodoDetailDiv>
      </StyledTodosDiv>
    </StyledMainDiv>
  );
};

const StyledTodosDiv = styled.div`
  display: flex;
  border: 1px solid;
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
