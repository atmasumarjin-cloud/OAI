import React, { useState, useEffect } from 'react';
import { LogoOlimpiade, LogoYayasan } from './Logos';
import { APP_CONFIG } from '../../appConfig.js';
import {
  Participant, QuestionItem, SystemSettings, ExamLog, ApiService
} from '../services/apiClient';
import {
  Users, BookOpen, Settings, BarChart3, Trash2, Edit3, Plus,
  Download, Upload, Shield, Phone, MessageCircle, CheckCircle2,
  XCircle, Search, Filter, AlertTriangle, Calendar, CheckSquare,
  Square, RefreshCw, LogOut, Code, Eye, Trophy, Sparkles
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'participants' | 'questions' | 'reports' | 'settings'>('participants');
  
  // Data states
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [reports, setReports] = useState<ExamLog[]>([]);
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters & Search for Participants
  const [searchParticipant, setSearchParticipant] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterSubject, setFilterSubject] = useState('ALL');
  const [filterFinalPaid, setFilterFinalPaid] = useState('ALL');
  const [filterFinalStatus, setFilterFinalStatus] = useState<'ALL' | 'COMPLETED' | 'UNCOMPLETED'>('ALL');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Score Management Modal State
  const [editingScoreParticipant, setEditingScoreParticipant] = useState<Participant | null>(null);
  const [scoreForm, setScoreForm] = useState({
    simulationCompleted: false,
    simulationScore: 0,
    penyisihanCompleted: false,
    penyisihanScore: 0,
    isQualifiedFinal: 'Menunggu' as 'Lolos' | 'Tidak Lolos' | 'Menunggu',
    finalTicketPaid: false,
    finalCompleted: false,
    finalScore: 0,
    activeSubject: 'Matematika',
    subjectScores: {} as Record<string, any>
  });

  // Questions management states
  const [qCategoryFilter, setQCategoryFilter] = useState('Kategori A');
  const [qSubjectFilter, setQSubjectFilter] = useState('Matematika');
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<QuestionItem | null>(null);

  // Question form state
  const [qForm, setQForm] = useState({
    category: 'Kategori A',
    subject: 'Matematika',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    explanation: ''
  });

  // Reports sub-tab
  const [reportSubTab, setReportSubTab] = useState<'simulasi' | 'penyisihan' | 'final'>('penyisihan');

  // Success message toast
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [parts, setts, reps, qs] = await Promise.all([
        ApiService.getParticipants(),
        ApiService.getSettings(),
        ApiService.getExamReports(),
        ApiService.getQuestions(qCategoryFilter, qSubjectFilter)
      ]);
      setParticipants(parts);
      setSettings(setts);
      setReports(reps);
      setQuestions(qs);
    } catch (e) {
      console.error('Failed to load admin data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Reload questions when category/subject filter changes
  useEffect(() => {
    const fetchQuestions = async () => {
      const qs = await ApiService.getQuestions(qCategoryFilter, qSubjectFilter);
      setQuestions(qs);
      setSelectedQuestionIds([]);
    };
    fetchQuestions();
  }, [qCategoryFilter, qSubjectFilter]);

  // --- PARTICIPANT MANAGEMENT ACTIONS ---
  const handleDeleteParticipant = async (id: string, name: string) => {
    if (!confirm(`Hapus permanen data peserta: ${name} (${id})?`)) return;
    const ok = await ApiService.deleteParticipant(id);
    if (ok) {
      setParticipants(prev => prev.filter(p => p.id !== id));
      showToast(`Peserta ${name} berhasil dihapus`);
    }
  };

  const handleToggleFinalPayment = async (p: Participant) => {
    const nextStatus = !p.finalTicketPaid;
    const updated = await ApiService.updateParticipant(p.id, { finalTicketPaid: nextStatus });
    if (updated) {
      setParticipants(prev => prev.map(item => item.id === p.id ? { ...item, finalTicketPaid: nextStatus } : item));
      showToast(`Status Tiket Final ${p.studentName}: ${nextStatus ? 'CLOSING / LUNAS' : 'BELUM BAYAR'}`);
    }
  };

  const handleChangeQualification = async (p: Participant, isQualifiedFinal: 'Lolos' | 'Tidak Lolos' | 'Menunggu') => {
    const updated = await ApiService.updateParticipant(p.id, { isQualifiedFinal });
    if (updated) {
      setParticipants(prev => prev.map(item => item.id === p.id ? { ...item, isQualifiedFinal } : item));
      showToast(`Status Kelolosan ${p.studentName}: ${isQualifiedFinal}`);
    }
  };

  // WhatsApp Follow-Up Generator
  const getFollowUpWaLink = (p: Participant, type: 'simulasi' | 'penyisihan' | 'final') => {
    let msg = '';
    if (type === 'simulasi') {
      msg = `Halo Ayah/Bunda dari ananda *${p.studentName}* (${p.schoolName})!\n\nKami dari Panitia *${APP_CONFIG.brandName}* menginformasikan bahwa ananda telah terdaftar resmi (ID: ${p.id}).\n\nYuk, segera lakukan *Simulasi Try Out Mandiri* secara gratis melalui dashboard peserta agar ananda terbiasa dengan format 20 butir soal CBT online:\n👉 Akses Dashboard: https://olimpiadeanakindonesia.id\n\nSemangat berprestasi! Didukung oleh *${APP_CONFIG.supportedBy}*.`;
    } else if (type === 'penyisihan') {
      msg = `PENGINGAT RESMI H-1/H-2 BABAK PENYISIHAN!\n\nHalo Ayah/Bunda dari *${p.studentName}* (ID: ${p.id}).\n\nBabak Penyisihan *${APP_CONFIG.brandName}* untuk mapel *${p.subject}* (${p.category}) akan segera dimulai pada tanggal *${settings?.dates?.penyisihanDate || '18 Oktober 2026'}*.\n\nMohon pastikan perangkat dan koneksi internet siap. Selamat berkompetisi dengan jujur!\n\nSalam,\nPanitia & ${APP_CONFIG.supportedBy}`;
    } else {
      msg = `PENGUMUMAN LOLOS & TIKET FINAL NASIONAL!\n\nSelamat kepada ananda *${p.studentName}* (ID: ${p.id}) dari *${p.schoolName}* dinyatakan *LOLOS KE BABAK FINAL* mapel ${p.subject}!\n\nAmankan segera *Promo Tiket Final Rp 99.000* (diskon khusus dari Rp 180.000) melalui transfer ke:\n🏦 BCA: *3843-136-911*\nAtas Nama: *SRI PRIHATININGSIH SH.*\n\nKirimkan bukti transfer balasan ke chat ini untuk aktivasi akses ujian final. Terima kasih!`;
    }
    return `https://wa.me/${p.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  // Score edit modal openers & handlers
  const handleOpenScoreEditModal = (p: Participant) => {
    setEditingScoreParticipant(p);
    const primarySub = (p.subjects && p.subjects.length > 0) ? p.subjects[0] : (p.subject ? p.subject.split(',')[0].trim() : 'Matematika');
    const existingSubScores = p.subjectScores?.[primarySub];
    setScoreForm({
      simulationCompleted: existingSubScores?.simulationCompleted ?? p.simulationCompleted ?? false,
      simulationScore: existingSubScores?.simulationScore ?? p.simulationScore ?? 0,
      penyisihanCompleted: existingSubScores?.penyisihanCompleted ?? p.penyisihanCompleted ?? false,
      penyisihanScore: existingSubScores?.penyisihanScore ?? p.penyisihanScore ?? 0,
      isQualifiedFinal: p.isQualifiedFinal ?? 'Menunggu',
      finalTicketPaid: p.finalTicketPaid ?? false,
      finalCompleted: existingSubScores?.finalCompleted ?? p.finalCompleted ?? false,
      finalScore: existingSubScores?.finalScore ?? p.finalScore ?? 0,
      activeSubject: primarySub,
      subjectScores: p.subjectScores ? JSON.parse(JSON.stringify(p.subjectScores)) : {}
    });
  };

  const handleSaveScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScoreParticipant) return;

    const sub = scoreForm.activeSubject;
    const currentSubScores = { ...(scoreForm.subjectScores || {}) };
    currentSubScores[sub] = {
      simulationCompleted: scoreForm.simulationCompleted,
      simulationScore: Number(scoreForm.simulationScore),
      penyisihanCompleted: scoreForm.penyisihanCompleted,
      penyisihanScore: Number(scoreForm.penyisihanScore),
      finalCompleted: scoreForm.finalCompleted,
      finalScore: Number(scoreForm.finalScore)
    };

    const updates: Partial<Participant> = {
      simulationCompleted: scoreForm.simulationCompleted,
      simulationScore: Number(scoreForm.simulationScore),
      penyisihanCompleted: scoreForm.penyisihanCompleted,
      penyisihanScore: Number(scoreForm.penyisihanScore),
      isQualifiedFinal: scoreForm.isQualifiedFinal,
      finalTicketPaid: scoreForm.finalTicketPaid,
      finalCompleted: scoreForm.finalCompleted,
      finalScore: Number(scoreForm.finalScore),
      subjectScores: currentSubScores
    };

    const updated = await ApiService.updateParticipant(editingScoreParticipant.id, updates);
    if (updated) {
      setParticipants(prev => prev.map(item => item.id === editingScoreParticipant.id ? { ...item, ...updates } : item));
      showToast(`Nilai & Status Ujian ${editingScoreParticipant.studentName} berhasil diperbarui!`);
      setEditingScoreParticipant(null);
    }
  };

  // Filtered Participants calculation
  const filteredParticipants = participants.filter(p => {
    const matchesSearch =
      p.studentName.toLowerCase().includes(searchParticipant.toLowerCase()) ||
      p.id.toLowerCase().includes(searchParticipant.toLowerCase()) ||
      p.whatsapp.includes(searchParticipant) ||
      p.schoolName.toLowerCase().includes(searchParticipant.toLowerCase());

    const matchesCat = filterCategory === 'ALL' || p.category === filterCategory;
    const matchesSub = filterSubject === 'ALL' || (p.subjects && p.subjects.includes(filterSubject)) || p.subject.includes(filterSubject);
    const matchesPaid =
      filterFinalPaid === 'ALL' ||
      (filterFinalPaid === 'PAID' && p.finalTicketPaid) ||
      (filterFinalPaid === 'UNPAID' && !p.finalTicketPaid);

    const matchesFinalStatus =
      filterFinalStatus === 'ALL' ||
      (filterFinalStatus === 'COMPLETED' && p.finalCompleted) ||
      (filterFinalStatus === 'UNCOMPLETED' && !p.finalCompleted);

    let matchesDate = true;
    if (startDate) {
      matchesDate = matchesDate && new Date(p.registeredAt) >= new Date(startDate);
    }
    if (endDate) {
      const endD = new Date(endDate);
      endD.setHours(23, 59, 59);
      matchesDate = matchesDate && new Date(p.registeredAt) <= endD;
    }

    return matchesSearch && matchesCat && matchesSub && matchesPaid && matchesFinalStatus && matchesDate;
  });

  // --- QUESTION MANAGEMENT ACTIONS ---
  const handleOpenAddQuestion = () => {
    setEditingQuestion(null);
    setQForm({
      category: qCategoryFilter,
      subject: qSubjectFilter,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      explanation: ''
    });
    setShowAddQuestionModal(true);
  };

  const handleOpenEditQuestion = (q: QuestionItem) => {
    setEditingQuestion(q);
    setQForm({
      category: q.category,
      subject: q.subject,
      question: q.question,
      options: [...q.options],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || ''
    });
    setShowAddQuestionModal(true);
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qForm.question || !qForm.correctAnswer || qForm.options.some(opt => !opt)) {
      alert('Semua isian pertanyaan, opsi A-D, dan jawaban benar wajib diisi.');
      return;
    }

    if (editingQuestion) {
      const ok = await ApiService.updateQuestion(editingQuestion.id, qForm);
      if (ok) {
        showToast('Soal berhasil diperbarui');
        setShowAddQuestionModal(false);
        const qs = await ApiService.getQuestions(qCategoryFilter, qSubjectFilter);
        setQuestions(qs);
      }
    } else {
      const res = await ApiService.addQuestion(qForm);
      if (res) {
        showToast('Soal baru berhasil ditambahkan');
        setShowAddQuestionModal(false);
        const qs = await ApiService.getQuestions(qCategoryFilter, qSubjectFilter);
        setQuestions(qs);
      }
    }
  };

  const handleDeleteSingleQuestion = async (id: string) => {
    if (!confirm('Hapus soal ini dari bank soal?')) return;
    const ok = await ApiService.deleteQuestion(id);
    if (ok) {
      setQuestions(prev => prev.filter(q => q.id !== id));
      showToast('Soal berhasil dihapus');
    }
  };

  const handleToggleSelectQuestion = (id: string) => {
    setSelectedQuestionIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSelectAllQuestions = () => {
    if (selectedQuestionIds.length === questions.length) {
      setSelectedQuestionIds([]);
    } else {
      setSelectedQuestionIds(questions.map(q => q.id));
    }
  };

  const handleBatchDeleteQuestions = async () => {
    if (selectedQuestionIds.length === 0) return;
    if (!confirm(`Hapus ${selectedQuestionIds.length} butir soal terpilih secara massal?`)) return;
    const ok = await ApiService.batchDeleteQuestions(selectedQuestionIds);
    if (ok) {
      setQuestions(prev => prev.filter(q => !selectedQuestionIds.includes(q.id)));
      setSelectedQuestionIds([]);
      showToast('Soal terpilih berhasil dihapus massal');
    }
  };

  const handleExportQuestionsJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(questions, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `BankSoal_${qCategoryFilter}_${qSubjectFilter}.json`);
    dlAnchor.click();
  };

  const handleImportQuestions = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          const ok = await ApiService.importQuestions(json);
          if (ok) {
            showToast(`${json.length} butir soal berhasil diimpor`);
            const qs = await ApiService.getQuestions(qCategoryFilter, qSubjectFilter);
            setQuestions(qs);
          }
        } else {
          alert('Format file JSON harus berupa array soal.');
        }
      } catch (err) {
        alert('Gagal membaca file JSON. Pastikan format valid.');
      }
    };
    reader.readAsText(file);
  };

  // --- SETTINGS MANAGEMENT ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    const ok = await ApiService.updateSettings(settings);
    if (ok) {
      showToast('Pengaturan sistem & Pixel Meta berhasil disimpan!');
    }
  };

  // Stats calculation
  const totalCount = participants.length;
  const simCount = participants.filter(p => p.simulationCompleted).length;
  const penyisihanCount = participants.filter(p => p.penyisihanCompleted).length;
  const finalPaidCount = participants.filter(p => p.finalTicketPaid).length;
  const finalCompletedCount = participants.filter(p => p.finalCompleted).length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white font-bold text-xs py-3 px-5 rounded-2xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Navbar */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3.5 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoOlimpiade className="h-10" variant="light" />
            <span className="hidden sm:inline-block text-xs font-mono bg-blue-900/60 text-blue-300 border border-blue-700 px-2 py-0.5 rounded-md">
              PANITIA PUSAT NASIONAL
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-300 mr-2">
              <LogoYayasan className="h-7 w-7" />
              <span>{APP_CONFIG.supportedBy}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 text-xs font-semibold py-1.5 px-3 rounded-xl transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Tabs Navigation */}
      <div className="bg-slate-950/50 border-b border-slate-800 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex overflow-x-auto space-x-1 sm:space-x-4 py-2">
          <button
            onClick={() => setActiveTab('participants')}
            className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'participants'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Database Peserta & Action WA ({filteredParticipants.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('questions')}
            className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'questions'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Bank Soal CBT & HOTS ({questions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'reports'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Tabel Laporan Skor Ujian</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan & Meta Pixel</span>
          </button>
        </div>
      </div>

      {/* Main Admin Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6">
        {/* STATS OVERVIEW CARDS (Poin 18: Filter Statistik) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl">
            <p className="text-[11px] text-slate-400 font-medium">Total Pendaftar</p>
            <p className="text-xl sm:text-2xl font-black text-white mt-1">{totalCount}</p>
            <p className="text-[10px] text-blue-400 mt-1">Siswa Terdaftar</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl">
            <p className="text-[11px] text-slate-400 font-medium">Sudah Simulasi</p>
            <p className="text-xl sm:text-2xl font-black text-cyan-400 mt-1">{simCount}</p>
            <p className="text-[10px] text-slate-400 mt-1">{totalCount - simCount} Belum Simulasi</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl">
            <p className="text-[11px] text-slate-400 font-medium">Selesai Penyisihan</p>
            <p className="text-xl sm:text-2xl font-black text-amber-400 mt-1">{penyisihanCount}</p>
            <p className="text-[10px] text-slate-400 mt-1">{totalCount - penyisihanCount} Belum Ujian</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl">
            <p className="text-[11px] text-slate-400 font-medium">Closing Tiket Final</p>
            <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">{finalPaidCount}</p>
            <p className="text-[10px] text-emerald-400 font-semibold mt-1">BCA Rp 99.000</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl col-span-2 sm:col-span-1">
            <p className="text-[11px] text-slate-400 font-medium">Selesai Final</p>
            <p className="text-xl sm:text-2xl font-black text-purple-400 mt-1">{finalCompletedCount}</p>
            <p className="text-[10px] text-purple-300 mt-1">Juara Nasional</p>
          </div>
        </div>

        {/* TAB 1: DATABASE PESERTA & RIWAYAT LENGKAP (Poin 13, Poin 18, WhatsApp Action Buttons) */}
        {activeTab === 'participants' && (
          <div className="space-y-4">
            {/* Filter and Search Bar */}
            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl space-y-3">
              <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari nama, ID, WA, sekolah..."
                    value={searchParticipant}
                    onChange={e => setSearchParticipant(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-hidden focus:border-amber-400"
                  />
                </div>

                {/* Date range filter (Poin 18) */}
                <div className="flex items-center gap-2 w-full md:w-auto text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Daftar:</span>
                  </span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="bg-slate-900 border border-slate-700 px-2 py-1.5 rounded-lg text-white text-xs outline-hidden"
                  />
                  <span className="text-slate-500">s/d</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="bg-slate-900 border border-slate-700 px-2 py-1.5 rounded-lg text-white text-xs outline-hidden"
                  />
                  {(startDate || endDate) && (
                    <button
                      onClick={() => { setStartDate(''); setEndDate(''); }}
                      className="text-amber-400 hover:text-amber-300 text-xs underline cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Category, Subject, Payment Filter */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-700/60 text-xs">
                <select
                  value={filterCategory}
                  onChange={e => setFilterCategory(e.target.value)}
                  className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl text-white outline-hidden"
                >
                  <option value="ALL">Semua Kategori</option>
                  <option value="Kategori Pra-TK & TK">Kategori Pra-TK & TK (PAUD/TK A & B)</option>
                  <option value="Kategori A">Kategori A (SD 1-2)</option>
                  <option value="Kategori B">Kategori B (SD 3-4)</option>
                  <option value="Kategori C">Kategori C (SD 5-6/SMP)</option>
                </select>

                <select
                  value={filterSubject}
                  onChange={e => setFilterSubject(e.target.value)}
                  className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl text-white outline-hidden"
                >
                  <option value="ALL">Semua Mata Pelajaran</option>
                  <option value="Matematika">Matematika</option>
                  <option value="IPA/Sains">IPA/Sains</option>
                  <option value="Bahasa Inggris">Bahasa Inggris</option>
                  <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                </select>

                <select
                  value={filterFinalPaid}
                  onChange={e => setFilterFinalPaid(e.target.value)}
                  className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl text-white outline-hidden"
                >
                  <option value="ALL">Semua Status Tiket Final</option>
                  <option value="PAID">Tiket Final Lunas / Closing</option>
                  <option value="UNPAID">Tiket Final Belum Bayar</option>
                </select>

                <select
                  value={filterFinalStatus}
                  onChange={e => setFilterFinalStatus(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl text-white outline-hidden"
                >
                  <option value="ALL">Semua Ujian Final</option>
                  <option value="COMPLETED">Sudah Selesai Ujian Final</option>
                  <option value="UNCOMPLETED">Belum Ujian Final</option>
                </select>

                <button
                  onClick={loadData}
                  className="ml-auto bg-slate-900 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-xl text-slate-300 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh Data</span>
                </button>
              </div>
            </div>

            {/* Table (Poin 13: Menampilkan SELURUH data formulir) */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-200">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-bold text-[10px] border-b border-slate-700">
                    <tr>
                      <th className="py-3 px-3">No & ID</th>
                      <th className="py-3 px-3">Nama Siswa & Orang Tua</th>
                      <th className="py-3 px-3">WhatsApp & Domisili</th>
                      <th className="py-3 px-3">Sekolah & Jenjang</th>
                      <th className="py-3 px-3">Skor Simulasi</th>
                      <th className="py-3 px-3">Skor Penyisihan</th>
                      <th className="py-3 px-3">Status Lolos</th>
                      <th className="py-3 px-3">Tiket Final (Closing)</th>
                      <th className="py-3 px-3 text-amber-300 font-extrabold bg-amber-950/30 border-x border-amber-900/30">Nilai Babak Final</th>
                      <th className="py-3 px-3 text-center">Kelola Nilai</th>
                      <th className="py-3 px-3">Action WA Follow-Up</th>
                      <th className="py-3 px-3 text-center">Hapus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60 font-medium">
                    {filteredParticipants.length === 0 ? (
                      <tr>
                        <td colSpan={12} className="py-8 text-center text-slate-400">
                          Tidak ada data peserta yang cocok dengan filter.
                        </td>
                      </tr>
                    ) : (
                      filteredParticipants.map((p, idx) => (
                        <tr key={p.id} className="hover:bg-slate-700/30 transition-colors">
                          <td className="py-3 px-3">
                            <span className="text-slate-400 block text-[10px]">{idx + 1}</span>
                            <span className="font-mono text-amber-400 font-bold">{p.id}</span>
                          </td>

                          <td className="py-3 px-3">
                            <p className="font-bold text-white text-xs">{p.studentName}</p>
                            <p className="text-[11px] text-slate-400">Wali: {p.parentName}</p>
                          </td>

                          <td className="py-3 px-3">
                            <p className="font-mono text-emerald-400">{p.whatsapp}</p>
                            <p className="text-[11px] text-slate-400">{p.city}, {p.province}</p>
                          </td>

                          <td className="py-3 px-3">
                            <p className="text-slate-300 font-semibold">{p.schoolName}</p>
                            <p className="text-[11px] font-bold text-amber-300">{p.category}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {(p.subjects || p.subject.split(',')).map(s => (
                                <span key={s.trim()} className="text-[10px] bg-blue-900/60 text-blue-200 border border-blue-700/60 px-1.5 py-0.2 rounded font-medium">
                                  {s.trim()}
                                </span>
                              ))}
                            </div>
                          </td>

                          {/* Simulasi Status & Score Display (Poin 26 & Perbaikan Tampilan Nilai) */}
                          <td className="py-3 px-3">
                            {p.simulationCompleted ? (
                              <div className="space-y-1">
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/90 border border-emerald-600/70 px-2 py-0.5 rounded-md shadow-xs">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                  <span>{p.simulationScore ?? 0} / 100</span>
                                </span>
                                {p.subjectScores && Object.keys(p.subjectScores).length > 0 && (
                                  <div className="flex flex-col gap-0.5 mt-0.5">
                                    {Object.entries(p.subjectScores).map(([sub, sc]) => sc.simulationCompleted && (
                                      <span key={sub} className="text-[10px] text-slate-300 font-mono bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700/60">
                                        {sub}: <strong className="text-emerald-400">{sc.simulationScore ?? 0}</strong>
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-amber-400 text-[10px] font-semibold bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded-md">
                                Belum Ikut
                              </span>
                            )}
                          </td>

                          {/* Penyisihan Status & Score Display */}
                          <td className="py-3 px-3">
                            {p.penyisihanCompleted ? (
                              <div className="space-y-1">
                                <span className={`inline-flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-md border shadow-xs ${
                                  (p.penyisihanScore ?? 0) >= (settings?.passingScorePenyisihan || 70)
                                    ? 'text-emerald-300 bg-emerald-950/90 border-emerald-600/70'
                                    : 'text-amber-300 bg-amber-950/90 border-amber-700/70'
                                }`}>
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>{p.penyisihanScore ?? 0} / 100</span>
                                </span>
                                {p.subjectScores && Object.keys(p.subjectScores).length > 0 && (
                                  <div className="flex flex-col gap-0.5 mt-0.5">
                                    {Object.entries(p.subjectScores).map(([sub, sc]) => sc.penyisihanCompleted && (
                                      <span key={sub} className="text-[10px] text-slate-300 font-mono bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700/60">
                                        {sub}: <strong className="text-amber-300">{sc.penyisihanScore ?? 0}</strong>
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-slate-400 text-[10px] font-medium bg-slate-900 border border-slate-700 px-2 py-0.5 rounded-md">
                                Belum Ujian
                              </span>
                            )}
                          </td>

                          {/* Status Kelolosan dropdown (Poin 7) */}
                          <td className="py-3 px-3">
                            <select
                              value={p.isQualifiedFinal}
                              onChange={e => handleChangeQualification(p, e.target.value as any)}
                              className={`text-[11px] font-bold rounded-lg px-2 py-1 border outline-hidden ${
                                p.isQualifiedFinal === 'Lolos'
                                  ? 'bg-emerald-900 border-emerald-600 text-emerald-200'
                                  : p.isQualifiedFinal === 'Tidak Lolos'
                                  ? 'bg-red-900 border-red-600 text-red-200'
                                  : 'bg-slate-900 border-slate-700 text-slate-300'
                              }`}
                            >
                              <option value="Menunggu">Menunggu</option>
                              <option value="Lolos">Lolos Final</option>
                              <option value="Tidak Lolos">Tidak Lolos</option>
                            </select>
                          </td>

                          {/* Tiket Final Closing Status & Toggle (Poin 8 & 9) */}
                          <td className="py-3 px-3">
                            <button
                              onClick={() => handleToggleFinalPayment(p)}
                              className={`text-[11px] font-black px-2.5 py-1 rounded-xl flex items-center gap-1 cursor-pointer transition-all shadow-xs ${
                                p.finalTicketPaid
                                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                  : 'bg-red-950/90 hover:bg-red-900 border border-red-800 text-red-300'
                              }`}
                            >
                              {p.finalTicketPaid ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>CLOSING LUNAS</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3.5 h-3.5" />
                                  <span>BELUM BAYAR</span>
                                </>
                              )}
                            </button>
                          </td>

                          {/* Nilai Babak Final (Permintaan 1 & 2: Nilai Babak Final Tampil di Tabel Admin) */}
                          <td className="py-3 px-3 bg-amber-950/15 border-x border-amber-900/20">
                            {p.finalCompleted ? (
                              <div className="space-y-1">
                                <span className="inline-flex items-center gap-1.5 text-xs font-black text-amber-200 bg-gradient-to-r from-amber-900 via-purple-900 to-indigo-950 border border-amber-500/80 px-2.5 py-1 rounded-lg shadow-md animate-pulse">
                                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                                  <span>{p.finalScore ?? 0} / 100</span>
                                </span>
                                {p.subjectScores && Object.keys(p.subjectScores).length > 0 && (
                                  <div className="flex flex-col gap-0.5 mt-0.5">
                                    {Object.entries(p.subjectScores).map(([sub, sc]) => sc.finalCompleted && (
                                      <span key={sub} className="text-[10px] text-amber-300 font-mono bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-700/60">
                                        {sub}: <strong className="text-white">{sc.finalScore ?? 0}</strong>
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : p.finalTicketPaid ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-300 bg-blue-950/80 border border-blue-700/60 px-2 py-0.5 rounded-md">
                                ⏳ Tiket Lunas (Belum Ujian)
                              </span>
                            ) : p.isQualifiedFinal === 'Lolos' ? (
                              <span className="text-amber-400/90 text-[10px] bg-amber-950/50 border border-amber-800/40 px-2 py-0.5 rounded-md">
                                Lolos (Belum Tiket)
                              </span>
                            ) : (
                              <span className="text-slate-500 text-[10px] italic">
                                Belum Final
                              </span>
                            )}
                          </td>

                          {/* Tombol Input / Edit Nilai untuk Admin */}
                          <td className="py-3 px-3 text-center">
                            <button
                              onClick={() => handleOpenScoreEditModal(p)}
                              className="inline-flex items-center gap-1 bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 hover:text-white border border-indigo-700/80 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer shadow-xs"
                              title="Input atau ubah skor Simulasi, Penyisihan, atau Babak Final"
                            >
                              <Edit3 className="w-3 h-3 text-indigo-300" />
                              <span>Edit Nilai</span>
                            </button>
                          </td>

                          {/* Action WhatsApp Follow-Up: 3 tombol per anak */}
                          <td className="py-3 px-3">
                            <div className="flex flex-col gap-1 text-[10px]">
                              {!p.simulationCompleted && (
                                <a
                                  href={getFollowUpWaLink(p, 'simulasi')}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700 px-2 py-0.5 rounded-md"
                                >
                                  <MessageCircle className="w-3 h-3 text-blue-400" />
                                  <span>Remind Simulasi</span>
                                </a>
                              )}
                              {!p.penyisihanCompleted && (
                                <a
                                  href={getFollowUpWaLink(p, 'penyisihan')}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 bg-amber-900/60 hover:bg-amber-800 text-amber-200 border border-amber-700 px-2 py-0.5 rounded-md"
                                >
                                  <MessageCircle className="w-3 h-3 text-amber-400" />
                                  <span>Remind H-1 Penyisihan</span>
                                </a>
                              )}
                              {p.isQualifiedFinal === 'Lolos' && !p.finalTicketPaid && (
                                <a
                                  href={getFollowUpWaLink(p, 'final')}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700 px-2 py-0.5 rounded-md font-bold"
                                >
                                  <MessageCircle className="w-3 h-3 text-emerald-400" />
                                  <span>Follow-Up Tiket 99k</span>
                                </a>
                              )}
                              {p.simulationCompleted && p.penyisihanCompleted && p.finalTicketPaid && (
                                <span className="text-emerald-400 text-[10px]">✓ Follow-Up Selesai</span>
                              )}
                            </div>
                          </td>

                          {/* Tombol Hapus per Siswa (Poin 13 & 21) */}
                          <td className="py-3 px-3 text-center">
                            <button
                              onClick={() => handleDeleteParticipant(p.id, p.studentName)}
                              title="Hapus data siswa ini"
                              className="p-1.5 bg-red-950/80 hover:bg-red-900 text-red-400 hover:text-red-200 rounded-lg border border-red-800 transition-all cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BANK SOAL CBT (Poin 10, 11, 12, 17, 19, 20, 21) */}
        {activeTab === 'questions' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Kategori:</label>
                  <select
                    value={qCategoryFilter}
                    onChange={e => setQCategoryFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-xs text-white px-3 py-1.5 rounded-xl outline-hidden"
                  >
                    <option value="Kategori Pra-TK & TK">Kategori Pra-TK & TK (PAUD/TK)</option>
                    <option value="Kategori A">Kategori A (SD 1-2)</option>
                    <option value="Kategori B">Kategori B (SD 3-4)</option>
                    <option value="Kategori C">Kategori C (SD 5-6 / SMP)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Mata Pelajaran:</label>
                  <select
                    value={qSubjectFilter}
                    onChange={e => setQSubjectFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-xs text-white px-3 py-1.5 rounded-xl outline-hidden"
                  >
                    <option value="Matematika">Matematika</option>
                    <option value="IPA/Sains">IPA/Sains</option>
                    <option value="Bahasa Inggris">Bahasa Inggris</option>
                    <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons: Add, Batch Delete, Export, Import */}
              <div className="flex flex-wrap items-center gap-2">
                {selectedQuestionIds.length > 0 && (
                  <button
                    onClick={handleBatchDeleteQuestions}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2 px-3.5 rounded-xl flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus Massal ({selectedQuestionIds.length})</span>
                  </button>
                )}

                <button
                  onClick={handleExportQuestionsJSON}
                  className="bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold py-2 px-3 rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>

                <label className="bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold py-2 px-3 rounded-xl flex items-center gap-1 cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import Soal</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportQuestions}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={handleOpenAddQuestion}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Soal Baru</span>
                </button>
              </div>
            </div>

            {/* Questions Table */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-3 bg-slate-950/80 border-b border-slate-700 flex items-center justify-between text-xs text-slate-400">
                <button
                  onClick={handleSelectAllQuestions}
                  className="flex items-center gap-2 text-slate-300 hover:text-white cursor-pointer"
                >
                  {selectedQuestionIds.length === questions.length && questions.length > 0 ? (
                    <CheckSquare className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                  <span>Pilih Semua Soal ({selectedQuestionIds.length}/{questions.length})</span>
                </button>
                <span>Format CBT: Tiap Ujian Mengacak 20 Soal (Bobot 5 Poin/Soal = 100 Poin)</span>
              </div>

              <div className="divide-y divide-slate-700/60">
                {questions.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    Belum ada soal untuk kategori dan mapel ini.
                  </div>
                ) : (
                  questions.map((q, idx) => {
                    const isSelected = selectedQuestionIds.includes(q.id);
                    return (
                      <div
                        key={q.id}
                        className={`p-4 flex flex-col md:flex-row items-start justify-between gap-4 transition-colors ${
                          isSelected ? 'bg-amber-950/20' : 'hover:bg-slate-700/20'
                        }`}
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <button
                            onClick={() => handleToggleSelectQuestion(q.id)}
                            className="mt-0.5 text-slate-400 hover:text-white cursor-pointer"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-amber-400" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>

                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-amber-400 text-xs">#{idx + 1}</span>
                              <span className="text-[10px] font-mono text-slate-400">ID: {q.id}</span>
                              <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">
                                5 Poin
                              </span>
                            </div>

                            <p className="text-sm font-medium text-slate-100">{q.question}</p>

                            {/* Options A - D */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2">
                              {q.options.map((opt, optIdx) => {
                                const letter = String.fromCharCode(65 + optIdx);
                                const isCorrect = opt.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
                                return (
                                  <div
                                    key={optIdx}
                                    className={`p-2 rounded-xl border flex items-center gap-2 ${
                                      isCorrect
                                        ? 'bg-emerald-950/80 border-emerald-600 text-emerald-200 font-bold'
                                        : 'bg-slate-900 border-slate-800 text-slate-300'
                                    }`}
                                  >
                                    <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center font-bold text-[10px]">
                                      {letter}
                                    </span>
                                    <span>{opt}</span>
                                    {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-auto" />}
                                  </div>
                                );
                              })}
                            </div>

                            {q.explanation && (
                              <p className="text-[11px] text-slate-400 italic pt-1">
                                Pembahasan: {q.explanation}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Edit & Delete Single Question Action Buttons (Poin 19 & 21) */}
                        <div className="flex items-center gap-2 self-end md:self-start">
                          <button
                            onClick={() => handleOpenEditQuestion(q)}
                            className="p-2 bg-slate-700 hover:bg-slate-600 text-amber-300 rounded-xl transition-all cursor-pointer"
                            title="Edit Soal"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSingleQuestion(q.id)}
                            className="p-2 bg-red-950 hover:bg-red-900 text-red-300 rounded-xl transition-all cursor-pointer"
                            title="Hapus Soal"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TABEL LAPORAN PENGERJAAN UJIAN (Poin 23, 24, 25, 26) */}
        {activeTab === 'reports' && (
          <div className="space-y-4">
            {/* Sub-tab navigation */}
            <div className="flex items-center gap-3 border-b border-slate-700 pb-3">
              <button
                onClick={() => setReportSubTab('simulasi')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  reportSubTab === 'simulasi'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Laporan Pengerjaan Simulasi (Try Out)
              </button>
              <button
                onClick={() => setReportSubTab('penyisihan')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  reportSubTab === 'penyisihan'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Laporan Pengerjaan Babak Penyisihan
              </button>
              <button
                onClick={() => setReportSubTab('final')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  reportSubTab === 'final'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Laporan Pengerjaan Babak Final
              </button>
            </div>

            {/* Reports Table with scores clearly visible (Poin 26) */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-200">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-bold text-[10px] border-b border-slate-700">
                    <tr>
                      <th className="py-3 px-3">No</th>
                      <th className="py-3 px-3">ID & Nama Peserta</th>
                      <th className="py-3 px-3">Kategori & Mapel</th>
                      <th className="py-3 px-3">Skor Ujian (Max 100)</th>
                      <th className="py-3 px-3">Jawaban Benar</th>
                      <th className="py-3 px-3">Jawaban Salah</th>
                      <th className="py-3 px-3">Waktu Selesai</th>
                      <th className="py-3 px-3">Anti-Contek</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60 font-medium">
                    {reports.filter(r => r.examType === reportSubTab).length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-slate-400">
                          Belum ada riwayat pengerjaan untuk kategori {reportSubTab}.
                        </td>
                      </tr>
                    ) : (
                      reports
                        .filter(r => r.examType === reportSubTab)
                        .map((rep, idx) => (
                          <tr key={rep.id} className="hover:bg-slate-700/30 transition-colors">
                            <td className="py-3 px-3 text-slate-400">{idx + 1}</td>
                            <td className="py-3 px-3">
                              <p className="font-bold text-white text-xs">{rep.studentName}</p>
                              <p className="text-[11px] font-mono text-amber-400">{rep.participantId}</p>
                            </td>
                            <td className="py-3 px-3">
                              <p className="text-slate-300">{rep.category}</p>
                              <p className="text-[11px] text-blue-300">{rep.subject}</p>
                            </td>
                            {/* NILAI PESERTA TAMPIL JELAS (Poin 26) */}
                            <td className="py-3 px-3">
                              <span className="text-lg font-black text-amber-400">
                                {rep.score}
                              </span>
                              <span className="text-slate-500 text-[11px]"> / 100</span>
                            </td>
                            <td className="py-3 px-3 text-emerald-400 font-bold">
                              {rep.correctCount} Soal ({rep.correctCount * 5} Poin)
                            </td>
                            <td className="py-3 px-3 text-red-400 font-bold">
                              {rep.wrongCount} Soal
                            </td>
                            <td className="py-3 px-3 text-slate-400 text-[11px]">
                              {new Date(rep.completedAt).toLocaleString('id-ID')}
                            </td>
                            <td className="py-3 px-3">
                              {rep.violationsDetected > 0 ? (
                                <span className="bg-red-900/60 text-red-300 border border-red-700 px-2 py-0.5 rounded-md text-[10px] font-bold">
                                  {rep.violationsDetected}x Tab Switch
                                </span>
                              ) : (
                                <span className="text-emerald-400 text-[10px]">✓ Bersih</span>
                              )}
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PENGATURAN SISTEM & PIXEL META (Poin 1, 15, 16) */}
        {activeTab === 'settings' && settings && (
          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-4xl">
            {/* Meta Pixel Configuration (Poin 1) */}
            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-700 pb-3">
                <Code className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Pengaturan Iklan & Meta Pixel (Facebook Ads)
                </h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Meta Pixel ID
                </label>
                <input
                  type="text"
                  value={settings.metaPixelId}
                  onChange={e => setSettings({ ...settings, metaPixelId: e.target.value })}
                  placeholder="Contoh: 123456789012345"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs outline-hidden focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Kode Script HTML Meta Pixel (Header Injection)
                </label>
                <textarea
                  rows={4}
                  value={settings.metaPixelScript}
                  onChange={e => setSettings({ ...settings, metaPixelScript: e.target.value })}
                  placeholder="<!-- Meta Pixel Event Tracker Code -->"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs outline-hidden focus:border-amber-400"
                />
              </div>
            </div>

            {/* Tanggal Pelaksanaan Ujian (Poin 15) */}
            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-700 pb-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Jadwal Pelaksanaan Ujian Nasional
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Tanggal Pelaksanaan Babak Penyisihan:
                  </label>
                  <input
                    type="date"
                    value={settings.dates.penyisihanDate}
                    onChange={e => setSettings({
                      ...settings,
                      dates: { ...settings.dates, penyisihanDate: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Tanggal Pengumuman Lolos H+2:
                  </label>
                  <input
                    type="date"
                    value={settings.dates.pengumumanPenyisihanDate}
                    onChange={e => setSettings({
                      ...settings,
                      dates: { ...settings.dates, pengumumanPenyisihanDate: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Batas Akhir Promo Tiket Final (BCA 99rb):
                  </label>
                  <input
                    type="date"
                    value={settings.dates.finalTicketDeadline}
                    onChange={e => setSettings({
                      ...settings,
                      dates: { ...settings.dates, finalTicketDeadline: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Tanggal Pelaksanaan Babak Final:
                  </label>
                  <input
                    type="date"
                    value={settings.dates.finalDate}
                    onChange={e => setSettings({
                      ...settings,
                      dates: { ...settings.dates, finalDate: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Anti-Cheat & Passing Grade (Poin 16) */}
            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-700 pb-3">
                <Shield className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Keamanan CBT & Nilai Ambang Batas
                </h3>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-900 rounded-2xl border border-slate-700">
                <div>
                  <p className="text-xs font-bold text-white">Sistem Anti-Contek (Tab Lock & Anti-Copy)</p>
                  <p className="text-[11px] text-slate-400">
                    Mencatat pelanggaran saat siswa beralih tab dan mencegah copy paste jawaban.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.antiCheatEnabled}
                    onChange={e => setSettings({ ...settings, antiCheatEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Passing Score Kelolosan Penyisihan ke Final (Skor Minimal):
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.passingScorePenyisihan}
                  onChange={e => setSettings({ ...settings, passingScorePenyisihan: parseInt(e.target.value) || 70 })}
                  className="w-32 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3 px-8 rounded-2xl shadow-xl transition-all cursor-pointer text-sm"
            >
              SIMPAN SELURUH PENGATURAN
            </button>
          </form>
        )}
      </main>

      {/* Modal Add / Edit Question */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-xl w-full text-left shadow-2xl space-y-4 my-8">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              {editingQuestion ? 'Edit Soal CBT' : 'Tambah Butir Soal Baru'}
            </h3>

            <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Kategori Jenjang:</label>
                  <select
                    value={qForm.category}
                    onChange={e => setQForm({ ...qForm, category: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-white outline-hidden"
                  >
                    <option value="Kategori Pra-TK & TK">Kategori Pra-TK & TK (PAUD/TK)</option>
                    <option value="Kategori A">Kategori A (SD 1-2)</option>
                    <option value="Kategori B">Kategori B (SD 3-4)</option>
                    <option value="Kategori C">Kategori C (SD 5-6/SMP)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Mata Pelajaran:</label>
                  <select
                    value={qForm.subject}
                    onChange={e => setQForm({ ...qForm, subject: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-white outline-hidden"
                  >
                    <option value="Matematika">Matematika</option>
                    <option value="IPA/Sains">IPA/Sains</option>
                    <option value="Bahasa Inggris">Bahasa Inggris</option>
                    <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Teks Pertanyaan / Soal HOTS:</label>
                <textarea
                  rows={3}
                  value={qForm.question}
                  onChange={e => setQForm({ ...qForm, question: e.target.value })}
                  placeholder="Tuliskan butir soal di sini..."
                  required
                  className="w-full bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-white outline-hidden"
                />
              </div>

              {/* 4 Options */}
              <div className="space-y-2">
                <label className="block text-slate-400 font-bold">Pilihan Jawaban (A, B, C, D):</label>
                {qForm.options.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center font-bold text-slate-400">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <input
                      type="text"
                      value={opt}
                      onChange={e => {
                        const newOpts = [...qForm.options];
                        newOpts[i] = e.target.value;
                        setQForm({ ...qForm, options: newOpts });
                      }}
                      placeholder={`Pilihan ${String.fromCharCode(65 + i)}`}
                      required
                      className="flex-1 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl text-white outline-hidden"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Kunci Jawaban Benar:</label>
                <select
                  value={qForm.correctAnswer}
                  onChange={e => setQForm({ ...qForm, correctAnswer: e.target.value })}
                  required
                  className="w-full bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-white outline-hidden font-bold"
                >
                  <option value="">-- Pilih Jawaban Benar --</option>
                  {qForm.options.map((opt, i) => (
                    opt ? <option key={i} value={opt}>{String.fromCharCode(65 + i)}: {opt}</option> : null
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Pembahasan Soal (Opsional):</label>
                <input
                  type="text"
                  value={qForm.explanation}
                  onChange={e => setQForm({ ...qForm, explanation: e.target.value })}
                  placeholder="Penjelasan ringkas konsep penyelesaian..."
                  className="w-full bg-slate-800 border border-slate-700 px-3 py-2 rounded-xl text-white outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddQuestionModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold cursor-pointer"
                >
                  Simpan Soal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KELOLA & INPUT NILAI PESERTA (SIMULASI, PENYISIHAN, BABAK FINAL) */}
      {editingScoreParticipant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-lg w-full text-left shadow-2xl space-y-5 my-8">
            <div className="border-b border-slate-800 pb-3 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-md">
                  {editingScoreParticipant.id}
                </span>
                <h3 className="text-base font-extrabold text-white mt-1.5">
                  Input / Perbarui Nilai Peserta
                </h3>
                <p className="text-xs text-slate-400">
                  {editingScoreParticipant.studentName} • {editingScoreParticipant.schoolName}
                </p>
              </div>
              <button
                onClick={() => setEditingScoreParticipant(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveScore} className="space-y-4 text-xs">
              {/* Mapel selector if student registered multiple subjects */}
              {(editingScoreParticipant.subjects && editingScoreParticipant.subjects.length > 1) && (
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Pilih Mata Pelajaran:</label>
                  <div className="flex flex-wrap gap-2">
                    {editingScoreParticipant.subjects.map(s => {
                      const isActive = scoreForm.activeSubject === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => {
                            const subScores = scoreForm.subjectScores?.[s];
                            setScoreForm(prev => ({
                              ...prev,
                              activeSubject: s,
                              simulationCompleted: subScores?.simulationCompleted ?? prev.simulationCompleted,
                              simulationScore: subScores?.simulationScore ?? prev.simulationScore,
                              penyisihanCompleted: subScores?.penyisihanCompleted ?? prev.penyisihanCompleted,
                              penyisihanScore: subScores?.penyisihanScore ?? prev.penyisihanScore,
                              finalCompleted: subScores?.finalCompleted ?? prev.finalCompleted,
                              finalScore: subScores?.finalScore ?? prev.finalScore
                            }));
                          }}
                          className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                            isActive
                              ? 'bg-amber-400 text-slate-950 shadow-md'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION 1: SIMULASI */}
              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    <span>1. Nilai Simulasi Mandiri (0 - 100)</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={scoreForm.simulationCompleted}
                      onChange={e => setScoreForm({ ...scoreForm, simulationCompleted: e.target.checked })}
                      className="rounded accent-amber-500"
                    />
                    <span>Selesai Simulasi</span>
                  </label>
                </div>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={scoreForm.simulationScore}
                  onChange={e => setScoreForm({ ...scoreForm, simulationScore: Number(e.target.value) || 0 })}
                  placeholder="Contoh: 90"
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded-xl text-white font-bold text-sm outline-hidden focus:border-cyan-400"
                />
              </div>

              {/* SECTION 2: BABAK PENYISIHAN */}
              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>2. Nilai Babak Penyisihan (0 - 100)</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={scoreForm.penyisihanCompleted}
                      onChange={e => setScoreForm({ ...scoreForm, penyisihanCompleted: e.target.checked })}
                      className="rounded accent-amber-500"
                    />
                    <span>Selesai Penyisihan</span>
                  </label>
                </div>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={scoreForm.penyisihanScore}
                  onChange={e => setScoreForm({ ...scoreForm, penyisihanScore: Number(e.target.value) || 0 })}
                  placeholder="Contoh: 85"
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded-xl text-white font-bold text-sm outline-hidden focus:border-emerald-400"
                />
              </div>

              {/* SECTION 3: STATUS LOLOS & TIKET FINAL */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1.5">
                  <label className="font-bold text-white block">Status Kelolosan Final:</label>
                  <select
                    value={scoreForm.isQualifiedFinal}
                    onChange={e => setScoreForm({ ...scoreForm, isQualifiedFinal: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 px-2.5 py-1.5 rounded-xl text-white outline-hidden font-bold"
                  >
                    <option value="Menunggu">Menunggu</option>
                    <option value="Lolos">Lolos Final</option>
                    <option value="Tidak Lolos">Tidak Lolos</option>
                  </select>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1.5">
                  <label className="font-bold text-white block">Status Tiket Final 99k:</label>
                  <select
                    value={scoreForm.finalTicketPaid ? 'PAID' : 'UNPAID'}
                    onChange={e => setScoreForm({ ...scoreForm, finalTicketPaid: e.target.value === 'PAID' })}
                    className="w-full bg-slate-900 border border-slate-700 px-2.5 py-1.5 rounded-xl text-white outline-hidden font-bold"
                  >
                    <option value="UNPAID">Belum Bayar</option>
                    <option value="PAID">Closing / Lunas (BCA)</option>
                  </select>
                </div>
              </div>

              {/* SECTION 4: NILAI BABAK FINAL */}
              <div className="p-3.5 bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-slate-900 rounded-2xl border border-amber-500/50 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-extrabold text-amber-300 flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span>3. Nilai Babak Final Nasional (0 - 100)</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-amber-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={scoreForm.finalCompleted}
                      onChange={e => setScoreForm({ ...scoreForm, finalCompleted: e.target.checked })}
                      className="rounded accent-amber-500"
                    />
                    <span>Selesai Ujian Final</span>
                  </label>
                </div>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={scoreForm.finalScore}
                  onChange={e => setScoreForm({ ...scoreForm, finalScore: Number(e.target.value) || 0 })}
                  placeholder="Contoh: 95"
                  className="w-full bg-slate-950 border border-amber-500/60 px-3 py-2 rounded-xl text-amber-300 font-black text-base outline-hidden focus:border-amber-400"
                />
                <p className="text-[10px] text-amber-200/70">
                  Nilai ini langsung tersimpan ke database dan tampil di tabel admin serta portal mandiri siswa.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingScoreParticipant(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black cursor-pointer shadow-lg"
                >
                  SIMPAN PERUBAHAN NILAI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
