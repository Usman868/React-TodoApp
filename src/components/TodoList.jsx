import TodoItems from "./TodoItems";
import { AnimatePresence } from "framer-motion";

const TodoList = ({Todos , accentClass,handleToggle,handleDelete, handleEdit}) => {
  // if (Todos.length === 0) return null;

  return (

    <div className="space-y-2">
      <AnimatePresence mode="popLayout">
        {Todos.map((todo) => (
          <TodoItems key={todo.id} todo={todo} handleDelete={handleDelete} handleToggle={handleToggle} handleEdit={handleEdit} />
          ))}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
