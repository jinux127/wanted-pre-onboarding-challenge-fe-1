import { useDetailTodo } from 'hooks/useTodo';

import { useTodoUpdate } from 'hooks/useTodoUpdate';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { StyledForm } from 'styles/formStyle';
import { ITodos } from 'types/interfaces';
import Button from './Button';
import SubmitButton from './SubmitButton';

const DetailTodoMidfy = () => {
  const { todoId } = useParams();
  const { data } = useDetailTodo(todoId || '');
  const { mutate } = useTodoUpdate();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ITodos>({ mode: 'onChange' });

  useEffect(() => {
    setValue('title', data?.title || '');
    setValue('content', data?.content || '');
  }, []);

  const onModify = (data: ITodos) => {
    if (!todoId) return;
    mutate({ postData: data, id: todoId });

    navigate(-1);
  };

  const handleCancelModify = () => {
    navigate(`/${todoId}`);
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit(onModify)}>
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
            />
            {errors.content && errors.content.type === 'required' && <p>내용을 입력해주세요.</p>}
          </div>
        </div>
        <SubmitButton text='완료' />
        <Button onClick={handleCancelModify} text='취소' />
      </StyledForm>
    </>
  );
};

export default DetailTodoMidfy;
