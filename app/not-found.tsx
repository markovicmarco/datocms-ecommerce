
import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="max-w-[1920px] mx-auto w-full border-2 border-black p-1 shadow-[20px_20px_0px_0px_rgba(135,206,235,1)]">
        <div className="grid gap-0 md:grid-cols-2 bg-white">
          
          {/* TEXT CONTENT: Technical Error Log */}
          <div className="flex flex-col items-start justify-center p-8 md:p-24 border-b-2 md:border-b-0 md:border-r-2 border-black">
            <span className="mb-6 inline-block bg-black px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[#87CEEB]">
              Status_Code: 404
            </span>
            
            <h1 className="mb-4 text-5xl md:text-8xl font-serif uppercase leading-[0.85] text-black italic">
              Route <br /> Not Found
            </h1>

            <p className="mb-12 max-w-sm text-[12px] uppercase tracking-widest text-gray-500 font-medium leading-loose">
              The requested resource has been moved, deleted, or never existed in this architectural layer.
            </p>

            <Link
              href={'/'}
              className="group relative flex items-center gap-4 border-2 border-black bg-black px-10 py-5 text-[11px] font-bold uppercase tracking-[0.4em] text-white transition-all hover:bg-[#87CEEB] hover:text-black"
            >
              <span>Return to Base</span>
              <span className="transition-transform group-hover:translate-x-2">→</span>
            </Link>
          </div>

          {/* VISUAL: Industrial Glitch */}
          <div className="relative h-[400px] md:h-auto overflow-hidden bg-gray-100 grayscale hover:grayscale-0 transition-all duration-1000">
            <Image
              src="https://images.unsplash.com/photo-1590642916589-592bca10dfbf?auto=format&q=75&fit=crop&w=600"
              priority
              alt="404 Error Visual"
              fill
              className="object-cover transition-transform duration-[3000ms] hover:scale-110"
            />
            {/* System Overlay */}
            <div className="absolute inset-0 bg-[#87CEEB]/10 mix-blend-multiply pointer-events-none" />
            <div className="absolute top-6 right-6 border border-white/40 px-3 py-1 text-[9px] font-mono text-white tracking-widest uppercase backdrop-blur-sm">
              ERR_SYSTEM_LOG_v2.0
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NotFound;