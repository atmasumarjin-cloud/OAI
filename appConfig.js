/**
 * CONFIGURATION-DRIVEN WHITELABEL SYSTEM
 * Digunakan dinamis oleh Frontend dan Backend (Express / cPanel Node.js)
 * TEMA: KINDERGARTEN & PRE-SCHOOL SAMPAI SEKOLAH DASAR (ANAK INDONESIA)
 * Berorientasi Pendidikan Anak Usia Dini (PAUD, TK A, TK B, & SD Awal)
 */
export const APP_CONFIG = {
  brandName: "OLIMPIADE ANAK INDONESIA",
  shortName: "OAI",
  businessType: "OLIMPIADE ONLINE RAMAH ANAK",
  description: "Panggung Prestasi Ceria & Edukatif Terbesar se-Indonesia untuk Anak Usia Dini (PAUD/TK A & B) serta Sekolah Dasar. Menumbuhkan rasa ingin tahu, logika ceria, dan cinta belajar sejak dini melalui kompetisi online interaktif bergambar.",
  supportedBy: "YAYASAN BESARRASA BAGI BANGSA",
  
  themeColor: {
    primary: "#1C2858",  // Deep Royal Navy
    accent: "#EFA82B",   // Warm Sun Gold
    star: "#F3AF2C",     // Star Yellow
    bgLight: "#FAF8F5",  // Warm Neutral Ivory
    skyBlue: "#38BDF8",  // Playful Sky Blue
    mint: "#34D399",     // Fresh Cheerful Mint
    coral: "#F87171",    // Soft Coral
    sunYellow: "#FEF08A" // Soft Sun Yellow
  },

  contact: {
    whatsapp: "6285924921592",
    whatsappFormatted: "+62 859-2492-1592",
    email: "kontak@olimpiadeanakindonesia.id",
    instagram: "@olimpiadeanakindonesia",
    tiktok: "@olimpiadeanakindonesia",
    youtube: "Olimpiade Anak Indonesia Official",
    address: "Graha Prestasi Anak Nasional, Jakarta Selatan, DKI Jakarta 12950"
  },

  payment: {
    bankName: "BCA",
    bankLogo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg",
    accountNumber: "3843-136-911",
    accountNumberClean: "3843136911",
    accountHolder: "SRI PRIHATININGSIH SH.",
    normalPrice: 180000,
    promoPrice: 99000,
    promoNote: "Diskon Khusus 10 Peserta Pertama Lolos Babak Penyisihan"
  },

  // Hero Image: Ceria Anak Usia Dini & TK Bermain Balok Edukatif & Belajar Interaktif
  heroImage: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1600&auto=format&fit=crop",
  
  galleryImages: [
    {
      url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop",
      title: "Senyum Ceria Juara Cilik",
      category: "Keceriaan Anak TK & PAUD"
    },
    {
      url: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=1200&auto=format&fit=crop",
      title: "Belajar & Bermain Seru Bersama",
      category: "Aktivitas Edukatif Kelas"
    },
    {
      url: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=1200&auto=format&fit=crop",
      title: "Logika Balok & Berhitung Ceria",
      category: "Matematika & Pola Usia Dini"
    },
    {
      url: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop",
      title: "Membaca Buku Cerita Bergambar",
      category: "Literasi & Imajinasi Cilik"
    }
  ],

  // 4 Mata Pelajaran Utama Bertema Kindergarten & Ramah Anak
  products: [
    {
      id: "Matematika",
      name: "Matematika Ceria & Berhitung",
      icon: "Calculator",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      description: "Mengenal angka, menghitung benda lucu (buah/hewan), pola warna, tebak jumlah, dan logika bentuk geometri dasar secara interaktif.",
      image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=1200&auto=format&fit=crop",
      tag: "Favorit Anak TK",
      topics: ["Mengenal Angka 1-20", "Pola Bentuk & Warna", "Penjumlahan Bergambar", "Perbandingan Besar & Kecil"]
    },
    {
      id: "IPA/Sains",
      name: "IPA & Sains Eksplorasi Cilik",
      icon: "Atom",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      description: "Menjelajahi dunia satwa lucu, bagian tubuh & panca indra, warna pelangi, tanaman, dan keajaiban alam sekitar yang memicu rasa ingin tahu.",
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1200&auto=format&fit=crop",
      tag: "Eksplorasi Alam",
      topics: ["Dunia Hewan & Suara", "Panca Indra Cilik", "Benda Langit Siang & Malam", "Tumbuhan & Bunga"]
    },
    {
      id: "Bahasa Inggris",
      name: "Fun English & Vocabulary",
      icon: "Globe",
      badgeColor: "bg-sky-100 text-sky-800 border-sky-300",
      description: "Kosakata bergambar (animals, fruits, colors, shapes), sapaan santun (hello, thank you), dan pengenalan kata bahasa Inggris ceria.",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop",
      tag: "Bahasa Global Seru",
      topics: ["Picture Vocabulary", "Colors & Shapes", "Family & Greetings", "Animals & Fruits"]
    },
    {
      id: "Bahasa Indonesia",
      name: "Bahasa Indonesia & Literasi Cerita",
      icon: "BookOpen",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
      description: "Pengenalan huruf abjad, menyimak cerita dongeng pendek bergambar, tebak kata bergambar, dan kata-kata ajaib santun (tolong, terima kasih, maaf).",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
      tag: "Literasi Anak Hebat",
      topics: ["Mengenal Huruf Vokal & Konsonan", "Tebak Gambar Kata", "Dongeng Ceria", "Kata Sopan Santun"]
    }
  ],

  // Kategori Jenjang dengan Penekanan Utama Jenjang Kindergarten / Usia Dini
  categories: [
    {
      id: "Kategori Pra-TK & TK",
      label: "Kategori Pra-TK & TK (PAUD / TK A & TK B)",
      description: "Dirancang khusus usia emas kanak-kanak. Penuh ilustrasi gambar, soal ramah anak tanpa tekanan, mengasah pengenalan warna, pola, angka, dan bentuk.",
      ageRange: "Usia 3 - 6 Tahun",
      isKindergarten: true,
      tag: "👶 Khusus PAUD / TK",
      highlight: true
    },
    {
      id: "Kategori A",
      label: "Kategori A (SD Kelas 1 - 2)",
      description: "Masa transisi awal SD untuk menumbuhkan rasa percaya diri berhitung cepat, logika visual, dan pemahaman bacaan kalimat pendek.",
      ageRange: "Usia 6 - 8 Tahun",
      tag: "Kelas 1 - 2 SD"
    },
    {
      id: "Kategori B",
      label: "Kategori B (SD Kelas 3 - 4)",
      description: "Penguatan penalaran kontekstual, pemecahan masalah bertahap, dan fakta sains seru.",
      ageRange: "Usia 9 - 10 Tahun",
      tag: "Kelas 3 - 4 SD"
    },
    {
      id: "Kategori C",
      label: "Kategori C (SD Kelas 5 - 6 & SMP 7)",
      description: "Tantangan High Order Thinking Skills (HOTS) serta analisis terpadu bagi siswa berprestasi.",
      ageRange: "Usia 11 - 13 Tahun",
      tag: "Kelas 5 - 6 SD"
    }
  ],

  testimonials: [
    {
      name: "Bunda Citra Kirana, S.Pd.",
      role: "Wali Murid TK B (Jakarta Selatan)",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
      quote: "Senang sekali anak saya yang masih TK bisa ikut lomba bernuansa mendidik dan sangat ramah anak. Tampilan soalnya ceria, ada gambar dan warna, membuat anak percaya diri!",
      rating: 5
    },
    {
      name: "Bapak Muhammad Fauzan",
      role: "Kepala Sekolah TK & PAUD Ceria (Bandung)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      quote: "Fitur pendaftaran Multi-Mapel sangat membantu kami mendaftarkan murid langsung untuk Matematika Ceria dan Bahasa Inggris sekaligus. Yayasan Besarrasa Bagi Bangsa menghadirkan wadah yang sangat menginspirasi.",
      rating: 5
    },
    {
      name: "Ibu Dian Anggraini",
      role: "Orang Tua Siswa Kelas 1 SD (Surabaya)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
      quote: "Sistem ujian online mandirinya sangat ramah anak! Setelah simulasi, anak saya langsung paham cara mengerjakannya. Piagam penghargaannya berlogo resmi sangat membanggakan!",
      rating: 5
    }
  ],

  faq: [
    {
      question: "Apakah anak usia Pra-TK dan TK (PAUD) bisa mengikuti Olimpiade Anak Indonesia?",
      answer: "Tentu bisa! Kami menyediakan Kategori Pra-TK & TK (PAUD / TK A & TK B untuk usia 3-6 tahun) dengan format soal bergambar ceria yang ramah anak, menguji pengenalan angka, warna, bentuk, hewan, dan kosakata dasar."
    },
    {
      question: "Apakah satu siswa bisa mendaftar lebih dari satu mata pelajaran (Multi-Mapel)?",
      answer: "Bisa sekali! Pada formulir pendaftaran mandiri, orang tua atau wali murid dapat mencentang 1, 2, 3, hingga seluruh 4 mata pelajaran sekaligus (Matematika Ceria, IPA & Sains, Fun English, Bahasa Indonesia) dalam satu formulir."
    },
    {
      question: "Apakah pelaksanaan Olimpiade Anak Indonesia 100% berlangsung secara online?",
      answer: "Ya, seluruh rangkaian mulai dari pendaftaran, simulasi try out, babak penyisihan hingga babak final dilakukan 100% online mandiri melalui smartphone, tablet, laptop, atau komputer di rumah masing-masing."
    },
    {
      question: "Bagaimana cara melakukan Simulasi Ujian Mandiri?",
      answer: "Setelah melengkapi formulir pendaftaran dan mengonfirmasi WhatsApp panitia serta mengikuti sosial media resmi, peserta dapat langsung masuk ke menu Simulasi Mandiri di dashboard untuk mencoba sistem pengerjaan 20 butir soal acak."
    },
    {
      question: "Kapan pengumuman kelolosan Babak Penyisihan diterbitkan?",
      answer: "Pengumuman peserta lolos ke Babak Final diterbitkan secara resmi pada H+2 setelah pelaksanaan Babak Penyisihan dan dapat dicek langsung melalui portal mandiri peserta."
    },
    {
      question: "Bagaimana sistem pembelian tiket Babak Final?",
      answer: "Bagi peserta yang lolos Babak Penyisihan, berhak memesan Tiket Final dengan biaya promo Rp 99.000 (dari harga normal Rp 180.000 khusus 10 peserta pertama) yang ditransfer ke rekening resmi BCA 3843-136-911 a.n. SRI PRIHATININGSIH SH."
    },
    {
      question: "Bagaimana sistem penilaian dan bobot soal ujian?",
      answer: "Setiap sesi ujian berisi 20 butir soal acak. Setiap jawaban benar bernilai 5 poin, sehingga total nilai sempurna adalah 100 poin."
    },
    {
      question: "Apakah sistem ujian dilengkapi fitur keamanan Anti-Contek?",
      answer: "Ya, sistem CBT dilengkapi fitur Anti-Contek cerdas (deteksi pergantian tab layar, pencegahan copy-paste, dan timer ketat) untuk memastikan kejujuran dan integritas kompetisi."
    },
    {
      question: "Kapan dan bagaimana cara mengunduh sertifikat penghargaan resmi?",
      answer: "Sertifikat resmi berlogo Olimpiade Anak Indonesia dan Yayasan Besarrasa Bagi Bangsa dapat diunduh atau dicetak langsung dalam format PDF di dashboard peserta secara mandiri."
    },
    {
      question: "Siapa pihak penyelenggara dan pendukung kegiatan ini?",
      answer: "Olimpiade Anak Indonesia diselenggarakan secara resmi dengan dukungan penuh dari Yayasan Besarrasa Bagi Bangsa sebagai wujud komitmen memajukan potensi emas anak bangsa."
    }
  ]
};
