import { Sparkles } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <div className="rounded-2xl bg-accent p-5 mb-4">
        <Sparkles size={32} className="text-primary" />
      </div>
      <h2 className="text-lg font-bold text-foreground">Welcome to Tickr</h2>
      <p className="text-sm text-muted-foreground mt-1 max-w-xs">
        Your personal task manager. Click "Add Task" to start organizing your day.
      </p>
    </div>
  );
};

export default EmptyState;
