import React, { useState } from 'react';
import { LogoOlimpiade, LogoYayasan } from './Logos';
import { APP_CONFIG } from '../../appConfig.js';
import { Menu, X, UserCheck, ShieldCheck, MessageCircle, Award, Sparkles } from 'lucide-react';
import { Participant } from '../services/apiClient';

interface NavbarProps {
  activeStudent: Participant | null;
  onOpenRegister: () => void;
  onOpenPortal: () => void;
  onOpenAdmin: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeStudent,
  onOpenRegister,
  onOpenPortal,
  onOpenAdmin,
  onNavigateSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro-bar: Supported By and Contact */}
      <div className="bg-[#0F172A] text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-medium text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              Didukung Resmi oleh
            </span>
            <span className="font-semibold tracking-wide text-white underline decoration-amber-400 decoration-1 underline-offset-2">
              {APP_CONFIG.supportedBy}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-slate-300">
            <a
              href={`https://wa.me/${APP_CONFIG.contact.whatsapp}?text=Halo%20Admin%20OAI%2C%20saya%20ingin%20bertanya%20tentang%20Olimpiade%20Anak%20Indonesia`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>WA Admin: {APP_CONFIG.contact.whatsappFormatted}</span>
            </a>
            <button
              onClick={onOpenAdmin}
              className="text-amber-300 hover:text-white transition-colors flex items-center gap-1.5 font-bold text-xs bg-amber-500/20 hover:bg-amber-500/30 px-2.5 py-0.5 rounded-full border border-amber-400/40 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Login Admin / Panitia</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('beranda')}
          className="cursor-pointer flex items-center gap-3 py-1 group"
        >
          <LogoOlimpiade className="h-14 md:h-16" />
          <div className="hidden lg:flex items-center border-l border-slate-200 pl-3 ml-1">
            <LogoYayasan className="h-10 w-10" />
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-700">
          <button
            onClick={() => handleNavClick('beranda')}
            className="hover:text-amber-600 transition-colors cursor-pointer"
          >
            Beranda
          </button>
          <button
            onClick={() => handleNavClick('kategori')}
            className="hover:text-amber-600 transition-colors cursor-pointer"
          >
            Kategori & Mapel
          </button>
          <button
            onClick={() => handleNavClick('alur')}
            className="hover:text-amber-600 transition-colors cursor-pointer"
          >
            Alur Kompetisi
          </button>
          <button
            onClick={() => handleNavClick('tiket')}
            className="hover:text-amber-600 transition-colors cursor-pointer flex items-center gap-1"
          >
            <span className="text-amber-600">Tiket Final</span>
            <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded-full">
              Promo 99k
            </span>
          </button>
          <button
            onClick={() => handleNavClick('faq')}
            className="hover:text-amber-600 transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {activeStudent ? (
            <button
              onClick={onOpenPortal}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-emerald-300" />
              <span>Dashboard {activeStudent.studentName.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              onClick={onOpenPortal}
              className="flex items-center gap-1.5 bg-blue-950 hover:bg-blue-900 text-blue-100 font-bold text-xs py-2.5 px-3.5 rounded-xl border border-blue-700/70 shadow-xs transition-all cursor-pointer hover:border-amber-400 hover:text-white"
            >
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>Login Akses Dashboard Peserta</span>
            </button>
          )}

          <button
            onClick={onOpenRegister}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-md shadow-amber-500/20 hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Award className="w-4 h-4" />
            <span>Daftar Peserta</span>
          </button>

          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-black text-xs py-2.5 px-3.5 rounded-xl border border-amber-400/40 shadow-xs transition-all cursor-pointer hover:border-amber-400"
            title="Akses Portal Panitia & Administrator"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Login Admin</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          {activeStudent && (
            <button
              onClick={onOpenPortal}
              className="bg-blue-600 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Portal</span>
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-lg focus:outline-hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-5 pt-3 pb-6 shadow-xl animate-fadeIn">
          <div className="flex items-center justify-between p-3 bg-blue-50/70 rounded-xl mb-4 border border-blue-100">
            <div className="flex items-center gap-2.5">
              <LogoYayasan className="h-8 w-8" />
              <div>
                <p className="text-[11px] font-semibold text-slate-800">{APP_CONFIG.supportedBy}</p>
                <p className="text-[10px] text-blue-700">Official Partner Nasional</p>
              </div>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 bg-white px-2 py-1 rounded-md border border-slate-200"
            >
              Panitia
            </button>
          </div>

          <div className="flex flex-col space-y-3 font-semibold text-slate-700 text-sm">
            <button
              onClick={() => handleNavClick('beranda')}
              className="text-left py-2 border-b border-slate-100 hover:text-amber-600"
            >
              Beranda
            </button>
            <button
              onClick={() => handleNavClick('kategori')}
              className="text-left py-2 border-b border-slate-100 hover:text-amber-600"
            >
              Kategori & Mata Pelajaran
            </button>
            <button
              onClick={() => handleNavClick('alur')}
              className="text-left py-2 border-b border-slate-100 hover:text-amber-600"
            >
              Alur Lengkap Kompetisi
            </button>
            <button
              onClick={() => handleNavClick('tiket')}
              className="text-left py-2 border-b border-slate-100 flex items-center justify-between text-amber-700"
            >
              <span>Tiket Babak Final BCA</span>
              <span className="text-[11px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
                Rp 99.000
              </span>
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className="text-left py-2 border-b border-slate-100 hover:text-amber-600"
            >
              FAQ (Tanya Jawab)
            </button>
          </div>

          <div className="mt-5 pt-3 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full text-center bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3 rounded-xl shadow-md text-sm"
            >
              Daftar Peserta Sekarang
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-blue-950 hover:bg-blue-900 text-white font-bold py-3 rounded-xl border border-blue-700 text-sm cursor-pointer shadow-sm"
            >
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>{activeStudent ? `Masuk Dashboard (${activeStudent.studentName.split(' ')[0]})` : 'Login Akses Dashboard Peserta'}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold py-2.5 rounded-xl border border-amber-400/40 text-sm cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Login Panel Admin / Panitia</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
