export default function TailWindCSS() {
  return (
    // Background utama: warna latte/krem, font monospace untuk kesan pixel/retro
    <div className="min-h-screen bg-[#f4e4c1] font-mono text-[#4a3b32] p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* HUD / Navigation Bar */}
        <FlexboxGrid />
        
        {/* Title Screen */}
        <div className="border-4 border-[#4a3b32] bg-[#fffaf0] p-4 shadow-[6px_6px_0px_0px_#4a3b32]">
          <h1 className="text-2xl md:text-3xl font-black text-center uppercase tracking-widest text-[#8b5a2b]">
            ☕ Belajar Tailwind CSS 4 
          </h1>
        </div>
        
        {/* Main Action Button */}
        <button className="bg-[#d28c4b] text-white font-black px-6 py-3 
                           border-4 border-[#4a3b32] shadow-[4px_4px_0px_0px_#4a3b32] 
                           hover:bg-[#c07a3e] active:translate-y-1 active:translate-x-1 
                           active:shadow-none transition-all uppercase tracking-wider">
          Start Shift ▶
        </button>
        
        {/* Game UI Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Spacing />
          <Typography />
        </div>
        
        <BorderRadius />
        <ShadowEffects />

      </div>
    </div>
  )
}

function Spacing() {
  return (
    <div className="bg-[#fffaf0] border-4 border-[#4a3b32] p-6 shadow-[6px_6px_0px_0px_#a3b18a]">
      <h2 className="text-xl font-bold uppercase border-b-4 border-dashed border-[#a3b18a] pb-2 mb-4">
        📜 Quest Board
      </h2>
      <p className="text-[#6b5547] leading-relaxed font-semibold">
        [PADDING_&_MARGIN_UNLOCKED]<br/>
        Ini adalah contoh penggunaan ruang di dalam game kafe kamu.
      </p>
    </div>
  )
}

function Typography() {
  return (
    <div className="bg-[#f0d8b8] border-4 border-[#4a3b32] p-6 shadow-[6px_6px_0px_0px_#d28c4b]">
      <h1 className="text-xl font-black text-[#4a3b32] uppercase mb-2">
        💬 Dialogue Box
      </h1>
      <div className="bg-white border-2 border-[#4a3b32] p-3 text-sm font-semibold text-[#6b5547]">
        "Belajar Tailwind sangat menyenangkan dan cepat! Persis seperti menyajikan kopi ke pelanggan."
      </div>
    </div>
  )
}

function BorderRadius() {
  return (
    <div className="bg-[#a3b18a] border-4 border-[#4a3b32] p-6 flex items-center justify-center shadow-[6px_6px_0px_0px_#4a3b32]">
      {/* Menggunakan border tajam (rounded-none) karena pixel art jarang menggunakan sudut yang membulat halus */}
      <button className="bg-white border-4 border-[#4a3b32] text-[#4a3b32] font-black px-6 py-2 
                         shadow-[4px_4px_0px_0px_#4a3b32] hover:bg-[#e2e8ce] 
                         active:translate-y-1 active:translate-x-1 active:shadow-none transition-all uppercase">
        + Buy Ingredients
      </button>
    </div>
  )
}

function FlexboxGrid() {
  return (
    <nav className="flex flex-col md:flex-row justify-between items-center bg-[#4a3b32] border-4 border-[#2b221d] p-4 text-[#fffaf0] shadow-[0_6px_0_0_#2b221d]">
      <h1 className="text-xl font-black tracking-tighter mb-4 md:mb-0">
        <span className="text-[#d28c4b]">PIXEL</span>_CAFE
      </h1>
      <ul className="flex space-x-6 text-sm font-bold uppercase">
        <li><a href="#" className="hover:text-[#a3b18a] hover:underline decoration-4 transition-colors">Home</a></li>
        <li><a href="#" className="hover:text-[#a3b18a] hover:underline decoration-4 transition-colors">Inventory</a></li>
        <li><a href="#" className="hover:text-[#a3b18a] hover:underline decoration-4 transition-colors">Save</a></li>
      </ul>
    </nav>
  )
}

function ShadowEffects() {
  return (
    <div className="bg-gradient-to-r from-[#d28c4b] to-[#8b5a2b] border-4 border-[#4a3b32] p-6 text-white 
                    shadow-[6px_6px_0px_0px_#4a3b32] hover:-translate-y-2 hover:-translate-x-2 
                    hover:shadow-[12px_12px_0px_0px_#2b221d] transition-all cursor-pointer">
      <h3 className="text-2xl font-black uppercase tracking-widest drop-shadow-[2px_2px_0px_#4a3b32]">
        ⭐ Special Item
      </h3>
      <p className="mt-2 font-semibold drop-shadow-[1px_1px_0px_#4a3b32]">
        Hover untuk melihat efek kartu melayang layaknya item legendaris.
      </p>
    </div>
  )
}