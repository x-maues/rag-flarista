import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock'; 

const ChatMessage = ({ message, darkMode }) => {
    const isUser = message.role === 'user';
    const flarePink = 'pink-600/80'; 

    return (
        <div className={`flex mb-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser ? (
                <div className={`min-w-[32px] min-h-[32px] w-8 h-8 rounded-md ${
                                    darkMode ? `bg-pink-600/80` : `bg-pink-600/80`
                                } flex items-center justify-center text-white font-semibold text-sm mr-2`}>
                                    F
                                </div>
            ) : (
                <div className="w-8 h-8 mr-2"></div>
            )}
            <div
                className={`px-4 py-2.5 rounded-md ${
                    isUser
                        ? `bg-gray-300/50 border border-gray-500 shadow-sm text-black rounded-tr-none`
                        : `bg-gray-200/70 border border-gray-700 shadow-sm text-white rounded-tl-none`}`
                }
            >
                {isUser ? (
                    <p className="text-sm text-right break-words whitespace-pre-wrap">{message.content}</p>
                ) : (
                    <ReactMarkdown
                        className={`markdown text-sm prose-sm max-w-none break-words whitespace-pre-wrap ${darkMode ? 'text-white' : 'text-gray-800'} prose-headings:text-lg prose-headings:font-bold prose-li:marker:text-gray-500`}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                const language = match ? match[1] : '';
                                return !inline && match ? ( // Only render CodeBlock for block code, not inline code
                                    <CodeBlock language={language}>{String(children).replace(/\n$/, '')}</CodeBlock>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                )}
            </div>
            {isUser && (
                            <div className="min-w-[32px] min-h-[32px] w-8 h-8 rounded-md bg-white flex items-center justify-center text-black font-bold text-sm ml-2">
                                U
                            </div>
                        )}
        </div>
    );
};

export default ChatMessage;
