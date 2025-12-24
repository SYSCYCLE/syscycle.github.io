
import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { 
  FileCode, 
  Upload, 
  Copy, 
  CheckCircle, 
  Settings, 
  Code2, 
  Download,
  Terminal,
  Info,
  ChevronLeft,
  Cpu,
  Zap
} from 'lucide-react';
import { OutputFormat, WasmMetadata } from './types';
import { formatBytes, humanFileSize } from './utils/converter';

type ViewState = 'hero' | 'transitioning' | 'converter';

const Starfield: React.FC<{ isWarping: boolean }> = ({ isWarping }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const stars: { x: number; y: number; z: number; prevZ: number }[] = [];
    const count = 400;

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w - w / 2,
        y: Math.random() * h - h / 2,
        z: Math.random() * w,
        prevZ: 0
      });
    }

    const animate = () => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, w, h);

      const speed = isWarping ? 45 : 0.8;
      const centerX = w / 2;
      const centerY = h / 2;

      ctx.strokeStyle = 'white';
      ctx.lineWidth = isWarping ? 2 : 1;

      stars.forEach(s => {
        s.prevZ = s.z;
        s.z -= speed;

        if (s.z <= 0) {
          s.z = w;
          s.prevZ = w;
        }

        const x = s.x * (w / s.z) + centerX;
        const y = s.y * (w / s.z) + centerY;
        const px = s.x * (w / s.prevZ) + centerX;
        const py = s.y * (w / s.prevZ) + centerY;

        const opacity = Math.min(1, (w - s.z) / (w * 0.2));
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isWarping]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('hero');
  const [rawBytes, setRawBytes] = useState<Uint8Array | null>(null);
  const [metadata, setMetadata] = useState<WasmMetadata | null>(null);
  const [format, setFormat] = useState<OutputFormat>(OutputFormat.JAVASCRIPT);
  const [isDragging, setIsDragging] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const code = useMemo(() => {
    if (!rawBytes) return '';
    return formatBytes(rawBytes, format);
  }, [rawBytes, format]);

  const handleInitialize = () => {
    setView('transitioning');
    setTimeout(() => {
      setView('converter');
    }, 1000);
  };

  const processFile = useCallback((file: File) => {
    if (!file.name.endsWith('.wasm')) {
      alert('Please upload a valid .wasm file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      const uint8 = new Uint8Array(buffer);
      setRawBytes(uint8);
      setMetadata({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      });
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2000);
  };

  const handleDownload = () => {
    if (!code) return;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = metadata ? `${metadata.name.replace('.wasm', '')}.${format}` : `wasm_bytes.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-black text-slate-100 relative font-sans select-none">
      
      <Starfield isWarping={view === 'transitioning'} />

      {/* VIEWPORT CONTAINER */}
      <div className="relative w-full h-full z-10 perspective-1000">
        
        {/* SECTION 1: HERO VIEW */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8 transition-all duration-1000 ease-[cubic-bezier(0.7,0,0.3,1)] transform-gpu ${
          view === 'hero' 
            ? 'opacity-100 scale-100 translate-z-0' 
            : 'opacity-0 scale-[5] translate-z-[1000px] pointer-events-none'
        }`}>
          <div className="text-center space-y-6 md:space-y-12 max-w-4xl relative">
            <div className="absolute -inset-20 bg-indigo-500/20 blur-[100px] rounded-full -z-10 animate-pulse"></div>
            
            <div className="inline-flex items-center justify-center p-4 md:p-8 bg-indigo-600 rounded-[30px] md:rounded-[40px] shadow-[0_0_50px_rgba(79,70,229,0.5)] mb-4 md:mb-6 animate-float">
              <FileCode className="w-12 h-12 md:w-20 md:h-20 text-white" />
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-5xl md:text-9xl font-black tracking-tighter leading-none text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Wasm<span className="text-indigo-500">Forge</span>
              </h1>
              <p className="text-lg md:text-3xl text-slate-400 font-light tracking-[0.1em] md:tracking-[0.2em] uppercase italic">
                Binary Evolution.
              </p>
            </div>
            
            <div className="pt-8 md:pt-16">
              <button 
                onClick={handleInitialize}
                className="group relative px-10 md:px-16 py-4 md:py-6 bg-white text-slate-950 rounded-[20px] md:rounded-[30px] font-black text-lg md:text-2xl hover:bg-indigo-50 transition-all shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:shadow-[0_0_100px_rgba(79,70,229,0.6)] active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <span className="relative z-10 flex items-center gap-4">
                  INITIALIZE FORGE
                  <Zap className="w-5 h-5 md:w-6 md:h-6 fill-indigo-500" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: CONVERTER VIEW */}
        <div className={`absolute inset-0 flex flex-col items-center p-3 md:p-8 transition-all duration-1000 ease-[cubic-bezier(0.2,0,0.2,1)] transform-gpu ${
          view === 'converter' 
            ? 'opacity-100 scale-100 translate-z-0' 
            : 'opacity-0 scale-0 translate-z-[-1000px] pointer-events-none'
        }`}>
          
          <header className="w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 md:mb-8">
             <button 
              onClick={() => setView('hero')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-slate-500 hover:text-white transition-all text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] group bg-slate-900/40 px-4 py-2.5 md:px-6 md:py-3 rounded-xl border border-slate-800/50"
             >
                <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1.5 transition-transform" />
                Return to Core
             </button>
             
             <div className="w-full sm:w-auto flex bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/50 backdrop-blur-md shadow-2xl overflow-x-auto no-scrollbar">
               {Object.values(OutputFormat).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-lg text-[10px] md:text-xs font-black transition-all ${
                      format === f 
                       ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 scale-105' 
                       : 'text-slate-500 hover:text-slate-200'
                    }`}
                  >
                    {f.toUpperCase()}
                  </button>
                ))}
             </div>
          </header>

          <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 flex-1 min-h-0 pb-4">
            
            {/* Sidebar Controls */}
            <div className="lg:col-span-4 flex flex-col gap-4 min-h-0">
              <div 
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  flex-1 relative group cursor-pointer border-2 border-dashed rounded-[30px] md:rounded-[50px] p-4 md:p-8 flex flex-col items-center justify-center gap-4 md:gap-8 transition-all duration-700
                  ${isDragging ? 'border-indigo-500 bg-indigo-500/10 scale-95 shadow-[0_0_50px_rgba(79,70,229,0.2)]' : 'border-slate-800 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-900/60'}
                `}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
                  accept=".wasm"
                  className="hidden"
                />
                <div className={`p-5 md:p-8 rounded-[25px] md:rounded-[40px] transition-all duration-700 group-hover:rotate-12 ${isDragging ? 'bg-indigo-600' : 'bg-slate-800'}`}>
                  <Upload className="w-8 h-8 md:w-12 md:h-12 text-indigo-400 group-hover:text-white group-hover:scale-110 transition-all" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-xl md:text-2xl font-black text-slate-100 tracking-tight">Load Binary</p>
                  <p className="text-[9px] md:text-[10px] text-slate-500 uppercase font-black tracking-[0.3em]">Ready for Integration</p>
                </div>
              </div>

              {metadata && (
                <div className="bg-slate-900/60 border border-slate-800 rounded-[30px] md:rounded-[40px] p-5 md:p-8 space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 backdrop-blur-md shadow-2xl shrink-0">
                  <div className="flex items-center justify-between border-b border-slate-800/50 pb-3">
                    <h3 className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <Info className="w-3.5 h-3.5 text-indigo-500" /> Analysis
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[8px] md:text-[9px] text-slate-600 font-black uppercase tracking-widest">Wasm Resource</span>
                      <span className="text-xs md:text-sm font-mono text-indigo-400 truncate bg-slate-800/30 p-2 rounded-lg">{metadata.name}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[8px] md:text-[9px] text-slate-600 font-black uppercase tracking-widest">Magnitude</span>
                        <span className="text-lg md:text-xl font-black text-slate-200">{humanFileSize(metadata.size)}</span>
                      </div>
                      <div className="flex flex-col gap-0.5 text-right">
                        <span className="text-[8px] md:text-[9px] text-slate-600 font-black uppercase tracking-widest">Stream</span>
                        <span className="text-xs md:text-sm font-mono text-slate-400">{rawBytes?.length.toLocaleString()} B</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Terminal Window */}
            <div className="lg:col-span-8 flex flex-col min-h-0">
              <div className="flex-1 bg-slate-900/90 border border-slate-800 rounded-[30px] md:rounded-[50px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col backdrop-blur-2xl">
                <div className="bg-slate-800/60 px-5 md:px-10 py-4 md:py-6 border-b border-slate-800/50 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-3 items-center">
                    <div className="hidden xs:flex gap-1.5">
                      <div className="w-2.5 h-2.5 md:w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30"></div>
                      <div className="w-2.5 h-2.5 md:w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30"></div>
                      <div className="w-2.5 h-2.5 md:w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30"></div>
                    </div>
                    <span className="xs:ml-4 text-[9px] md:text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] md:tracking-[0.5em] flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                      FORGE_OUTPUT.{format}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 md:gap-4">
                    <button 
                      disabled={!rawBytes}
                      onClick={handleDownload}
                      className="p-2 md:p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 disabled:opacity-5 transition-all hover:scale-110 active:scale-90"
                    >
                      <Download className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                    <button 
                      disabled={!rawBytes}
                      onClick={handleCopy}
                      className={`flex items-center gap-2 md:gap-4 px-4 md:px-10 py-2 md:py-3 rounded-xl text-[9px] md:text-[11px] font-black uppercase tracking-widest transition-all disabled:opacity-5 ${
                        isCopying ? 'bg-green-600 text-white shadow-[0_0_30px_rgba(34,197,94,0.4)]' : 'bg-white text-slate-950 hover:bg-indigo-50 hover:scale-105 active:scale-95 shadow-xl'
                      }`}
                    >
                      {isCopying ? <CheckCircle className="w-3.5 h-3.5 md:w-5 md:h-5" /> : <Copy className="w-3.5 h-3.5 md:w-5 md:h-5" />}
                      {isCopying ? 'OK' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-5 md:p-10 overflow-auto custom-scrollbar bg-black/40">
                  {rawBytes ? (
                    <pre className="mono text-[12px] md:text-[15px] leading-relaxed text-indigo-300/90 whitespace-pre-wrap select-all selection:bg-indigo-500/30 selection:text-white">
                      {code}
                    </pre>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-800 space-y-6 md:space-y-10">
                      <div className="relative">
                        <Code2 className="w-16 h-16 md:w-32 md:h-32 opacity-20 animate-pulse" />
                        <div className="absolute inset-0 bg-indigo-500/10 blur-[60px] rounded-full animate-ping"></div>
                      </div>
                      <div className="text-center space-y-1">
                        <p className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] md:tracking-[0.8em] opacity-40">Awaiting Signal</p>
                        <p className="text-[8px] md:text-[10px] text-slate-700 uppercase font-bold tracking-widest">Connect Binary for Extraction</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="bg-slate-800/30 px-6 md:px-10 py-3 md:py-4 border-t border-slate-800/50 text-[8px] md:text-[10px] text-slate-600 flex justify-between font-mono tracking-widest uppercase items-center shrink-0">
                  <div className="flex gap-4 md:gap-10">
                    <span className="flex items-center gap-1.5 md:gap-3"><div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]"></div> LINK_ACTIVE</span>
                    <span className="hidden sm:inline">ENCRYPTION: NONE</span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3 opacity-30">
                    <Cpu className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="hidden xs:inline">ENGINE V1.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 8s infinite ease-in-out;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #4f46e5;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        body {
          background: black;
          perspective: 1500px;
          overflow: hidden;
          width: 100vw;
          height: 100vh;
          position: fixed;
        }
        .perspective-1000 {
          perspective: 1500px;
        }
        .transform-gpu {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        @media (max-width: 480px) {
          .xs\:hidden { display: none; }
          .xs\:flex { display: flex; }
          .xs\:ml-4 { margin-left: 0; }
        }
      `}</style>
    </div>
  );
};

export default App;
