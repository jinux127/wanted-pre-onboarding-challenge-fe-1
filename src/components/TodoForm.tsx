import { ITodos, IUser } from 'types/interfaces';
import { useForm } from 'react-hook-form';

interface FormProps {
  children?: React.ReactNode;
  onSubmit: (data: ITodos) => void;
}

const TodoForm = (props: FormProps) => {
  const { children, onSubmit } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITodos>({ mode: 'onChange' });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor='title'>title</label>
        <input
          id='title'
          type='text'
          {...register('title', {
            required: true,
          })}
        />
        {errors.title && errors.title.type === 'required' && <p>제목을 입력해주세요.</p>}
      </div>
      <div>
        <label htmlFor='content'>content</label>
        <input
          id='content'
          type='content'
          placeholder='필수 입력 항목'
          {...register('content', {
            required: true,
          })}
        />
        {errors.content && errors.content.type === 'required' && <p>내용을 입력해주세요.</p>}
      </div>
      {children}
    </form>
  );
};

export default TodoForm;
