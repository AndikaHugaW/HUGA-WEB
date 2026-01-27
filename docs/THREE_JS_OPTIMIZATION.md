# Panduan Optimasi Three.js / 3D Animation

Dokumen ini berisi strategi optimasi yang sudah diterapkan dan tips tambahan untuk website portfolio.

## ✅ Optimasi yang Sudah Diterapkan

### 1. Vortex Component (`vortex.tsx`)
| Optimasi | Deskripsi |
|----------|-----------|
| **Particle Count Reduced** | Dari 700 → 200 partikel |
| **FPS Throttle** | Target 30fps bukan 60fps |
| **Visibility API** | Pause animasi ketika tab tidak aktif |
| **Intersection Observer** | Pause ketika komponen tidak terlihat |
| **Simplified Glow** | Dari 3 pass render → 1 pass |

### 2. Canvas Reveal Effect (`canvas-reveal-effect.tsx`)
| Optimasi | Deskripsi |
|----------|-----------|
| **Device Performance Detection** | Auto-detect mobile/low-end device |
| **Adaptive FPS** | High: 45fps, Medium: 30fps, Low: 20fps |
| **Adaptive Dot Size** | Larger dots on mobile = fewer calculations |
| **useMemo for Materials** | Prevent re-creation of shaders |

### 3. Next.js Config (`next.config.js`)
| Optimasi | Deskripsi |
|----------|-----------|
| **optimizePackageImports** | Tree-shake three, framer-motion, dll |
| **Image Caching** | 1 year cache untuk static assets |
| **removeConsole** | Hapus console.log di production |

## 💡 Tips Tambahan untuk Performa Lebih Baik

### 1. Lazy Load Three.js Components
```tsx
// Gunakan dynamic import
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false,
  loading: () => <div className="skeleton" />
});
```

### 2. Reduce Geometry Complexity
```tsx
// Kurangi segments pada geometry
const geometry = new THREE.SphereGeometry(1, 16, 16); // bukan 64, 64
```

### 3. Use InstancedMesh for Repeated Objects
```tsx
// Untuk banyak objek yang sama
const mesh = new THREE.InstancedMesh(geometry, material, 1000);
```

### 4. Dispose Resources on Unmount
```tsx
useEffect(() => {
  return () => {
    geometry.dispose();
    material.dispose();
    texture.dispose();
  };
}, []);
```

### 5. Use Low-Poly Models
- Gunakan model 3D dengan polygon count < 10k
- Compress textures ke format WebP/AVIF
- Use draco compression untuk GLTF

### 6. Disable Antialiasing on Mobile
```tsx
<Canvas gl={{ antialias: !isMobile }}>
```

### 7. Resolution Scaling
```tsx
<Canvas dpr={Math.min(window.devicePixelRatio, 2)}>
```

## 📊 Performance Benchmarks

| Device | Target FPS | Particle Count |
|--------|------------|----------------|
| Desktop (8+ cores) | 45 fps | 200 |
| Laptop (4-8 cores) | 30 fps | 150 |
| Mobile | 20 fps | 100 |

## 🔍 Monitoring Performance

Gunakan React Three Fiber Stats:
```tsx
import { Stats } from '@react-three/drei';

<Canvas>
  <Stats />
  {/* other components */}
</Canvas>
```

## ⚠️ Common Pitfalls

1. **Memory Leaks** - Selalu dispose geometries dan materials
2. **Too Many Lights** - Max 3-4 lights per scene
3. **Large Textures** - Compress ke max 1024x1024 untuk web
4. **useFrame Heavy Logic** - Jangan hitung math berat di render loop
