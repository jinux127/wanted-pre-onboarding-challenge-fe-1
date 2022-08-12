import DetailTodo from 'components/DetailTodo';
import DetailTodoMidfy from 'components/DetailTodoModify';
import { Route, Routes } from 'react-router';

const TodoRouter = () => {
  return (
    <Routes>
      <Route path=':todoId/modify' element={<DetailTodoMidfy />} />
      <Route path=':todoId' element={<DetailTodo />} />
    </Routes>
  );
};

export default TodoRouter;
