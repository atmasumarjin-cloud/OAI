import React, { useState, useEffect } from 'react';
import { LogoOlimpiade, LogoYayasan } from './Logos';
import { APP_CONFIG } from '../../appConfig.js';
import { Participant, ApiService, SystemSettings } from '../services/apiClient';
import {
  User, CheckCircle2, PlayCircle, Award, CreditCard,
  MessageCircle, ExternalLink, ArrowRight, ShieldCheck,
  AlertCircle, Sparkles, Copy, Check, BookOpen, Layers,
  Calculator, Atom, Globe
} from 'lucide-react';

interface StudentPortalProps {
  student: Participant | null;
  settings: SystemSettings | null;
  onSelectStudent: (student: Participant) => void;
  onStartExam: (type: 'simulasi' | 'penyisihan' | 'final', subject?: string) => void;
  onViewCertificate: (type: 'simulasi' | 'penyisihan' | 'final', subject?: string) => void;
  onLogout: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  student,
  settings,
  onSelectStudent,
  onStartExam,
  onViewCertificate,
  onLogout
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  const [searching, setSearching] = useState(false);
  const [copiedBca, setCopiedBca] = useState(false);
  const [registeredList, setRegisteredList] = useState<Participant[]>([]);

  // Enrolled subjects calculation (Multi-Mapel support)
  const enrolledSubjects = student
    ? (student.subjects && student.subjects.length > 0
        ? student.subjects
        : (student.subject ? student.subject.split(',').map(s => s.trim()) : ['Matematika']))
    : [];

  const [activeSubjectTab, setActiveSubjectTab] = useState<string>('Matematika');

  useEffect(() => {
    // Load synchronized database participants on mount
    const fetchRegistered = async () => {
      try {
        const list = await ApiService.getParticipants();
        setRegisteredList(list);
      } catch (e) {
        console.error('Failed to load registered participants', e);
      }
    };
    fetchRegistered();
  }, []);

  useEffect(() => {
    if (enrolledSubjects.length > 0 && !enrolledSubjects.includes(activeSubjectTab)) {
      setActiveSubjectTab(enrolledSubjects[0]);
    }
  }, [student]);

