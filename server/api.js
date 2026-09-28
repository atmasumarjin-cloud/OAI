import express from 'express';
import { GoogleGenAI } from '@google/genai';
import { APP_CONFIG } from '../appConfig.js';
import { DEFAULT_SETTINGS, DEFAULT_QUESTIONS, generateQuestionPool } from './defaultData.js';

const router = express.Router();
router.use(express.json());

// In-Memory Database with Pre-seeded Realistic Data
let appSettings = { ...DEFAULT_SETTINGS };

let questionBank = [];
// Seed 25 items per category & subject
const categories = ["Kategori Pra-TK & TK", "Kategori A", "Kategori B", "Kategori C"];
const subjects = ["Matematika", "IPA/Sains", "Bahasa Inggris", "Bahasa Indonesia"];

for (const cat of categories) {
  for (const sub of subjects) {
    const pool = generateQuestionPool(cat, sub);
    questionBank.push(...pool);
  }
}

// Initial realistic pre-seeded participants so admin table has data immediately
let participants = [
  {
    id: "OAI-2026-001",
    studentName: "Muhammad Rayhan Pratama",
    parentName: "Bambang Pratama, S.T.",
    whatsapp: "6281234567801",
    schoolName: "TK B & SD Islam Al-Azhar 1",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    category: "Kategori Pra-TK & TK",
    subject: "Matematika, Bahasa Inggris",
    subjects: ["Matematika", "Bahasa Inggris"],
    registeredAt: "2026-09-20T08:15:00Z",
    hasFollowedSosmed: true,
    simulationCompleted: true,
    simulationScore: 95,
    penyisihanCompleted: true,
    penyisihanScore: 90,
    isQualifiedFinal: "Lolos", // "Lolos" | "Tidak Lolos" | "Menunggu"
    finalTicketPaid: true,     // Has paid 99k promo
    finalCompleted: true,
    finalScore: 95,
    subjectScores: {
      "Matematika": { simulationCompleted: true, simulationScore: 95, penyisihanCompleted: true, penyisihanScore: 90, finalCompleted: true, finalScore: 95 },
      "Bahasa Inggris": { simulationCompleted: true, simulationScore: 90, penyisihanCompleted: false }
    },
    notes: "Sudah konfirmasi via WhatsApp admin & bukti bayar valid (Peserta Cilik Berprestasi)"
  },
  {
    id: "OAI-2026-002",
    studentName: "Aqeela Zahra Salsabila",
    parentName: "Dewi Kartika",
    whatsapp: "6281398765432",
    schoolName: "SDIT Nurul Fikri",
    city: "Depok",
    province: "Jawa Barat",
    category: "Kategori B",
    subject: "IPA/Sains",
    registeredAt: "2026-09-21T10:30:00Z",
    hasFollowedSosmed: true,
    simulationCompleted: true,
    simulationScore: 95,
    penyisihanCompleted: true,
    penyisihanScore: 90,
    isQualifiedFinal: "Lolos",
    finalTicketPaid: false, // Belum closing pembayaran
    finalCompleted: false,
    finalScore: null,
    notes: "Perlu reminder pembayaran tiket final promo 99rb"
  },
  {
    id: "OAI-2026-003",
    studentName: "Nicholas Evan Wijaya",
    parentName: "Andreas Wijaya",
    whatsapp: "6285211223344",
    schoolName: "SDK Penabur",
    city: "Surabaya",
    province: "Jawa Timur",
    category: "Kategori C",
    subject: "Bahasa Inggris",
    registeredAt: "2026-09-22T14:45:00Z",
    hasFollowedSosmed: true,
    simulationCompleted: false, // Belum simulasi!
    simulationScore: null,
    penyisihanCompleted: false,
    penyisihanScore: null,
    isQualifiedFinal: "Menunggu",
    finalTicketPaid: false,
    finalCompleted: false,
    finalScore: null,
    notes: "Belum memulai simulasi try out mandiri"
  },
  {
    id: "OAI-2026-004",
    studentName: "Aisyah Putri Maulida",
    parentName: "H. Suryono",
    whatsapp: "6287899887766",
    schoolName: "MIN 1 Yogyakarta",
    city: "Yogyakarta",
    province: "DI Yogyakarta",
    category: "Kategori B",
    subject: "Matematika",
    registeredAt: "2026-09-23T09:00:00Z",
    hasFollowedSosmed: true,
    simulationCompleted: true,
    simulationScore: 80,
    penyisihanCompleted: false, // Belum babak penyisihan
    penyisihanScore: null,
    isQualifiedFinal: "Menunggu",
    finalTicketPaid: false,
    finalCompleted: false,
    finalScore: null,
    notes: "Perlu reminder H-1 babak penyisihan"
  }
];

