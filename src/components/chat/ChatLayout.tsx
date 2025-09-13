import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ChatArea } from "./ChatArea";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ChatLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header with menu button */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="p-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Chat</h1>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>

        <ChatArea />
      </div>
    </div>
  );
};