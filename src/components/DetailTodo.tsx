import { getTodoById } from 'api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ITodoData } from 'types/interfaces';
import Button from './Button';

const DetailTodo = () => {
  const [detailTodo, setDetailTodo] = useState<ITodoData>();
  const { todoId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (todoId) {
      (async () => {
        const res = await getTodoById(todoId);
        setDetailTodo(() => res?.data.data);
      })();
    }
  });

  const handleModify = () => {
    navigate(`${todoId}/modify`);
  };

  return (
    <>
      <h1>{detailTodo?.title}</h1>
      <span style={{ fontSize: '0.2rem', marginBottom: '1rem' }}>{detailTodo?.updatedAt}</span>
      <p style={{ fontSize: '1.3rem' }}>{detailTodo?.content}</p>
      {detailTodo ? <Button onClick={() => handleModify()} text='수정' /> : ''}
    </>
  );
};

export default DetailTodo;
