import { ITodos, IUser } from 'types/interfaces';
import { useForm, UseFormReset } from 'react-hook-form';
import styled from 'styled-components';

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
    reset,
    setFocus,
  } = useForm<ITodos>({ mode: 'onChange' });

  const handleOnSubmit = (data: ITodos) => {
    onSubmit(data);
    setFocus('title');
    reset();
  };

  return localStorage.getItem('token') ? (
    <StyledForm onSubmit={handleSubmit(handleOnSubmit)}>
      <div>
        <div>
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
      {children}
    </StyledForm>
  ) : (
    <></>
  );
};

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  margin: 2em;
`;

export default TodoForm;
