import frameworkData from "./framework.json";
import { useState } from "react";
export default function FrameworkListSearchFilter() {
    /** Deklrasai state **/
    // const [searchTerm, setSearchTerm] = useState("");
    // const [selectedTag, setSelectedTag] = useState("");
    // =========================YNG BARU=================================
    /*Inisialisasi DataForm*/
		const [dataForm, setDataForm] = useState({
			searchTerm: "",
			selectedTag: "",
			/*Tambah state lain beserta default value*/
			});
		
		/*Inisialisasi Handle perubahan nilai input form*/
		const handleChange = (evt) => {
			const { name, value } = evt.target;
			setDataForm({
				...dataForm,
				[name]: value,
			});
		};
    
    /** Deklrasai Logic Search & Filter **/
    const _searchTerm = dataForm.searchTerm.toLowerCase();
    const filteredFrameworks = frameworkData.filter((framework) => {
        const matchesSearch =
            framework.name
                .toLowerCase()
                .includes(_searchTerm) ||
            framework.description
                .toLowerCase()
                .includes(_searchTerm) ||
            framework.details.developer
                .toLowerCase()
                .includes(_searchTerm) ||
            framework.details.releaseYear
                .toString()
                .includes(_searchTerm);

        const matchesTag = dataForm.selectedTag ? framework.tags.includes(dataForm.selectedTag) : true;

        return matchesSearch && matchesTag;
    });

    const allTags = [
        ...new Set(frameworkData.flatMap((framework) => framework.tags)),
    ];

    return (
        <div className="p-8 min-h-screen bg-slate-950 font-mono text-cyan-50 selection:bg-fuchsia-500 selection:text-white">
            <input
                type="text"
                name="searchTerm"
                onChange={handleChange}
                placeholder="> Search framework_..."
                className="w-full p-3 mb-4 bg-slate-900/80 border border-cyan-900 border-l-4 border-l-cyan-500 text-cyan-300 font-mono text-sm placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:border-l-fuchsia-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all rounded-sm"
            />

            <select
                name="selectedTag"
                onChange={handleChange}
                className="w-full p-3 mb-8 bg-slate-900/80 border border-cyan-900 border-l-4 border-l-fuchsia-500 text-cyan-300 font-mono text-sm focus:outline-none focus:border-fuchsia-400 focus:border-l-cyan-500 focus:shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all rounded-sm cursor-pointer"
            >
                <option value="" className="bg-slate-950 text-cyan-500 font-bold uppercase"> All Tags</option>
                {allTags.map((tag, index) => (
                    <option key={index} value={tag} className="bg-slate-900 text-cyan-300 uppercase">
                        {tag}
                    </option>
                ))}
            </select>
            {/* Grid Layout untuk menyusunnya menjadi bentuk Card responsif */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {filteredFrameworks.map((item,index) => (
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