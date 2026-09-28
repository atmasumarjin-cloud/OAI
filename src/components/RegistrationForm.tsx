import React, { useState } from 'react';
import { APP_CONFIG } from '../../appConfig.js';
import { LogoYayasan } from './Logos';
import {
  User, Phone, School, MapPin, Award, CheckCircle,
  ArrowRight, Loader2, Sparkles, CheckSquare, Square,
  Calculator, Atom, Globe, BookOpen, Heart, Star
} from 'lucide-react';
import { ApiService, Participant } from '../services/apiClient';

interface RegistrationFormProps {
  onSuccess: (student: Participant) => void;
}

const PROVINSI_LIST = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Kepulauan Riau", "Jambi",
  "Sumatera Selatan", "Bangka Belitung", "Bengkulu", "Lampung", "DKI Jakarta",
  "Jawa Barat", "Banten", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur",
  "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Kalimantan Barat",
  "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara",
  "Sulawesi Utara", "Gorontalo", "Sulawesi Tengah", "Sulawesi Barat", "Sulawesi Selatan",
  "Sulawesi Tenggara", "Maluku", "Maluku Utara", "Papua", "Papua Barat", "Papua Selatan",
  "Papua Tengah", "Papua Pegunungan", "Papua Barat Daya"
];

const AVAILABLE_SUBJECTS = [
  {
    id: "Matematika",
    name: "Matematika Ceria",
    subName: "Numerasi, Pola & Logika Gambar",
    icon: Calculator,
    color: "amber",
    bgClass: "bg-amber-50 hover:bg-amber-100/80 border-amber-200",
    activeClass: "bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20",
    badge: "Favorit Anak TK"
  },
  {
    id: "IPA/Sains",
    name: "IPA & Sains Cilik",
    subName: "Satwa, Alam, Panca Indra & Flora",
    icon: Atom,
    color: "emerald",
    bgClass: "bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200",
    activeClass: "bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-500/20",
    badge: "Eksplorasi Alam"
  },
  {
    id: "Bahasa Inggris",
    name: "Fun English",
    subName: "Picture Vocabulary, Colors & Animals",
    icon: Globe,
    color: "sky",
    bgClass: "bg-sky-50 hover:bg-sky-100/80 border-sky-200",
    activeClass: "bg-sky-600 text-white border-sky-700 shadow-md shadow-sky-500/20",
    badge: "Bahasa Global"
  },
  {
    id: "Bahasa Indonesia",
    name: "Bahasa Indonesia Cilik",
    subName: "Literasi Dongeng, Huruf & Kata Santun",
    icon: BookOpen,
    color: "rose",
    bgClass: "bg-rose-50 hover:bg-rose-100/80 border-rose-200",
    activeClass: "bg-rose-600 text-white border-rose-700 shadow-md shadow-rose-500/20",
    badge: "Literasi Emas"
  }
];

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    whatsapp: '',
    schoolName: '',
    city: '',
    province: 'DKI Jakarta',
    category: 'Kategori Pra-TK & TK'
  });

  // MULTI-MAPEL SELECTION STATE (Poin 3)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    "Matematika",
    "Bahasa Inggris"
  ]);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleSubject = (subId: string) => {
    setErrorMsg('');
    setSelectedSubjects(prev => {
      if (prev.includes(subId)) {
        if (prev.length === 1) {
          setErrorMsg('Pilih minimal 1 mata pelajaran untuk diikuti.');
          return prev;
        }
        return prev.filter(s => s !== subId);
      } else {
        return [...prev, subId];
      }
    });
  };

  const selectAllSubjects = () => {
    setSelectedSubjects(AVAILABLE_SUBJECTS.map(s => s.id));
    setErrorMsg('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim()) {
      setErrorMsg('Nama lengkap siswa/ananda wajib diisi');
      return;
    }
    if (!formData.whatsapp.trim() || formData.whatsapp.length < 8) {
      setErrorMsg('Nomor WhatsApp aktif wajib diisi untuk link simulasi & pengumuman');
      return;
    }
    if (!formData.schoolName.trim()) {
      setErrorMsg('Asal sekolah / TK / PAUD wajib diisi');
      return;
    }
    if (selectedSubjects.length === 0) {
      setErrorMsg('Harap pilih minimal 1 mata pelajaran');
      return;
    }

    setLoading(true);
    try {
      const student = await ApiService.registerParticipant({
        ...formData,
        subjects: selectedSubjects,
        subject: selectedSubjects.join(', ')
      });
      setLoading(false);
      onSuccess(student);
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'Gagal mendaftar. Silakan coba lagi.');
    }
  };

  return (
    <section id="pendaftaran" className="py-12 md:py-20 bg-[#FAF8F5] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title with Kindergarten Cheerful Charm */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 text-xs font-black px-3.5 py-1.5 rounded-full mb-3 shadow-xs border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Pendaftaran Mandiri Ramah Anak & Balita Hebat</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Formulir Pendaftaran Siswa
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
            Daftarkan ananda dengan mudah. Ayah/Bunda dapat memilih <strong>lebih dari satu mata pelajaran (Multi-Mapel)</strong> sekaligus.
            Seluruh tahapan simulasi try out hingga piagam sertifikat dilakukan 100% mandiri.
          </p>
        </div>

        {/* Form Card Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
          {/* Card Accent Top Banner */}
          <div className="bg-gradient-to-r from-[#14213D] via-[#1E3A8A] to-[#0F172A] px-6 py-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LogoYayasan className="h-9 w-9" />
              <div>
                <p className="text-[11px] text-amber-300 font-semibold">Mitra Pendukung Resmi Nasional</p>
                <p className="text-sm font-black text-white tracking-wide">{APP_CONFIG.supportedBy}</p>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-400/30">
              <Star className="w-3 h-3 fill-emerald-300" />
              Simulasi Gratis & Mandiri
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-10 space-y-7">
            {errorMsg && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <span>⚠️ {errorMsg}</span>
              </div>
            )}

            {/* Section 1: Data Diri Siswa & Orang Tua */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-amber-600" />
                <span>1. Data Diri Siswa / Ananda & Orang Tua / Wali</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nama Lengkap Siswa / Ananda <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="Contoh: Keenan Arkana Pratama"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm outline-hidden transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nama Orang Tua / Wali Murid <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    placeholder="Contoh: Bunda Citra Kirana, S.Pd."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm outline-hidden transition-all font-medium"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nomor WhatsApp Aktif (Utama) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4 text-emerald-600" />
                    </div>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="Contoh: 081234567890 (Untuk reminder jadwal simulasi & pengumuman lolos)"
                      required
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm outline-hidden transition-all font-mono font-medium"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Pastikan nomor WhatsApp aktif untuk menerima instruksi simulasi try out dan reminder babak penyisihan.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Data Sekolah & Domisili */}
            <div className="pt-2 border-t border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <School className="w-4 h-4 text-blue-600" />
                <span>2. Asal Sekolah / TK / PAUD & Wilayah</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Asal Sekolah / TK / PAUD <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                    placeholder="Contoh: TK Islam Al-Azhar / PAUD Ceria"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm outline-hidden transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Kota / Kabupaten <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Contoh: Jakarta Selatan"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm outline-hidden transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Provinsi <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm outline-hidden bg-white font-medium"
                  >
                    {PROVINSI_LIST.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Kategori Jenjang */}
            <div className="pt-2 border-t border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>3. Kategori Jenjang Usia / Kelas</span>
              </h3>

              <div>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-sm outline-hidden bg-white font-bold text-slate-800"
                >
                  {APP_CONFIG.categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label} ({cat.ageRange}) {cat.isKindergarten ? '⭐ [KINDERGARTEN UTAMA]' : ''}
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-[11px] text-slate-500">
                  Format soal bergambar dan tingkat kesulitan otomatis disesuaikan secara ramah anak sesuai kategori usia yang dipilih.
                </p>
              </div>
            </div>

            {/* Section 4: PENDAFTARAN MULTI MAPEL (POIN 3) */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>4. Pilihan Mata Pelajaran (Multi-Mapel Terintegrasi)</span>
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Ayah/Bunda dapat mencentang lebih dari 1 mata pelajaran sekaligus:
                  </p>
                </div>

                <button
                  type="button"
                  onClick={selectAllSubjects}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition-all cursor-pointer self-start sm:self-auto"
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>Pilih Semua (Paket 4 Mapel)</span>
                </button>
              </div>

              {/* Multi-Mapel Grid Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {AVAILABLE_SUBJECTS.map(sub => {
                  const isSelected = selectedSubjects.includes(sub.id);
                  const IconComp = sub.icon;
                  return (
                    <div
                      key={sub.id}
                      onClick={() => toggleSubject(sub.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer select-none flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/70 shadow-sm ring-1 ring-amber-400'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2.5 rounded-xl ${
                          isSelected ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-black text-slate-900">{sub.name}</h4>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                              {sub.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{sub.subName}</p>
                        </div>
                      </div>

                      <div className="mt-1">
                        {isSelected ? (
                          <div className="w-5 h-5 rounded-md bg-amber-500 flex items-center justify-center text-white">
                            <CheckCircle className="w-4 h-4 stroke-[2.5]" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-md border-2 border-slate-300 bg-white" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected subjects summary badge */}
              <div className="mt-3 flex items-center justify-between text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-600 font-medium">
                  Mata Pelajaran Dipilih: <strong className="text-slate-900">{selectedSubjects.length} Mapel</strong>
                </span>
                <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                  {selectedSubjects.join(' • ')}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 font-black text-sm sm:text-base py-4 px-6 rounded-2xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all cursor-pointer disabled:opacity-50 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Mendaftarkan Data Ananda...</span>
                  </>
                ) : (
                  <>
                    <span>SUBMIT PENDAFTARAN & LANJUT KE SIMULASI MANDIRI</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <div className="mt-3 text-center flex items-center justify-center gap-2 text-xs text-slate-500">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Data terenkripsi aman & langsung disinkronkan ke Database Nasional OAI</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
