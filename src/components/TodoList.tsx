import { getTodoById } from 'api';
import { ITodoData } from 'types/interfaces';

interface IProps {
  children?: React.ReactNode;
  data: ITodoData;
  handleClick: (id: string) => void;
}

const TodoList = (props: IProps) => {
  const { data, handleClick } = props;

  return <div onClick={() => handleClick(data.id)}>{data.title}</div>;
};

export default TodoList;
