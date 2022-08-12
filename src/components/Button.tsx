import styled from 'styled-components';

interface IButton {
  onClick: () => void;
  text: string;
}

const Button = (props: IButton) => {
  const { onClick, text } = props;
  const handleClick = () => {
    onClick();
  };
  return (
    <StyledButton type='button' onClick={handleClick}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border: none;
  /* border-radius: 10px; */
  padding: 15px;
  box-shadow: 1px;
  margin: 15px;
  cursor: pointer;
  transition: all 0.2s linear;
  :hover {
    background-color: #ffc70df4;
  }
`;

export default Button;
