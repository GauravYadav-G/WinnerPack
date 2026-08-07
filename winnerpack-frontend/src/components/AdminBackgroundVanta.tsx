"use client";

export default function AdminBackgroundVanta() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#fbfaf7]">
      {/* Soft Ambient Radial Blobs */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#fe8220]/8 blur-[120px]"
        style={{ animation: 'float-blob-1 25s infinite alternate ease-in-out' }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#482dbf]/6 blur-[140px]"
        style={{ animation: 'float-blob-2 30s infinite alternate ease-in-out' }}
      />
      <div 
        className="absolute top-[40%] right-[20%] w-[45%] h-[45%] rounded-full bg-pink-500/5 blur-[120px]"
        style={{ animation: 'float-blob-3 28s infinite alternate ease-in-out' }}
      />

      <style jsx global>{`
        @keyframes float-blob-1 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(60px, 40px) scale(1.15); }
          100% { transform: translate(-30px, 80px) scale(0.9); }
        }
        @keyframes float-blob-2 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-80px, -50px) scale(0.9); }
          100% { transform: translate(40px, 20px) scale(1.1); }
        }
        @keyframes float-blob-3 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(50px, -70px) scale(1.1); }
          100% { transform: translate(-50px, 30px) scale(0.95); }
        }
      `}</style>
    </div>
  );
}
