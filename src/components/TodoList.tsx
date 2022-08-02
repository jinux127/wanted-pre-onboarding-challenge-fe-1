import { getTodoById } from 'api';
import styled from 'styled-components';
import { ITodoData } from 'types/interfaces';

interface IProps {
  children?: React.ReactNode;
  data: ITodoData;
  handleClick: (id: string) => void;
}

const TodoList = (props: IProps) => {
  const { data, handleClick } = props;

  return <StyledTodoDiv onClick={() => handleClick(data.id)}>{data.title}</StyledTodoDiv>;
};

const StyledTodoDiv = styled.div`
  cursor: pointer;
  padding: 2rem;
  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export default TodoList;
