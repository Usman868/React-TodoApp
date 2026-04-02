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
          <div className="flex-1 min-h-0 bg-card rounded-2xl border border-border shadow-sm flex flex-col">
            <div className="shrink-0 px-5 pt-4 pb-2 flex items-center gap-2 border-b border-border">
              {(() => { const Icon = currentTab.icon; return <Icon size={16} className={currentTab.accent} />; })()}
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                {tabConfig[activeTab].label}
              </h2>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {currentTab.todos.length}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
              {currentTab.todos.length > 0 ? (
                <TodoList
                  Todos={currentTab.todos}
                  accentClass={currentTab.accent}
                  handleToggle={handleToggle}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-10">
                  <div className="rounded-full bg-muted p-3 mb-3">
                    {(() => { const Icon = currentTab.icon; return <Icon size={24} className="text-muted-foreground" />; })()}
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">No {activeTab} tasks</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    {activeTab === "today" ? "You're all caught up!" : activeTab === "overdue" ? "Nothing overdue 🎉" : "No upcoming tasks"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Completed section */}
          {completedTodos.length > 0 && (
            <div className="shrink-0 max-h-[35%] bg-card rounded-2xl border border-border shadow-sm flex flex-col">
              <div className="shrink-0 px-5 pt-4 pb-2 flex items-center gap-2 border-b border-border">
                <CheckCircle2 size={16} className="text-success" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Completed</h2>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">{completedTodos.length}</span>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                <TodoList
                  Todos={completedTodos}
                  accentClass="text-success"
                  // onEdit={handleEdit}
                  handleToggle={handleToggle}
                  handleDelete={handleDelete}
                />
              </div>
            </div>
          )}

          {/* Empty state */}
          {todos.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="rounded-2xl bg-accent p-5 mb-4">
                <Sparkles size={32} className="text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground">Welcome to Tickr</h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-xs">Your personal task manager. Click "Add Task" to start organizing your day.</p>
            </div>
          )}
        </div>
      </div>

      <TodoForm openForm={openForm} setOpenForm={setOpenForm} handleSubmit={handleSubmit} editingTodo={editingTodo} getTodayStr={getTodayStr} />



    </div>
  )
}

export default App

