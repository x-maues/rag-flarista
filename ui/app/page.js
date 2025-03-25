"use client";

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import { sendMessage, checkHealth } from '../services/api';

export default function Home() {
  const [messages, setMessages] = useState([
    {
        content: "Namaste! I'm Flarista, here to assist you with development on Flare Network and beyond. \n\n",
        role: 'bot'
    }
]);
  const [isLoading, setIsLoading] = useState(false);
  const [ragAvailable, setRagAvailable] = useState(false);

  // Check API health on load
  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const health = await checkHealth();
        setRagAvailable(health.rag === 'available');
      } catch (error) {
        console.error('API health check failed:', error);
        setRagAvailable(false);
      }
    };
    
    checkApiHealth();
  }, []);

  const handleSendMessage = async (prompt) => {
    if (isLoading) return;
    
    // Add user message to chat
    const userMessage = { role: 'user', content: prompt };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Send message to API
      const response = await sendMessage(messages, prompt);
      
      // Add assistant response to chat
      const assistantMessage = { role: 'assistant', content: response.response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage = { 
        role: 'assistant', 
        content: 'Sorry, there was an error processing your request. Please try again later.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header ragAvailable={ragAvailable} />
      <ChatWindow messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}