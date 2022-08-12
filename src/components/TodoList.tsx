import { deleteTodo, getTodoById } from 'api';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import { ITodoData } from 'types/interfaces';
import Button from './Button';

interface IProps {
  children?: React.ReactNode;
  todos: ITodoData[] | undefined;
  setTodoList: React.Dispatch<React.SetStateAction<ITodoData[] | undefined>>;
}

const TodoList = (props: IProps) => {
  const { todos, setTodoList } = props;
  const navigate = useNavigate();
  const sampleLocation = useLocation();

  const handleDeleteTodo = (id: string) => {
    (async () => {
      const res = await deleteTodo(id);
      setTodoList((cur) => cur?.filter((item) => item.id !== id));
      if (sampleLocation.pathname === `/${id}`) navigate('/');
    })();
  };

  const handleClick = (id: string) => {
    navigate(`${id}`);
  };

  return (
    <StyledTodoListDiv>
      {todos &&
        todos.map((item) => (
          <StyledTodoEleDiv key={item.id}>
            <StyledTodoDiv onClick={() => handleClick(item.id)}>{item.title}</StyledTodoDiv>
            <Button onClick={() => handleDeleteTodo(item.id)} text='삭제' />
          </StyledTodoEleDiv>
        ))}
    </StyledTodoListDiv>
  );
};

const StyledTodoDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 1rem;
  width: 100%;
  overflow: hidden;
  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
const StyledTodoEleDiv = styled.div`
  display: flex;
  width: 100%;
`;

const StyledTodoListDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20vw;
  overflow: auto;
  border-right: 1px solid;
  margin: 15px;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export default TodoList;
