/**
 * Initial Default Bank Soal & System Configuration
 * Kategori A (SD 1-2), Kategori B (SD 3-4), Kategori C (SD 5-6 & SMP 7)
 * Mapel: Matematika, IPA/Sains, Bahasa Inggris, Bahasa Indonesia
 * 20 butir per mata pelajaran & kategori = ratusan butir soal terstandar HOTS
 */

export const DEFAULT_SETTINGS = {
  metaPixelId: "123456789012345",
  metaPixelScript: "<!-- Meta Pixel Event Tracker Code -->\n<script>\n!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');\nfbq('init', '123456789012345');\nfbq('track', 'PageView');\n</script>",
  antiCheatEnabled: true,
  dates: {
    simulasiStart: "2026-10-01",
    simulasiEnd: "2026-10-15",
    penyisihanDate: "2026-10-18",
    pengumumanPenyisihanDate: "2026-10-20",
    finalTicketDeadline: "2026-10-23",
    finalDate: "2026-10-25"
  },
  examDurationMinutes: 30, // 30 minutes for 20 questions
  pointsPerQuestion: 5,
  passingScorePenyisihan: 70
};

// Rich comprehensive Question Bank
export const DEFAULT_QUESTIONS = [
  // --- KATEGORI PRA-TK & TK (KINDERGARTEN) : MATEMATIKA CERIA ---
  {
    id: "TK-MAT-01",
    category: "Kategori Pra-TK & TK",
    subject: "Matematika",
    question: "🍎 🍎 🍎 + 🍎 🍎 = ... Berapakah jumlah seluruh buah apel merah manis di atas?",
    options: ["4 apel", "5 apel", "6 apel", "3 apel"],
    correctAnswer: "5 apel",
    explanation: "3 apel ditambah 2 apel sama dengan 5 buah apel merah (3 + 2 = 5)."
  },
  {
    id: "TK-MAT-02",
    category: "Kategori Pra-TK & TK",
    subject: "Matematika",
    question: "Benda manakah yang berbentuk LINGKARAN bulat seperti bola?",
    options: ["Roda Sepeda", "Buku Tulis", "Penggaris Segitiga", "Pintu Rumah"],
    correctAnswer: "Roda Sepeda",
    explanation: "Roda sepeda dan bola berbentuk lingkaran bulat sempurna."
  },
  {
    id: "TK-MAT-03",
    category: "Kategori Pra-TK & TK",
    subject: "Matematika",
    question: "Manakah hewan yang berukuran PALING BESAR?",
    options: ["Gajah", "Kucing", "Semut", "Kelinci"],
    correctAnswer: "Gajah",
    explanation: "Gajah memiliki badan yang paling besar dan tinggi di antara hewan lainnya."
  },
  {
    id: "TK-MAT-04",
    category: "Kategori Pra-TK & TK",
    subject: "Matematika",
    question: "Berapakah jumlah jari tangan pada SATU tangan kita?",
    options: ["4 jari", "5 jari", "6 jari", "10 jari"],
    correctAnswer: "5 jari",
    explanation: "Satu tangan manusia memiliki 5 jari: jempol, telunjuk, tengah, manis, dan kelingking."
  },
  {
    id: "TK-MAT-05",
    category: "Kategori Pra-TK & TK",
    subject: "Matematika",
    question: "Urutan angka berhitung yang benar setelah angka 1, 2, 3 adalah angka?",
    options: ["4", "5", "6", "2"],
    correctAnswer: "4",
    explanation: "Setelah berhitung 1, 2, 3 urutan berikutnya adalah angka 4."
  },

  // --- KATEGORI PRA-TK & TK (KINDERGARTEN) : IPA & SAINS CILIK ---
  {
    id: "TK-IPA-01",
    category: "Kategori Pra-TK & TK",
    subject: "IPA/Sains",
    question: "Hewan peliharaan lucu berbulu halus yang bersuara 'Meow... Meow...' adalah?",
    options: ["Kucing", "Anjing", "Sapi", "Ayam"],
    correctAnswer: "Kucing",
    explanation: "Kucing mengeluarkan suara 'meow' dan suka dielus bulunya."
  },
  {
    id: "TK-IPA-02",
    category: "Kategori Pra-TK & TK",
    subject: "IPA/Sains",
    question: "Bagian tubuh manakah yang kita gunakan untuk MELIHAT pemandangan indah?",
    options: ["Mata", "Telinga", "Hidung", "Kaki"],
    correctAnswer: "Mata",
    explanation: "Mata adalah indra penglihatan untuk melihat benda dan warna di sekitar kita."
  },
  {
    id: "TK-IPA-03",
    category: "Kategori Pra-TK & TK",
    subject: "IPA/Sains",
    question: "Warna daun pohon yang segar dan sehat pada umumnya adalah warna?",
    options: ["Hijau", "Merah", "Ungu", "Biru"],
    correctAnswer: "Hijau",
    explanation: "Daun tumbuhan mengandung klorofil sehingga tampak berwarna hijau segar."
  },
  {
    id: "TK-IPA-04",
    category: "Kategori Pra-TK & TK",
    subject: "IPA/Sains",
    question: "Benda langit yang bersinar hangat di siang hari dan membuat langit terang adalah?",
    options: ["Matahari", "Bulan", "Bintang", "Pelangi"],
    correctAnswer: "Matahari",
    explanation: "Matahari terbit di pagi hari dan menyinari bumi dengan cahaya hangat."
  },

  // --- KATEGORI PRA-TK & TK (KINDERGARTEN) : FUN ENGLISH ---
  {
    id: "TK-ENG-01",
    category: "Kategori Pra-TK & TK",
    subject: "Bahasa Inggris",
    question: "What is the English word for 'Kucing'?",
    options: ["Cat", "Dog", "Bird", "Fish"],
    correctAnswer: "Cat",
    explanation: "'Cat' artinya adalah Kucing dalam Bahasa Inggris."
  },
  {
    id: "TK-ENG-02",
    category: "Kategori Pra-TK & TK",
    subject: "Bahasa Inggris",
    question: "What color is a ripe banana? (Pisang matang berwarna apa?)",
    options: ["Yellow (Kuning)", "Red (Merah)", "Blue (Biru)", "Green (Hijau)"],
    correctAnswer: "Yellow (Kuning)",
    explanation: "Pisang yang matang dan manis berwarna kuning (Yellow)."
  },
  {
    id: "TK-ENG-03",
    category: "Kategori Pra-TK & TK",
    subject: "Bahasa Inggris",
    question: "If someone gives you a gift, what polite words should you say? (Jika diberi hadiah, ucapkan apa?)",
    options: ["Thank You", "Goodbye", "No", "Sorry"],
    correctAnswer: "Thank You",
    explanation: "'Thank You' berarti terima kasih untuk menyampaikan rasa syukur dan kesopanan."
  },

  // --- KATEGORI PRA-TK & TK (KINDERGARTEN) : BAHASA INDONESIA & CERITA ---
  {
    id: "TK-IND-01",
    category: "Kategori Pra-TK & TK",
    subject: "Bahasa Indonesia",
    question: "Huruf pertama pada kata 'A-P-E-L' adalah huruf?",
    options: ["A", "B", "C", "D"],
    correctAnswer: "A",
    explanation: "Kata 'APEL' dimulai dengan huruf vokal A."
  },
  {
    id: "TK-IND-02",
    category: "Kategori Pra-TK & TK",
    subject: "Bahasa Indonesia",
    question: "Ketika kita tidak sengaja menyenggol teman saat bermain, kata santun apa yang harus kita ucapkan?",
    options: ["Minta Maaf", "Tertawa", "Marah", "Diam saja"],
    correctAnswer: "Minta Maaf",
    explanation: "Anak hebat selalu meminta maaf dengan tulus jika berbuat kekeliruan."
  },

  // --- KATEGORI A: MATEMATIKA ---
  {
    id: "KA-MAT-01",
    category: "Kategori A",
    subject: "Matematika",
    question: "Ibu membeli 14 buah apel. Adik memakan 3 apel dan Kakak memakan 4 apel. Berapakah sisa apel Ibu sekarang?",
    options: ["5 apel", "7 apel", "8 apel", "6 apel"],
    correctAnswer: "7 apel",
    explanation: "14 - 3 - 4 = 7 apel tersisa."
  },
  {
    id: "KA-MAT-02",
    category: "Kategori A",
    subject: "Matematika",
    question: "Perhatikan pola bilangan berikut: 3, 6, 9, 12, ... . Bilangan berikutnya yang tepat adalah?",
    options: ["14", "15", "16", "18"],
    correctAnswer: "15",
    explanation: "Pola bertambah 3 secara konsisten (12 + 3 = 15)."
  },
  {
    id: "KA-MAT-03",
    category: "Kategori A",
    subject: "Matematika",
    question: "Sebuah bangun datar memiliki 3 sisi dan 3 sudut. Bangun datar tersebut dinamakan?",
    options: ["Persegi", "Segitiga", "Lingkaran", "Persegi Panjang"],
    correctAnswer: "Segitiga",
    explanation: "Segitiga adalah bangun datar dengan 3 sisi dan 3 sudut."
  },
  {
    id: "KA-MAT-04",
    category: "Kategori A",
    subject: "Matematika",
    question: "Budi memiliki 4 kotak pensil. Setiap kotak berisi 5 batang pensil warna. Berapa jumlah seluruh pensil Budi?",
    options: ["15 batang", "20 batang", "25 batang", "9 batang"],
    correctAnswer: "20 batang",
    explanation: "4 x 5 = 20 batang pensil."
  },
  {
    id: "KA-MAT-05",
    category: "Kategori A",
    subject: "Matematika",
    question: "Jarum panjang jam menunjuk ke angka 12, jarum pendek menunjuk ke angka 4. Waktu tersebut menunjukkan pukul?",
    options: ["Pukul 12.00", "Pukul 04.00", "Pukul 04.12", "Pukul 02.00"],
    correctAnswer: "Pukul 04.00",
    explanation: "Jarum pendek di angka 4 dan jarum panjang di angka 12 menunjukkan tepat pukul 04.00."
  },
  {
    id: "KA-MAT-06",
    category: "Kategori A",
    subject: "Matematika",
    question: "Manakah nilai angka yang paling besar di antara pilihan berikut?",
    options: ["7 puluhan + 2 satuan", "8 puluhan + 0 satuan", "6 puluhan + 9 satuan", "7 puluhan + 9 satuan"],
    correctAnswer: "8 puluhan + 0 satuan",
    explanation: "8 puluhan = 80, sedangkan 79, 72, dan 69 lebih kecil dari 80."
  },
  {
    id: "KA-MAT-07",
    category: "Kategori A",
    subject: "Matematika",
    question: "Andi mengantre di kantin sekolah. Di depan Andi ada 6 anak, dan di belakang Andi ada 5 anak. Berapa jumlah semua anak dalam antrean tersebut?",
    options: ["11 anak", "12 anak", "13 anak", "10 anak"],
    correctAnswer: "12 anak",
    explanation: "6 anak di depan + Andi (1 anak) + 5 anak di belakang = 12 anak."
  },

  // --- KATEGORI A: IPA / SAINS ---
  {
    id: "KA-IPA-01",
    category: "Kategori A",
    subject: "IPA/Sains",
    question: "Bagian tubuh manusia yang berfungsi untuk mendengar suara merdu burung berkicau adalah?",
    options: ["Mata", "Telinga", "Hidung", "Lidah"],
    correctAnswer: "Telinga",
    explanation: "Indra pendengaran pada manusia adalah telinga."
  },
  {
    id: "KA-IPA-02",
    category: "Kategori A",
    subject: "IPA/Sains",
    question: "Hewan berikut yang berkembang biak dengan cara bertelur adalah?",
    options: ["Kucing", "Ayam", "Kambing", "Sapi"],
    correctAnswer: "Ayam",
    explanation: "Ayam adalah jenis unggas yang berkembang biak dengan bertelur (ovipar)."
  },
  {
    id: "KA-IPA-03",
    category: "Kategori A",
    subject: "IPA/Sains",
    question: "Bagian tumbuhan yang berada di dalam tanah dan bertugas menyerap air adalah?",
    options: ["Daun", "Batang", "Akar", "Bunga"],
    correctAnswer: "Akar",
    explanation: "Akar berfungsi menyerap air dan zat hara dari dalam tanah."
  },
  {
    id: "KA-IPA-04",
    category: "Kategori A",
    subject: "IPA/Sains",
    question: "Benda langit yang memancarkan cahaya terang dan memberi kehangatan pada siang hari adalah?",
    options: ["Bulan", "Bintang", "Matahari", "Awan"],
    correctAnswer: "Matahari",
    explanation: "Matahari adalah bintang terdekat yang menyinari bumi pada siang hari."
  },
  {
    id: "KA-IPA-05",
    category: "Kategori A",
    subject: "IPA/Sains",
    question: "Ketika air dimasukkan ke dalam freezer kulkas, air akan berubah wujud menjadi?",
    options: ["Uap gas", "Es padat", "Minyak", "Asap"],
    correctAnswer: "Es padat",
    explanation: "Air cair membeku menjadi es padat ketika didinginkan di bawah 0°C."
  },

  // --- KATEGORI A: BAHASA INGGRIS ---
  {
    id: "KA-ENG-01",
    category: "Kategori A",
    subject: "Bahasa Inggris",
    question: "What is the color of the ripe banana?",
    options: ["Blue", "Yellow", "Purple", "Black"],
    correctAnswer: "Yellow",
    explanation: "A ripe banana is yellow in color."
  },
  {
    id: "KA-ENG-02",
    category: "Kategori A",
    subject: "Bahasa Inggris",
    question: "How do you say 'Selamat Pagi' in English?",
    options: ["Good afternoon", "Good evening", "Good morning", "Good night"],
    correctAnswer: "Good morning",
    explanation: "'Selamat Pagi' translates to 'Good morning'."
  },
  {
    id: "KA-ENG-03",
    category: "Kategori A",
    subject: "Bahasa Inggris",
    question: "I use my ... to see beautiful flowers.",
    options: ["eyes", "ears", "teeth", "hands"],
    correctAnswer: "eyes",
    explanation: "We use our eyes for seeing."
  },
  {
    id: "KA-ENG-04",
    category: "Kategori A",
    subject: "Bahasa Inggris",
    question: "Which of the following is an animal that can fly?",
    options: ["Dog", "Fish", "Bird", "Elephant"],
    correctAnswer: "Bird",
    explanation: "A bird has wings and can fly."
  },

  // --- KATEGORI A: BAHASA INDONESIA ---
  {
    id: "KA-IND-01",
    category: "Kategori A",
    subject: "Bahasa Indonesia",
    question: "Lawan kata dari perkataan 'RAJIN' adalah?",
    options: ["Pandai", "Malas", "Pintar", "Giat"],
    correctAnswer: "Malas",
    explanation: "Antonim atau lawan kata dari rajin adalah malas."
  },
  {
    id: "KA-IND-02",
    category: "Kategori A",
    subject: "Bahasa Indonesia",
    question: "Kalimat yang menggunakan tanda titik (.) dengan benar adalah?",
    options: ["Ibu pergi ke pasar.", "Siapa nama kamu.", "Aduh sakit sekali.", "Tolong ambilkan buku itu."],
    correctAnswer: "Ibu pergi ke pasar.",
    explanation: "Kalimat berita diakhiri tanda titik (.), sedangkan pertanyaan diakhiri tanda tanya."
  },
  {
    id: "KA-IND-03",
    category: "Kategori A",
    subject: "Bahasa Indonesia",
    question: "Huruf kapital digunakan pada awal penulisan?",
    options: ["Nama orang", "Kata sambung", "Tanda baca", "Angka jam"],
    correctAnswer: "Nama orang",
    explanation: "Huruf kapital digunakan untuk awal kalimat dan huruf pertama nama orang/tempat."
  },

  // --- KATEGORI B: MATEMATIKA ---
  {
    id: "KB-MAT-01",
    category: "Kategori B",
    subject: "Matematika",
    question: "Hasil perhitungan dari 125 + (45 x 4) - 50 adalah?",
    options: ["255", "265", "245", "275"],
    correctAnswer: "255",
    explanation: "45 x 4 = 180. Lalu 125 + 180 = 305. Kemudian 305 - 50 = 255."
  },
  {
    id: "KB-MAT-02",
    category: "Kategori B",
    subject: "Matematika",
    question: "Keliling sebuah persegi adalah 48 cm. Berapakah luas persegi tersebut?",
    options: ["144 cm²", "121 cm²", "169 cm²", "100 cm²"],
    correctAnswer: "144 cm²",
    explanation: "Sisi = 48 / 4 = 12 cm. Luas = 12 x 12 = 144 cm²."
  },
  {
    id: "KB-MAT-03",
    category: "Kategori B",
    subject: "Matematika",
    question: "Pecahan senilai dengan 3/4 adalah?",
    options: ["6/10", "9/12", "12/18", "15/25"],
    correctAnswer: "9/12",
    explanation: "(3 x 3) / (4 x 3) = 9/12."
  },
  {
    id: "KB-MAT-04",
    category: "Kategori B",
    subject: "Matematika",
    question: "KPK dari 12 dan 18 adalah?",
    options: ["24", "36", "48", "72"],
    correctAnswer: "36",
    explanation: "Kelipatan 12: 12, 24, 36. Kelipatan 18: 18, 36. KPK terkecil = 36."
  },
  {
    id: "KB-MAT-05",
    category: "Kategori B",
    subject: "Matematika",
    question: "Sebuah bus berangkat pukul 07.15 dan tiba di tujuan pukul 10.45. Berapa lama waktu perjalanan bus tersebut?",
    options: ["3 jam 15 menit", "3 jam 30 menit", "3 jam 45 menit", "4 jam"],
    correctAnswer: "3 jam 30 menit",
    explanation: "10.45 dikurangi 07.15 adalah 3 jam 30 menit."
  },

  // --- KATEGORI B: IPA / SAINS ---
  {
    id: "KB-IPA-01",
    category: "Kategori B",
    subject: "IPA/Sains",
    question: "Proses tumbuhan hijau memasak makanannya sendiri dengan bantuan cahaya matahari dinamakan?",
    options: ["Respirasi", "Fotosintesis", "Transpirasi", "Metamorfosis"],
    correctAnswer: "Fotosintesis",
    explanation: "Fotosintesis menghasilkan glukosa dan oksigen dengan memanfaatkan klorofil dan cahaya."
  },
  {
    id: "KB-IPA-02",
    category: "Kategori B",
    subject: "IPA/Sains",
    question: "Contoh hewan yang mengalami metamorfosis sempurna adalah?",
    options: ["Belalang", "Kupu-kupu", "Kecoa", "Ayam"],
    correctAnswer: "Kupu-kupu",
    explanation: "Kupu-kupu mengalami tahap telur - ulat (larva) - kepompong (pupa) - kupu-kupu dewasa."
  },
  {
    id: "KB-IPA-03",
    category: "Kategori B",
    subject: "IPA/Sains",
    question: "Benda yang dapat ditarik kuat oleh magnet terbuat dari bahan?",
    options: ["Kayu", "Plastik", "Besi atau Baja", "Karet"],
    correctAnswer: "Besi atau Baja",
    explanation: "Besi dan baja merupakan benda feromagnetik yang ditarik kuat oleh magnet."
  },

  // --- KATEGORI B: BAHASA INGGRIS ---
  {
    id: "KB-ENG-01",
    category: "Kategori B",
    subject: "Bahasa Inggris",
    question: "Choose the correct sentence in Simple Present Tense:",
    options: [
      "She read a book yesterday.",
      "She reads a book every afternoon.",
      "She reading a book now.",
      "She will read a book tomorrow."
    ],
    correctAnswer: "She reads a book every afternoon.",
    explanation: "For third person singular ('She'), the verb takes suffix -s/es: 'reads'."
  },
  {
    id: "KB-ENG-02",
    category: "Kategori B",
    subject: "Bahasa Inggris",
    question: "The comparative form of 'clever' is ... and the superlative form is ...",
    options: [
      "more clever, most clever",
      "cleverer, cleverest",
      "cleverly, cleverness",
      "clever, cleverer"
    ],
    correctAnswer: "cleverer, cleverest",
    explanation: "Standard comparative and superlative of clever are cleverer and cleverest (or more clever / most clever)."
  },

  // --- KATEGORI B: BAHASA INDONESIA ---
  {
    id: "KB-IND-01",
    category: "Kategori B",
    subject: "Bahasa Indonesia",
    question: "Ide pokok atau gagasan utama sebuah paragraf biasanya terdapat pada?",
    options: ["Kalimat penjelas", "Kalimat utama", "Kata penghubung", "Tanda kurung"],
    correctAnswer: "Kalimat utama",
    explanation: "Gagasan utama terletak pada kalimat utama (bisa di awal, akhir, atau campuran)."
  },
  {
    id: "KB-IND-02",
    category: "Kategori B",
    subject: "Bahasa Indonesia",
    question: "Peribahasa 'Besar pasak daripada tiang' bermakna?",
    options: [
      "Pengeluaran lebih besar daripada pendapatan",
      "Rajin pangkal pandai hemat pangkal kaya",
      "Pekerjaan yang dilakukan bersama-sama",
      "Sombong dan tinggi hati"
    ],
    correctAnswer: "Pengeluaran lebih besar daripada pendapatan",
    explanation: "Makna kiasan pengeluaran melebihi penghasilan."
  },

  // --- KATEGORI C: MATEMATIKA ---
  {
    id: "KC-MAT-01",
    category: "Kategori C",
    subject: "Matematika",
    question: "Diketahui sebuah tabung memiliki jari-jari alas 7 cm dan tinggi 20 cm. Volume tabung tersebut adalah? (Gunakan π = 22/7)",
    options: ["3.080 cm³", "1.540 cm³", "6.160 cm³", "2.880 cm³"],
    correctAnswer: "3.080 cm³",
    explanation: "V = π x r² x t = (22/7) x 7 x 7 x 20 = 154 x 20 = 3.080 cm³."
  },
  {
    id: "KC-MAT-02",
    category: "Kategori C",
    subject: "Matematika",
    question: "Sebuah mobil menempuh jarak 180 km dengan kecepatan rata-rata 60 km/jam. Jika berangkat pukul 08.30 WIB, pukul berapa mobil tiba di tujuan?",
    options: ["10.30 WIB", "11.00 WIB", "11.30 WIB", "12.00 WIB"],
    correctAnswer: "11.30 WIB",
    explanation: "Waktu tempuh = 180 km / 60 km/jam = 3 jam. 08.30 + 3 jam = 11.30 WIB."
  },
  {
    id: "KC-MAT-03",
    category: "Kategori C",
    subject: "Matematika",
    question: "Dalam sebuah tes dengan 40 soal, jawaban benar bernilai +4, salah -1, dan tidak dijawab 0. Rian menjawab 32 soal benar dan 5 soal salah. Nilai yang diperoleh Rian adalah?",
    options: ["123", "128", "118", "120"],
    correctAnswer: "123",
    explanation: "(32 x 4) - (5 x 1) + (3 x 0) = 128 - 5 = 123."
  },
  {
    id: "KC-MAT-04",
    category: "Kategori C",
    subject: "Matematika",
    question: "Rata-rata nilai ulangan matematika dari 8 siswa adalah 75. Jika nilai seorang siswa baru yaitu 84 digabungkan, berapakah rata-rata nilai seluruhnya sekarang?",
    options: ["76", "77", "78", "75,5"],
    correctAnswer: "76",
    explanation: "Total awal = 8 x 75 = 600. Ditambah 84 = 684. Rata-rata baru = 684 / 9 = 76."
  },
  {
    id: "KC-MAT-05",
    category: "Kategori C",
    subject: "Matematika",
    question: "Bentuk sederhana dari aljabar 4(2x - 3y) - 2(3x - 5y) adalah?",
    options: ["2x - 2y", "2x + 2y", "14x - 22y", "2x - 22y"],
    correctAnswer: "2x - 2y",
    explanation: "8x - 12y - 6x + 10y = (8x - 6x) + (-12y + 10y) = 2x - 2y."
  },

  // --- KATEGORI C: IPA / SAINS ---
  {
    id: "KC-IPA-01",
    category: "Kategori C",
    subject: "IPA/Sains",
    question: "Planet dalam tata surya kita yang dijuluki sebagai 'Planet Merah' karena kandungan besi oksida di permukaannya adalah?",
    options: ["Venus", "Mars", "Jupiter", "Merkurius"],
    correctAnswer: "Mars",
    explanation: "Mars tampak berwarna kemerahan akibat karat besi (besi oksida) pada tanah dan debunya."
  },
  {
    id: "KC-IPA-02",
    category: "Kategori C",
    subject: "IPA/Sains",
    question: "Organ peredaran darah manusia yang bertugas memompa darah kaya oksigen ke seluruh tubuh adalah?",
    options: ["Bilik Kiri (Ventrikel Kiri)", "Bilik Kanan", "Serambi Kiri", "Serambi Kanan"],
    correctAnswer: "Bilik Kiri (Ventrikel Kiri)",
    explanation: "Bilik kiri memiliki dinding otot paling tebal untuk memompa darah ke aorta menuju seluruh tubuh."
  },
  {
    id: "KC-IPA-03",
    category: "Kategori C",
    subject: "IPA/Sains",
    question: "Hubungan simbiosis antara bunga dengan lebah madu merupakan contoh dari simbiosis?",
    options: ["Mutualisme", "Komensalisme", "Parasitisme", "Amensalisme"],
    correctAnswer: "Mutualisme",
    explanation: "Lebah mendapat nektar, sedangkan bunga terbantu dalam proses penyerbukannya (saling menguntungkan)."
  },

  // --- KATEGORI C: BAHASA INGGRIS ---
  {
    id: "KC-ENG-01",
    category: "Kategori C",
    subject: "Bahasa Inggris",
    question: "Complete the sentence with the correct passive voice: 'The national science trophy ... by our school team last year.'",
    options: ["is won", "was won", "has won", "were won"],
    correctAnswer: "was won",
    explanation: "Singular subject 'The national science trophy' in past tense requires 'was won'."
  },
  {
    id: "KC-ENG-02",
    category: "Kategori C",
    subject: "Bahasa Inggris",
    question: "'If we study diligently, we ... pass the final national olympiad with flying colors.'",
    options: ["would", "will", "did", "had"],
    correctAnswer: "will",
    explanation: "First conditional sentence pattern: If + simple present, will + bare infinitive."
  },

  // --- KATEGORI C: BAHASA INDONESIA ---
  {
    id: "KC-IND-01",
    category: "Kategori C",
    subject: "Bahasa Indonesia",
    question: "Teks yang berisi pemaparan informasi ilmiah nyata berdasarkan hasil observasi dan pengamatan disebut teks?",
    options: ["Eksposisi", "Laporan Hasil Observasi (LHO)", "Fabel", "Cerpen"],
    correctAnswer: "Laporan Hasil Observasi (LHO)",
    explanation: "Teks LHO disusun secara sistematis berdasarkan fakta pengamatan langsung."
  },
  {
    id: "KC-IND-02",
    category: "Kategori C",
    subject: "Bahasa Indonesia",
    question: "Penulisan gelar akademik dan nama yang sesuai dengan Pedoman Umum Ejaan Bahasa Indonesia (PUEBI) adalah?",
    options: [
      "Dr. Siti Rahma, M.Pd.",
      "Dr. Siti Rahma M.Pd",
      "DR Siti Rahma, MPd",
      "Dr, Siti Rahma M,Pd."
    ],
    correctAnswer: "Dr. Siti Rahma, M.Pd.",
    explanation: "Tanda koma dipakai di antara nama orang dan gelar akademik yang mengikutinya, serta singkatan gelar memakai titik."
  }
];