let examLogs = [
  {
    id: "LOG-SIM-01",
    participantId: "OAI-2026-001",
    studentName: "Muhammad Rayhan Pratama",
    examType: "simulasi",
    category: "Kategori A",
    subject: "Matematika",
    score: 90,
    correctCount: 18,
    wrongCount: 2,
    totalQuestions: 20,
    completedAt: "2026-09-21T11:20:00Z",
    violationsDetected: 0
  },
  {
    id: "LOG-PEN-01",
    participantId: "OAI-2026-001",
    studentName: "Muhammad Rayhan Pratama",
    examType: "penyisihan",
    category: "Kategori A",
    subject: "Matematika",
    score: 85,
    correctCount: 17,
    wrongCount: 3,
    totalQuestions: 20,
    completedAt: "2026-09-22T09:40:00Z",
    violationsDetected: 0
  },
  {
    id: "LOG-SIM-02",
    participantId: "OAI-2026-002",
    studentName: "Aqeela Zahra Salsabila",
    examType: "simulasi",
    category: "Kategori B",
    subject: "IPA/Sains",
    score: 95,
    correctCount: 19,
    wrongCount: 1,
    totalQuestions: 20,
    completedAt: "2026-09-22T13:15:00Z",
    violationsDetected: 1
  },
  {
    id: "LOG-PEN-02",
    participantId: "OAI-2026-002",
    studentName: "Aqeela Zahra Salsabila",
    examType: "penyisihan",
    category: "Kategori B",
    subject: "IPA/Sains",
    score: 90,
    correctCount: 18,
    wrongCount: 2,
    totalQuestions: 20,
    completedAt: "2026-09-23T10:10:00Z",
    violationsDetected: 0
  }
];

