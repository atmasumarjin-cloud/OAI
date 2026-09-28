import React from 'react';
import { APP_CONFIG } from '../../appConfig.js';
import { LogoYayasan, ImageWithFallback } from './Logos';
import { Award, ArrowRight, BookOpen, CheckCircle2, Shield, Calendar, Users, Star, UserCheck } from 'lucide-react';
import { SystemSettings } from '../services/apiClient';

interface HeroSectionProps {
  settings: SystemSettings | null;
  onOpenRegister: () => void;
  onOpenSimulation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  settings,
  onOpenRegister,
  onOpenSimulation
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#0F1E36] to-[#0A1120] text-white pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Decorative Gold & Navy Ambient Lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Support Partner Badge */}
        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs text-slate-200 mb-6 shadow-md hover:bg-white/15 transition-all">
          <LogoYayasan className="h-6 w-6" />
          <span className="text-slate-300 font-medium">Didukung Penuh oleh</span>
          <span className="font-bold text-amber-300 tracking-wide">{APP_CONFIG.supportedBy}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 mb-4">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>Olimpiade Ramah Anak: Pra-TK, TK A & B, serta SD se-Indonesia</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white mb-5">
              Panggung Ceria Prestasi <br />
              <span className="gold-gradient-text">Anak Usia Dini & Siswa Hebat</span> <br />
              Dari Seluruh Nusantara
            </h1>

            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mb-7 max-w-2xl font-normal">
              Ajang kompetisi akademik & sains cilik online ramah anak terlengkap di Indonesia. Dirancang khusus untuk usia emas (PAUD, TK A & B, serta SD) dengan soal interaktif, penuh warna, tebak gambar, dan format belajar-sambil-bermain yang seru dan menginspirasi.
            </p>

            {/* Key Value Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mb-8 text-xs text-slate-200">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Format Soal Ceria & Gambar</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl">
                <Shield className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Pendaftaran Multi-Mapel</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl col-span-2 sm:col-span-1">
                <Award className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>E-Sertifikat Prestasi Resmi</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={onOpenRegister}
                className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 font-extrabold text-sm md:text-base py-3.5 px-7 rounded-xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>DAFTAR SEKARANG (GRATIS)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSimulation}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm md:text-base py-3.5 px-6 rounded-xl border border-white/20 hover:border-amber-400/50 transition-all cursor-pointer shadow-md"
              >
                <UserCheck className="w-5 h-5 text-amber-400" />
                <span>Login Akses Dashboard Peserta</span>
              </button>
            </div>

            {/* Date Reminder Ticker */}
            <div className="mt-8 pt-5 border-t border-white/10 w-full flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-amber-300 font-medium">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Pelaksanaan Babak Penyisihan:</span>
              </div>
              <span className="font-bold text-white bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                {settings?.dates?.penyisihanDate || '18 Oktober 2026'}
              </span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="text-slate-300">
                Pengumuman Lolos H+2: {settings?.dates?.pengumumanPenyisihanDate || '20 Oktober 2026'}
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset & Floating Badges */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Gold Border Framing */}
              <div className="relative p-2 bg-gradient-to-tr from-amber-500/30 via-slate-700/50 to-blue-500/30 rounded-3xl backdrop-blur-md shadow-2xl">
                <div className="overflow-hidden rounded-2xl relative aspect-[4/3] bg-slate-800">
                  <ImageWithFallback
                    src={APP_CONFIG.heroImage}
                    alt="Olimpiade Anak Indonesia Semangat Belajar Siswa Berprestasi"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    fallbackSrc="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop"
                    loading="eager"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-semibold text-amber-300 uppercase tracking-wider">🧸 Belajar & Bermain Ceria</p>
                    <p className="text-sm font-bold">Terbuka Untuk PAUD, TK A & B, serta SD se-Indonesia</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: 100% Mandiri & Transparan */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white text-slate-900 px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Sertifikat Digital</p>
                  <p className="text-xs font-black text-slate-800">Unduh Mandiri</p>
                </div>
              </div>

              {/* Floating Badge 2: Promo Tiket Final */}
              <div className="absolute -bottom-5 -left-2 sm:-left-4 bg-gradient-to-r from-red-600 to-rose-700 text-white px-4 py-3 rounded-2xl shadow-2xl border border-red-400/30 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-red-100 font-medium">BCA Tiket Final Promo</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs line-through opacity-70">Rp 180rb</span>
                    <span className="text-sm font-black text-amber-300">Rp 99.000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