  const handleSearchStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchError('Masukkan ID Peserta, Nama Siswa, atau Nomor WhatsApp terdaftar');
      return;
    }
    setSearching(true);
    setSearchError('');
    try {
      const list = await ApiService.getParticipants();
      setRegisteredList(list);
      const rawInput = searchQuery.trim().toLowerCase();
      const cleanDigits = rawInput.replace(/\D/g, '');
      const normalizedDigits = cleanDigits.replace(/^62/, '').replace(/^0+/, '');

      const found = list.find(p => {
        // 1. Match ID exactly or substring (e.g., OAI-2026-001 or 001)
        if (p.id.toLowerCase() === rawInput || p.id.toLowerCase().includes(rawInput)) return true;
        // 2. Match Student Name
        if (p.studentName.toLowerCase().includes(rawInput)) return true;
        // 3. Match WhatsApp Phone Number (robust prefix matching)
        if (normalizedDigits.length >= 4) {
          const pDigits = p.whatsapp.replace(/\D/g, '').replace(/^62/, '').replace(/^0+/, '');
          if (pDigits === normalizedDigits || pDigits.endsWith(normalizedDigits) || normalizedDigits.endsWith(pDigits)) {
            return true;
          }
        }
        return false;
      });

      if (found) {
        onSelectStudent(found);
      } else {
        setSearchError('Data peserta tidak ditemukan di database. Pastikan Anda telah mengisi formulir pendaftaran atau cek daftar di bawah.');
      }
    } catch (err) {
      setSearchError('Terjadi kesalahan saat memuat data database');
    } finally {
      setSearching(false);
    }
  };

  const copyBcaNumber = () => {
    navigator.clipboard.writeText(APP_CONFIG.payment.accountNumberClean);
    setCopiedBca(true);
    setTimeout(() => setCopiedBca(false), 2000);
  };

  // If student is not selected, show Student Lookup Form
  if (!student) {
    return (
      <section className="py-12 md:py-20 bg-slate-900 text-white min-h-[75vh] flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
          <div className="text-center">
            <LogoOlimpiade className="h-16 mx-auto mb-2" variant="light" layout="vertical" />
            <h2 className="text-xl font-black text-white mt-2">Login Akses Dashboard Peserta</h2>
            <p className="text-xs text-slate-300 mt-1.5">
              Portal Mandiri Siswa & Wali Murid tersinkronisasi langsung dengan Database Resmi {APP_CONFIG.brandName}.
            </p>
          </div>

          <form onSubmit={handleSearchStudent} className="space-y-4">
            {searchError && (
              <div className="p-3.5 rounded-xl bg-red-900/50 border border-red-700 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{searchError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Masukkan ID Peserta / Nomor WhatsApp / Nama Siswa
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Contoh: OAI-2026-001 atau 081234567801 atau Rayhan"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-400 text-white text-sm outline-hidden font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Pencarian fleksibel: dapat menggunakan nomor WA (08.. / 62..), ID peserta, atau nama siswa.
              </p>
            </div>

            <button
              type="submit"
              disabled={searching}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 font-black py-3.5 px-4 rounded-xl shadow-lg transition-all cursor-pointer text-sm"
            >
              <User className="w-4 h-4" />
              <span>{searching ? 'Memverifikasi Data Peserta...' : 'MASUK KE DASHBOARD PESERTA'}</span>
            </button>
          </form>

          {/* Quick-Select from Database */}
          {registeredList.length > 0 && (
            <div className="pt-4 border-t border-slate-700/70">
              <p className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Pilih Cepat Peserta dari Database Terdaftar:</span>
              </p>
              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                {registeredList.slice(0, 6).map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onSelectStudent(p)}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-700/80 border border-slate-700 text-left transition-all cursor-pointer group"
                  >
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-amber-300">
                        {p.studentName}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {p.schoolName} • {p.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[10px] text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                        {p.id}
                      </span>
                      <span className="block text-[9px] text-emerald-400 font-semibold mt-0.5">
                        {p.penyisihanCompleted ? `Penyisihan: ${p.penyisihanScore}` : 'Terdaftar'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-slate-700/60 text-center">
            <p className="text-xs text-slate-400">Belum mendaftarkan ananda?</p>
            <a
              href="#pendaftaran"
              className="text-xs font-bold text-amber-400 hover:underline mt-1 inline-block"
            >
              Isi Formulir Pendaftaran Sekarang (Gratis)
            </a>
          </div>
        </div>
      </section>
    );
  }

  // Pre-filled WhatsApp message for Final Ticket Payment Confirmation
  const confirmPaymentWaUrl = `https://wa.me/${APP_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
    `Halo Admin ${APP_CONFIG.brandName},\n\nSaya ingin konfirmasi pembayaran TIKET BABAK FINAL PROMO Rp 99.000:\n- ID Peserta: ${student.id}\n- Nama Anak: ${student.studentName}\n- Asal Sekolah: ${student.schoolName}\n- Jenjang: ${student.category}\n- Pilihan Mapel: ${student.subject}\n\nTransfer ke Rekening BCA 3843-136-911 a.n. SRI PRIHATININGSIH SH. Berikut saya lampirkan bukti transfer. Mohon verifikasi akses babak final. Terima kasih!`
  )}`;

  const isFinalQualified = student.isQualifiedFinal === 'Lolos';
  const hasPaidFinal = student.finalTicketPaid;

  // Active Subject specific scores
  const subScoreInfo = student.subjectScores?.[activeSubjectTab];
  const simCompleted = subScoreInfo?.simulationCompleted ?? student.simulationCompleted;
  const simScore = subScoreInfo?.simulationScore ?? student.simulationScore;
  const penCompleted = subScoreInfo?.penyisihanCompleted ?? student.penyisihanCompleted;
  const penScore = subScoreInfo?.penyisihanScore ?? student.penyisihanScore;
  const finCompleted = subScoreInfo?.finalCompleted ?? student.finalCompleted;
  const finScore = subScoreInfo?.finalScore ?? student.finalScore;

  return (
    <section className="py-10 md:py-16 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-[#0F1E36] via-[#1E293B] to-[#0A1120] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-mono font-bold bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                  {student.id}
                </span>
                <span className="text-xs text-blue-300 font-semibold">
                  Dashboard Mandiri Peserta
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-400/30">
                  {enrolledSubjects.length} Mapel Terdaftar
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {student.studentName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {student.category} • {student.schoolName} ({student.city})
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onLogout}
                className="bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold py-2 px-3.5 rounded-xl border border-white/20 transition-all cursor-pointer"
              >
                Ganti Akun Siswa
              </button>
            </div>
          </div>

          {/* MULTI-MAPEL TAB SELECTOR (Poin 3) */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <p className="text-xs text-slate-300 font-semibold mb-2.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Mata Pelajaran Terdaftar (Klik untuk berganti mapel):</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {enrolledSubjects.map((subName) => {
                const isActive = activeSubjectTab === subName;
                return (
                  <button
                    key={subName}
                    onClick={() => setActiveSubjectTab(subName)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-white/50'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                    }`}
                  >
                    <span>{subName}</span>
                    {student.subjectScores?.[subName]?.penyisihanCompleted && (
                      <span className="text-[10px] bg-emerald-900/60 text-emerald-200 px-1.5 py-0.2 rounded-full">
                        ✓ Skor {student.subjectScores[subName].penyisihanScore}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ACTIVE SUBJECT BANNER */}
        <div className="bg-amber-50 border border-amber-200 px-5 py-3 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-amber-900">
            <span className="font-bold">Mata Pelajaran Aktif:</span>
            <span className="bg-amber-500 text-slate-950 font-black px-2.5 py-0.5 rounded-md text-xs">
              {activeSubjectTab}
            </span>
            <span className="text-slate-600 hidden sm:inline">| Tingkat: {student.category}</span>
          </div>
          <span className="text-[11px] text-amber-800">
            Nilai ujian & sertifikat tersimpan otomatis per mata pelajaran
          </span>
        </div>

        {/* STEP-BY-STEP PARTICIPANT PROGRESSION ROADMAP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* STEP 1: SIMULASI UJIAN TRY OUT */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Tahap 1
                </span>
                {simCompleted ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Selesai ({simScore}/100)
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    Tersedia Sekarang
                  </span>
                )}
              </div>

              <h3 className="text-lg font-black text-slate-900 mb-1">
                Simulasi Mandiri ({activeSubjectTab})
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Uji coba format CBT ramah anak 20 butir soal acak berbobot 5 poin per soal. Tanpa batas percobaan untuk membiasakan ananda dengan sistem ujian.
              </p>

              {simCompleted && (
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs mb-4">
                  <div className="flex justify-between font-semibold">
                    <span>Skor Simulasi Terakhir:</span>
                    <span className="text-emerald-700 font-bold">{simScore} / 100</span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onStartExam('simulasi', activeSubjectTab)}
              className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-2xl shadow-md transition-all cursor-pointer text-xs"
            >
              <PlayCircle className="w-4 h-4" />
              <span>{simCompleted ? `ULANGI SIMULASI (${activeSubjectTab})` : `MULAI SIMULASI (${activeSubjectTab})`}</span>
            </button>
          </div>

          {/* STEP 2: BABAK PENYISIHAN */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Tahap 2
                </span>
                {penCompleted ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Selesai ({penScore}/100)
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                    Wajib Diikuti
                  </span>
                )}
              </div>

              <h3 className="text-lg font-black text-slate-900 mb-1">
                Babak Penyisihan ({activeSubjectTab})
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Ujian resmi berdurasi 30 menit (20 butir soal acak bergambar). Nilai langsung tersinkron ke penilaian panitia untuk penentuan peserta lolos final.
              </p>

              {penCompleted ? (
                <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 text-xs mb-4">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Skor Babak Penyisihan:</span>
                    <span className="text-emerald-700 font-extrabold text-sm">{penScore} / 100</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-emerald-200/60 flex justify-between items-center text-[11px]">
                    <span>Status Kelolosan:</span>
                    <span className={`font-black uppercase px-2 py-0.5 rounded-md ${
                      isFinalQualified ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {student.isQualifiedFinal}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-[11px] text-slate-500 mb-4">
                  Jadwal Resmi: {settings?.dates?.penyisihanDate || '18 Oktober 2026'}.
                  Pengumuman Lolos H+2 ({settings?.dates?.pengumumanPenyisihanDate || '20 Oktober 2026'}).
                </div>
              )}
            </div>

            {penCompleted ? (
              <div className="space-y-2">
                <button
                  onClick={() => onViewCertificate('penyisihan', activeSubjectTab)}
                  className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer text-xs"
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>LIHAT E-SERTIFIKAT {activeSubjectTab.toUpperCase()}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => onStartExam('penyisihan', activeSubjectTab)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3 px-4 rounded-2xl shadow-md transition-all cursor-pointer text-xs"
              >
                <PlayCircle className="w-4 h-4" />
                <span>MASUK RUANG PENYISIHAN ({activeSubjectTab})</span>
              </button>
            )}
          </div>

          {/* STEP 3: BABAK FINAL & TIKET FINAL */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Tahap 3
                </span>
                {hasPaidFinal ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Tiket Final Verified
                  </span>
                ) : isFinalQualified ? (
                  <span className="text-[11px] font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full animate-pulse">
                    Promo 99k Tersedia
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    Menunggu Kelolosan
                  </span>
                )}
              </div>

              <h3 className="text-lg font-black text-slate-900 mb-1">
                Babak Final Nasional
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Penentuan Juara Nasional & Medali Emas, Perak, Perunggu berlisensi resmi didukung Yayasan Besarrasa Bagi Bangsa.
              </p>

              {finCompleted && (
                <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs mb-4">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Skor Babak Final:</span>
                    <span className="text-amber-700 font-extrabold text-sm">{finScore} / 100</span>
                  </div>
                </div>
              )}
            </div>

            {finCompleted ? (
              <button
                onClick={() => onViewCertificate('final', activeSubjectTab)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3 px-4 rounded-2xl shadow-md transition-all cursor-pointer text-xs"
              >
                <Award className="w-4 h-4" />
                <span>UNDUH E-SERTIFIKAT FINAL (RESMI)</span>
              </button>
            ) : hasPaidFinal ? (
              <button
                onClick={() => onStartExam('final', activeSubjectTab)}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-4 rounded-2xl shadow-md transition-all cursor-pointer text-xs"
              >
                <PlayCircle className="w-4 h-4" />
                <span>MULAI UJIAN FINAL ({activeSubjectTab})</span>
              </button>
            ) : (
              <a
                href="#tiket-final-box"
                className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-2xl transition-all block text-xs"
              >
                {isFinalQualified ? 'Klaim Promo Tiket Final (BCA 99rb)' : 'Syarat: Lolos Babak Penyisihan'}
              </a>
            )}
          </div>
        </div>

        {/* PAYMENT BOX TIKET BABAK FINAL PROMO BCA */}
        <div id="tiket-final-box" className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-400 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl">
            Promo Khusus 10 Peserta Pertama
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Pembelian Tiket Babak Final Mandiri</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Pemesanan Tiket Final {student.studentName}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Peserta yang lolos babak penyisihan berhak mengamankan tiket final dengan subsidi khusus yayasan.
                Transfer sesuai nominal ke rekening resmi BCA di bawah ini dan konfirmasi bukti pembayaran ke WhatsApp admin panitia:
              </p>

              {/* Price Tag with Strikethrough */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs text-slate-400">Biaya Normal:</span>
                <span className="text-sm font-semibold text-slate-400 line-through">
                  Rp 180.000
                </span>
                <span className="text-2xl sm:text-3xl font-black text-red-600">
                  Rp 99.000
                </span>
                <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg">
                  Hemat Rp 81.000
                </span>
              </div>

              {/* Status Badge */}
              <div className="pt-2 flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">Status Tiket Final:</span>
                {hasPaidFinal ? (
                  <span className="bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
                    <ShieldCheck className="w-4 h-4" />
                    LUNAS / CLOSING TERVERIFIKASI
                  </span>
                ) : (
                  <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                    Menunggu Pembayaran / Verifikasi
                  </span>
                )}
              </div>
            </div>

            {/* Bank Card Details */}
            <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-5 sm:p-6 rounded-2xl shadow-lg border border-blue-800 space-y-4">
              <div className="flex items-center justify-between border-b border-blue-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-base font-black tracking-widest text-blue-200">
                    BANK BCA
                  </span>
                </div>
                <span className="text-[11px] text-blue-300 font-mono">Rekening Resmi Panitia</span>
              </div>

              <div>
                <p className="text-[11px] text-blue-300">Nomor Rekening BCA:</p>
                <div className="flex items-center justify-between bg-black/20 p-2.5 rounded-xl mt-1 border border-blue-700/60">
                  <span className="font-mono text-lg sm:text-xl font-black tracking-widest text-amber-300">
                    {APP_CONFIG.payment.accountNumber}
                  </span>
                  <button
                    onClick={copyBcaNumber}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium flex items-center gap-1 transition-all cursor-pointer"
                  >
                    {copiedBca ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBca ? 'Tersalin' : 'Salin'}</span>
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[11px] text-blue-300">Atas Nama Rekening:</p>
                <p className="text-sm font-bold text-white uppercase tracking-wider">
                  {APP_CONFIG.payment.accountHolder}
                </p>
              </div>

              {/* WhatsApp Payment Confirmation Button */}
              <div className="pt-2">
                <a
                  href={confirmPaymentWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>KONFIRMASI BAYAR KE WHATSAPP ADMIN</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
                <p className="text-[10px] text-center text-blue-300 mt-2">
                  Format chat WhatsApp otomatis menyertakan Nama Anak & Mapel
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box: Didukung Yayasan Besarrasa Bagi Bangsa */}
        <div className="bg-blue-50 border border-blue-200 p-5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoYayasan className="h-10 w-10" />
            <div>
              <p className="text-xs font-bold text-slate-800">
                Penyelenggaraan Didukung Penuh oleh {APP_CONFIG.supportedBy}
              </p>
              <p className="text-[11px] text-slate-600">
                Wadah prestasi ramah anak sejak usia dini untuk membentuk generasi emas berkarakter dan berdaya saing tinggi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
