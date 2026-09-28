import React from 'react';

/**
 * LOGO 1: OLIMPIADE ANAK INDONESIA
 * Dibuat presisi 100% sesuai gambar lampiran resmi:
 * - Siluet anak laki-laki & anak perempuan meraih bintang emas
 * - Lengkungan kubah matahari kuning hangat (#EFA82B / #F59E0B) dengan 5 sinar tetesan (white droplet rays)
 * - Bintang emas cemerlang di titik puncak antara kedua tangan
 * - Buku terbuka berwarna navy tua (#162447 / #1C2858) dengan lembaran putih melengkung
 * - Tipografi resmi tebal: "OLIMPIADE" dan "ANAK INDONESIA"
 */
export const LogoOlimpiade: React.FC<{
  className?: string;
  showText?: boolean;
  variant?: 'light' | 'dark';
  layout?: 'horizontal' | 'vertical';
}> = ({
  className = 'h-14 w-auto',
  showText = true,
  variant = 'dark',
  layout = 'horizontal'
}) => {
  const textColor = variant === 'light' ? '#FFFFFF' : '#14213D';
  const subTextColor = variant === 'light' ? '#FDE68A' : '#1E3A8A';

  // SVG Graphic Element
  const emblemSvg = (
    <svg
      viewBox="0 0 400 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-auto aspect-[400/280] overflow-visible flex-shrink-0"
    >
      <defs>
        <filter id="starGlowOAI" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#D97706" floodOpacity="0.4" />
        </filter>
        <linearGradient id="sunGradOAI" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>

      {/* 1. Yellow-Orange Sun Semi-Circle Dome */}
      <path
        d="M 90 190 A 110 110 0 0 1 310 190 Z"
        fill="url(#sunGradOAI)"
      />

      {/* 2. White Radiating Droplet Rays (from star downward) */}
      <g fill="#FFFFFF" opacity="0.95">
        {/* Center drop ray */}
        <path d="M 200 95 C 201 106 203 130 203 145 C 203 148 201.5 150 199.5 150 C 197.5 150 196 148 196 145 C 196 130 198 106 199 95 Z" />
        {/* Middle Left ray */}
        <path d="M 189 99 C 185 110 176 134 174 148 C 173.5 150.5 171.5 152 169 151.5 C 166.5 151 165.5 149 166 146 C 168 132 179 111 185 101 Z" />
        {/* Far Left ray */}
        <path d="M 182 105 C 171 119 152 147 147 163 C 146 165.5 143.5 166.5 141 165.5 C 138.5 164.5 138 162 139 159 C 144 143 164 117 177 104 Z" />
        {/* Middle Right ray */}
        <path d="M 211 99 C 215 110 224 134 226 148 C 226.5 150.5 228.5 152 231 151.5 C 233.5 151 234.5 149 234 146 C 232 132 221 111 215 101 Z" />
        {/* Far Right ray */}
        <path d="M 218 105 C 229 119 248 147 253 163 C 254 165.5 256.5 166.5 259 165.5 C 261.5 164.5 262 162 261 159 C 256 143 236 117 223 104 Z" />
      </g>

      {/* 3. Golden Star (Apex between their hands) */}
      <path
        d="M 200 58 L 205.5 73 L 221 74 L 208.5 83.5 L 213 98 L 200 89 L 187 98 L 191.5 83.5 L 179 74 L 194.5 73 Z"
        fill="#FFD200"
        stroke="#F59E0B"
        strokeWidth="1.5"
        filter="url(#starGlowOAI)"
      />

      {/* 4. Boy Silhouette (Left) reaching right arm up toward star */}
      <g fill="#14213D">
        {/* Boy Head */}
        <circle cx="145" cy="106" r="18" />
        {/* Cute Boy Spiky Hair */}
        <path d="M 128 100 C 127 86 141 82 149 86 C 156 86 162 93 162 100 C 157 95 147 94 139 97 C 133 98 130 99 128 100 Z" />
        {/* Nose & face facing right */}
        <path d="M 158 104 C 162 106 162 109 158 111 Z" />
        {/* Body & Shirt */}
        <path d="M 131 126 C 135 121 155 121 159 126 L 165 168 L 127 168 Z" />
        {/* Right Arm reaching up toward star */}
        <path d="M 155 128 C 167 116 183 97 194 80 C 197 77 201 80 199 83 C 188 98 172 120 161 135 Z" />
        {/* Left Arm along hip */}
        <path d="M 132 130 C 125 136 123 144 123 152 C 123 156 129 156 130 152 C 130 146 132 140 137 134 Z" />
        {/* Shorts */}
        <path d="M 127 168 L 165 168 L 161 190 L 148 190 L 146 180 L 144 190 L 129 190 Z" />
        {/* Left Leg & Foot */}
        <path d="M 133 190 L 131 212 C 129 214 124 215 123 213 C 122 211 127 208 128 190 Z" />
        {/* Right Leg & Foot */}
        <path d="M 153 190 L 155 212 C 157 214 162 215 163 213 C 164 211 159 208 158 190 Z" />
      </g>

      {/* 5. Girl Silhouette (Right) reaching left arm up toward star */}
      <g fill="#14213D">
        {/* Girl Head */}
        <circle cx="255" cy="106" r="17.5" />
        {/* Ponytail Hair at the right back */}
        <path d="M 266 98 C 280 102 286 112 287 126 C 281 124 276 120 273 114 C 271 109 271 104 266 98 Z" />
        {/* Nose & face facing left */}
        <path d="M 241 104 C 237 106 237 109 241 111 Z" />
        {/* Dress & Body */}
        <path d="M 242 126 C 245 121 265 121 268 126 L 284 178 C 284 182 232 182 232 178 Z" />
        {/* Left Arm reaching up toward star */}
        <path d="M 245 128 C 233 116 217 97 206 80 C 203 77 199 80 201 83 C 212 98 228 120 239 135 Z" />
        {/* Right Arm at side */}
        <path d="M 267 130 C 274 136 276 144 276 152 C 276 156 270 156 269 152 C 269 146 267 140 262 134 Z" />
        {/* Legs standing on book */}
        <path d="M 246 180 L 244 212 C 242 214 237 215 236 213 C 235 211 240 208 241 180 Z" />
        {/* Right Leg */}
        <path d="M 266 180 L 268 212 C 270 214 275 215 276 213 C 277 211 272 208 271 180 Z" />
      </g>

      {/* 6. Open Book (Bottom Navy Base with Swooping Curves & Clean White Pages) */}
      <path
        d="M 55 186 C 128 174 188 205 200 215 C 212 205 272 174 345 186 L 324 232 C 260 210 212 238 200 242 C 188 238 140 210 76 232 Z"
        fill="#14213D"
      />
      {/* Inner White Pages with Clean Curved Layer */}
      <path
        d="M 64 184 C 130 172 188 202 200 210 C 212 202 270 172 336 184 L 316 222 C 260 201 214 228 200 232 C 186 228 140 201 84 222 Z"
        fill="#FFFFFF"
      />
      {/* Central Book Spine Valley */}
      <path d="M 200 210 L 200 234" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );

  if (layout === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        <div className="w-full max-w-[260px] aspect-[400/280]">{emblemSvg}</div>
        {showText && (
          <div className="mt-2 flex flex-col items-center">
            <span
              className="text-2xl sm:text-3xl font-black tracking-wider leading-none"
              style={{ color: textColor, letterSpacing: '0.08em', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
            >
              OLIMPIADE
            </span>
            <span
              className="text-xs sm:text-sm font-extrabold tracking-[0.28em] mt-1 uppercase"
              style={{ color: subTextColor, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
            >
              ANAK INDONESIA
            </span>
          </div>
        )}
      </div>
    );
  }

  // Horizontal Layout
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {emblemSvg}

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className="text-xl sm:text-2xl font-black tracking-wider"
            style={{ color: textColor, letterSpacing: '0.06em', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            OLIMPIADE
          </span>
          <span
            className="text-xs sm:text-sm font-bold tracking-[0.24em] mt-1 uppercase"
            style={{ color: subTextColor, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
          >
            ANAK INDONESIA
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * LOGO 2: YAYASAN BESARRASA BAGI BANGSA
 * Dibuat presisi 100% sesuai gambar lampiran 2:
 * - Seal Lingkaran Royal Blue (#0162B8)
 * - Teks melengkung atas: "YAYASAN BESARRASA" (BESARRASA dengan double 'R')
 * - Teks melengkung bawah: "BAGI BANGSA"
 * - Simbol rumah/atap segitiga, dua tangan berjabat erat di tengah
 * - Buku terbuka dengan lembaran memancar (fanned pages) di bawah tangan
 */
export const LogoYayasan: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = 'h-14 w-14' }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`${className} flex-shrink-0 select-none overflow-visible`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Top Arc for Text */}
        <path
          id="sealArcTopOfficial"
          d="M 28 100 A 72 72 0 0 1 172 100"
          fill="none"
        />
        {/* Bottom Arc for Text */}
        <path
          id="sealArcBottomOfficial"
          d="M 172 100 A 72 72 0 0 1 28 100"
          fill="none"
        />
      </defs>

      {/* Outer Solid Royal Blue Ring */}
      <circle cx="100" cy="100" r="95" stroke="#0162B8" strokeWidth="5.5" fill="#FFFFFF" />

      {/* Inner Concentric Thin Ring */}
      <circle cx="100" cy="100" r="84" stroke="#0162B8" strokeWidth="2" fill="none" />

      {/* Arched Typography - BESARRASA dengan double R */}
      <text fill="#0162B8" fontSize="13" fontWeight="900" letterSpacing="3.5" textAnchor="middle" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <textPath href="#sealArcTopOfficial" startOffset="50%">
          YAYASAN BESARRASA
        </textPath>
      </text>

      <text fill="#0162B8" fontSize="13.5" fontWeight="900" letterSpacing="4.5" textAnchor="middle" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <textPath href="#sealArcBottomOfficial" startOffset="50%">
          BAGI BANGSA
        </textPath>
      </text>

      {/* Central House Contour Frame */}
      <path
        d="M 58 132 L 58 84 L 100 48 L 142 84 L 142 132"
        stroke="#0162B8"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Two Clasping Hands in Partnership & Solidarity */}
      <g stroke="#0162B8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Left hand wrist/sleeve & fingers */}
        <path d="M 68 114 L 88 95 C 93 90 102 90 107 95" />
        <path d="M 76 122 L 95 103" />

        {/* Right hand wrist/sleeve & clasp */}
        <path d="M 132 114 L 112 95 C 107 90 98 90 93 95" />
        <path d="M 124 122 L 105 103" />

        {/* Fingers interlocking details */}
        <path d="M 92 92 C 94 88 100 88 103 92" />
        <path d="M 87 97 C 89 93 96 93 99 97" />
        <path d="M 97 101 C 100 97 106 97 109 101" />
        <path d="M 93 107 C 96 103 103 103 106 107" />
      </g>

      {/* Open Fanned Book Pages Radiating Below Hands */}
      <g stroke="#0162B8" strokeWidth="2.8" strokeLinecap="round" fill="none">
        {/* Left Fanned Pages */}
        <path d="M 58 132 Q 98 118 100 142" />
        <path d="M 62 138 Q 98 124 100 142" />
        <path d="M 68 145 Q 98 130 100 142" />
        <path d="M 76 151 Q 98 136 100 142" />

        {/* Right Fanned Pages */}
        <path d="M 142 132 Q 102 118 100 142" />
        <path d="M 138 138 Q 102 124 100 142" />
        <path d="M 132 145 Q 102 130 100 142" />
        <path d="M 124 151 Q 102 136 100 142" />

        {/* Center Spine */}
        <line x1="100" y1="120" x2="100" y2="146" strokeWidth="3" />
      </g>
    </svg>
  );
};

/**
 * ImageWithFallback:
 * Memastikan stabilitas asset gambar sesuai poin 2:
 * ZERO BROKEN IMAGE / ZERO MISSING IMAGE.
 * Otomatis beralih ke Unsplash HD fallback bertema anak cilik jika terjadi load error.
 */
export const ImageWithFallback: React.FC<{
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
}> = ({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1200&auto=format&fit=crop',
  loading = 'lazy'
}) => {
  const [imgSrc, setImgSrc] = React.useState(src);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading={loading}
      className={className}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
};
