/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

// --- Inline SVG Icons (Replacing lucide-react to fix useContext errors) ---
const TrafficLight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="2" width="8" height="20" rx="2" />
    <circle cx="12" cy="7" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="17" r="2" />
  </svg>
);

const ArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const Play = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const Database = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

const Users = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
// ------------------------------------------------------------------------

export default function App() {
  const [activeTab, setActiveTab] = useState('Simulation Introduction');

  return (
    <div className="relative w-full h-screen bg-[#020202] text-white overflow-hidden font-sans">
      {/* Embedded CSS for Animations (Replacing Framer Motion) */}
      <style>{`
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-slide-right {
          animation: fadeSlideRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-slide-up {
          animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Cyberpunk.jpg"
          alt="Cyberpunk Traffic System"
          className="w-full h-full object-cover opacity-60"
          onError={(e) => {
            // Fallback to a dark gradient if the image doesn't exist
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Dark gradient to blend smoothly into the UI */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/50 via-[#020202]/80 to-[#020202]"></div>
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 w-full h-full pointer-events-none flex flex-col justify-between">
        
        {/* Header */}
        <header className="p-6 md:p-10 flex justify-between items-center">
          <div 
            className="flex items-center gap-4 group cursor-pointer pointer-events-auto animate-fade-slide-right"
            onClick={() => setActiveTab('Simulation Introduction')}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#FFD700] blur-lg opacity-20 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative w-10 h-10 bg-[#FFD700] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.4)] group-hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] transition-all transform group-hover:scale-110">
                <TrafficLight className="w-6 h-6 text-black" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-black italic tracking-[0.15em] text-border leading-none">SYNAPTIX</h1>
              <span className="text-[10px] font-mono tracking-[0.4em] text-[#FFD700] mt-1 opacity-80">ARTIFICIAL INTELLIGENCE</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-2 p-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10 pointer-events-auto animate-fade-slide-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
            {['Simulation Introduction', 'SUMO Simulation', 'Project Architecture', 'Meet the Team'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all relative overflow-hidden group ${
                  activeTab === tab 
                    ? 'text-black bg-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.3)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="relative z-10">{tab}</span>
                {activeTab !== tab && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FFD700] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                )}
              </button>
            ))}
          </nav>

          <div className="w-[200px] hidden lg:block"></div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center px-6 md:px-20 max-w-7xl mx-auto w-full">
          {activeTab === 'Simulation Introduction' && (
            <div className="max-w-2xl animate-fade-slide-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse shadow-[0_0_8px_rgba(255,215,0,0.8)]"></span>
                <span className="text-xs font-mono text-gray-300 tracking-wider">WELCOME TO THE MATRIX</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight text-white drop-shadow-lg">
                Welcome to the <br/>
                <span className="text-gray-300">
                  Next-Generation in Urban Mobility
                </span> <br/>
              </h2>
              
              <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed drop-shadow-md">
                Synaptix AI bridges the gap between complex SUMO traffic simulations and advanced neural network architectures. Visualize, predict, and optimize urban flow in real-time.
              </p>

              <div className="flex flex-wrap gap-4 pointer-events-auto">
                <button 
                  onClick={() => window.open('simulation.html', '_blank')}
                  className="flex items-center gap-2 px-8 py-4 bg-[#FFD700] text-black rounded-full font-semibold hover:bg-[#FFC800] transition-all duration-300 shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transform hover:-translate-y-1"
                >
                  <Play className="w-4 h-4 fill-current" />
                  START SIMULATION
                </button>
                <button 
                  onClick={() => setActiveTab('Project Architecture')}
                  className="flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 hover:border-white/20 transform hover:-translate-y-1"
                >
                  EXPLORE ARCHITECTURE
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'SUMO Simulation' && (
            <div className="max-w-2xl animate-fade-slide-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#ff3333] animate-pulse shadow-[0_0_8px_rgba(255,51,51,0.8)]"></span>
                <span className="text-xs font-mono text-gray-300 tracking-wider">SIMULATION ACTIVE</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight text-white drop-shadow-lg">
                Real-time <br/>
                <span className="text-[#FFD700]">Traffic Control</span>
              </h2>
              
              <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed drop-shadow-md">
                Our simulation environment leverages SUMO (Simulation of Urban MObility) to model realistic traffic patterns and test AI-driven optimization strategies.
              </p>
              
              <div className="pointer-events-auto">
                <button 
                  onClick={() => window.open('simulation.html', '_blank')}
                  className="flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Play className="w-4 h-4 fill-current text-[#ff3333]" />
                  OPEN 3D CITY VIEWER
                </button>
              </div>
            </div>
          )}

          {activeTab === 'Project Architecture' && (
            <div className="max-w-4xl w-full animate-fade-slide-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                <span className="w-4 h-4 text-[#FFD700]"><Database className="w-4 h-4" /></span>
                <span className="text-xs font-mono text-gray-300 tracking-wider">PROJECT ARCHITECTURE</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8 tracking-tight text-white drop-shadow-lg">
                SUMO Integration <br/>
                <span className="text-[#FFD700]">Architecture</span>
              </h2>
              
              <div className="bg-black/80 border border-white/10 rounded-2xl p-8 backdrop-blur-xl font-mono text-sm md:text-base overflow-x-auto shadow-2xl">
                <pre className="text-gray-300 leading-relaxed">
{`SUMO/
├── requirements.txt          # Python dependencies
├── README.md                 # This file
├── .gitignore
└── v2/
    ├── run.py                # 🚀 Main launcher (start here)
    ├── real_life_simulation.py  # Converts Harvard Excel → SUMO routes
    ├── run_auto_sim.py       # Headless sim + CSV export
    ├── run_traci_sim.py      # TraCI-based sim with AI hooks
    ├── run_websocket_sim.py  # TraCI + WebSocket broadcaster
    ├── websocket_server.py   # Reusable WS server module
    ├── sim.sumocfg           # SUMO config file
    ├── NE_8th_St_Corridor.net.xml  # Road network
    ├── harvard_simulation.rou.xml  # Routes from Harvard data
    ├── synthetic.rou.xml     # Synthetic routes
    ├── Real_intersection_data/     # Harvard Excel source files
    └── frontend/
        └── index.html        # Three.js live viewer (no build step)`}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'Meet the Team' && (
            <div className="max-w-5xl w-full animate-fade-slide-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                <span className="w-4 h-4 text-[#FFD700]"><Users className="w-4 h-4" /></span>
                <span className="text-xs font-mono text-white tracking-wider uppercase">The Visionaries</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black italic leading-tight mb-12 tracking-tight text-white drop-shadow-lg">
                Brought to you by:
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pointer-events-auto">
                {[
                  { 
                    name: "Duke Schnepf", 
                    role: "Team Lead & SUMO Architect", 
                    description: "Driving the core simulation logic and traci integration for real-time traffic optimization.",
                    linkedin: "https://www.linkedin.com/in/dukeschnepf/",
                    github: "https://github.com/DukeSchnepf"
                  },
                  { 
                    name: "Nikolaus Henkel", 
                    role: "Visual Simulation Architect", 
                    description: "Crafting immersive environments and visual data representations for urban mobility.",
                    linkedin: "https://www.linkedin.com/in/nikolaus-henkel-a67023388/",
                    github: "https://github.com/roboblox-coder"
                  },
                  { 
                    name: "Cory Maccini", 
                    role: "Data Analyst & UI Designer", 
                    description: "Creating interfaces and actionable insights for optimum engagement.",
                    linkedin: "https://www.linkedin.com/in/cory-m-636320345/",
                    github: "https://github.com/LordPolloRex"
                  },
                  { 
                    name: "Ryan Liang", 
                    role: "AI Model Trainer", 
                    description: "Developing and fine-tuning neural networks to predict and manage urban traffic flow.",
                    linkedin: "https://www.linkedin.com/in/ryan-liang-0753b8387/",
                    github: "https://github.com/Deltazorka"
                  }
                ].map((person, idx) => (
                  <div
                    key={person.name}
                    className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-[#FFD700]/50 transition-all duration-300 cursor-pointer overflow-hidden animate-fade-slide-up transform hover:-translate-y-1"
                    style={{ animationDelay: `${0.1 + (idx * 0.1)}s`, opacity: 0 }}
                    onClick={() => window.open(person.linkedin, '_blank')}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700] opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-500"></div>
                    
                    <div className="flex flex-col gap-6 relative z-10">
                      <div className="flex items-start justify-end">
                        <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-[#FFD700]/30 transition-colors">
                          <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-[#FFD700] transform group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-[#FFD700] transition-colors tracking-tight">{person.name}</h3>
                        <p className="text-[#FFD700] font-mono text-xs uppercase tracking-[0.2em] mt-1 opacity-80">{person.role}</p>
                        <p className="text-gray-400 text-sm mt-4 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                          {person.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Connect</span>
                        <div className="flex gap-3">
                          <button 
                            onClick={(e) => { e.stopPropagation(); window.open(person.linkedin, '_blank'); }}
                            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFD700] hover:text-black transition-all"
                          >
                            <Linkedin className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); window.open(person.github, '_blank'); }}
                            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFD700] hover:text-black transition-all"
                          >
                            <Github className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}