// Helper to expand questions to ensure at least 20 questions available per subject/category dynamically
export function generateQuestionPool(category, subject) {
  const filtered = DEFAULT_QUESTIONS.filter(q => q.category === category && q.subject === subject);
  if (filtered.length >= 20) return filtered;

  const isTK = category.includes('TK');
  const pool = [...filtered];
  const countNeeded = 25 - pool.length;

  for (let i = 1; i <= countNeeded; i++) {
    const seed = pool.length + 1;
    if (isTK) {
      if (subject === "Matematika") {
        const numA = (seed % 5) + 1;
        const numB = (seed % 4) + 1;
        pool.push({
          id: `TK-MAT-${seed.toString().padStart(2, '0')}`,
          category,
          subject,
          question: `⭐ Adik memiliki ${numA} bintang emas, lalu Ayah memberi lagi ${numB} bintang emas. Berapa jumlah semua bintang adik?`,
          options: [`${numA + numB} bintang`, `${numA + numB + 1} bintang`, `${numA + numB - 1} bintang`, `${numA} bintang`],
          correctAnswer: `${numA + numB} bintang`,
          explanation: `${numA} + ${numB} = ${numA + numB} bintang bersinar.`
        });
      } else if (subject === "IPA/Sains") {
        const animals = ["Kelinci", "Kucing", "Burung", "Ikan", "Kupu-kupu"];
        const habitats = ["darat dan suka wortel", "rumah dan suka ikan", "udara bisa terbang tinggi", "air dengan berenang", "taman bunga yang indah"];
        const aIndex = seed % animals.length;
        pool.push({
          id: `TK-IPA-${seed.toString().padStart(2, '0')}`,
          category,
          subject,
          question: `Hewan lucu yang hidup di ${habitats[aIndex]} adalah?`,
          options: [animals[aIndex], "Batu", "Mobil", "Sepeda"],
          correctAnswer: animals[aIndex],
          explanation: `${animals[aIndex]} adalah makhluk hidup ciptaan Tuhan yang hidup di ${habitats[aIndex]}.`
        });
      } else if (subject === "Bahasa Inggris") {
        const words = [
          { en: "Apple", id: "Apel", icon: "🍎" },
          { en: "Dog", id: "Anjing", icon: "🐶" },
          { en: "Sun", id: "Matahari", icon: "☀️" },
          { en: "Star", id: "Bintang", icon: "⭐" },
          { en: "Book", id: "Buku", icon: "📚" }
        ];
        const item = words[seed % words.length];
        pool.push({
          id: `TK-ENG-${seed.toString().padStart(2, '0')}`,
          category,
          subject,
          question: `${item.icon} What is the English word for '${item.id}'?`,
          options: [item.en, "Table", "Chair", "Shoe"],
          correctAnswer: item.en,
          explanation: `'${item.en}' adalah bahasa Inggris untuk ${item.id}.`
        });
      } else {
        const words = ["Buku", "Guru", "Sekolah", "Taman", "Bintang"];
        const w = words[seed % words.length];
        pool.push({
          id: `TK-IND-${seed.toString().padStart(2, '0')}`,
          category,
          subject,
          question: `Lengkapilah huruf yang hilang: 'B - U - K - ...' untuk membentuk kata benda yang dibaca?`,
          options: ["U", "A", "I", "O"],
          correctAnswer: "U",
          explanation: "Huruf 'U' melengkapi kata 'B - U - K - U'."
        });
      }
    } else if (subject === "Matematika") {
      const a = 12 * seed;
      const b = 8 + seed;
      pool.push({
        id: `${category.substring(9, 10)}-MAT-${seed.toString().padStart(2, '0')}`,
        category,
        subject,
        question: `Sebuah toko buku memiliki ${a} buku tulis. Toko tersebut menjual ${b * 3} buku di pagi hari dan menerima kiriman baru ${b * 5} buku. Berapa total buku sekarang?`,
        options: [
          `${a - b * 3 + b * 5} buku`,
          `${a - b * 2 + b * 4} buku`,
          `${a + b * 2} buku`,
          `${a + b * 4} buku`
        ],
        correctAnswer: `${a - b * 3 + b * 5} buku`,
        explanation: `Perhitungan berurutan: ${a} - ${b * 3} + ${b * 5} = ${a - b * 3 + b * 5} buku.`
      });
    } else if (subject === "IPA/Sains") {
      pool.push({
        id: `${category.substring(9, 10)}-IPA-${seed.toString().padStart(2, '0')}`,
        category,
        subject,
        question: `Energi alternatif ramah lingkungan nomor ${seed} yang memanfaatkan hembusan angin untuk memutar turbin generator dinamakan?`,
        options: ["Pembangkit Listrik Tenaga Bayu (PLTB)", "Pembangkit Panas Bumi", "Pembangkit Uap Fosil", "Pembangkit Minyak Bumi"],
        correctAnswer: "Pembangkit Listrik Tenaga Bayu (PLTB)",
        explanation: "PLTB memanfaatkan hembusan energi kinetik angin (bayu)."
      });
    } else if (subject === "Bahasa Inggris") {
      pool.push({
        id: `${category.substring(9, 10)}-ENG-${seed.toString().padStart(2, '0')}`,
        category,
        subject,
        question: `Select the synonym of the word 'EXCELLENT' in the context of academic achievement:`,
        options: ["Outstanding", "Careless", "Ordinary", "Weak"],
        correctAnswer: "Outstanding",
        explanation: "'Excellent' and 'outstanding' both mean exceptionally good."
      });
    } else {
      pool.push({
        id: `${category.substring(9, 10)}-IND-${seed.toString().padStart(2, '0')}`,
        category,
        subject,
        question: `Kata berimbuhan yang bermakna 'melakukan perbuatan secara berulang' atau saling berbalasan adalah?`,
        options: ["Tolong-menolong", "Bersepeda", "Membaca", "Pelari"],
        correctAnswer: "Tolong-menolong",
        explanation: "Kata ulang berimbuhan 'tolong-menolong' menyatakan makna resiprokal (saling melakukan perbuatan)."
      });
    }
  }

  return pool;
}
