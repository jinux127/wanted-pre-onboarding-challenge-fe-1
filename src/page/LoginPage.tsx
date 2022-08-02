import LoginForm from 'components/LoginForm';
import { useNavigate } from 'react-router';
import { IData, IError, ILoginResponse, IUser } from 'types/interfaces';
import { Button, SubmitButton } from 'components';
import { customAxios } from 'api';

const LoginPage = () => {
  let navigate = useNavigate();

  const login = async (postData: IUser) => {
    try {
      const res = (await customAxios.post('/users/login', postData)) as ILoginResponse;
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        navigate('/');
      }
    } catch (err) {
      const responseError = err as IError;
      alert(responseError.response.data.details);
    }
  };
  return (
    <div>
      <LoginForm onSubmit={login}>
        <SubmitButton text='로그인' />
        <Button onClick={() => navigate('/auth/signup')} text='회원가입' />
      </LoginForm>
    </div>
  );
};

export default LoginPage;
