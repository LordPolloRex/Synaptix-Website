/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, useState } from 'react';
import Scene from './components/Scene';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, Database, Users, Github, Linkedin } from 'lucide-react';

const TrafficLight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="8" y="2" width="8" height="20" rx="2" />
    <circle cx="12" cy="7" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="17" r="2" />
  </svg>
);

function App() {
  const [activeTab, setActiveTab] = useState('ARCHITECTURE');

  return (
    <div className="relative w-full h-screen bg-[#020202] text-white overflow-hidden font-sans">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/AI-Traffic Image.jpg"
          alt="Cyberpunk Traffic System"
          className="w-full h-full object-cover opacity-60"
          onError={(e) => {
            // Fallback to a high-quality cyberpunk traffic image if the current image.jpg is not found
            (e.target as HTMLImageElement).src = "https://aistudio.google.com/_/upload/77a9e350-3579-40a6-acb4-054b09fbce28/attachment/1772871908.585177000/blobstore/prod/makersuite/spanner_managed/global::000054e2ea70026d:0000015f:2:000054e2ea70026d:0000000000000001::d99c331d75435515:000001ea764018bc:00064c6ae8549d1f"; 
          }}
          referrerPolicy="no-referrer"
        />
        {/* Dark gradient to blend smoothly into the UI */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/50 via-transparent to-[#020202]/90"></div>
      </div>

      {/* 3D Background Removed */}

      {/* UI Overlay */}
      <div className="relative z-10 w-full h-full pointer-events-none flex flex-col justify-between">
        
        {/* Header */}
        <header className="p-6 md:p-10 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 group cursor-pointer pointer-events-auto"
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
          </motion.div>

          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex items-center gap-2 p-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10"
          >
            {['Simulation Introduction', 'SUMO Simulation', 'Project Architecture', 'Meet the Team'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all pointer-events-auto relative overflow-hidden group ${
                  activeTab === tab 
                    ? 'text-black bg-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.3)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="relative z-10">{tab}</span>
                {activeTab !== tab && (
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FFD700] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                    layoutId="underline"
                  />
                )}
              </button>
            ))}
          </motion.nav>

          <div className="w-[200px] hidden lg:block"></div> {/* Spacer to balance the header since Contact Sales is gone */}
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center px-6 md:px-20 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeTab === 'Simulation Introduction' && (
              <motion.div
                key="architecture"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse shadow-[0_0_8px_rgba(255,215,0,0.8)]"></span>
                  <span className="text-xs font-mono text-gray-300 tracking-wider">WELCOME TO THE MATRIX</span>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight text-border">
                  Welcome to the <br/>
                  <span className="text-white">
                    Next-Generation in Urban Mobility
                  </span> <br/>
                </h2>
                
                <p className="text-lg text-white-400 mb-10 max-w-xl leading-relaxed text-border">
                  Synaptix AI bridges the gap between complex SUMO traffic simulations and advanced neural network architectures. Visualize, predict, and optimize urban flow in real-time.
                </p>

                <div className="flex flex-wrap gap-4 pointer-events-auto">
                  <button 
                    onClick={() => window.location.href = '/simulation.html'}
                    className="flex items-center gap-2 px-8 py-4 bg-[#FFD700] text-black rounded-full font-semibold hover:bg-[#FFC800] transition-colors shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    START SIMULATION
                  </button>
                  <button 
                    onClick={() => setActiveTab('Project Architecture')}
                    className="flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-colors pointer-events-auto"
                  >
                    EXPLORE ARCHITECTURE
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'SUMO Simulation' && (
              <motion.div
                key="simulation"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#ff3333] animate-pulse shadow-[0_0_8px_rgba(255,51,51,0.8)]"></span>
                  <span className="text-xs font-mono text-gray-300 tracking-wider">SIMULATION ACTIVE</span>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight text-border">
                  Real-time <br/>
                  <span className="text-[#FFD700]">Traffic Control</span>
                </h2>
                
                <p className="text-lg text-white-400 mb-10 max-w-xl leading-relaxed text-border">
                  Our simulation environment leverages SUMO (Simulation of Urban MObility) to model realistic traffic patterns and test AI-driven optimization strategies.
                </p>
              </motion.div>
            )}

            {activeTab === 'Project Architecture' && (
              <motion.div
                key="models"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl w-full"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                  <span className="w-4 h-4 text-[#FFD700]"><Database className="w-4 h-4" /></span>
                  <span className="text-xs font-mono text-gray-300 tracking-wider">PROJECT ARCHITECTURE</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8 tracking-tight text-border">
                  SUMO Integration <br/>
                  <span className="text-[#FFD700]">Architecture</span>
                </h2>
                
                <div className="bg-black/60 border border-white/10 rounded-2xl p-8 backdrop-blur-xl font-mono text-sm md:text-base overflow-x-auto">
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
              </motion.div>
            )}

            {activeTab === 'Meet the Team' && (
              <motion.div
                key="team"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl w-full"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                  <span className="w-4 h-4 text-[#FFD700]"><Users className="w-4 h-4" /></span>
                  <span className="text-xs font-mono text-white tracking-wider uppercase">The Visionaries</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-black italic leading-tight mb-12 tracking-tight text-border">
                  Brought to you by:
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pointer-events-auto">
                  {[
                    { 
                      name: "Duke Schnepf", 
                      role: "Team Lead & SUMO Architect", 
                      description: "Driving the core simulation logic and traci integration for real-time traffic optimization.",
                      linkedin: "https://www.linkedin.com/in/dukeschnepf/",
                      github: "https://github.com/DukeSchnepf",
                      img: "https://media.licdn.com/dms/image/v2/D5603AQEpbBpCXT9wJw/profile-displayphoto-crop_800_800/B56ZtrsEZSJYAI-/0/1767038275294?e=1774483200&v=beta&t=kgr5ncA5_uvi-IVSFYcL5X3k9L3g9vOZjxTZbcQyBXE" 
                    },
                    { 
                      name: "Nikolaus Henkel", 
                      role: "Visual Simulation Architect", 
                      description: "Crafting immersive environments and visual data representations for urban mobility.",
                      linkedin: "https://www.linkedin.com/in/nikolaus-henkel-a67023388/",
                      github: "https://github.com/roboblox-coder",
                      img: "https://media.licdn.com/dms/image/v2/D4E03AQG_Q6_k_p_Xg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1710444585145?e=1746662400&v=beta&t=3Z-p_y-5Yn_Y-k-J5J3_u5y_p_p_p_p_p_p_p_p_p_p" 
                    },
                    { 
                      name: "Cory Maccini", 
                      role: "Data Analyst & UI Designer", 
                      description: "Creating interfaces and actionable insights for optimum engagement.",
                      linkedin: "https://www.linkedin.com/in/cory-m-636320345/",
                      github: "https://github.com/LordPolloRex",
                      img: "https://media.licdn.com/dms/image/v2/D4E03AQH_Q6_k_p_Xg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1710444585145?e=1746662400&v=beta&t=3Z-p_y-5Yn_Y-k-J5J3_u5y_p_p_p_p_p_p_p_p_p_p" 
                    },
                    { 
                      name: "Ryan Liang", 
                      role: "AI Model Trainer", 
                      description: "Developing and fine-tuning neural networks to predict and manage urban traffic flow.",
                      linkedin: "https://www.linkedin.com/in/ryan-liang-0753b8387/",
                      github: "https://github.com/Deltazorka",
                      img: "https://media.licdn.com/dms/image/v2/D4E03AQI_Q6_k_p_Xg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1710444585145?e=1746662400&v=beta&t=3Z-p_y-5Yn_Y-k-J5J3_u5y_p_p_p_p_p_p_p_p_p_p" 
                    }
                  ].map((person, idx) => (
                    <motion.div
                      key={person.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
                      className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-[#FFD700]/50 transition-all cursor-pointer overflow-hidden"
                      onClick={() => window.open(person.linkedin, '_blank')}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700] opacity-0 group-hover:opacity-5 blur-3xl transition-opacity"></div>
                      
                      <div className="flex flex-col gap-6">
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
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App; 