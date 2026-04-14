import { useState } from "react";
import { Clock, AlertTriangle, CalendarCheck } from "lucide-react";
import { Header } from "./components/Header"
import { Tab } from "./components/Tabs";
import TodoForm from "./components/TodoForm"
import EmptyState from "./components/EmptyState"
import TodoPanel, { CompletedPanel } from "./components/TodoPanel"
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, editTodo, toggleTodo } from "./store/todoSlice";

const getTodayStr = () => new Date().toISOString().split("T")[0];

function App() {
  const todos = useSelector((state)=>state.todos);
  const dispatch = useDispatch()
  const [openForm, setOpenForm] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null);
  const [activeTab, setActiveTab] = useState("today");

  const handleSubmit = (data) => {
    if (data.id) {
      dispatch(editTodo(data))
    } else {
      dispatch(addTodo(data))
    }
    setEditingTodo(null)
  }
  const handleEdit = (todo) => {
    setEditingTodo(todo)
    setOpenForm(true)
  }
  const handleDelete = (id) => dispatch(deleteTodo(id));
  const handleToggle = (id) => dispatch(toggleTodo(id));

  const today = getTodayStr();
  const activeTodos = todos.filter((t) => !t.completed)
  const completedTodos = todos.filter((t) => t.completed);
  const todayTodos = activeTodos.filter((t) => t.dueDate === today);
  const pending = activeTodos.filter((t) => t.dueDate > today);
  const overdue = activeTodos.filter((t) => t.dueDate < today);

  const tabConfig = {
    today: { todos: todayTodos, icon: CalendarCheck, label: "Today", accent: "text-primary", bgActive: "bg-primary text-primary-foreground shadow-lg shadow-primary/25", bgInactive: "bg-card text-muted-foreground hover:text-foreground hover:shadow-md" },
    overdue: { todos: overdue, icon: AlertTriangle, label: "Overdue", accent: "text-destructive", bgActive: "bg-destructive text-destructive-foreground shadow-lg shadow-destructive/25", bgInactive: "bg-card text-muted-foreground hover:text-foreground hover:shadow-md" },
    pending: { todos: pending, icon: Clock, label: "Upcoming", accent: "text-warning", bgActive: "bg-warning text-white shadow-lg shadow-warning/25", bgInactive: "bg-card text-muted-foreground hover:text-foreground hover:shadow-md" },
  };
  const currentTab = tabConfig[activeTab];

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header setOpenForm={setOpenForm} setEditingTodo={setEditingTodo} />
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} tabConfig={tabConfig} />

      <div className="flex-1 overflow-hidden px-4 sm:px-6 pb-4">
        <div className="mx-auto max-w-2xl h-full flex flex-col gap-4">
          <TodoPanel activeTab={activeTab} currentTab={currentTab} handleToggle={handleToggle} handleDelete={handleDelete} handleEdit={handleEdit} />
          <CompletedPanel completedTodos={completedTodos} handleToggle={handleToggle} handleDelete={handleDelete} />
          {todos.length === 0 && <EmptyState />}
        </div>
      </div>

      <TodoForm openForm={openForm} setOpenForm={setOpenForm} handleSubmit={handleSubmit} editingTodo={editingTodo} getTodayStr={getTodayStr} />



    </div>
  )
}

export default App

