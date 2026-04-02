import { CheckCircle2 } from "lucide-react";
import TodoList from "./TodoList";

const TodoPanel = ({activeTab, currentTab,handleToggle,handleDelete, handleEdit }) => {
    return (
        <div className="flex-1 min-h-0 bg-card rounded-2xl border border-border shadow-sm flex flex-col">
            <div className="shrink-0 px-5 pt-4 pb-2 flex items-center gap-2 border-b border-border">
                {(() => { const Icon = currentTab.icon; return <Icon size={16} className={currentTab.accent} />; })()}
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    {currentTab.label}
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
    );
}


export const CompletedPanel = ({completedTodos,handleToggle,handleDelete}) => {
      if (completedTodos.length === 0) return null;
    return (
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
                    handleToggle={handleToggle}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    );
}

export default TodoPanel;
