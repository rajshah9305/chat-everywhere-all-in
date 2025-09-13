import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Crown, Zap, Code, FileText, Image, Mic } from "lucide-react";

export const ChatHeader = () => {
  const [selectedModel, setSelectedModel] = useState("gpt-5-2025-08-07");

  const models = [
    { 
      value: "gpt-5-2025-08-07", 
      label: "GPT-5", 
      isPremium: true,
      description: "Most capable flagship model"
    },
    { 
      value: "claude-opus-4-1-20250805", 
      label: "Claude 4 Opus", 
      isPremium: true,
      description: "Superior reasoning and intelligence"
    },
    { 
      value: "o3-2025-04-16", 
      label: "o3", 
      isPremium: true,
      description: "Advanced reasoning model"
    },
    { 
      value: "gpt-4.1-2025-04-14", 
      label: "GPT-4.1", 
      isPremium: false,
      description: "Reliable flagship model"
    },
    { 
      value: "claude-3-5-haiku-20241022", 
      label: "Claude 3.5 Haiku", 
      isPremium: false,
      description: "Fast and efficient"
    }
  ];

  const currentModel = models.find(m => m.value === selectedModel);

  return (
    <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">C</span>
              </div>
              <div>
                <h1 className="font-semibold text-foreground">Cerebras AI</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    <Crown className="w-3 h-3 mr-1 text-premium-gold" />
                    Premium
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Advanced code generation & analysis
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Feature toggles */}
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                <Code className="w-3 h-3 mr-1" />
                Code
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                <FileText className="w-3 h-3 mr-1" />
                Docs
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                <Image className="w-3 h-3 mr-1" />
                Vision
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                <Mic className="w-3 h-3 mr-1" />
                Voice
              </Button>
            </div>

            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-56 bg-background border-border">
                <div className="flex items-center gap-2">
                  {currentModel?.isPremium && (
                    <Crown className="w-3 h-3 text-premium-gold" />
                  )}
                  <div className="flex flex-col items-start">
                    <SelectValue />
                    {currentModel && (
                      <span className="text-xs text-muted-foreground">
                        {currentModel.description}
                      </span>
                    )}
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.value} value={model.value}>
                    <div className="flex items-center gap-2 w-full">
                      {model.isPremium && (
                        <Crown className="w-3 h-3 text-premium-gold" />
                      )}
                      <div className="flex flex-col items-start">
                        <span>{model.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {model.description}
                        </span>
                      </div>
                      {model.isPremium && (
                        <Badge variant="outline" className="ml-auto text-xs">
                          Pro
                        </Badge>
                      )}
                    </div>
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