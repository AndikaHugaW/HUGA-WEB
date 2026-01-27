# Andika Huga - Portfolio Website

Website portfolio profesional dengan desain modern, animasi smooth, dan performa optimal.

## 🚀 Teknologi

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| **Next.js** | 14.2.x | React framework dengan App Router |
| **React** | 18.x | UI Library |
| **Tailwind CSS** | 3.x | Utility-first CSS framework |
| **TypeScript** | 5.x | Type safety |
| **Framer Motion** | 11.x | Animasi 2D smooth dan premium |
| **Three.js / R3F** | 8.x | Elemen 3D & particle effects |
| **Lenis** | - | Smooth scroll dengan momentum |
| **Nodemailer** | - | Email sending untuk contact form |

## ✨ Fitur Utama

### 🎨 Visual & Animasi
- ✅ **Hero Section Dinamis** - Dengan foto profil, overlay text, dan statistik
- ✅ **Smooth Scroll (Lenis)** - Scrolling premium dengan momentum
- ✅ **Magnetic Buttons** - Tombol yang 'menempel' saat kursor mendekat
- ✅ **Text Reveal** - Animasi text per-huruf/per-kata
- ✅ **Vortex Particle System** - Background animasi partikel yang ringan
- ✅ **Canvas Reveal Effect** - Efek dot matrix dengan shader
- ✅ **Testimonials Section** - Kolom testimonial dengan infinite scroll animation

### ⚡ Performa & Optimasi
- ✅ **Device Performance Detection** - Auto-adapt FPS berdasarkan device
- ✅ **Lazy Loading** - Dynamic imports untuk komponen berat
- ✅ **Image Optimization** - WebP/AVIF dengan proper sizing
- ✅ **Visibility API** - Pause animasi saat tab tidak aktif
- ✅ **Intersection Observer** - Pause animasi saat tidak terlihat
- ✅ **FPS Throttling** - 30fps untuk efisiensi baterai

### 📱 Responsif
- ✅ **Mobile-First Design** - Layout optimal untuk semua ukuran layar
- ✅ **Adaptive Components** - Ukuran dan posisi menyesuaikan screen size
- ✅ **Touch-Friendly** - Navigasi mudah di perangkat mobile

### 📧 Fungsionalitas
- ✅ **Contact Form** - Form kontak yang berfungsi dengan email notification
- ✅ **FAQ Section** - Pertanyaan umum tentang layanan
- ✅ **Projects Gallery** - Showcase proyek dengan gambar optimized

## 📦 Instalasi

1. Clone repository:
```bash
git clone https://github.com/AndikaHugaW/HUGA---WEB.git
cd HUGA---WEB
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp .env.example .env.local
# Edit .env.local dengan Gmail App Password
```

4. Jalankan development server:
```bash
npm run dev
```

5. Buka [http://localhost:3000](http://localhost:3000) di browser

## 📜 Scripts

| Script | Fungsi |
|--------|--------|
| `npm run dev` | Development server |
| `npm run build` | Build production |
| `npm run start` | Production server |
| `npm run lint` | ESLint check |

## 📁 Struktur Project

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── send-email/       # API endpoint untuk contact form
│   │   ├── layout.tsx            # Root layout dengan providers
│   │   ├── page.tsx              # Home page dengan semua sections
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── hero/
│   │   │   └── HeroSection.tsx   # Hero section dengan foto & stats
│   │   ├── sections/
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── RecentProjectsSection.tsx
│   │   │   ├── TestimonialsSection.tsx  # NEW: Testimonial columns
│   │   │   └── WhatIDoSection.tsx
│   │   ├── ui/
│   │   │   ├── MagneticButton.tsx
│   │   │   ├── TextReveal.tsx
│   │   │   ├── vortex.tsx        # Optimized particle system
│   │   │   ├── canvas-reveal-effect.tsx  # Optimized shader effect
│   │   │   └── TestimonialsColumn.tsx    # NEW: Animated column
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── providers/
│   │       └── SmoothScrollProvider.tsx
├── public/
│   └── images/
│       ├── hero/                 # Foto profil
│       └── projects/             # Gambar proyek (optimized)
├── docs/
│   └── THREE_JS_OPTIMIZATION.md  # Dokumentasi optimasi 3D
├── next.config.js                # Next.js config dengan optimizations
├── tailwind.config.ts            # Tailwind configuration
└── .env.local                    # Environment variables (tidak di-commit)
```

## 🎯 Sections

| Section | Deskripsi |
|---------|-----------|
| **Hero** | Foto profil, nama, role, dan statistik (50+ Projects, 50+ Clients) |
| **Companies** | Logo perusahaan/teknologi yang digunakan |
| **Welcome** | Intro singkat tentang developer |
| **Recent Projects** | 6 proyek terbaru dengan gambar |
| **About** | Tentang developer dan keahlian |
| **What I Do** | Layanan yang ditawarkan |
| **Projects** | Gallery lengkap semua proyek |
| **Testimonials** | Testimoni dari klien (animated columns) |
| **Experience** | Pengalaman kerja dan timeline |
| **FAQ** | Pertanyaan umum tentang layanan |
| **Contact** | Form kontak + info kontak |

## 🔧 Environment Variables

```env
# Gmail App Password untuk Contact Form
GMAIL_APP_PASSWORD=your_gmail_app_password
```

**Cara mendapatkan Gmail App Password:**
1. Buka Google Account Settings
2. Security → 2-Step Verification (aktifkan jika belum)
3. App passwords → Generate new password
4. Copy password ke `.env.local`

## 📊 Optimasi Performa

Website ini sudah dioptimasi dengan:

| Optimasi | Deskripsi |
|----------|-----------|
| **Image Compression** | Semua gambar dikompresi ke < 500KB |
| **Lazy Loading** | Komponen 3D di-load secara dynamic |
| **FPS Throttle** | Animasi dibatasi 30fps untuk hemat baterai |
| **Visibility API** | Pause animasi saat tab tidak aktif |
| **Package Optimization** | Tree-shaking untuk three.js & framer-motion |
| **Caching** | 1 tahun cache untuk static assets |

## 📝 Changelog (Latest)

### v2.0.0 (January 2026)
- ✨ Added Testimonials Section with animated columns
- ⚡ Optimized Three.js/Canvas components for better performance
- 🎨 Improved Hero Section mobile responsiveness
- 📧 Implemented working Contact Form with Gmail
- 🔧 Updated Next.js config with performance optimizations
- 📱 Fixed spacing issues in Hero stats section

---

**Dibuat dengan ❤️ oleh Andika Huga Widyatama**

**Tech Stack: Next.js • React • TypeScript • Tailwind CSS • Three.js • Framer Motion**
