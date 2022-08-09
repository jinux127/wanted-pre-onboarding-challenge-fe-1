import { customAxios, createTodo, getTodo, getTodoById, deleteTodo, updateTodo } from 'api';
import { Button, SubmitButton, TodoForm } from 'components';
import DetailTodo from 'components/DetailTodo';
import DetailTodoMidfy from 'components/DetailTodoModify';
import TodoList from 'components/TodoList';
import { useEffect, useState } from 'react';
import { useForm, UseFormReset } from 'react-hook-form';
import { Route, Routes, useNavigate } from 'react-router';
import styled from 'styled-components';
import { ITodos, ITodoData } from 'types/interfaces';

const MainPage = () => {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState<ITodoData[]>();
  const [detailTodo, setDetailTodo] = useState<ITodoData>();
  const [isModify, setIsModify] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setDetailTodo(undefined);
    setTodoList(undefined);
    navigate('/');
  };

  useEffect(() => {
    (async () => {
      const res = await getTodo();
      setTodoList(res?.data.data);
    })();
  }, []);

  const handleClick = (id: string) => {
    (async () => {
      const res = await getTodoById(id);
      setDetailTodo(() => res?.data.data);
      navigate(`${id}`);
    })();
  };

  const handleDeleteTodo = (id: string) => {
    (async () => {
      const res = await deleteTodo(id);
      setTodoList((cur) => cur?.filter((item) => item.id !== id));
      if (detailTodo?.id === id) setDetailTodo(undefined);
    })();
  };

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
      <div>
        {localStorage.getItem('token') ? (
          <Button onClick={handleLogout} text='로그아웃' />
        ) : (
          <Button onClick={() => navigate('/auth/login')} text='로그인' />
        )}
      </div>
      {localStorage.getItem('token') ? (
        <TodoForm onSubmit={handleCreateTodo}>
          <SubmitButton text='생성' />
        </TodoForm>
      ) : (
        ''
      )}
      <StyledTodosDiv>
        <StyledTodoListDiv>
          {todoList
            ? todoList.map((item) => (
                <StyledTodoEleDiv key={item.id}>
                  <TodoList data={item} handleClick={handleClick} key={item.id} />
                  <Button onClick={() => handleDeleteTodo(item.id)} text='삭제' />
                </StyledTodoEleDiv>
              ))
            : ''}
        </StyledTodoListDiv>
        <Routes>
          <Route
            path=':todoId/modify'
            element={
              <StyledTodoDetailDiv>
                <DetailTodoMidfy />
              </StyledTodoDetailDiv>
            }
          />
          <Route
            path=':todoId'
            element={
              <StyledTodoDetailDiv>
                <DetailTodo />
              </StyledTodoDetailDiv>
            }
          />
        </Routes>
      </StyledTodosDiv>
    </StyledMainDiv>
  );
};
const StyledTodoEleDiv = styled.div`
  display: flex;
`;

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
const StyledTodoListDiv = styled.div`
  display: flex;
  margin-right: 5em;
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
