import { ITodos, IUser } from 'types/interfaces';
import { useForm, UseFormReset } from 'react-hook-form';
import styled from 'styled-components';
import { useTodoCreate } from 'hooks/useTodoCreate';

interface FormProps {
  children?: React.ReactNode;
}

const TodoForm = (props: FormProps) => {
  const { children } = props;
  const { mutate } = useTodoCreate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<ITodos>({ mode: 'onChange' });

  const handleOnSubmit = (data: ITodos) => {
    mutate(data);

    setFocus('title');
    reset();
  };

  return localStorage.getItem('token') ? (
    <StyledForm onSubmit={handleSubmit(handleOnSubmit)}>
      <InputWrapper>
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
      </InputWrapper>
      {children}
    </StyledForm>
  ) : (
    <></>
  );
};

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  margin: 1em;
  width: 50vw;
  & input {
    font-size: 1.2rem;
    /* width: 100%; */
    border-bottom: 3px solid gray;
    padding: 0.4rem 0.8rem;

    &:focus {
      border-bottom: 3px solid ${(props) => props.theme.point3};
    }
  }
`;

const InputWrapper = styled.div``;

export default TodoForm;
