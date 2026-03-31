import { Sparkles,Plus } from 'lucide-react';

export const Header = ({setOpenForm ,setEditingTodo}) => {
    return (
      <header className="shrink-0 bg-gradient-to-r from-[hsl(var(--header-bg))] to-[hsl(var(--header-glow))] px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/15 backdrop-blur-sm p-2.5">
              <Sparkles size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">My Task</h1>
              <p className="text-xs text-white/70">{`${(new Date()).toLocaleDateString()}`}</p>
            </div>
          </div>
          <button
             className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2 bg-white/15 backdrop-blur-sm text-white border border-white/20 hover:bg-white/25 shadow-lg"          
             onClick={()=>{setEditingTodo(null), setOpenForm(true)}}
          >
            <Plus size={18} /> Add Task
          </button>
        </div>
      </header>
    );
}
