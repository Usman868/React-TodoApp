import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X} from "lucide-react";

const TodoForm = ({ openForm, setOpenForm, handleSubmit, editingTodo, getTodayStr }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("medium");

      useEffect(() => {
        if (editingTodo) {
          setTitle(editingTodo.title);
          setDescription(editingTodo.description || "");
          setDueDate(editingTodo.dueDate);
          setPriority(editingTodo.priority);
        } else {
          setTitle("");
          setDescription("");
          setDueDate(getTodayStr());
          setPriority("medium");
        }
      }, [editingTodo, openForm]);

      const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !dueDate) return;
        handleSubmit({
          id:editingTodo?.id,
          title: title.trim(),
          description: description.trim() || undefined,
          dueDate,
          priority,
        });
        setOpenForm(false);
      };

    return (
        <AnimatePresence>
            {openForm && (
                <div className="fixed inset-0 z-50">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/80"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
                        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                        exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        c className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md gap-4 border bg-background p-6 shadow-lg sm:rounded-lg"
                    >
                        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                            <h2 className="text-lg font-semibold leading-none tracking-tight">{editingTodo ? "Edit Todo" : "Add New Todo"}</h2>
                        </div>
                        <button
                            onClick={() => setOpenForm(false)}
                            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </button>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-medium leading-none">Title *</label>
                                <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs to be done?" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="dueDate" className="text-sm font-medium leading-none">Due Date *</label>
                                <input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-medium leading-none">Description (optional)</label>
                                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add details..." rows={3} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">Priority</label>
                                <select value={priority} onChange={(e) => setPriority(e.target.value)} className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                    <option value="high">🔴 High</option>
                                    <option value="medium">🟡 Medium</option>
                                    <option value="low">🟢 Low</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2" onClick={() => setOpenForm(false)}>Cancel</button>
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                                >
                                   {editingTodo ? "Save Changes" : "Add Todo"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

    );
};

export default TodoForm;
