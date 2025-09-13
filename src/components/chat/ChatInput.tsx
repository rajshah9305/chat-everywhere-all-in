import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full pb-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-end gap-3 p-4 bg-background border border-border rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Generate a Flask API, parse a CSV, explain inference..."
            className="flex-1 min-h-[20px] max-h-32 resize-none border-0 bg-transparent px-0 py-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
            disabled={disabled}
            rows={1}
          />
          
          <Button
            type="submit"
            size="sm"
            disabled={!message.trim() || disabled}
            className="flex-shrink-0 h-9 w-9 p-0 rounded-lg bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-2 px-2 text-xs text-muted-foreground">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span>{message.length} characters</span>
        </div>
      </form>
    </div>
  );
};