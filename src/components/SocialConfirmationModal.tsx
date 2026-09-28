import React, { useState } from 'react';
import { APP_CONFIG } from '../../appConfig.js';
import { LogoOlimpiade, LogoYayasan } from './Logos';
import { MessageCircle, Instagram, Youtube, CheckCircle2, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';
import { Participant, ApiService } from '../services/apiClient';

interface SocialConfirmationModalProps {
  student: Participant;
  onProceedToSimulation: () => void;
  onClose: () => void;
}

export const SocialConfirmationModal: React.FC<SocialConfirmationModalProps> = ({
  student,
  onProceedToSimulation,
  onClose
}) => {
  const [waConfirmed, setWaConfirmed] = useState(false);
  const [igFollowed, setIgFollowed] = useState(false);
  const [ttFollowed, setTtFollowed] = useState(false);
  const [ytFollowed, setYtFollowed] = useState(false);

  // Template WA Admin
  const waText = encodeURIComponent(
    `Halo Admin ${APP_CONFIG.brandName} (Didukung oleh ${APP_CONFIG.supportedBy}),\n\nSaya telah mendaftarkan ananda secara mandiri:\n- ID Peserta: ${student.id}\n- Nama Siswa: ${student.studentName}\n- Asal Sekolah: ${student.schoolName}\n- Jenjang: ${student.category}\n- Mata Pelajaran: ${student.subject}\n\nSaya telah memfollow sosial media resmi. Mohon izin untuk memulai Simulasi Ujian Online. Terima kasih!`
  );
  const waUrl = `https://wa.me/${APP_CONFIG.contact.whatsapp}?text=${waText}`;

  const allFollowed = waConfirmed && (igFollowed || ttFollowed || ytFollowed);

  const handleFinish = async () => {
    try {
      await ApiService.updateParticipant(student.id, { hasFollowedSosmed: true });
    } catch (e) {
      console.warn('Failed to record follow', e);
    }
    onProceedToSimulation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header Top Accent */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 p-6 text-white text-center relative">
          <div className="flex justify-center mb-3">
            <LogoOlimpiade className="h-14" variant="light" />
          </div>
          <h3 className="text-xl font-extrabold tracking-tight">Konfirmasi Pendaftaran Sukses!</h3>
          <p className="text-xs text-blue-200 mt-1">
            Langkah Terakhir Sebelum Membuka Akses Ruang Simulasi Ujian
          </p>

          <div className="mt-3 inline-block bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold px-3 py-1 rounded-full">
            ID PESERTA: {student.id}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Identity Summary Box */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Nama Siswa:</span>
              <span className="text-slate-800 font-bold">{student.studentName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Jenjang & Mapel:</span>
              <span className="text-blue-700 font-bold">{student.category} • {student.subject}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Sekolah:</span>
              <span className="text-slate-700">{student.schoolName}</span>
            </div>
          </div>

          {/* STEP 1: Konfirmasi WA Admin */}
          <div className="border border-emerald-200 bg-emerald-50/50 p-4 rounded-2xl">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-md">
                1
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800">
                  Wajib Konfirmasi WhatsApp Admin
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Klik tombol di bawah untuk mengirim data ananda langsung ke WhatsApp admin panitia:
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setWaConfirmed(true)}
                  className="mt-2.5 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3.5 rounded-xl shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Kirim WhatsApp ke Admin ({APP_CONFIG.contact.whatsappFormatted})</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>

          {/* STEP 2: Follow Sosmed OSN */}
          <div className="border border-blue-200 bg-blue-50/50 p-4 rounded-2xl">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm shadow-md">
                2
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800">
                  Wajib Follow Akun Media Sosial Resmi
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Ikuti informasi pengumuman, silabus, dan jadwal update melalui akun resmi:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2.5">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIgFollowed(true)}
                    className="flex items-center justify-between bg-white border border-slate-200 hover:border-pink-500 p-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-pink-600 transition-all shadow-xs"
                  >
                    <span className="flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-pink-600" />
                      <span>Instagram Resmi</span>
                    </span>
                    {igFollowed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </a>

                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setYtFollowed(true)}
                    className="flex items-center justify-between bg-white border border-slate-200 hover:border-red-500 p-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-red-600 transition-all shadow-xs"
                  >
                    <span className="flex items-center gap-2">
                      <Youtube className="w-4 h-4 text-red-600" />
                      <span>YouTube Channel</span>
                    </span>
                    {ytFollowed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Checklist Verification */}
          <div className="pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 select-none">
              <input
                type="checkbox"
                checked={waConfirmed}
                onChange={e => setWaConfirmed(e.target.checked)}
                className="w-4 h-4 rounded-sm text-amber-600 focus:ring-amber-500 border-slate-300"
              />
              <span>Saya sudah melakukan konfirmasi via WhatsApp admin</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-700 select-none mt-2">
              <input
                type="checkbox"
                checked={igFollowed || ttFollowed || ytFollowed}
                onChange={e => {
                  setIgFollowed(e.target.checked);
                  setTtFollowed(e.target.checked);
                  setYtFollowed(e.target.checked);
                }}
                className="w-4 h-4 rounded-sm text-amber-600 focus:ring-amber-500 border-slate-300"
              />
              <span>Saya sudah mengikuti media sosial resmi Olimpiade Anak Indonesia</span>
            </label>
          </div>

          {/* Action Button: Buka Simulasi */}
          <div className="pt-2">
            <button
              onClick={handleFinish}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl font-extrabold text-sm transition-all shadow-lg cursor-pointer ${
                allFollowed
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-amber-500/25'
                  : 'bg-slate-800 hover:bg-slate-900 text-white'
              }`}
            >
              <span>BUKA RUANG SIMULASI UJIAN (TRY OUT)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              Didukung oleh {APP_CONFIG.supportedBy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
