import { getTodoById, updateTodo } from 'api';
import { time } from 'console';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { ITodoData, ITodos } from 'types/interfaces';
import Button from './Button';
import SubmitButton from './SubmitButton';

const DetailTodoMidfy = () => {
  const [detailTodo, setDetailTodo] = useState<ITodoData>();
  const { todoId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ITodos>({ mode: 'onChange' });

  useEffect(() => {
    if (todoId) {
      (async () => {
        const res = await getTodoById(todoId);
        setDetailTodo(() => res?.data.data);
        setValue('title', res?.data.data.title || '');
        setValue('content', res?.data.data.content || '');
      })();
    }
  }, []);

  const onModify = (data: ITodos) => {
    if (!detailTodo) return;

    (async () => {
      const res = await updateTodo(data, detailTodo?.id);
      navigate(`/${todoId}`);
    })();
  };

  return (
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
        <Button onClick={() => console.log('취소')} text='취소' />
      </form>
    </>
  );
};

export default DetailTodoMidfy;
