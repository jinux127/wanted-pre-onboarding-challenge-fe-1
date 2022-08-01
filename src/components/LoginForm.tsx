import { IUser } from 'types/interfaces';
import { useForm } from 'react-hook-form';

interface FormProps {
  children?: React.ReactNode;
  onSubmit: (data: IUser) => void;
  header?: string;
  registerMode?: boolean;
  isDisabled?: boolean;
}

const LoginForm = (props: FormProps) => {
  const { children, onSubmit, isDisabled } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({ mode: 'onChange' });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      {children}
    </form>
  );
};

export default LoginForm;
