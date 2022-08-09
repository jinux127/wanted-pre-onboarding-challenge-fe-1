import { updateTodo } from 'api';
import { useForm } from 'react-hook-form';
import { ITodoData, ITodos } from 'types/interfaces';
import Button from './Button';
import SubmitButton from './SubmitButton';

interface IProps {
  children?: React.ReactNode;
  detailTodo?: ITodoData;
}

const DetailTodoMidfy = (props: IProps) => {
  const { detailTodo } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ITodos>({ mode: 'onChange' });

  const onModify = (data: ITodos) => {
    if (!detailTodo) return;

    (async () => {
      const res = await updateTodo(data, detailTodo?.id);
      // setDetailTodo(res?.data.data);
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
        <Button onClick={() => console.log('취소')} text='취소' />
      </form>
    </>
  );
};

export default DetailTodoMidfy;
