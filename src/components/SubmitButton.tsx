import styled from 'styled-components';

interface IButton {
  text: string;
}

const SubmitButton = (props: IButton) => {
  const { text } = props;
  return <StyledButton type='submit'>{text}</StyledButton>;
};

const StyledButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 1px;
  cursor: pointer;
  transition: all 0.2s linear;
  :hover {
    background-color: #ffc70df4;
  }
`;

export default SubmitButton;
