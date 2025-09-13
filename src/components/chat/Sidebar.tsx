import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, MessageSquare, X } from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const [activeChat, setActiveChat] = useState("1");
  const [chatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Cerebras chat UI has chat history?",
      lastMessage: "Yes — the Cerebras Chat UI keeps a session-level chat history...",
      timestamp: "14:11"
    },
    {
      id: "2", 
      title: "Generate a Flask API",
      lastMessage: "I'll help you create a Flask API with all the necessary components...",
      timestamp: "13:45"
    },
    {
      id: "3",
      title: "Python data analysis",
      lastMessage: "Here's how to perform data analysis using pandas...",
      timestamp: "12:30"
    },
    {
      id: "4",
      title: "React component optimization",
      lastMessage: "To optimize React components, consider these approaches...",
      timestamp: "11:20"
    }
  ]);

  return (
    <div className="h-full bg-sidebar-custom border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Chats</h2>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden p-1">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Button className="w-full justify-start gap-2 bg-primary hover:bg-primary-hover">
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Chat Sessions */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {chatSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setActiveChat(session.id)}
              className={`
                w-full p-3 rounded-lg text-left transition-all duration-200 group hover:bg-sidebar-custom-hover
                ${activeChat === session.id 
                  ? "bg-sidebar-custom-active border border-primary/20" 
                  : "hover:bg-sidebar-custom-hover"
                }
              `}
            >
              <div className="flex items-start gap-3">
                <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground truncate mb-1">
                    {session.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                    {session.lastMessage}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {session.timestamp}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          Powered by Cerebras
        </div>
      </div>
    </div>
  );
};