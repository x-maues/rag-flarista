"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link2Icon } from "lucide-react";

const Des = () => {
  const { scrollYProgress } = useScroll();


  // Animated Line 1
  const leftVinePathLength = useTransform(scrollYProgress, [0, 1], [0, 1], {
    clamp: false,
  }); // Path length for growth
  const rightVinePathLength = useTransform(scrollYProgress, [0, 1], [0, 1], {
    clamp: false,
  }); // Path length for right vines - slightly offset timing

  // --- Section Animations ---
  const featuresSectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, 1],
    { clamp: false }
  );
  const featuresSectionY = useTransform(scrollYProgress, [0, 0.1], [70, 0], {
    clamp: false,
  });

  const benefitsSectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, 1],
    { clamp: "ease" }
  );
  const benefitsSectionY = useTransform(scrollYProgress, [0, 0.1], [80, 0], {
    clamp: "ease",
  });

  return (
    <div className="min-h-screen text-white bg-[#0A0F13] font-['Inter'] tracking-tight overflow-x-hidden relative">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-12 py-6 border-b border-white/10 z-20">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold">x-lab</div>
          <div className="flex space-x-6 text-sm text-neutral-400">
            {[
              "Products",
              "Developers",
              "Ecosystem",
              "About us",
              "Contact",
              "Blog",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-white transition duration-300 ease-in-out"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-sm text-neutral-400 hover:text-white transition duration-300"
          >
            Whitepaper
          </a>
          <button className="bg-pink-500 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition duration-300">
            Launch App
          </button>
        </div>
      </nav>

      <div className="relative overflow-hidden">
        {/* --- Animated Background Elements --- */}

        {/* --- Animated Vine Elements --- */}

        {/* Left Vines */}
        <div className="absolute left-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none z-0">
          {" "}
          {/* Container for left vines - optional */}
          {/* Vine 1 - Left */}
          <motion.svg
            className="absolute left-12 top-0 bottom-0 w-full h-full" // Adjust left positioning
            style={
              {
                // Optional: Add transform-origin for more complex scaling/rotation
                // transformOrigin: 'top center',
              }
            }
          >
            <motion.path
              d="M 50,0 C 50,200 0,400 50,600 C 100,800 50,1000 50, 2000 L 50, 200vh" // Example Curved path - **CRITICAL: You will design your own vine path here**
              stroke="url(#vineGradient)" // Apply gradient
              strokeWidth={2} // Adjust thickness
              fill="transparent"
              pathLength={1} // Important for path animation
              style={{ pathLength: leftVinePathLength }}
            />
          </motion.svg>
          {/* More Left Vines can be added here - Layer them for richness! */}
          {/* ... (Duplicate and adjust paths for more vine layers on the left) */}
        </div>

        {/* Right Vines */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none z-0">
          {" "}
          {/* Container for right vines - optional */}
          {/* Vine 1 - Right */}
          <motion.svg
            className="absolute right-12 top-0 bottom-0 w-full h-full" // Adjust right positioning
            style={
              {
                // Optional transform origin if needed
                // transformOrigin: 'top center',
              }
            }
          >
            <motion.path
              d="M 50,0 C 50,100 100,200 50,300 C 0,400 50,500 50, 100vh" // Example Mirrored Path or different shape for right - **CRITICAL: Design your own path**
              stroke="url(#vineGradient)" // Apply same gradient or different
              strokeWidth={2} // Adjust thickness as needed
              fill="transparent"
              pathLength={1} // Important
              style={{ pathLength: rightVinePathLength }}
            />
          </motion.svg>
          {/* More Right Vines can be added here - Layer them! */}
          {/* ... (Duplicate and adjust paths for more vine layers on the right) */}
        </div>

        {/* --- Your Original Content here --- */}
        {/* ... rest of your content within this <div className="relative"> ... */}

        {/* --- SVG Gradient Definition - Define this outside your components ideally for re-use */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            overflow: "hidden",
          }}
        >
          <linearGradient
            id="vineGradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="100"
            y2="0"
          >
            <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.8" />{" "}
            {/* Start Color */}
            <stop offset="100%" stopColor="#D1FAE5" stopOpacity="0.4" />{" "}
            {/* End Color - Faded out*/}
          </linearGradient>
        </svg>

        {/* --- Hero Section --- */}
        <section className="container mx-auto px-12 pt-24 pb-32 text-center relative z-10">
          <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">
            Unlocked.
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
            x-lab is an order book DEX that lets you run trading strategies
            without locking your funds. Trade while generating yield. Experience
            DeFi freedom.
          </p>
          <button className="bg-pink-500 text-black px-6 py-3 rounded-full text-base font-medium hover:bg-opacity-90 transition duration-300 inline-flex items-center space-x-2">
            Launch App{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Order Book Mockup - with potential animation enhancements */}
          <div className="mt-20 bg-[#151E24] rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl">
            <div className="bg-white/5 px-6 py-4 border-b border-neutral-800 flex justify-between items-center">
              <span className="text-sm font-medium">Order book</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-neutral-500">WETH/USDC</span>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-neutral-500">
                <tr>
                  <th className="px-4 py-2 text-left">Amount (WETH)</th>
                  <th className="px-4 py-2 text-left">Price (WETH)</th>
                  <th className="px-4 py-2 text-right">Total (USDC)</th>
                  <th className="px-4 py-2 text-right">Total (USDC)</th>
                  <th className="px-4 py-2 text-right">Price (WETH)</th>
                  <th className="px-4 py-2 text-right">Amount (WETH)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    askAmount: 1.268,
                    askPrice: 1899.99,
                    askTotal: 2409.19,
                    bidAmount: 1.106,
                    bidPrice: 1899.93,
                    bidTotal: 2101.32,
                  },
                  {
                    askAmount: 5.873,
                    askPrice: 1900.94,
                    askTotal: 11164.22,
                    bidAmount: 6.246,
                    bidPrice: 1898.41,
                    bidTotal: 11857.47,
                  },
                  {
                    askAmount: 1.56,
                    askPrice: 1901.89,
                    askTotal: 2966.95,
                    bidAmount: 2.452,
                    bidPrice: 1896.89,
                    bidTotal: 4651.18,
                  },
                  {
                    askAmount: 2.678,
                    askPrice: 1902.84,
                    askTotal: 5095.81,
                    bidAmount: 6.006,
                    bidPrice: 1895.37,
                    bidTotal: 11383.62,
                  },
                  {
                    askAmount: 0.68,
                    askPrice: 1903.79,
                    askTotal: 1294.58,
                    bidAmount: 13.945,
                    bidPrice: 1893.86,
                    bidTotal: 26409.84,
                  },
                  {
                    askAmount: 3.337,
                    askPrice: 1904.74,
                    askTotal: 6356.13,
                    bidAmount: 0.434,
                    bidPrice: 1892.34,
                    bidTotal: 821.28,
                  },
                  {
                    askAmount: 1.126,
                    askPrice: 1905.7,
                    askTotal: 2145.99,
                    bidAmount: 2.412,
                    bidPrice: 1890.83,
                    bidTotal: 4560.68,
                  },
                  {
                    askAmount: 2.624,
                    askPrice: 1906.65,
                    askTotal: 4999.72,
                    bidAmount: 1.545,
                    bidPrice: 1889.32,
                    bidTotal: 2918.99,
                  },
                ].map((row, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-white/5" : ""}`}
                  >
                    <td className="px-4 py-2 text-green-500">
                      {row.askAmount}
                    </td>
                    <td className="px-4 py-2 text-green-500">{row.askPrice}</td>
                    <td className="px-4 py-2 text-right text-neutral-400">
                      {row.askTotal}
                    </td>
                    <td className="px-4 py-2 text-right text-neutral-400">
                      {row.bidTotal}
                    </td>
                    <td className="px-4 py-2 text-right text-red-500">
                      {row.bidPrice}
                    </td>
                    <td className="px-4 py-2 text-right text-red-500">
                      {row.bidAmount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Features Section --- */}
        <motion.section
          className="container mx-auto px-12 py-24 text-center relative z-10"
          style={{ opacity: featuresSectionOpacity, y: featuresSectionY }}
        >
          <h2 className="text-4xl font-bold mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {/* Example Feature Items - Replace with actual DEX features */}
            {[
              "Non-Custodial Trading",
              "Yield Optimization",
              "Advanced Order Types",
              "Cross-Chain Compatibility",
              "Gas-Efficient",
              "DAO Governance",
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-2xl bg-[#151E24] border border-neutral-800 transition-transform hover:scale-105 cursor-pointer"
                whileHover={{ scale: 1.08, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl text-pink-500 mb-4">
                 <Link2Icon/>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature}</h3>
                <p className="text-sm text-neutral-400">
                  Detailed description of {feature} feature, highlighting its
                  benefits for traders.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- Benefits Section --- */}
        <motion.section
          className="container mx-auto px-12 py-24 text-center relative z-10"
          style={{ opacity: benefitsSectionOpacity, y: benefitsSectionY }}
        >
          <h2 className="text-4xl font-bold mb-12">
            Unlock the Benefits of x-lab DEX
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {/* Example Benefit Items */}
            {[
              "Full Fund Control",
              "Maximize Yield",
              "Optimized Trading Strategies",
              "Seamless DeFi Integration",
            ].map((benefit, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-[#151E24] border border-neutral-800"
              >
                <h3 className="text-xl font-semibold mb-4">{benefit}</h3>
                <p className="text-neutral-400">
                  Explain the benefit of {benefit}. Why should users care about
                  this in a DEX?
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* --- How It Works Section --- */}
        <section className="container mx-auto px-12 py-24 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-12">How x-lab Works</h2>
          <div className="mt-16 flex flex-col lg:flex-row justify-between space-y-12 lg:space-y-0 lg:space-x-12">
            {/* Example Steps - Visualize these with numbers or icons */}
            {[
              {
                number: "1",
                title: "Connect Wallet",
                description:
                  "Connect your Web3 wallet to x-lab and start exploring the DEX.",
              },
              {
                number: "2",
                title: "Browse Markets",
                description:
                  "Explore available trading pairs and analyze the order book dynamics.",
              },
              {
                number: "3",
                title: "Place Orders",
                description:
                  "Set your trading strategies with advanced order types without locking funds.",
              },
              {
                number: "4",
                title: "Earn Yield",
                description:
                  "Generate yield from other protocols while your funds are ready for trading.",
              },
            ].map((step, index) => (
              <div key={index} className="text-left">
                <div className="text-4xl font-bold text-pink-500 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-neutral-400">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- Ecosystem Section --- */}
        <section className="container mx-auto px-12 py-24 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-12">x-lab Ecosystem</h2>
          <div className="mt-16 flex justify-center space-x-12 items-center">
            {/* Example Ecosystem Elements -  Icons representing different aspects */}
            {["Security", "Community", "Developers", "Partners"].map(
              (element, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl text-pink-500 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M12 16.5a.75.75 0 00-.75.75v.75a.75.75 0 001.5 0v-.75a.75.75 0 00-.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="text-sm text-neutral-400">{element}</div>
                </div>
              )
            )}
          </div>
        </section>

        {/* --- Community / Call to Action Section --- */}
        <section className="container mx-auto px-12 py-24 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-12">Join the x-lab Community</h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Be part of the future of decentralized trading. Stay updated,
            contribute, and help shape x-lab.
          </p>
          <div className="mt-12">
            <button className="bg-pink-500 text-black px-8 py-3 rounded-full text-base font-medium hover:bg-opacity-90 transition duration-300 inline-flex items-center space-x-2">
              Join Community{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 ml-2"
              >
                {" "}
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.75.75v5.25H16a.75.75 0 010 1.5h-5.25V16a.75.75 0 01-1.5 0v-5.25H4a.75.75 0 010-1.5h5.25V3.75A.75.75 0 0110 3z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="container mx-auto px-12 py-12 text-center border-t border-white/10 text-neutral-500 text-sm relative z-10">
          © {new Date().getFullYear()} x-lab DEX. Backed by 🌱 in web3.
        </footer>
      </div>
    </div>
  );
};

export default Des;
