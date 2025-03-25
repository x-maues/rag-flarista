import React, { useState, useRef, useEffect } from 'react';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to recalculate
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`; // Set height based on content, max 200px
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // Reset height after sending
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sticky bottom-0 bg-black/40 backdrop-blur-md border-t border-white/10 p-4">
      <div className="container mx-auto flex items-center">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          placeholder={isLoading ? "Waiting..." : "Ask me anything..."}
          className="flex-1 bg-black/5 text-white placeholder-white/50 rounded-md px-4 py-2 focus:outline-none border border-white/60 focus:ring-2 focus:ring-white/50 resize-none overflow-y-auto max-h-48" // Changed to textarea, resize-none, overflow-y-auto, max-h-48
          rows={1} // Start with 1 row for initial look
          style={{ maxHeight: '200px', minHeight: '40px' }} // minHeight to maintain some initial height, maxHeight for vertical expansion limit
        />
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className={`bg-pink-600/80 hover:bg-white/20 text-white px-4 py-2 rounded-md ml-2 ${
            isLoading || !message.trim() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ChatInput;