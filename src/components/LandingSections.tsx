import React, { useState } from 'react';
import { APP_CONFIG } from '../../appConfig.js';
import { LogoYayasan, ImageWithFallback } from './Logos';
import {
  Calculator, Atom, Globe, BookOpen, CheckCircle2, Award,
  Calendar, CreditCard, ChevronDown, ChevronUp, Star, Sparkles,
  ArrowRight, ShieldCheck, HeartHandshake, HelpCircle, Layers
} from 'lucide-react';
import { SystemSettings } from '../services/apiClient';

interface LandingSectionsProps {
  settings: SystemSettings | null;
  onOpenRegister: () => void;
  onOpenSimulation: () => void;
}

export const LandingSections: React.FC<LandingSectionsProps> = ({
  settings,
  onOpenRegister,
  onOpenSimulation
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator': return <Calculator className="w-6 h-6 text-amber-500" />;
      case 'Atom': return <Atom className="w-6 h-6 text-cyan-500" />;
      case 'Globe': return <Globe className="w-6 h-6 text-blue-500" />;
      default: return <BookOpen className="w-6 h-6 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-20 md:space-y-28 py-12 md:py-20">
      {/* SECTION 1: PRODUK / MATA PELAJARAN UTAMA */}
      <section id="kategori" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>Mata Pelajaran Standar Olimpiade Nasional</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Kompetisi Akademik Terpadu
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Setiap mata pelajaran dirancang dengan kurikulum terukur, menguji kemampuan bernalar analitis,
            konseptual, dan literasi kontekstual anak.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {APP_CONFIG.products.map(prod => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <ImageWithFallback
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-slate-950/80 text-amber-300 font-bold text-[10px] px-2.5 py-1 rounded-full backdrop-blur-xs">
                    {prod.tag}
                  </div>
                </div>

                <div className="p-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-3 group-hover:bg-amber-50 group-hover:border-amber-200 transition-colors">
                    {getProductIcon(prod.icon)}
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 mb-2 leading-snug">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={onOpenRegister}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Pilih Mata Pelajaran Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: JENJANG KATEGORI USIA */}
      <section className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20">
              Kategori Jenjang Usia Peserta
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-3">
              Tingkat Kesulitan Disesuaikan Rentang Usia
            </h2>
            <p className="mt-3 text-slate-300 text-sm">
              Sistem bank soal kami dirancang oleh tim akademisi terkemuka sehingga proporsional dan ramah anak.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {APP_CONFIG.categories.map((cat, idx) => (
              <div
                key={cat.id}
                className={`bg-slate-800/80 border p-6 rounded-3xl backdrop-blur-sm relative overflow-hidden flex flex-col justify-between ${
                  cat.isKindergarten ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                      {cat.isKindergarten ? '⭐ UTAMA' : `Tingkat #${idx}`}
                    </span>
                    <span className="text-xs font-semibold text-slate-300">
                      {cat.ageRange}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white mb-2">{cat.label}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-700/80 pt-4 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{cat.isKindergarten ? 'Soal Bergambar & Ramah Anak' : '20 Butir Soal Terstandar HOTS'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Bobot 5 Poin / Soal (Total 100 Poin)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>Waktu Pengerjaan 30 Menit Santai</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenRegister}
                  className={`mt-6 w-full py-3 font-bold text-xs rounded-xl border transition-all cursor-pointer ${
                    cat.isKindergarten
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-400 shadow-md'
                      : 'bg-white/10 hover:bg-amber-500 hover:text-slate-950 text-white border-white/20'
                  }`}
                >
                  Daftarkan Ananda {cat.isKindergarten ? '(PAUD/TK)' : ''}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: ALUR LENGKAP PENDAFTARAN & PELAKSANAAN (Poin 1 - 9) */}
      <section id="alur" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>Alur Pelaksanaan Mandiri 100% Online</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Dari Pendaftaran Hingga Babak Final
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Sistem mandiri terintegrasi dari pendaftaran, simulasi try out, babak penyisihan,
            pengumuman lolos, pembayaran tiket final promo, hingga unduh piagam digital.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md relative">
            <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 font-black text-sm flex items-center justify-center mb-4">
              1
            </span>
            <h3 className="font-extrabold text-sm text-slate-900 mb-1">
              Daftar Mandiri & CTA
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Lengkapi formulir pendaftaran dengan data nama siswa, nama wali, WhatsApp aktif, sekolah, dan mapel pilihan.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md relative">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center mb-4">
              2
            </span>
            <h3 className="font-extrabold text-sm text-slate-900 mb-1">
              Konfirmasi WA & Follow Sosmed
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kirimkan format konfirmasi pendaftaran ke WhatsApp Admin resmi serta follow akun media sosial Olimpiade Anak Indonesia.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md relative">
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 font-black text-sm flex items-center justify-center mb-4">
              3
            </span>
            <h3 className="font-extrabold text-sm text-slate-900 mb-1">
              Simulasi Try Out Mandiri
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Akses ruang CBT simulasi untuk berlatih 20 soal acak tanpa batas agar anak terbiasa dengan timer dan sistem ujian.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md relative">
            <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center mb-4">
              4
            </span>
            <h3 className="font-extrabold text-sm text-slate-900 mb-1">
              Reminder & Babak Penyisihan
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sistem mengirim reminder WhatsApp pada H-2 dan H-1 sebelum Babak Penyisihan resmi ({settings?.dates?.penyisihanDate || '18 Okt 2026'}).
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md relative">
            <span className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-800 font-black text-sm flex items-center justify-center mb-4">
              5
            </span>
            <h3 className="font-extrabold text-sm text-slate-900 mb-1">
              Pengumuman Lolos H+2
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hasil kualifikasi peserta diumumkan resmi pada H+2 ({settings?.dates?.pengumumanPenyisihanDate || '20 Okt 2026'}) di dashboard mandiri.
            </p>
          </div>

          {/* Step 6 */}
          <div className="bg-white p-6 rounded-3xl border-2 border-red-300 shadow-lg relative bg-red-50/20">
            <span className="w-8 h-8 rounded-xl bg-red-600 text-white font-black text-sm flex items-center justify-center mb-4">
              6
            </span>
            <h3 className="font-extrabold text-sm text-red-900 mb-1">
              Tiket Final Promo Rp 99.000
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Peserta lolos berhak mengklaim promo Rp 99rb (harga normal Rp 180rb) via rekening BCA 3843-136-911 a.n. SRI PRIHATININGSIH SH.
            </p>
          </div>

          {/* Step 7 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md relative">
            <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 font-black text-sm flex items-center justify-center mb-4">
              7
            </span>
            <h3 className="font-extrabold text-sm text-slate-900 mb-1">
              Pelaksanaan Babak Final
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Peserta yang telah terverifikasi pembayaran tiket final mengikuti ujian penentuan Juara Nasional dan Peraih Medali.
            </p>
          </div>

          {/* Step 8 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md relative">
            <span className="w-8 h-8 rounded-xl bg-yellow-100 text-yellow-800 font-black text-sm flex items-center justify-center mb-4">
              8
            </span>
            <h3 className="font-extrabold text-sm text-slate-900 mb-1">
              Unduh E-Sertifikat Resmi
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Peserta mengunduh piagam prestasi berstandar nasional dengan legalitas resmi didukung Yayasan Besarrasa Bagi Bangsa.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: TIKET FINAL PROMO BANNER (Poin 8 & 9) */}
      <section id="tiket" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-[#0E2442] to-slate-900 text-white rounded-3xl p-8 sm:p-12 border-2 border-amber-400 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-red-600 text-white font-bold text-xs uppercase px-3 py-1 rounded-full">
                <span>Khusus 10 Peserta Pertama Lolos Babak Penyisihan</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
                Klaim Tiket Babak Final Promo <br />
                <span className="text-amber-400">Hanya Rp 99.000</span> (Normal Rp 180.000)
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Dapatkan kesempatan bertanding di panggung puncak nasional, perebutan medali kejuaraan,
                dan piagam berlisensi resmi. Pembayaran resmi ditujukan ke rekening panitia pusat:
              </p>

              <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl max-w-xl text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Bank Tujuan:</span>
                  <span className="font-bold text-white">BCA (Bank Central Asia)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Nomor Rekening:</span>
                  <span className="font-mono font-bold text-amber-300 text-sm">{APP_CONFIG.payment.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Atas Nama:</span>
                  <span className="font-bold text-white">{APP_CONFIG.payment.accountHolder}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                href={`https://wa.me/${APP_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                  `Halo Admin ${APP_CONFIG.brandName}, saya ingin menanyakan informasi pemesanan Tiket Final Promo Rp 99.000 BCA 3843-136-911 a.n. SRI PRIHATININGSIH SH.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-xl transition-all block text-xs sm:text-sm"
              >
                Konfirmasi Tiket via WhatsApp
              </a>

              <button
                onClick={onOpenRegister}
                className="w-full text-center bg-white/10 hover:bg-white/20 text-slate-200 font-bold py-3 px-6 rounded-2xl border border-white/20 transition-all text-xs"
              >
                Daftar Peserta Baru
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: GALERI VISUAL PRESTASI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
            Dokumentasi & Galeri
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-3 text-slate-900">
            Semangat Juara Anak Indonesia
          </h2>
          <p className="mt-2 text-slate-600 text-sm">
            Menumbuhkan cinta belajar, sportivitas, dan kepercayaan diri generasi muda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {APP_CONFIG.galleryImages.map((img, i) => (
            <div
              key={i}
              className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 group relative aspect-[4/3] bg-slate-100"
            >
              <ImageWithFallback
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] text-amber-400 font-bold uppercase">{img.category}</span>
                <p className="text-xs font-bold">{img.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: TESTIMONI ORANG TUA & GURU */}
      <section className="bg-blue-900/5 py-16 md:py-24 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
              Testimoni Peserta
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-3 text-slate-900">
              Apa Kata Orang Tua & Guru Pembimbing?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {APP_CONFIG.testimonials.map((testi, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {Array.from({ length: testi.rating }).map((_, r) => (
                      <Star key={r} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                    "{testi.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <ImageWithFallback
                    src={testi.avatar}
                    alt={testi.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{testi.name}</h4>
                    <p className="text-[11px] text-slate-500">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQ ACCORDION (10 Pertanyaan) */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Pusat Informasi & Tanya Jawab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Temukan jawaban lengkap seputar teknis ujian, pendaftaran, silabus, dan sistem penilaian.
          </p>
        </div>

        <div className="space-y-3">
          {APP_CONFIG.faq.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-800 hover:text-amber-700 transition-colors cursor-pointer"
                >
                  <span>{item.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
