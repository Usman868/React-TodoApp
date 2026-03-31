import { Check, Pencil, Trash2, Undo2 } from "lucide-react";
import { motion } from "framer-motion";


const priorityClasses = {
  high: "border-l-priority-high bg-[hsl(var(--priority-high)/0.06)]",
  medium: "border-l-priority-medium bg-[hsl(var(--priority-medium)/0.06)]",
  low: "border-l-priority-low bg-[hsl(var(--priority-low)/0.06)]",
};

const priorityDotClasses = {
  high: "bg-priority-high",
  medium: "bg-priority-medium",
  low: "bg-priority-low",
};

const TodoItems = ({ todo, handleToggle, handleDelete, handleEdit }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`rounded-lg border-l-4 p-4 shadow-sm transition-all hover:shadow-md ${priorityClasses[todo.priority]} ${todo.completed ? "opacity-60" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${priorityDotClasses[todo.priority]}`} />
            <h3 className={`font-semibold text-foreground truncate ${todo.completed ? "line-through" : ""}`}>
              {todo.title}
            </h3>
          </div>
          {/* {todo.description && ( */}
          <p className="text-sm text-muted-foreground ml-[18px] line-clamp-2">{todo.description}</p>
          {/* )} */}
          <p className="text-xs text-muted-foreground mt-2 ml-[18px]">
            {todo.dueDate}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => handleToggle(todo.id)}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            title={todo.completed ? "Mark pending" : "Complete"}
          >
            {todo.completed ? <Undo2 size={16} /> : <Check size={16} />}
          </button>
          {!todo.completed && (
            <button
                onClick={() => handleEdit(todo)}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Pencil size={16} />
            </button>
          )}
          <button
            onClick={() => handleDelete(todo.id)}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TodoItems;