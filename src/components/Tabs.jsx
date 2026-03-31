import { motion } from "framer-motion";
export const Tab = ({activeTab,setActiveTab, tabConfig}) => {
    return (
        <div className="shrink-0 px-4 sm:px-6 py-4 bg-background">
            <div className="mx-auto max-w-2xl flex gap-2">
                {["today", "overdue", "pending"].map((tab) => {
                    const cfg = tabConfig[tab];
                    const Icon = cfg.icon;
                    const isActive = activeTab === tab;
                    return (
                        <motion.button
                            key={tab}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setActiveTab(tab)}
                            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 border ${isActive
                                ? `${cfg.bgActive} border-transparent`
                                : `${cfg.bgInactive} border-border`
                                }`}
                        >
                            <Icon size={16} />
                            <span className="hidden sm:inline">{cfg.label}</span>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${isActive ? "bg-white/20" : "bg-muted"
                                }`}>
                                {cfg.todos.length}
                            </span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}