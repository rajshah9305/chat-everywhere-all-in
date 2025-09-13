import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';
import { Copy, Check, Download, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  isDark?: boolean;
}

export const CodeBlock = ({ code, language, filename, isDark = false }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Code copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `code.${getFileExtension(language)}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Code downloaded');
  };

  const executeCode = () => {
    // Simulated code execution
    toast.success('Code execution started (simulated)');
  };

  const getFileExtension = (lang: string) => {
    const extensions: Record<string, string> = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      rust: 'rs',
      go: 'go',
      sql: 'sql',
      html: 'html',
      css: 'css',
      json: 'json',
      yaml: 'yml',
      bash: 'sh',
      shell: 'sh',
    };
    return extensions[lang] || 'txt';
  };

  const isExecutable = ['python', 'javascript', 'typescript', 'bash', 'shell'].includes(language);

  return (
    <div className="relative group my-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-code-background border border-code-border rounded-t-lg px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          {filename && (
            <span className="text-sm font-medium text-code-text ml-2">{filename}</span>
          )}
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
            {language}
          </span>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {isExecutable && (
            <Button
              variant="ghost"
              size="sm"
              onClick={executeCode}
              className="h-7 w-7 p-0 hover:bg-primary/10"
              title="Run code (Premium)"
            >
              <Play className="w-3 h-3" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={downloadCode}
            className="h-7 w-7 p-0 hover:bg-primary/10"
            title="Download"
          >
            <Download className="w-3 h-3" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-7 w-7 p-0 hover:bg-primary/10"
            title="Copy"
          >
            {copied ? (
              <Check className="w-3 h-3 text-status-success" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </Button>
        </div>
      </div>

      {/* Code */}
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={isDark ? oneDark : oneLight}
          customStyle={{
            margin: 0,
            borderRadius: '0 0 0.5rem 0.5rem',
            border: `1px solid hsl(var(--code-border))`,
            borderTop: 'none',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          showLineNumbers={code.split('\n').length > 5}
          wrapLines={true}
          wrapLongLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};