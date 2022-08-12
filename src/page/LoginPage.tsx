import LoginForm from 'components/LoginForm';
import { useNavigate } from 'react-router';
import { IData, IError, ILoginResponse, IUser } from 'types/interfaces';
import { Button, SubmitButton } from 'components';
import { customAxios } from 'api';
import styled from 'styled-components';

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
    <Wrapper>
      <LoginForm onSubmit={login}>
        <Button onClick={() => navigate('/auth/signup')} text='회원가입' />
      </LoginForm>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LoginPage;
