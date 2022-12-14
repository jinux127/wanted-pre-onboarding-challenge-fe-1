import { customAxios } from 'api';
import { Button, SignUpForm, SubmitButton } from 'components';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { IError, ILoginResponse, IUser } from 'types/interfaces';

const SignUpPage = () => {
  let navigate = useNavigate();

  const signUp = async (postData: IUser) => {
    try {
      const res = (await customAxios.post('/users/create', postData)) as ILoginResponse;
      if (res.status === 200) {
        navigate('/auth/login');
      }
    } catch (err) {
      const responseError = err as IError;
      alert(responseError.response.data.details);
    }
  };

  return (
    <Wrapper>
      <SignUpForm onSubmit={signUp}>
        <Button text='취소' onClick={() => navigate('/')} />
      </SignUpForm>
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

export default SignUpPage;