// 1. GEMINI AI EDUCATIONAL CONSULTANT ENDPOINT with Thinking Mode
router.post('/recommendation', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Pesan wajib diisi" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Graceful fallback response when API key is not yet set
      return res.json({
        reply: `Halo Ayah/Bunda dan Adik Juara! Terima kasih telah menghubungi layanan Konsultan Edukasi resmi ${APP_CONFIG.brandName} (didukung oleh ${APP_CONFIG.supportedBy}).\n\nKami siap memandu pendaftaran mandiri, materi silabus (Matematika, IPA/Sains, Bahasa Inggris, Bahasa Indonesia), tata tertib 20 soal HOTS berbobot 100 poin, simulasi mandiri, hingga babak final. Silakan tanyakan hal apa pun mengenai persiapan ananda!`
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `Anda adalah "Konsultan Pendidikan Senior & Pakar Akademik" resmi untuk ${APP_CONFIG.brandName} (${APP_CONFIG.businessType}), sebuah ajang olimpiade nasional bergengsi yang didukung oleh "${APP_CONFIG.supportedBy}".
    
Detail Informasi Lembaga & Kompetisi:
- Nama Program: ${APP_CONFIG.brandName}
- Deskripsi: ${APP_CONFIG.description}
- Didukung Oleh: ${APP_CONFIG.supportedBy}
- WhatsApp Admin: ${APP_CONFIG.contact.whatsappFormatted} (${APP_CONFIG.contact.whatsapp})
- Rekening Resmi Tiket Final: BCA 3843-136-911 a.n. SRI PRIHATININGSIH SH.
- Biaya Tiket Final: Promo Rp 99.000 (Harga normal Rp 180.000 khusus 10 peserta pertama yang lolos penyisihan)
- Mata Pelajaran:
  1. Matematika (Numerasi, Geometri, Logika, Aljabar, HOTS)
  2. IPA / Sains (Biologi Dasar, Fisika Terapan, Fenomena Alam)
  3. Bahasa Inggris (Reading Comprehension, Grammar, Vocabulary)
  4. Bahasa Indonesia (Literasi Membaca, Tata Kalimat, Ejaan PUEBI)
- Jenjang Kategori:
  * Kategori A: SD Kelas 1 - 2 (Usia 6-8 tahun)
  * Kategori B: SD Kelas 3 - 4 (Usia 9-10 tahun)
  * Kategori C: SD Kelas 5 - 6 & SMP 7 (Usia 11-13 tahun)
- Format Ujian: 20 butir soal acak per peserta, 5 poin per soal, total 100 poin sempurna, waktu 30 menit.
- Fitur Keamanan: Anti-contek modern (lock tab, timer ketat).

Gaya Komunikasi:
- Ramah, sopan, memotivasi, solutif, percaya diri, dan berwibawa khas konsultan pendidikan luxury & enterprise.
- Berikan tips belajar praktis, penjelasan konsep jika ditanya soal pelajaran, serta bimbingan alur pendaftaran dan pelaksanaan kompetisi secara terstruktur dan jelas.`;

    // As instructed by feature prompt: gemini-3.1-pro-preview with thinkingLevel: HIGH, no maxOutputTokens
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: message,
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: 'HIGH'
        }
      }
    });

    const replyText = response.text || "Terima kasih atas pertanyaannya. Tim panitia siap memberikan panduan terbaik untuk kesuksesan ananda di Olimpiade Anak Indonesia.";
    return res.json({ reply: replyText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Graceful intelligent reply
    return res.json({
      reply: `Halo Ayah/Bunda! Tim Konsultan ${APP_CONFIG.brandName} menyambut antusiasme ananda. Untuk informasi lengkap pendaftaran, silabus 20 soal HOTS per mapel, serta panduan babak penyisihan dan final, silakan lengkapi formulir pendaftaran online di halaman ini atau hubungi WhatsApp resmi panitia di ${APP_CONFIG.contact.whatsappFormatted}.`
    });
  }
});

// 2. SETTINGS ENDPOINTS
router.get('/settings', (req, res) => {
  res.json({ success: true, settings: appSettings });
});

