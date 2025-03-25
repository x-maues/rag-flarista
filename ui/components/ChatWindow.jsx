import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

const ChatWindow = ({ messages, isLoading, darkMode }) => { // darkMode prop
    const messagesEndRef = useRef(null);
    const flarePink = 'pink-600/80'; // Define flarePink here to match reference

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div
            className={`flex-1 overflow-y-auto px-5 py-4 space-y-3 ${darkMode ? 'bg-gray-100/80 backdrop-blur-sm' : 'bg-pink-200/70 backdrop-blur-sm'} rounded-b-xl`} // Glassy background, rounded bottom
            style={{ paddingBottom: '2rem' }} // Add some padding at the bottom for better scroll view
        >
            <div className="">
                {messages.length === 0 ? (
                    <div className="text-center py-20 text-white/60">
                        <h2 className={`text-3xl font-semibold mb-4 ${darkMode ? 'text-white/70' : 'text-gray-700'}`}>Welcome</h2>
                        <p className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Ask me anything about Flare dApp development.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl mx-auto">
                            {[
                                "Flare wallet setup",
                                "dApp components",
                                "Flare Time Series Oracle",
                                "Why Flare?"
                            ].map((suggestion, index) => (
                                <div
                                    key={index}
                                    className={`bg-white/5 hover:bg-white/10 py-2 px-4 rounded-md cursor-pointer text-xs ${darkMode ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-800'}`}
                                >
                                    {suggestion}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((message, index) => (
                            <ChatMessage key={index} message={message} darkMode={darkMode} /> // Pass darkMode prop
                        ))}
                    </>
                )}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className={`w-8 h-8 rounded-md ${ /* Smaller avatar, rounded-md */
                            darkMode ? `bg-${flarePink}` : `bg-${flarePink}` /* Pink avatar */
                        } flex items-center justify-center text-white font-semibold text-sm mr-2`}> {/* Smaller font, semibold */}
                            F
                        </div>
                        <div className={`${
                            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                        } px-5 py-3 rounded-md rounded-tl-none`}> {/* Reduced padding, rounded-md */}
                            <div className="flex space-x-1.5"> {/* Reduced spacing */}
                                <div className={`w-1.5 h-1.5 bg-${flarePink} rounded-full animate-pulse`} style={{ animationDelay: '0ms' }} /> {/* Smaller pulse indicator, pink color */}
                                <div className={`w-1.5 h-1.5 bg-${flarePink} rounded-full animate-pulse`} style={{ animationDelay: '150ms' }} />
                                <div className={`w-1.5 h-1.5 bg-${flarePink} rounded-full animate-pulse`} style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};

export default ChatWindow;