'use client';

export default function SocialShare() {
  return (
    <div className="flex items-center gap-3">
      {/* TikTok */}
      <a
        href="https://www.tiktok.com/@esconabdou"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-gradient-to-r from-[#00f2ea] to-[#ff0050] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
        aria-label="Síguenos en TikTok"
        title="Síguenos en TikTok @esconabdou"
      >
        <svg 
          className="w-5 h-5" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
        <span className="font-semibold text-sm">@esconabdou</span>
      </a>
    </div>
  );
}
