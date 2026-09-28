import React from 'react';
import { LogoOlimpiade, LogoYayasan } from './Logos';
import { APP_CONFIG } from '../../appConfig.js';
import { Participant } from '../services/apiClient';
import { X, Printer, Download, Award, ShieldCheck, Sparkles } from 'lucide-react';

interface CertificateModalProps {
  student: Participant;
  examType: 'simulasi' | 'penyisihan' | 'final';
  subject?: string;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  student,
  examType,
  subject,
  onClose
}) => {
  const activeSubject = subject || (student.subjects && student.subjects.length > 0 ? student.subjects[0] : student.subject);
  const certNumber = `OAI-CERT/2026/${student.category.replace(/\s+/g, '')}/${student.id.replace('OAI-', '')}`;
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const getPredicate = () => {
    const subScores = student.subjectScores?.[activeSubject];
    const score = examType === 'final'
      ? (subScores?.finalScore ?? student.finalScore)
      : (subScores?.penyisihanScore ?? student.penyisihanScore ?? student.simulationScore ?? 85);
    if (score && score >= 90) return 'PREDIKAT SANGAT MEMUASKAN (MEDALI EMAS)';
    if (score && score >= 80) return 'PREDIKAT MEMUASKAN (MEDALI PERAK)';
    return 'PREDIKAT BAIK (PESERTA CILIK BERPRESTASI)';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Top Control Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-bold">E-Sertifikat Penghargaan Resmi Nasional</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold py-2 px-3.5 rounded-xl transition-all cursor-pointer shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas Container */}
        <div className="p-4 sm:p-8 bg-slate-100 flex justify-center overflow-x-auto">
          <div
            id="printable-certificate"
            className="w-[800px] min-w-[750px] bg-[#FCFBF8] text-slate-900 p-8 sm:p-12 relative border-[14px] border-double border-[#D4AF37] shadow-xl rounded-md"
            style={{
              backgroundImage: 'radial-gradient(circle at center, #FFFFFF 0%, #FAF6EE 100%)'
            }}
          >
            {/* Watermark Logo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
              <LogoYayasan className="w-96 h-96" />
            </div>

            {/* Corner Decorative Ornaments */}
            <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-[#D4AF37]" />
            <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-[#D4AF37]" />

            {/* Header: Logos & Organization */}
            <div className="flex items-center justify-between border-b-2 border-[#D4AF37]/40 pb-5 mb-6">
              <div className="flex items-center gap-3">
                <LogoOlimpiade className="h-16 w-auto" />
              </div>

              <div className="text-right">
                <div className="flex items-center justify-end gap-2.5">
                  <LogoYayasan className="h-14 w-14" />
                  <div className="text-left">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Didukung Resmi Oleh:</p>
                    <p className="text-xs font-black text-blue-900 tracking-wide">{APP_CONFIG.supportedBy}</p>
                    <p className="text-[9px] text-slate-500">Legalitas Keputusan Kemenkumham RI</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="text-center my-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#B45309] block mb-1">
                PIAGAM PENGHARGAAN RESMI NASIONAL
              </span>
              <h1 className="text-3xl font-black tracking-wide text-slate-900 font-serif" style={{ fontFamily: 'Georgia, serif' }}>
                SERTIFIKAT PRESTASI
              </h1>
              <p className="text-xs font-mono text-slate-500 mt-1">
                No. Registrasi: {certNumber}
              </p>
            </div>

            {/* Body Text */}
            <div className="text-center my-6 space-y-3">
              <p className="text-xs text-slate-600 italic">
                Dengan penuh rasa bangga dan apresiasi tertinggi, piagam ini dianugerahkan kepada:
              </p>

              <div className="py-2">
                <h2 className="text-2xl sm:text-3xl font-black text-[#0F2942] tracking-wide uppercase border-b-2 border-slate-300 inline-block px-8 pb-1">
                  {student.studentName}
                </h2>
                <p className="text-xs text-slate-600 mt-1.5 font-medium">
                  Asal Sekolah: <span className="font-bold text-slate-800">{student.schoolName}</span> ({student.city}, {student.province})
                </p>
              </div>

              <p className="text-xs text-slate-700 max-w-xl mx-auto leading-relaxed pt-2">
                Atas keberhasilan, integritas, dan dedikasi luar biasa dalam menyelesaikan seluruh rangkaian ujian
                <strong className="text-slate-900"> {APP_CONFIG.brandName}</strong> pada mata pelajaran
                <span className="font-bold text-blue-900"> {activeSubject}</span> ({student.category}) dengan:
              </p>

              <div className="inline-block bg-amber-50 border border-amber-300 text-amber-900 font-extrabold text-xs px-5 py-2 rounded-lg shadow-xs my-2 tracking-wide">
                {getPredicate()}
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="grid grid-cols-3 items-end pt-6 mt-6 border-t border-slate-200 text-center text-xs">
              {/* Left Signature */}
              <div className="flex flex-col items-center">
                <p className="text-[11px] text-slate-500">Jakarta, {currentDate}</p>
                <p className="font-semibold text-slate-700 text-[11px]">Ketua Panitia Pelaksana</p>
                <div className="h-14 flex items-center justify-center my-1">
                  <span className="font-serif italic text-lg text-blue-950 font-bold tracking-wider">
                    Prof. Dr. H. Mulyadi
                  </span>
                </div>
                <p className="font-bold text-slate-900 text-xs border-t border-slate-400 pt-1 px-4">
                  Prof. Dr. H. Mulyadi, M.Sc.
                </p>
              </div>

              {/* Center Seal */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full border-4 border-double border-amber-600 flex items-center justify-center p-1 bg-amber-50/50 shadow-inner">
                  <div className="text-center">
                    <Sparkles className="w-5 h-5 text-amber-600 mx-auto" />
                    <p className="text-[8px] font-black uppercase text-amber-800 tracking-tighter">
                      OAI VERIFIED
                    </p>
                    <p className="text-[7px] text-amber-700 font-mono">100% RESMI</p>
                  </div>
                </div>
              </div>

              {/* Right Signature */}
              <div className="flex flex-col items-center">
                <p className="text-[11px] text-slate-500">Mengetahui & Mengesahkan,</p>
                <p className="font-semibold text-slate-700 text-[11px]">Ketua Yayasan Besarrasa Bagi Bangsa</p>
                <div className="h-14 flex items-center justify-center my-1">
                  <span className="font-serif italic text-lg text-blue-950 font-bold tracking-wider">
                    Sri Prihatiningsih
                  </span>
                </div>
                <p className="font-bold text-slate-900 text-xs border-t border-slate-400 pt-1 px-4">
                  Sri Prihatiningsih, S.H.
                </p>
              </div>
            </div>

            {/* Bottom Verification Text */}
            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dokumen Sah Diterbitkan Berbasis Sistem Komputerisasi Terintegrasi</span>
              </div>
              <span>Verifikasi: oai.id/cert/{student.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
