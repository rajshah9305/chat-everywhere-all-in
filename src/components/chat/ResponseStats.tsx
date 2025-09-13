import { Zap } from "lucide-react";

interface ResponseStatsProps {
  responseTime: number;
  tokens: number;
}

export const ResponseStats = ({ responseTime, tokens }: ResponseStatsProps) => {
  return (
    <div className="max-w-4xl mx-auto mb-4">
      <div className="flex items-center gap-4 px-4 py-2 bg-accent rounded-lg border border-border text-sm">
        <div className="flex items-center gap-2 text-primary">
          <Zap className="w-4 h-4" />
          <span className="font-medium">
            RESPONDED IN {responseTime.toFixed(2)}S
          </span>
        </div>
        <div className="text-muted-foreground">
          ({tokens.toLocaleString()} TOKENS/SEC)
        </div>
      </div>
    </div>
  );
};