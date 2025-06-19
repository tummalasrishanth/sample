
import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import ImageGenerator from "./ImageGenerator";
import { MessageCircle, Image as ImageIcon, Sparkles } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'image';
  imageUrl?: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm GeminiGPT, your AI assistant. I can help you with text conversations and generate images. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showImageGenerator, setShowImageGenerator] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateMockResponse(text),
        isUser: false,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleImageGeneration = async (prompt: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: `Generate image: ${prompt}`,
      isUser: true,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate image generation
    setTimeout(() => {
      const imageResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Here's your generated image for: "${prompt}"`,
        isUser: false,
        timestamp: new Date(),
        type: 'image',
        imageUrl: `https://picsum.photos/400/300?random=${Date.now()}`
      };
      setMessages(prev => [...prev, imageResponse]);
      setIsTyping(false);
      setShowImageGenerator(false);
    }, 2500);
  };

  const generateMockResponse = (input: string): string => {
    const responses = [
      "That's an interesting question! I'd be happy to help you explore that topic further.",
      "I understand what you're asking about. Let me provide you with a comprehensive response.",
      "Great question! Here's what I think about that...",
      "Thanks for sharing that with me. Based on what you've said, I can offer some insights.",
      "I appreciate you bringing this up. Let me help you work through this."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Sparkles className="w-8 h-8" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold">GeminiGPT</h1>
            <p className="text-sm opacity-90">AI Assistant</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Image Generator Modal */}
      {showImageGenerator && (
        <ImageGenerator
          onGenerate={handleImageGeneration}
          onClose={() => setShowImageGenerator(false)}
        />
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2 mb-3">
          <button
            onClick={() => setShowImageGenerator(false)}
            className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-all ${
              !showImageGenerator 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">Text</span>
          </button>
          <button
            onClick={() => setShowImageGenerator(true)}
            className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-all ${
              showImageGenerator 
                ? 'bg-purple-100 text-purple-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span className="text-sm">Image</span>
          </button>
        </div>
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={isTyping}
          placeholder={showImageGenerator ? "Describe the image you want to generate..." : "Type your message..."}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
