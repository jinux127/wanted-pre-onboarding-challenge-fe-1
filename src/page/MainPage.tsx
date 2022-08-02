import { customAxios, createTodo, getTodo, getTodoById } from 'api';
import { Button, SubmitButton, TodoForm } from 'components';
import TodoList from 'components/TodoList';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ITodos, ITodoData } from 'types/interfaces';

const MainPage = () => {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState<ITodoData[]>();
  const [datailTodo, setDatailTodo] = useState<ITodoData>();
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
      setDatailTodo(() => res?.data.data);
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
    <div>
      {localStorage.getItem('token') ? (
        <Button onClick={handleLogout} text='로그아웃' />
      ) : (
        <Button onClick={() => navigate('/auth/login')} text='로그인' />
      )}

      {localStorage.getItem('token') ? (
        <TodoForm onSubmit={handleCreateTodo}>
          <SubmitButton text='생성' />
        </TodoForm>
      ) : (
        ''
      )}

      {todoList ? todoList.map((item) => <TodoList data={item} handleClick={handleClick} key={item.id} />) : ''}
      <div>
        <h1>{datailTodo?.title}</h1>
        <p>{datailTodo?.content}</p>
        <span>{datailTodo?.updatedAt}</span>
      </div>
    </div>
  );
};

export default MainPage;