router.post('/settings', (req, res) => {
  try {
    appSettings = { ...appSettings, ...req.body };
    res.json({ success: true, settings: appSettings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. PARTICIPANTS ENDPOINTS
router.get('/participants', (req, res) => {
  res.json({ success: true, participants });
});

router.post('/participants', (req, res) => {
  try {
    const data = req.body;
    if (!data.studentName || !data.whatsapp || !data.category) {
      return res.status(400).json({ success: false, error: "Semua kolom wajib diisi" });
    }

    const nextIdNumber = participants.length + 1;
    const newId = `OAI-2026-${nextIdNumber.toString().padStart(3, '0')}`;

    const subjectsArray = Array.isArray(data.subjects) && data.subjects.length > 0
      ? data.subjects
      : (data.subject ? data.subject.split(',').map(s => s.trim()) : ["Matematika"]);
    const primarySubject = data.subject || subjectsArray.join(', ');

    const newParticipant = {
      id: newId,
      studentName: data.studentName.trim(),
      parentName: data.parentName ? data.parentName.trim() : "-",
      whatsapp: data.whatsapp.replace(/\D/g, ''),
      schoolName: data.schoolName ? data.schoolName.trim() : "-",
      city: data.city ? data.city.trim() : "-",
      province: data.province ? data.province.trim() : "-",
      category: data.category,
      subject: primarySubject,
      subjects: subjectsArray,
      registeredAt: new Date().toISOString(),
      hasFollowedSosmed: false,
      simulationCompleted: false,
      simulationScore: null,
      penyisihanCompleted: false,
      penyisihanScore: null,
      isQualifiedFinal: "Menunggu", // "Lolos", "Tidak Lolos", "Menunggu"
      finalTicketPaid: false,
      finalCompleted: false,
      finalScore: null,
      subjectScores: {},
      notes: "Pendaftaran mandiri baru"
    };

    participants.unshift(newParticipant);
    res.json({ success: true, participant: newParticipant });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update participant
router.put('/participants/:id', (req, res) => {
  const { id } = req.params;
  const idx = participants.findIndex(p => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, error: "Peserta tidak ditemukan" });
  }
  participants[idx] = { ...participants[idx], ...req.body };
  res.json({ success: true, participant: participants[idx] });
});

// Delete single participant
router.delete('/participants/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = participants.length;
  participants = participants.filter(p => p.id !== id);
  if (participants.length === initialLength) {
    return res.status(404).json({ success: false, error: "Peserta tidak ditemukan" });
  }
  res.json({ success: true, message: `Peserta ${id} berhasil dihapus` });
});

// 4. QUESTIONS BANK ENDPOINTS
router.get('/questions', (req, res) => {
  const { category, subject } = req.query;
  let result = questionBank;
  if (category) {
    result = result.filter(q => q.category === category);
  }
  if (subject) {
    result = result.filter(q => q.subject === subject);
  }
  res.json({ success: true, count: result.length, questions: result });
});

// Get 20 randomized questions for active exam session (strips correct answer for integrity)
router.get('/questions/random-20', (req, res) => {
  const { category, subject } = req.query;
  if (!category || !subject) {
    return res.status(400).json({ success: false, error: "Category dan subject diperlukan" });
  }

  let pool = questionBank.filter(q => q.category === category && q.subject === subject);
  if (pool.length < 20) {
    pool = generateQuestionPool(category, subject);
  }

  // Shuffle pool using Fisher-Yates
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const selected20 = shuffled.slice(0, 20).map((q, idx) => ({
    number: idx + 1,
    id: q.id,
    category: q.category,
    subject: q.subject,
    question: q.question,
    options: q.options,
    points: 5 // 20 x 5 = 100
  }));

  res.json({ success: true, questions: selected20 });
});

// Add new question
router.post('/questions', (req, res) => {
  try {
    const { category, subject, question, options, correctAnswer, explanation } = req.body;
    if (!category || !subject || !question || !options || !correctAnswer) {
      return res.status(400).json({ success: false, error: "Semua isian soal wajib diisi" });
    }

    const newQuestion = {
      id: `Q-${Date.now()}`,
      category,
      subject,
      question,
      options,
      correctAnswer,
      explanation: explanation || "-"
    };

    questionBank.unshift(newQuestion);
    res.json({ success: true, question: newQuestion });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Edit single question
router.put('/questions/:id', (req, res) => {
  const { id } = req.params;
  const idx = questionBank.findIndex(q => q.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, error: "Soal tidak ditemukan" });
  }
  questionBank[idx] = { ...questionBank[idx], ...req.body };
  res.json({ success: true, question: questionBank[idx] });
});

// Delete single question
router.delete('/questions/:id', (req, res) => {
  const { id } = req.params;
  const initialCount = questionBank.length;
  questionBank = questionBank.filter(q => q.id !== id);
  if (questionBank.length === initialCount) {
    return res.status(404).json({ success: false, error: "Soal tidak ditemukan" });
  }
  res.json({ success: true, message: `Soal ${id} berhasil dihapus` });
});

// Batch delete questions
router.post('/questions/batch-delete', (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ success: false, error: "Daftar ID soal tidak valid" });
  }
  const idSet = new Set(ids);
  questionBank = questionBank.filter(q => !idSet.has(q.id));
  res.json({ success: true, message: `${ids.length} soal berhasil dihapus massal` });
});

// Import questions batch
router.post('/questions/import', (req, res) => {
  const { questions: importedQuestions } = req.body;
  if (!Array.isArray(importedQuestions) || importedQuestions.length === 0) {
    return res.status(400).json({ success: false, error: "Data soal tidak ditemukan" });
  }

  let addedCount = 0;
  for (const item of importedQuestions) {
    if (item.question && item.correctAnswer && Array.isArray(item.options)) {
      questionBank.unshift({
        id: item.id || `IMP-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        category: item.category || "Kategori A",
        subject: item.subject || "Matematika",
        question: item.question,
        options: item.options,
        correctAnswer: item.correctAnswer,
        explanation: item.explanation || "-"
      });
      addedCount++;
    }
  }

  res.json({ success: true, message: `${addedCount} soal berhasil diimpor ke bank soal` });
});

// 5. EXAM SUBMISSION & SCORING ENDPOINT
router.post('/exam/submit', (req, res) => {
  try {
    const { participantId, examType, userAnswers, category, subject, violationsCount } = req.body;
    // userAnswers: { [questionId]: chosenOption }

    if (!participantId || !examType) {
      return res.status(400).json({ success: false, error: "Parameter pengerjaan ujian tidak lengkap" });
    }

    const participant = participants.find(p => p.id === participantId);
    if (!participant) {
      return res.status(404).json({ success: false, error: "Data peserta tidak ditemukan" });
    }

    let correctCount = 0;
    let wrongCount = 0;
    const details = [];

    const answerKeys = Object.keys(userAnswers || {});
    const totalQuestions = 20;

    for (const qId of answerKeys) {
      const q = questionBank.find(item => item.id === qId);
      const chosen = userAnswers[qId];
      if (q) {
        const isCorrect = q.correctAnswer.trim().toLowerCase() === (chosen || "").trim().toLowerCase();
        if (isCorrect) correctCount++;
        else wrongCount++;

        details.push({
          questionId: q.id,
          question: q.question,
          chosen,
          correctAnswer: q.correctAnswer,
          isCorrect,
          explanation: q.explanation
        });
      }
    }

    // If participant skipped some questions, count them as wrong
    if (answerKeys.length < totalQuestions) {
      wrongCount += (totalQuestions - answerKeys.length);
    }

    // Each correct question is 5 points -> 20 x 5 = 100 points
    const finalScore = Math.min(100, Math.max(0, correctCount * 5));

    // Update participant record according to exam type
    const activeSub = subject || (participant.subjects ? participant.subjects[0] : participant.subject);
    if (!participant.subjectScores) participant.subjectScores = {};
    if (!participant.subjectScores[activeSub]) participant.subjectScores[activeSub] = {};

    if (examType === "simulasi") {
      participant.simulationCompleted = true;
      participant.simulationScore = finalScore;
      participant.subjectScores[activeSub].simulationCompleted = true;
      participant.subjectScores[activeSub].simulationScore = finalScore;
    } else if (examType === "penyisihan") {
      participant.penyisihanCompleted = true;
      participant.penyisihanScore = finalScore;
      participant.subjectScores[activeSub].penyisihanCompleted = true;
      participant.subjectScores[activeSub].penyisihanScore = finalScore;
      // Auto qualification indicator
      if (finalScore >= (appSettings.passingScorePenyisihan || 70)) {
        participant.isQualifiedFinal = "Lolos";
      } else {
        participant.isQualifiedFinal = "Tidak Lolos";
      }
    } else if (examType === "final") {
      participant.finalCompleted = true;
      participant.finalScore = finalScore;
      participant.subjectScores[activeSub].finalCompleted = true;
      participant.subjectScores[activeSub].finalScore = finalScore;
    }

    const logEntry = {
      id: `LOG-${Date.now()}`,
      participantId: participant.id,
      studentName: participant.studentName,
      examType,
      category: category || participant.category,
      subject: subject || participant.subject,
      score: finalScore,
      correctCount,
      wrongCount,
      totalQuestions: 20,
      completedAt: new Date().toISOString(),
      violationsDetected: violationsCount || 0
    };

    examLogs.unshift(logEntry);

    res.json({
      success: true,
      score: finalScore,
      correctCount,
      wrongCount,
      totalQuestions: 20,
      log: logEntry,
      participant
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. EXAM LOGS / REPORTS ENDPOINT
router.get('/exam/reports', (req, res) => {
  const { examType } = req.query;
  let filtered = examLogs;
  if (examType) {
    filtered = filtered.filter(l => l.examType === examType);
  }
  res.json({ success: true, reports: filtered });
});

export default router;
