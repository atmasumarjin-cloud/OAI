import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { LogoOlimpiade, LogoYayasan } from './Logos';
import { APP_CONFIG } from '../../appConfig.js';
import { Participant, QuestionItem, ApiService, SystemSettings } from '../services/apiClient';
import { Clock, ShieldAlert, CheckCircle, ChevronLeft, ChevronRight, Award, AlertTriangle, Send } from 'lucide-react';

interface CBTExamRoomProps {
  student: Participant;
  examType: 'simulasi' | 'penyisihan' | 'final';
  subject?: string;
  settings: SystemSettings | null;
  onExamFinished: (updatedStudent: Participant, score: number) => void;
  onExit: () => void;
}

export const CBTExamRoom: React.FC<CBTExamRoomProps> = ({
  student,
  examType,
  subject,
  settings,
  onExamFinished,
  onExit
}) => {
  const activeSubject = subject || (student.subjects && student.subjects.length > 0 ? student.subjects[0] : student.subject);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState((settings?.examDurationMinutes || 30) * 60);
  const [violations, setViolations] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [examResult, setExamResult] = useState<any | null>(null);

  const antiCheat = settings?.antiCheatEnabled ?? true;

  // Load 20 Random Questions for Category & Subject
  useEffect(() => {
    let isMounted = true;
    const loadQuestions = async () => {
      setLoading(true);
      const data = await ApiService.getRandom20Questions(student.category, activeSubject);
      if (isMounted) {
        if (data && data.length > 0) {
          setQuestions(data);
        } else {
          // Fallback if network issue: generate 20 items
          const fallbackList = Array.from({ length: 20 }, (_, i) => ({
            id: `FB-${i + 1}`,
            number: i + 1,
            category: student.category,
            subject: activeSubject,
            question: `[Soal Nomor ${i + 1}] Berapakah hasil penalaran analitis standar olimpiade ${activeSubject} untuk ${student.category}?`,
            options: ["Pilihan A (Tepat)", "Pilihan B", "Pilihan C", "Pilihan D"],
            points: 5
          }));
          setQuestions(fallbackList);
        }
        setLoading(false);
      }
    };
    loadQuestions();
    return () => {
      isMounted = false;
    };
  }, [student.category, activeSubject]);

  // Anti-cheat Listeners: Tab switching & visibility
  useEffect(() => {
    if (!antiCheat || examResult) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setViolations(v => {
          const next = v + 1;
          setWarningMessage(`PERINGATAN SISTEM ANTI-CONTEK: Anda terdeteksi berpindah tab atau meninggalkan jendela ujian! Pelanggaran #${next}. Harap tetap berada di halaman ujian.`);
          setShowWarningModal(true);
          return next;
        });
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent copy/paste shortcuts
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v' || e.key === 'u' || e.key === 's')) {
        e.preventDefault();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [antiCheat, examResult]);

  // Timer countdown
  useEffect(() => {
    if (examResult || loading) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [examResult, loading, answers]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];

  const handleSelectOption = (option: string) => {
    if (!currentQ || examResult) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: option
    }));
  };

  const handleSubmitExam = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await ApiService.submitExam({
        participantId: student.id,
        examType,
        userAnswers: answers,
        category: student.category,
        subject: activeSubject,
        violationsCount: violations
      });

      setExamResult(res);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }

      if (res.participant) {
        onExamFinished(res.participant, res.score);
      }
    } catch (err) {
      console.error('Error submitting exam', err);
    } finally {
      setSubmitting(false);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const examTitle =
    examType === 'simulasi'
      ? 'SIMULASI TRY OUT MANDIRI'
      : examType === 'penyisihan'
      ? 'UJIAN RESMI BABAK PENYISIHAN'
      : 'UJIAN RESMI BABAK FINAL';

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
        <LogoOlimpiade className="h-16 mb-4" variant="light" />
        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
        <h2 className="text-xl font-bold">Menyiapkan 20 Butir Soal Terstandar...</h2>
        <p className="text-xs text-slate-400 mt-1">Mengacak bank soal resmi {student.category} - {student.subject}</p>
      </div>
    );
  }

  // Result Modal / Screen
  if (examResult) {
    const isPassing = examResult.score >= (settings?.passingScorePenyisihan || 70);
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 max-w-lg w-full text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />
          
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center mb-5">
            <Award className="w-10 h-10 text-amber-400" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            Hasil {examTitle}
          </span>

          <h2 className="text-2xl sm:text-3xl font-black mt-3 text-white">
            {student.studentName}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {student.category} • {student.subject} ({student.schoolName})
          </p>

          {/* Big Score Display */}
          <div className="my-6 p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Skor Akhir Ujian</p>
            <div className="text-5xl sm:text-6xl font-black text-amber-400 my-2">
              {examResult.score}
              <span className="text-xl text-slate-500 font-medium"> / 100</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-700/80">
              <div className="text-emerald-400 font-semibold">
                ✓ Benar: {examResult.correctCount} Soal ({examResult.correctCount * 5} Poin)
              </div>
              <div className="text-red-400 font-semibold">
                ✗ Salah / Kosong: {examResult.wrongCount} Soal
              </div>
            </div>
          </div>

          {examType === 'penyisihan' && (
            <div className={`p-4 rounded-xl mb-6 text-xs text-left ${isPassing ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-200' : 'bg-amber-950/60 border border-amber-500/40 text-amber-200'}`}>
              <p className="font-bold text-sm mb-1">
                {isPassing ? '🎉 SELAMAT! Anda Berhak Melaju ke Babak Final' : 'Tetap Semangat! Hasil Anda Sedang Ditinjau Panitia'}
              </p>
              <p>
                {isPassing
                  ? 'Nilai Anda melampaui batas kualifikasi. Silakan lakukan klaim Promo Tiket Final Rp 99.000 (diskon dari Rp 180.000) melalui dashboard peserta.'
                  : 'Pengumuman resmi kelolosan dan pemenang babak penyisihan diterbitkan pada H+2 di portal pengumuman.'}
              </p>
            </div>
          )}

          <button
            onClick={onExit}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black py-3.5 px-6 rounded-2xl shadow-xl transition-all cursor-pointer"
          >
            KEMBALI KE DASHBOARD PESERTA
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col select-none">
      {/* Top Header CBT Bar */}
      <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-30 px-4 py-3 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoOlimpiade className="h-10" variant="light" showText={false} />
            <div>
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">{examTitle}</p>
              <p className="text-xs text-slate-300 font-medium truncate max-w-[200px] sm:max-w-xs">
                {student.studentName} ({student.category})
              </p>
            </div>
          </div>

          {/* Timer and Anti-Cheat Badge */}
          <div className="flex items-center gap-3">
            {antiCheat && (
              <div className="hidden sm:flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg text-[11px] text-emerald-400">
                <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                <span>Anti-Contek Aktif</span>
                {violations > 0 && (
                  <span className="bg-red-500 text-white px-1.5 py-0.2 rounded-full font-bold text-[10px]">
                    {violations}
                  </span>
                )}
              </div>
            )}

            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-sm font-black border ${
              timeLeft < 300
                ? 'bg-red-950/80 border-red-500 text-red-300 animate-pulse'
                : 'bg-slate-800 border-slate-700 text-amber-400'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTimer(timeLeft)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Exam Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Question Content */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-slate-900/60 border border-slate-800 rounded-3xl p-5 sm:p-8 backdrop-blur-sm">
          <div>
            {/* Question Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-blue-900/60 text-blue-300 px-3 py-1 rounded-lg border border-blue-700/50">
                  Soal Nomor {currentIndex + 1} dari {questions.length}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  (Bobot: 5 Poin)
                </span>
              </div>
              <span className="text-xs text-amber-300 font-medium">
                {student.subject}
              </span>
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed mb-8">
              {currentQ?.question}
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQ?.options?.map((opt: string, optIdx: number) => {
                const optLetter = String.fromCharCode(65 + optIdx); // A, B, C, D
                const isSelected = answers[currentQ.id] === opt;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left text-sm sm:text-base font-medium transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg shadow-amber-500/10'
                        : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/70 text-slate-200'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 font-black'
                        : 'bg-slate-700 text-slate-300'
                    }`}>
                      {optLetter}
                    </div>
                    <span className="flex-1">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Question Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-slate-800">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-xl border border-slate-700 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold py-2.5 px-5 rounded-xl transition-all cursor-pointer"
              >
                <span>Selanjutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                disabled={submitting}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs sm:text-sm font-black py-2.5 px-6 rounded-xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>SELESAI & KUMPULKAN</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Question Number Grid & Status */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Daftar Nomor Soal (20 Soal)
              </h4>
              <span className="text-xs text-amber-400 font-semibold">
                Terjawab: {answeredCount}/20
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2.5">
              {questions.map((q, idx) => {
                const isAnswered = Boolean(answers[q.id]);
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 rounded-xl font-bold text-xs flex items-center justify-center transition-all cursor-pointer border ${
                      isCurrent
                        ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900'
                        : ''
                    } ${
                      isAnswered
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-around text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-emerald-600 inline-block" />
                <span>Sudah Dijawab</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-slate-800 border border-slate-700 inline-block" />
                <span>Belum Dijawab</span>
              </div>
            </div>
          </div>

          {/* Quick Submit Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 backdrop-blur-sm text-center">
            <p className="text-xs text-slate-400 mb-3">
              Periksa kembali seluruh jawaban sebelum mengumpulkan ujian.
            </p>
            <button
              onClick={handleSubmitExam}
              disabled={submitting}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-lg transition-all cursor-pointer"
            >
              {submitting ? 'Mengirim Jawaban...' : 'SELESAIKAN UJIAN SEKARANG'}
            </button>
          </div>
        </div>
      </main>

      {/* Warning Modal (Anti-Cheat) */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-slate-900 border-2 border-red-500 rounded-3xl p-6 max-w-md w-full text-center shadow-2xl">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mb-3">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-red-400">Peringatan Integritas Ujian!</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {warningMessage}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Setiap perpindahan tab tercatat di log laporan panitia untuk evaluasi kelolosan.
            </p>
            <button
              onClick={() => setShowWarningModal(false)}
              className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs"
            >
              Saya Mengerti & Kembali ke Ujian
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
