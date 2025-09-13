import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Mic, Code, Sparkles, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChatInputProps {
  onSendMessage: (message: string, options?: { codeGeneration?: boolean; isPremium?: boolean }) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [codeMode, setCodeMode] = useState(false);
  const [premiumMode, setPremiumMode] = useState(false);
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
      onSendMessage(message.trim(), { 
        codeGeneration: codeMode,
        isPremium: premiumMode 
      });
      setMessage("");
      setCodeMode(false);
      setPremiumMode(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const quickPrompts = [
    { text: "Generate a REST API", code: true },
    { text: "Explain this code", code: true },
    { text: "Create a React component", code: true },
    { text: "Write unit tests", code: true },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full pb-6 space-y-4">
      {/* Quick actions */}
      <div className="flex items-center gap-2 px-2">
        <div className="flex items-center gap-2 flex-wrap">
          {quickPrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => {
                setMessage(prompt.text);
                setCodeMode(prompt.code);
              }}
              className="text-xs h-7"
            >
              {prompt.code && <Code className="w-3 h-3 mr-1" />}
              {prompt.text}
            </Button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex flex-col gap-3 p-4 bg-background border border-border rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
          {/* Mode indicators */}
          {(codeMode || premiumMode) && (
            <div className="flex items-center gap-2">
              {codeMode && (
                <Badge variant="secondary" className="text-xs">
                  <Code className="w-3 h-3 mr-1" />
                  Code Generation
                </Badge>
              )}
              {premiumMode && (
                <Badge variant="outline" className="text-xs text-premium-gold border-premium-gold">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Premium Mode
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-end gap-3">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                codeMode 
                  ? "Describe the code you want to generate..."
                  : "Ask anything... Try 'Create a Python web scraper' or 'Explain React hooks'"
              }
              className="flex-1 min-h-[20px] max-h-32 resize-none border-0 bg-transparent px-0 py-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
              disabled={disabled}
              rows={1}
            />
            
            <div className="flex items-center gap-1">
              {/* Attachment button */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 rounded-lg hover:bg-muted"
              >
                <Paperclip className="w-4 h-4" />
              </Button>

              {/* Voice input */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 rounded-lg hover:bg-muted"
              >
                <Mic className="w-4 h-4" />
              </Button>

              {/* Code mode toggle */}
              <Button
                type="button"
                variant={codeMode ? "default" : "ghost"}
                size="sm"
                onClick={() => setCodeMode(!codeMode)}
                className="h-9 w-9 p-0 rounded-lg"
              >
                <Code className="w-4 h-4" />
              </Button>

              {/* Premium mode toggle */}
              <Button
                type="button"
                variant={premiumMode ? "default" : "ghost"}
                size="sm"
                onClick={() => setPremiumMode(!premiumMode)}
                className="h-9 w-9 p-0 rounded-lg"
              >
                <Sparkles className="w-4 h-4" />
              </Button>

              {/* Send button */}
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
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2 px-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Press Enter to send, Shift+Enter for new line</span>
            {codeMode && (
              <span className="text-primary">🚀 Code generation enabled</span>
            )}
          </div>
          <span>{message.length} characters</span>
        </div>
      </form>
    </div>
  );
};