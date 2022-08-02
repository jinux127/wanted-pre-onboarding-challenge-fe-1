import { customAxios, createTodo, getTodo, getTodoById, deleteTodo, updateTodo } from 'api';
import { Button, SubmitButton, TodoForm } from 'components';
import TodoList from 'components/TodoList';
import { useEffect, useState } from 'react';
import { useForm, UseFormReset } from 'react-hook-form';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { ITodos, ITodoData } from 'types/interfaces';

const MainPage = () => {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState<ITodoData[]>();
  const [detailTodo, setDetailTodo] = useState<ITodoData>();
  const [isModify, setIsModify] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('token');
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ITodos>({ mode: 'onChange' });

  const onModify = (data: ITodos) => {
    setIsModify(false);
    if (!detailTodo) return;

    (async () => {
      const res = await updateTodo(data, detailTodo?.id);
      setDetailTodo(res?.data.data);
    })();
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
        <StyledTodoDetailDiv>
          {!isModify ? (
            <>
              <h1>{detailTodo?.title}</h1>
              <span style={{ fontSize: '0.2rem', marginBottom: '1rem' }}>{detailTodo?.updatedAt}</span>
              <p style={{ fontSize: '1.3rem' }}>{detailTodo?.content}</p>
              {detailTodo ? <Button onClick={() => setIsModify(true)} text='수정' /> : ''}
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit(onModify)}>
                <div>
                  <div>
                    <label htmlFor='title'>제목</label>
                    <input
                      id='title'
                      type='text'
                      {...register('title', {
                        required: true,
                      })}
                      placeholder='제목'
                      size={30}
                      defaultValue={detailTodo?.title}
                    />
                    {errors.title && errors.title.type === 'required' && <p>제목을 입력해주세요.</p>}
                  </div>
                  <div>
                    <label htmlFor='content'>내용</label>
                    <input
                      id='content'
                      type='content'
                      placeholder='내용'
                      {...register('content', {
                        required: true,
                      })}
                      size={30}
                      defaultValue={detailTodo?.content}
                    />
                    {errors.content && errors.content.type === 'required' && <p>내용을 입력해주세요.</p>}
                  </div>
                </div>
                <SubmitButton text='완료' />
                <Button onClick={() => setIsModify(false)} text='취소' />
              </form>
            </>
          )}
        </StyledTodoDetailDiv>
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
