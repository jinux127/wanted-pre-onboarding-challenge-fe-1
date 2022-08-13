import { ITodosResponse, IUser } from 'types/interfaces';
import { useForm } from 'react-hook-form';
import SubmitButton from './SubmitButton';
import { useEffect, useRef, useState } from 'react';
import { getTodo } from 'api';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

interface FormProps {
  children?: React.ReactNode;
  onSubmit: (data: IUser) => void;
  header?: string;
  registerMode?: boolean;
  isDisabled?: boolean;
}

const LoginForm = (props: FormProps) => {
  const { children, onSubmit, isDisabled } = props;
  const isValidToken = useRef<ITodosResponse>();
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUser>({ mode: 'onChange' });

  useEffect(() => {
    (async () => {
      // isValidToken.current = await getTodo();
      if (isValidToken.current?.status === 200) navigate('/');
    })();
  }, []);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor='email'>email</label>
        <input
          id='email'
          type='text'
          disabled={isDisabled}
          {...register('email', {
            required: true,
          })}
        />
        {errors.email && errors.email.type === 'required' && <p>이메일을 입력해주세요.</p>}
        {errors.email && errors.email.type === 'pattern' && <p>올바른 이메일이 아닙니다.</p>}
      </div>
      <div>
        <label htmlFor='password'>password</label>
        <input
          id='password'
          type='password'
          placeholder='필수 입력 항목'
          disabled={isDisabled}
          {...register('password', {
            required: true,
          })}
        />
        {errors.password && errors.password.type === 'required' && <p>비밀번호를 입력해주세요.</p>}
      </div>
      <SubmitButton text='로그인' disabled={!isValid} />

      {children}
    </StyledForm>
  );
};

const StyledForm = styled.form`
  width: 90%;
  max-width: 26rem;
  margin-bottom: 1.5rem;

  & h1 {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 4rem;

    & > strong {
      color: ${(props) => props.theme.point3};
    }
  }

  & label,
  & input {
    display: block;
  }

  & label {
    margin-bottom: 0.9rem;
    font-size: 1.5rem;

    & > span {
      padding-left: 0.5rem;
      color: red;
      font-size: 1.1rem;
    }
  }

  & input {
    font-size: 1.2rem;
    width: 100%;
    border-bottom: 3px solid gray;
    padding: 0.4rem 0.8rem;

    &:focus {
      border-bottom: 3px solid ${(props) => props.theme.point3};
    }
  }

  & > div {
    margin-bottom: 3.2rem;
  }

  & p {
    color: red;
    font-size: 1.2rem;
    border: 1rem 0;
  }
`;

export default LoginForm;
