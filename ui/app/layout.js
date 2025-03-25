import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Flare dApp Builder Assistant',
  description: 'A chat assistant for building dApps on Flare',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          {children}
        </main>
      </body>
    </html>
  );
}