import { customAxios } from 'api';
import { Button, SignUpForm, SubmitButton } from 'components';
import { useNavigate } from 'react-router';
import { IUser } from 'types/interfaces';

const SignUpPage = () => {
  let navigate = useNavigate();
  console.log(process.env.REACT_APP_API_URL);
  const signUp = async (postData: IUser) => {
    const res = await customAxios.post('/users/create', postData);
    console.log(res);
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
