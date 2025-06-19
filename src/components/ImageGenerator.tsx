
import { useState } from "react";
import { X, Wand2, Loader2 } from "lucide-react";

interface ImageGeneratorProps {
  onGenerate: (prompt: string) => void;
  onClose: () => void;
}

const ImageGenerator = ({ onGenerate, onClose }: ImageGeneratorProps) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (prompt.trim()) {
      setIsGenerating(true);
      onGenerate(prompt.trim());
      setPrompt("");
      // Reset generating state after a delay
      setTimeout(() => setIsGenerating(false), 2500);
    }
  };

  const suggestedPrompts = [
    "A futuristic city at sunset",
    "A cute robot reading a book",
    "Abstract art with vibrant colors",
    "A peaceful mountain landscape",
    "A digital art portrait"
  ];

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-3xl w-full max-w-md p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Wand2 className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">Generate Image</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm"
          />

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Suggested prompts:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(suggestion)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>Generate Image</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
