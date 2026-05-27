export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-black text-[#0066ff] mb-4">404</h1>
        <p className="text-white text-xl mb-8">Page not found</p>
        <a 
          href="/" 
          className="px-6 py-3 bg-[#0066ff] text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
