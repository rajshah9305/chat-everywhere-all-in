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
  isPremium?: boolean;
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
      content: "Happy coding! 🚀 If you run into a specific environment that isn't covered here, `let me know` and I'll dive into the details.",
      role: "assistant",
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: "3",
      content: "Create a Python Flask API with authentication",
      role: "user", 
      timestamp: new Date(Date.now() - 30000)
    },
    {
      id: "4",
      content: `I'll help you create a comprehensive Flask API with authentication. Here's a complete implementation:

\`\`\`python
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-here')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///app.db')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Authentication routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already exists'}), 400
    
    user = User(email=data['email'])
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token}), 200
    
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({'message': f'Hello {user.email}!'}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
\`\`\`

This Flask API includes:
- **User registration and login**
- **JWT-based authentication** 
- **Password hashing** for security
- **Protected routes** that require authentication
- **SQLAlchemy** for database operations

To use this API:
1. **Register**: POST to \`/api/register\` with email/password
2. **Login**: POST to \`/api/login\` to get access token
3. **Access protected routes**: Include token in Authorization header

**Setup requirements:**
\`\`\`bash
pip install flask flask-sqlalchemy flask-jwt-extended
\`\`\``,
      role: "assistant",
      timestamp: new Date(),
      responseTime: 1.43,
      tokens: 1707,
      isPremium: true
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

  const handleSendMessage = async (content: string, options?: { codeGeneration?: boolean; isPremium?: boolean }) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response with code generation
    setTimeout(() => {
      let responseContent = "I understand your request. ";
      
      if (options?.codeGeneration) {
        responseContent = `I'll help you with that code! Here's a solution:

\`\`\`javascript
// Example implementation
function handleRequest(data) {
  console.log('Processing:', data);
  
  // Add your logic here
  const result = data.map(item => ({
    ...item,
    processed: true,
    timestamp: new Date().toISOString()
  }));
  
  return {
    success: true,
    data: result,
    message: 'Request processed successfully'
  };
}

// Usage example
const sampleData = [
  { id: 1, name: 'Task 1' },
  { id: 2, name: 'Task 2' }
];

const result = handleRequest(sampleData);
console.log(result);
\`\`\`

This implementation provides a robust solution that handles your requirements with proper error handling and data processing.`;
      } else {
        responseContent += "This is a simulated response from the AI assistant. In a real implementation, this would connect to an actual AI model API to generate responses based on your input.";
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: "assistant", 
        timestamp: new Date(),
        responseTime: Math.random() * 2 + 0.5,
        tokens: Math.floor(Math.random() * 1000) + 500,
        isPremium: options?.isPremium || options?.codeGeneration
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