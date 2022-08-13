import { getTodoById } from 'api';
import { useDetailTodo } from 'hooks/useTodo';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { ITodoData } from 'types/interfaces';
import Button from './Button';

const DetailTodo = () => {
  const [detailTodo, setDetailTodo] = useState<ITodoData>();
  const { todoId } = useParams();
  const { data } = useDetailTodo(todoId || '');
  const navigate = useNavigate();

  const handleModify = () => {
    navigate(`modify`);
  };

  return (
    <>
      <StyledH1>{data?.title}</StyledH1>
      <StyledSpan style={{ fontSize: '0.2rem', marginBottom: '1rem' }}>{data?.updatedAt}</StyledSpan>
      <StyledP style={{ fontSize: '1.3rem' }}>{data?.content}</StyledP>
      {data ? <Button onClick={() => handleModify()} text='수정' /> : ''}
    </>
  );
};

const StyledSpan = styled.span`
  word-break: break-all;
`;
const StyledH1 = styled.h1`
  padding: 0 1rem;
  word-break: break-all;
`;
const StyledP = styled.p`
  padding: 0 1rem;
  word-break: break-all;
`;

export default DetailTodo;
