import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { ChatHeader } from "./ChatHeader";
import { ResponseStats } from "./ResponseStats";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  responseTime?: number;
  tokens?: number;
}

export const ChatArea = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "(Windows).\n— **Always verify indentation, line endings, and hidden characters after pasting.**",
      role: "assistant",
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: "2", 
      content: "Happy coding! 🚀 If you run into a specific environment that isn't covered here, let me know and I'll dive into the details.",
      role: "assistant",
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: "3",
      content: "Cerebras chat UI has chat history?",
      role: "user", 
      timestamp: new Date(Date.now() - 30000)
    },
    {
      id: "4",
      content: "**Short answer:**\n\nYes — the Cerebras Chat UI (the web interface that ships with the Cerebras Model Garden /Cerebras Hub) keeps a **session-level chat history** for you. The history is displayed on the left-hand side (or in a collapsible panel) and persists as long",
      role: "assistant",
      timestamp: new Date(),
      responseTime: 1.43,
      tokens: 1707
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand your question. This is a simulated response from the AI assistant. In a real implementation, this would connect to an actual AI model API to generate responses based on your input.",
        role: "assistant", 
        timestamp: new Date(),
        responseTime: Math.random() * 2 + 0.5,
        tokens: Math.floor(Math.random() * 1000) + 500
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const lastMessage = messages[messages.length - 1];
  const showStats = lastMessage?.role === "assistant" && lastMessage.responseTime && lastMessage.tokens;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <ChatHeader />
      
      <div className="flex-1 flex flex-col min-h-0 px-4">
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="max-w-4xl mx-auto py-6 space-y-6">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
              />
            ))}
            
            {isLoading && (
              <MessageBubble
                message={{
                  id: "loading",
                  content: "Thinking...",
                  role: "assistant",
                  timestamp: new Date()
                }}
                isLoading={true}
              />
            )}
          </div>
        </ScrollArea>

        {showStats && (
          <ResponseStats 
            responseTime={lastMessage.responseTime!} 
            tokens={lastMessage.tokens!}
          />
        )}

        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};