
import { format } from "date-fns";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'image';
  imageUrl?: string;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
        message.isUser
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
          : 'bg-white text-gray-800 rounded-bl-md border border-gray-100 shadow-md'
      }`}>
        {message.type === 'image' && message.imageUrl && (
          <div className="mb-2">
            <img 
              src={message.imageUrl} 
              alt="Generated" 
              className="rounded-lg max-w-full h-auto"
              loading="lazy"
            />
          </div>
        )}
        <p className="text-sm leading-relaxed">{message.text}</p>
        <p className={`text-xs mt-2 ${
          message.isUser ? 'text-blue-100' : 'text-gray-500'
        }`}>
          {format(message.timestamp, 'HH:mm')}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
