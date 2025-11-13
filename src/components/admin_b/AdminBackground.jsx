//___________________________________##################################

import React from "react";

const AdminBackground = () => {
  return (
    <div className="absolute w-full h-screen inset-0 overflow-hidden bg-[#01352B]">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#003C32] via-[#015B45] to-[#00B76F] opacity-95" />

      {/* Geometric pattern - Exact positions from image */}
      <div className="absolute right-0 top-0 w-full h-full">
        
        {/* Top Row - Right side */}
        <div className="absolute top-[8%] right-[8%] flex gap-6 animate-float-slow">
          <div className="w-[180px] h-[140px] bg-gradient-to-br from-[#00A86B] to-[#007E53] rounded-[3rem] opacity-80"></div>
        </div>

        <div className="absolute top-[2%] right-[25%] flex gap-6 animate-float-mid">
          <div className="w-[150px] h-[150px] bg-[#017A55] rounded-full opacity-75"></div>
        </div>

        {/* Second Row */}
        <div className="absolute top-[22%] right-[5%] flex gap-6 animate-float-fast">
          <div className="w-[220px] h-[160px] bg-gradient-to-br from-[#00B76F] to-[#008E5E] rounded-[3rem] opacity-85"></div>
        </div>

        <div className="absolute top-[28%] right-[28%] flex gap-6 animate-float-slow">
          <div className="w-[200px] h-[130px] bg-gradient-to-br from-[#00C07A] to-[#00A86B] rounded-[2.5rem] opacity-80"></div>
        </div>

        {/* Middle Row */}
        <div className="absolute top-[45%] right-[3%] flex gap-6 animate-float-mid">
          <div className="w-[240px] h-[180px] bg-gradient-to-br from-[#00C07A] to-[#00A86B] rounded-[3rem] opacity-85"></div>
        </div>

        {/* Bottom Row */}
        <div className="absolute bottom-[22%] right-[15%] flex gap-6 animate-float-fast">
          <div className="w-[260px] h-[200px] bg-gradient-to-br from-[#00D97E] to-[#00B76F] rounded-[3.5rem] opacity-85"></div>
        </div>

        <div className="absolute bottom-[18%] left-[35%] flex gap-6 animate-float-slow">
          <div className="w-[220px] h-[180px] bg-gradient-to-br from-[#00A86B] to-[#007E53] rounded-[3rem] opacity-80"></div>
        </div>

        {/* Bottom Left shapes */}
        <div className="absolute bottom-[25%] left-[20%] flex gap-6 animate-float-mid">
          <div className="w-[140px] h-[140px] bg-[#017A55] rounded-full opacity-70"></div>
        </div>

        <div className="absolute bottom-[8%] left-[12%] flex gap-6 animate-float-fast">
          <div className="w-[200px] h-[160px] bg-gradient-to-br from-[#00A86B] to-[#007E53] rounded-[3rem] opacity-75"></div>
        </div>

        {/* Far bottom right - brightest green */}
        <div className="absolute bottom-[2%] right-[8%] flex gap-6 animate-float-slow">
          <div className="w-[280px] h-[220px] bg-gradient-to-br from-[#00FF88] to-[#00D97E] rounded-[3.5rem] opacity-90"></div>
        </div>

      </div>

      {/* Soft glowing light bottom-right */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[480px] h-[480px] bg-[#00FFB2]/25 blur-[140px] rounded-full animate-pulse-slow"></div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-mid {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-mid {
          animation: float-mid 5s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminBackground;


// import React from 'react';

// const AdminBackground = () => {
//   return (
//     <div className="relative w-full h-screen bg-emerald-950 overflow-hidden">
//       {/* Main background */}
//       <div className="absolute inset-0 bg-emerald-950"></div>
      
//       {/* Abstract shapes */}
//       {/* Large rounded rectangle on top right */}
//       <div className="absolute top-0 right-0 w-1/3 h-1/4 bg-gradient-to-br from-emerald-700 to-emerald-500 rounded-b-full border-4 border-emerald-950"></div>
      
//       {/* Medium circle in middle right */}
//       <div className="absolute top-1/4 right-1/4 w-1/4 h-1/4 bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-full border-4 border-emerald-950"></div>
      
//       {/* Vertical rounded rectangle */}
//       <div className="absolute top-1/2 right-1/6 w-1/5 h-1/2 bg-gradient-to-br from-emerald-500 to-emerald-300 rounded-xl border-4 border-emerald-950"></div>
      
//       {/* Horizontal rounded rectangle */}
//       <div className="absolute top-1/3 right-1/3 w-1/4 h-1/6 bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-full border-4 border-emerald-950"></div>
      
//       {/* Small circle in bottom left */}
//       <div className="absolute bottom-1/4 left-1/4 w-1/8 h-1/8 bg-gradient-to-br from-emerald-700 to-emerald-500 rounded-full border-4 border-emerald-950"></div>
      
//       {/* Bottom left rounded rectangle */}
//       <div className="absolute bottom-0 left-1/6 w-1/3 h-1/4 bg-gradient-to-br from-emerald-700 to-emerald-500 rounded-tl-full border-4 border-emerald-950"></div>
      
//       {/* Bottom right large rounded rectangle */}
//       <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-emerald-400 to-emerald-300 rounded-tl-full border-4 border-emerald-950"></div>
      
//       {/* Right side vertical rounded rectangle */}
//       <div className="absolute top-1/6 right-0 w-1/6 h-1/3 bg-gradient-to-br from-emerald-500 to-emerald-300 rounded-l-full border-4 border-emerald-950"></div>
      
//       {/* Right side horizontal rounded rectangle */}
//       <div className="absolute top-1/2 right-0 w-1/6 h-1/6 bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-l-full border-4 border-emerald-950"></div>
      
//       {/* Bottom right small circle */}
//       <div className="absolute bottom-0 right-1/6 w-1/12 h-1/12 bg-gradient-to-br from-emerald-500 to-emerald-300 rounded-full border-4 border-emerald-950"></div>
//     </div>
//   );
// };

// export default AdminBackground;