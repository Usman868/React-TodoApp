import { useState } from "react";
import { Clock, AlertTriangle, CalendarCheck } from "lucide-react";
import { Header } from "./components/Header"
import { Tab } from "./components/Tabs";
import TodoForm from "./components/TodoForm"
import EmptyState from "./components/EmptyState"
import TodoPanel, { CompletedPanel } from "./components/TodoPanel"


const getTodayStr = () => new Date().toISOString().split("T")[0];

const loadTodos = () => {
  try {
    const data = localStorage.getItem("todos-app-data");
    return data ? JSON.parse(data) : [];
  } catch { return []; }
};
const saveTodos = (todos) => {
  localStorage.setItem("todos-app-data", JSON.stringify(todos));
};

function App() {
  const [openForm, setOpenForm] = useState(false)
  const [todos, setTodos] = useState(loadTodos);
  const [editingTodo, setEditingTodo] = useState(null);
  const [activeTab, setActiveTab] = useState("today");
  const updateTodos = (newTodos) => {
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  const handleSubmit = (data) => {
    if (data.id) {
      updateTodos(todos.map((t) => (t.id === data.id ? { ...t, ...data } : t)));
    } else {
      const newTodo = { ...data, id: Date.now(), completed: false };
      updateTodos([...todos, newTodo]);
    }
    setEditingTodo(null)
  }
  const handleEdit = (todo) => {
    setEditingTodo(todo)
    setOpenForm(true)
  }
  const handleDelete = (id) => updateTodos(todos.filter((t) => t.id !== id));
  const handleToggle = (id) => updateTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const today = getTodayStr();
  const activeTodos = todos.filter((t) => !t.completed)
  const completedTodos = todos.filter((t) => t.completed);
  const todayTodos = activeTodos.filter((t) => t.dueDate === today );
  const pending = activeTodos.filter((t) => t.dueDate > today );
  const overdue = activeTodos.filter((t) => t.dueDate < today );

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
          <TodoPanel activeTab={activeTab} currentTab ={currentTab} handleToggle={handleToggle} handleDelete={handleDelete} handleEdit={handleEdit} />
          <CompletedPanel completedTodos={completedTodos} handleToggle={handleToggle} handleDelete={handleDelete}/>
          {todos.length === 0 && <EmptyState />}
        </div>
      </div>

      <TodoForm openForm={openForm} setOpenForm={setOpenForm} handleSubmit={handleSubmit} editingTodo={editingTodo} getTodayStr={getTodayStr} />



    </div>
  )
}

export default App

