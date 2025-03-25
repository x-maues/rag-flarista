import React, { useState, useMemo } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Check, Copy } from 'lucide-react';

const syntaxColors = {
  keyword: 'text-purple-400',      // for keywords
  string: 'text-green-400',        // for string values
  function: 'text-blue-400',       // for function names
  number: 'text-orange-400',       // for numeric values
  comment: 'text-neutral-500',     // for comments
  punctuation: 'text-neutral-300', // for brackets, parentheses
  default: 'text-neutral-200'      // default text color
};

const tokenizeCode = (code) => {
  const tokens = [];
  const patterns = [
    // Comments (single and multi-line)
    { type: 'comment', regex: /(\/\/.*|\/\*[\s\S]*?\*\/)/ },
    
    // Strings (handle different quote types and escape characters)
    { type: 'string', regex: /('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")/ },
    
    // Keywords
    { type: 'keyword', regex: /\b(const|let|var|import|from|export|if|else|return|function|class|extends|new|try|catch|finally|async|await)\b/ },
    
    // Function names
    { type: 'function', regex: /([a-zA-Z_$][\w$]*)\s*\(/ },
    
    // Numbers (decimal, hex, binary, scientific notation)
    { type: 'number', regex: /\b(0x[0-9a-fA-F]+|\d+(\.\d+)?([eE][+-]?\d+)?)\b/ },
    
    // Punctuation and operators
    { type: 'punctuation', regex: /[{}[\](),.;:?]/}
  ];

  let remainingCode = code;
  const result = [];

  while (remainingCode.length > 0) {
    let matched = false;

    // Try to match each pattern
    for (const { type, regex } of patterns) {
      const match = regex.exec(remainingCode);
      
      if (match && match.index === 0) {
        // Add the matched token
        result.push({
          type,
          content: match[0]
        });

        // Remove the matched portion from remaining code
        remainingCode = remainingCode.slice(match[0].length);
        matched = true;
        break;
      }
    }

    // If no pattern matched, add the first character as default
    if (!matched) {
      result.push({
        type: 'default',
        content: remainingCode[0]
      });
      remainingCode = remainingCode.slice(1);
    }
  }

  return result;
};

const CodeBlock = ({ children, language }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Memoize the tokenization to prevent unnecessary re-renders
  const tokenizedCode = useMemo(() => {
    // Prevent processing if children is not a string
    if (typeof children !== 'string') return [{ type: 'default', content: children }];
    return tokenizeCode(children);
  }, [children]);

  return (
    <div className="group relative bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 shadow-sm">
      <div className="flex justify-between items-center bg-neutral-800 px-4 py-2">
        <span className="text-xs text-neutral-400 font-mono uppercase tracking-wider">
          {language || 'Code'}
        </span>
        
        <CopyToClipboard text={children} onCopy={handleCopy}>
          <button 
            className="
              transition-all duration-200 ease-in-out
              text-neutral-400 hover:text-white 
              focus:outline-none 
              p-1 rounded
              flex items-center space-x-1
            "
            disabled={isCopied}
          >
            {isCopied ? (
              <div className="flex items-center text-green-400">
                <Check size={16} className="mr-1" />
                <span className="text-xs">Copied</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Copy size={16} className="mr-1" />
                <span className="text-xs">Copy</span>
              </div>
            )}
          </button>
        </CopyToClipboard>
      </div>
      
      <pre className="
        p-4 
        text-sm 
        overflow-x-auto 
        bg-neutral-900 
        text-neutral-300
        scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-neutral-700
      ">
        <code 
          className={`
            font-mono 
            ${language ? `language-${language}` : ''}
            selection:bg-neutral-700 selection:text-white
            break-words whitespace-pre-wrap
          `}
        >
          {tokenizedCode.map((token, index) => (
            <span 
              key={index} 
              className={syntaxColors[token.type] || syntaxColors.default}
            >
              {token.content}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;