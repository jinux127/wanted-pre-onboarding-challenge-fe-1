import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { Header, SubmitButton, TodoForm, TodoList } from 'components';
import { createTodo, getTodo } from 'api';
import { ITodos, ITodoData } from 'types/interfaces';
import TodoRouter from 'router/TodoRouter';
import { useQuery } from '@tanstack/react-query';

const MainPage = () => {
  const [todoList, setTodoList] = useState<ITodoData[]>();
  const { isLoading, isError, data, error } = useQuery(['todos'], getTodo, {
    refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    retry: 0, // 실패시 재호출 몇번 할지
    onSuccess: (data) => {
      // 성공시 호출
      console.log(data);
    },
    onError: (e: Error) => {
      // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
      // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
      console.log(e.message);
    },
  });

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
