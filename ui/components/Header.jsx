import { Link2, Link2Off } from 'lucide-react';
import React from 'react';

const Header = ({ ragAvailable }) => { // Removed darkMode, toggleDarkMode props
    const flarePink = 'pink-500'; // Define flarePink here to match reference

    return (
        <header className={`sticky top-0 z-10 bg-white border-b border-gray-200 shadow-md `}> {/* Force light mode styles, removed darkMode conditional classes */}
            <div className="container mx-auto px-5 py-3 flex items-center justify-between">
                <div className="flex-col justify-center items-center"> {/* Changed from flex-row to flex for alignment */}
                    <h1 className={`text-xl font-semibold tracking-tight `}> {/* Force text-black, removed darkMode conditional classes */}
                        <span className='text-black text-2xl '>Flarist</span><span className={`text-pink-600/80 text-2xl`}>a</span> 
                    </h1>
                    <div className=""> {/* Added margin for spacing */}
                        <div className="flex items-center mt-0.5">
                            <span className={`h-3 w-3 bg-pink-400 rounded-full mr-1 animate-pulse`} style={{ animationDuration: '1.5s' }}></span> {/* Made pulse circles smaller, stronger pink, adjusted animationDuration */}
                            <span className={`h-3 w-3 bg-pink-600 rounded-full mr-1 animate-pulse`} style={{ animationDuration: '1.7s' }}></span>
                            <span className={`h-3 w-3 bg-pink-400 rounded-full mr-1 animate-pulse`} style={{ animationDuration: '1.9s' }}></span>
                            <p className={`text-m uppercase tracking-wider text-gray-700`}> {/* Force text-gray-700, removed darkMode conditional classes */}
                                AI Engine Active
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
    <div className={`
        flex items-center space-x-2 
        px-4 py-1
        rounded-full 
        text-xs 
         
        ${ragAvailable
            ? 'bg-blue-600/80 text-white'
            : 'bg-red-600/80 text-white'
        }`}
    >
        {ragAvailable 
            ? <Link2 size={24} /> 
            : <Link2Off size={24} />
        }
        <span>
            {ragAvailable ? 'RAG chain enabled' : 'RAG chain not available'}
        </span>
    </div>
</div>
            </div>
        </header>
    );
};

export default Header;