import { customAxios } from 'api';
import { Button, SignUpForm, SubmitButton } from 'components';
import { useNavigate } from 'react-router';
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
    <div>
      <SignUpForm onSubmit={signUp}>
        <SubmitButton text='가입하기' />
        <Button text='취소' onClick={() => navigate('/')} />
      </SignUpForm>
    </div>
  );
};

export default SignUpPage;
