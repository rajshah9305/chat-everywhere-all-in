import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  responseTime?: number;
  tokens?: number;
}

interface MessageBubbleProps {
  message: Message;
  isLoading?: boolean;
}

export const MessageBubble = ({ message, isLoading }: MessageBubbleProps) => {
  const isUser = message.role === "user";

  const formatContent = (content: string) => {
    // Handle bold text
    return content.split(/(\*\*.*?\*\*)/).map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className={cn(
      "flex gap-4 group",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-chat-bubble-ai border border-border rounded-full flex items-center justify-center">
          <Bot className="w-4 h-4 text-muted-foreground" />
        </div>
      )}

      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
        isUser 
          ? "bg-chat-bubble-user text-chat-bubble-user-foreground ml-auto" 
          : "bg-chat-bubble-ai text-chat-bubble-ai-foreground border border-border",
        isLoading && "animate-pulse"
      )}>
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
            </div>
          </div>
        ) : (
          <div className="whitespace-pre-wrap">
            {formatContent(message.content)}
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
    </div>
  );
};