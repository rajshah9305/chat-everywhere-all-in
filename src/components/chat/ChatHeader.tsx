import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

export const ChatHeader = () => {
  const [selectedModel, setSelectedModel] = useState("gpt-oss-120b");

  const models = [
    { value: "gpt-oss-120b", label: "GPT-OSS-120B" },
    { value: "llama-3-70b", label: "Llama 3 70B" },
    { value: "mixtral-8x7b", label: "Mixtral 8x7B" },
    { value: "claude-3-haiku", label: "Claude 3 Haiku" }
  ];

  return (
    <div className="border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">C</span>
              </div>
              <span className="font-semibold text-foreground">Cerebras</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-48 bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};