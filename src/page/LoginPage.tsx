import LoginForm from 'components/LoginForm';
import { useNavigate } from 'react-router';
import { IUser } from 'types/interfaces';
import { Button, SubmitButton } from 'components';

const LoginPage = () => {
  let navigate = useNavigate();

  return (
    <div>
      <LoginForm onSubmit={(data: IUser) => console.log(data)}>
        <SubmitButton text='로그인' />
        <Button onClick={() => navigate('/auth/signup')} text='회원가입' />
      </LoginForm>
    </div>
  );
};

export default LoginPage;
