import React from "react";
import { Link } from "react-router-dom"; // Pastikan menggunakan react-router untuk navigasi

export default function NotFound() {
  return (
    <div className=" flex flex-col items-center justify-center p-44 text-center">
      {/* Container Gambar/Ikon 404 */}
      <div className="relative mb-8">
        {/* Tali Penggantung */}
        <div className="w-1 h-16 bg-gray-800 mx-auto rounded-full"></div>
        
        {/* Papan 404 */}
        <div className="bg-white border-4 border-gray-800 px-12 py-6 rounded-lg shadow-[8px_8px_0px_rgba(0,0,0,0.1)] relative transform -rotate-2">
           {/* Paku/Titik Putih */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full z-10"></div>
          
          <h1 className="text-8xl font-poppins font-bold text-gray-800 tracking-tighter">
            404
          </h1>
        </div>
      </div>

      {/* Teks Deskripsi */}
      <div className="max-w-md">
        <h2 className="text-3xl font-poppins text-black mb-4">
          Waduh! Halaman Hilang
        </h2>
        <p className="text-latar opacity-90 font-barlow mb-8 leading-relaxed">
          Maaf, halaman yang kamu cari tidak dapat ditemukan atau telah dipindahkan ke dimensi lain.
        </p>

        {/* Tombol Kembali */}
        <Link
          to="/"
          className="inline-block bg-hijau text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-hijau transition-all duration-300 transform hover:scale-105"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}