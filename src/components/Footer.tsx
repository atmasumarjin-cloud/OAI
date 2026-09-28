import React from 'react';
import { LogoOlimpiade, LogoYayasan } from './Logos';
import { APP_CONFIG } from '../../appConfig.js';
import { Phone, Mail, MapPin, MessageCircle, Instagram, Youtube, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenPortal: () => void;
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  onOpenPortal,
  onOpenRegister
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Col 1: Brand & Supported By */}
          <div className="lg:col-span-4 space-y-4">
            <LogoOlimpiade className="h-14" variant="light" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {APP_CONFIG.description}
            </p>

            {/* Official Partner Badge */}
            <div className="pt-2 flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl max-w-sm">
              <LogoYayasan className="h-10 w-10" />
              <div>
                <p className="text-[10px] text-amber-400 uppercase font-semibold">Penyelenggara Resmi & Didukung Oleh:</p>
                <p className="text-xs font-bold text-white">{APP_CONFIG.supportedBy}</p>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Navigasi Utama</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenRegister} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Pendaftaran Mandiri
                </button>
              </li>
              <li>
                <button onClick={onOpenPortal} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Dashboard Peserta / Try Out
                </button>
              </li>
              <li>
                <a href="#kategori" className="hover:text-amber-400 transition-colors">
                  Kategori Jenjang
                </a>
              </li>
              <li>
                <a href="#alur" className="hover:text-amber-400 transition-colors">
                  Alur Pelaksanaan Ujian
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  FAQ & Tanya Jawab
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Pembayaran Rekening BCA */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Rekening Resmi Final</h4>
            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
              <p className="text-[11px] text-slate-400">Bank Central Asia (BCA):</p>
              <p className="font-mono text-amber-400 font-bold text-sm tracking-wider">
                {APP_CONFIG.payment.accountNumber}
              </p>
              <p className="text-[11px] font-semibold text-white">
                a.n. {APP_CONFIG.payment.accountHolder}
              </p>
              <p className="text-[10px] text-slate-400 pt-1">
                Biaya Tiket Final Promo: <span className="text-emerald-400 font-bold">Rp 99.000</span>
              </p>
            </div>
          </div>

          {/* Col 4: Kontak & Bantuan */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Layanan Panitia</h4>
            <div className="space-y-2 text-slate-300">
              <a
                href={`https://wa.me/${APP_CONFIG.contact.whatsapp}?text=Halo%20Admin%20Olimpiade%20Anak%20Indonesia`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>WhatsApp: {APP_CONFIG.contact.whatsappFormatted}</span>
              </a>

              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{APP_CONFIG.contact.email}</span>
              </div>

              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{APP_CONFIG.contact.address}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="text-[11px] text-slate-400 hover:text-amber-300 flex items-center gap-1 font-mono transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Akses Login Panitia Pusat</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 {APP_CONFIG.brandName}. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
          <p>
            Platform Resmi Terakreditasi • Didukung oleh <span className="text-slate-300 font-semibold">{APP_CONFIG.supportedBy}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
