import { User, Bot, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  responseTime?: number;
  tokens?: number;
  isPremium?: boolean;
}

interface MessageBubbleProps {
  message: Message;
  isLoading?: boolean;
}

export const MessageBubble = ({ message, isLoading }: MessageBubbleProps) => {
  const isUser = message.role === "user";

  const parseContent = (content: string) => {
    // Split by code blocks
    const parts = content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        // Extract language and code
        const lines = part.slice(3, -3).split('\n');
        const firstLine = lines[0].trim();
        const language = firstLine || 'text';
        const code = lines.slice(1).join('\n');
        
        return (
          <CodeBlock 
            key={index}
            code={code}
            language={language}
            filename={getFilename(language)}
          />
        );
      } else {
        // Regular text with formatting
        return (
          <div key={index} className="whitespace-pre-wrap">
            {formatText(part)}
          </div>
        );
      }
    });
  };

  const formatText = (text: string) => {
    // Handle bold text, inline code, and other formatting
    return text.split(/(\*\*.*?\*\*|`.*?`)/).map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      } else if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={index} className="bg-code-background text-code-text px-1.5 py-0.5 rounded text-sm font-mono border border-code-border">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  const getFilename = (language: string) => {
    const filenames: Record<string, string> = {
      javascript: 'script.js',
      typescript: 'component.ts',
      python: 'main.py',
      java: 'Main.java',
      cpp: 'main.cpp',
      rust: 'main.rs',
      go: 'main.go',
      html: 'index.html',
      css: 'styles.css',
      sql: 'query.sql',
      bash: 'script.sh',
      shell: 'script.sh',
    };
    return filenames[language];
  };

  return (
    <div className={cn(
      "flex gap-4 group",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-chat-bubble-ai border border-border rounded-full flex items-center justify-center relative">
          <Bot className="w-4 h-4 text-muted-foreground" />
          {message.isPremium && (
            <Crown className="w-3 h-3 text-premium-gold absolute -top-1 -right-1 bg-background rounded-full p-0.5" />
          )}
        </div>
      )}

      <div className={cn(
        "max-w-[85%] rounded-2xl text-sm leading-relaxed relative",
        isUser 
          ? "bg-chat-bubble-user text-chat-bubble-user-foreground ml-auto px-4 py-3" 
          : "bg-chat-bubble-ai text-chat-bubble-ai-foreground border border-border",
        isLoading && "animate-pulse",
        !isUser && "px-4 py-3"
      )}>
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
            </div>
            <span className="text-xs text-muted-foreground">Generating code...</span>
          </div>
        ) : (
          <div className="space-y-2">
            {message.isPremium && !isUser && (
              <div className="flex items-center gap-2 mb-2 text-xs">
                <Crown className="w-3 h-3 text-premium-gold" />
                <span className="text-premium-gold font-medium">Premium Response</span>
              </div>
            )}
            {parseContent(message.content)}
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