import { IUser } from 'types/interfaces';
import { useForm } from 'react-hook-form';
import SubmitButton from './SubmitButton';

interface FormProps {
  children?: React.ReactNode;
  onSubmit: (data: IUser) => void;
  header?: string;
  registerMode?: boolean;
  isDisabled?: boolean;
}

const SignUpForm = (props: FormProps) => {
  const { children, onSubmit, isDisabled } = props;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IUser>({ mode: 'onChange' });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor='email'>
          email<span>*</span>
        </label>
        <input
          id='email'
          type='text'
          placeholder='필수 입력 항목'
          disabled={isDisabled}
          {...register('email', {
            required: true,
            pattern: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
          })}
        />
        {errors.email && errors.email.type === 'required' && <p>이메일을 입력해주세요.</p>}
        {errors.email && errors.email.type === 'pattern' && <p>올바른 이메일이 아닙니다.</p>}
      </div>
      <div>
        <label htmlFor='password'>
          password<span>*</span>
        </label>
        <input
          id='password'
          type='password'
          placeholder='필수 입력 항목'
          disabled={isDisabled}
          {...register('password', {
            required: true,
            validate: (value) => value.length >= 8 && value.length <= 20,
          })}
        />
        {errors.password && errors.password.type === 'required' && <p>비밀번호를 입력해주세요.</p>}
        {errors.password && errors.password.type === 'validate' && <p>8글자이상 20글자 이하로 입력해주세요.</p>}
      </div>
      <div>
        <label htmlFor='nickName'>
          Password Check<span>*</span>
        </label>
        <input
          id='password_check'
          type='password'
          placeholder='필수 입력 항목'
          {...register('password_check', {
            validate: (value) => value === watch('password'),
          })}
          disabled={isDisabled}
        />
        {errors.password_check && errors.password_check.type === 'validate' && <p>비밀번호가 일치하지 않습니다.</p>}
      </div>
      <SubmitButton text='가입하기' disabled={!isValid} />
      {children}
    </form>
  );
};

export default SignUpForm;
