import frameworkData from "./framework.json";

export default function FrameworkList() {
    return (
        <div className="p-8 min-h-screen bg-slate-950 font-mono text-cyan-50 selection:bg-fuchsia-500 selection:text-white">
            {/* Grid Layout untuk menyusunnya menjadi bentuk Card responsif */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {frameworkData.map((item) => (
                    // Card Container: flex-col & h-full agar tinggi card seragam
                    <div key={item.id} className="flex flex-col border border-cyan-900 bg-slate-900/60 p-6 relative group hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300 backdrop-blur-sm rounded-tl-2xl rounded-br-2xl">
                        
                        {/* Aksen HUD/Neon Cyberpunk di sudut */}
                        <div className="absolute top-0 left-0 w-8 h-1 bg-fuchsia-500 group-hover:w-full group-hover:shadow-[0_0_10px_rgba(236,72,153,0.8)] transition-all duration-500 rounded-tl-2xl"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-1 bg-cyan-400 group-hover:w-full group-hover:shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-500 rounded-br-2xl"></div>

                        <h2 className="text-2xl font-black text-cyan-400 tracking-widest uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] mb-4">
                            {item.name}
                        </h2>
                        
                        {/* flex-grow mendorong elemen di bawahnya (footer) agar selalu berada di dasar card */}
                        <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                            {item.description}
                        </p>
                        
                        {/* Bagian Bawah Card (Footer) */}
                        <div className="border-t border-slate-700/50 pt-4 mt-auto">
                            <p className="text-slate-400 text-xs tracking-widest uppercase mb-4">
                                DEV: <b className="text-fuchsia-400 drop-shadow-[0_0_5px_rgba(236,72,153,0.4)]">{item.details.developer}</b> <span className="text-cyan-600">//</span> {item.details.releaseYear}
                            </p>
                            
                            <a href={item.details.officialWebsite} target="_blank" rel="noreferrer"
                                className="inline-block w-full text-center px-4 py-2 bg-cyan-950/30 border border-cyan-500/50 text-xs font-bold text-cyan-300 hover:bg-cyan-400 hover:text-slate-900 hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all uppercase tracking-widest rounded-sm mb-5">
                                [ Visit Website ]
                            </a>

                            <div className="flex flex-wrap gap-2">
                                {item.tags.map((tag, index) => (
                                    <span key={index} className="bg-slate-950 border-l-2 border-fuchsia-500 text-slate-300 px-2 py-1 text-[10px] font-bold uppercase tracking-widest shadow-inner">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}