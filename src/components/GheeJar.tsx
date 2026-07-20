import { motion, useTransform } from "motion/react";
import { Sparkles } from "lucide-react";

export const GheeJar = ({ 
  smoothProgress, 
  style = {}, 
  className = "", 
  showShadows = true,
  animateFloat = false
}: { 
  smoothProgress?: any;
  style?: any;
  className?: string;
  showShadows?: boolean;
  animateFloat?: boolean;
}) => {
  // If smoothProgress is provided, use it for animation, else static 0%
  const yOffset = smoothProgress ? useTransform(smoothProgress, [0, 1], ["0%", "8%"]) : "0%";

  return (
    <motion.div 
      style={style}
      className={`relative w-[280px] h-[340px] md:w-[340px] md:h-[420px] group transition-all duration-1000 ease-out mx-auto ${className}`}
      animate={animateFloat ? {
        y: [0, -12, 0],
      } : {}}
      transition={animateFloat ? {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      } : {}}
    >
      {/* Jar Drop Shadow */}
      {showShadows && (
        <>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-[20px] bg-black/40 rounded-[100%] blur-[12px] transition-all duration-700 group-hover:scale-105 group-hover:blur-[16px]"></div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-[40px] bg-[#F2A900]/20 rounded-[100%] blur-[25px] transition-all duration-700 group-hover:opacity-80 group-hover:scale-110"></div>
        </>
      )}

      {/* Main Glass Body */}
      <div className="absolute top-[35px] bottom-0 left-[10px] right-[10px] rounded-[45px] bg-white/10 backdrop-blur-[2px] border border-white/40 shadow-[inset_0_0_20px_rgba(255,255,255,0.7),0_20px_40px_rgba(0,0,0,0.15)] z-10 overflow-hidden">
        
        {/* Outer glass rim thickness */}
        <div className="absolute inset-0 rounded-[45px] shadow-[inset_18px_0_25px_rgba(255,255,255,0.7),inset_-18px_0_25px_rgba(255,255,255,0.5),inset_0_-25px_30px_rgba(255,255,255,0.9)] z-20 pointer-events-none mix-blend-screen"></div>

        {/* Golden Ghee Liquid */}
        <div className="absolute top-[25px] bottom-[15px] left-[15px] right-[15px] rounded-[30px] bg-gradient-to-b from-[#FFD15C] via-[#F5AA27] to-[#DF8206] shadow-[inset_0_20px_30px_rgba(255,255,255,0.4),inset_0_-20px_40px_rgba(180,80,0,0.5)] overflow-hidden transition-all duration-1000 group-hover:scale-[1.02]">
          {/* Surface reflection */}
          <div className="absolute top-0 left-0 right-0 h-[15%] bg-gradient-to-b from-[#FFF2B2] to-transparent rounded-[100%] -mt-[5%] scale-[1.1] opacity-70"></div>
          {/* Light bleed inside liquid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,230,120,0.6)_0%,transparent_60%)] mix-blend-screen"></div>
        </div>

        {/* Label (Wrapped perfectly) */}
        <div className="absolute top-[30%] bottom-[32%] left-0 right-0 bg-[#F4E9D8] z-20 flex flex-col items-center justify-center border-y-[2px] border-[#8A5A19]/30 shadow-[0_5px_15px_rgba(0,0,0,0.15)] overflow-hidden">
           
           {/* Label Top/Bottom Decorative Borders */}
           <div className="absolute top-1 left-0 right-0 h-2 bg-[radial-gradient(circle,rgba(138,90,25,0.6)_1px,transparent_1px)] bg-[size:6px_6px] bg-repeat-x"></div>
           <div className="absolute bottom-1 left-0 right-0 h-2 bg-[radial-gradient(circle,rgba(138,90,25,0.6)_1px,transparent_1px)] bg-[size:6px_6px] bg-repeat-x"></div>

           <h4 className="font-serif text-[#3D2314] text-[10px] md:text-[11px] font-bold tracking-[0.2em] mb-1 relative z-10 mt-2">SRR FARMS</h4>
           <h3 className="font-serif text-[42px] md:text-[52px] font-bold tracking-wider text-[#3D2314] leading-none mb-2 relative z-10">GHEE</h3>
           <div className="px-3 py-1 bg-[#3D2314] rounded-full relative z-10 mb-2">
             <p className="text-[8px] md:text-[9px] text-[#F4E9D8] font-bold tracking-[0.15em] uppercase">Pure A2 Desi Cow Ghee</p>
           </div>
           
           {/* Label 3D Shading (Cylindrical warp) */}
           <div className="absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-[#5A3A1A]/40 to-transparent mix-blend-multiply"></div>
           <div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-[#5A3A1A]/30 to-transparent mix-blend-multiply"></div>
           
           {/* Label Highlights (Matching glass reflections) */}
           <div className="absolute inset-y-0 left-[18%] w-[10%] bg-gradient-to-r from-transparent via-white/60 to-transparent blur-[2px] mix-blend-screen opacity-90"></div>
        </div>

        {/* Condensation Layer */}
        <motion.div 
          style={{ y: yOffset }}
          className="absolute inset-0 z-[25] opacity-[0.25] mix-blend-overlay pointer-events-none rounded-[45px] overflow-hidden"
        >
          <svg width="100%" height="150%">
            <defs>
              <pattern id="condensation" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="white" opacity="0.9"/>
                <circle cx="45" cy="35" r="1.5" fill="white" opacity="0.7"/>
                <circle cx="80" cy="25" r="3" fill="white" opacity="0.8"/>
                <circle cx="25" cy="70" r="1" fill="white" opacity="0.6"/>
                <circle cx="60" cy="85" r="2.5" fill="white" opacity="0.9"/>
                <circle cx="90" cy="65" r="1.5" fill="white" opacity="0.7"/>
                <circle cx="50" cy="50" r="1" fill="white" opacity="0.5"/>
                <circle cx="30" cy="95" r="2.2" fill="white" opacity="0.8"/>
                <circle cx="75" cy="15" r="1.8" fill="white" opacity="0.7"/>
                {/* Drip trails */}
                <path d="M 80 25 L 80 45" stroke="white" strokeWidth="1.5" opacity="0.3" strokeLinecap="round"/>
                <path d="M 60 85 L 60 105" stroke="white" strokeWidth="1.2" opacity="0.2" strokeLinecap="round"/>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#condensation)" />
          </svg>
        </motion.div>

        {/* Outer Glass Highlights */}
        <div className="absolute top-[5%] left-[8%] w-[12%] h-[90%] bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[2px] rounded-full z-30 opacity-90 mix-blend-screen transition-transform duration-700 group-hover:translate-x-1"></div>
        <div className="absolute top-[5%] left-[11%] w-[2.5%] h-[90%] bg-white blur-[0.5px] rounded-full z-30 opacity-100 mix-blend-screen transition-transform duration-700 group-hover:translate-x-1"></div>
        
        {/* Right edge bounce light */}
        <div className="absolute inset-y-[5%] right-[2%] w-[8%] bg-gradient-to-l from-white/90 to-transparent blur-[3px] rounded-full z-30 opacity-70 mix-blend-screen"></div>
        
        {/* Glass Base Thickness */}
        <div className="absolute bottom-0 left-[10px] right-[10px] h-[25px] rounded-b-[45px] bg-gradient-to-b from-transparent to-white/80 backdrop-blur-md border-t border-white/40 shadow-[inset_0_-10px_15px_rgba(255,255,255,1)] z-10"></div>
      </div>

      {/* Jar Shoulders & Neck */}
      <div className="absolute top-[18px] left-[20px] right-[20px] h-[30px] rounded-[20px] bg-white/10 backdrop-blur-[2px] shadow-[inset_0_10px_15px_rgba(255,255,255,0.7)] z-0 border border-white/30">
        <div className="absolute top-[10px] bottom-0 left-[8px] right-[8px] rounded-[15px] bg-gradient-to-b from-[#F5AA27] to-[#DF8206] opacity-90 shadow-[inset_0_5px_10px_rgba(255,255,255,0.5)]"></div>
      </div>

      {/* Golden Screw Cap Lid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[220px] md:w-[260px] h-[26px] md:h-[30px] z-20 flex flex-col items-center drop-shadow-[0_8px_15px_rgba(0,0,0,0.35)] transition-transform duration-700 group-hover:-translate-y-1">
         {/* Lid Top */}
         <div className="w-full h-[14px] md:h-[16px] bg-gradient-to-b from-[#FFF5C3] via-[#D4AF37] to-[#9B7A1A] rounded-[100%] absolute -top-[7px] md:-top-[8px] z-30 border-[1px] border-[#FFF5C3]/70 shadow-[inset_0_2px_5px_rgba(255,255,255,0.8)]"></div>
         
         {/* Lid Body */}
         <div className="w-full h-full bg-gradient-to-r from-[#6B4B15] via-[#FAD961] to-[#422C0A] rounded-b-[4px] relative overflow-hidden shadow-[inset_0_-5px_10px_rgba(0,0,0,0.6)] border-b border-black/20">
           {/* Cap Highlights */}
           <div className="absolute inset-y-0 left-[16%] w-[18%] bg-gradient-to-r from-transparent via-white/90 to-transparent blur-[1.5px] mix-blend-screen opacity-90"></div>
           <div className="absolute inset-y-0 left-[20%] w-[3%] bg-white blur-[0.5px] mix-blend-screen opacity-100"></div>
           <div className="absolute inset-y-0 right-[15%] w-[8%] bg-gradient-to-l from-transparent via-white/50 to-transparent blur-[1px] mix-blend-screen"></div>
           {/* Bottom Rim line */}
           <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-[#422C0A] via-[#D4AF37] to-[#422C0A]"></div>
         </div>
         
         {/* Lid Bottom Curve (3D illusion) */}
         <div className="w-full h-[14px] md:h-[16px] bg-gradient-to-r from-[#422C0A] via-[#B89222] to-[#261904] rounded-[100%] absolute -bottom-[7px] md:-bottom-[8px] z-10 shadow-[0_5px_10px_rgba(0,0,0,0.4)] border-b border-[#D4AF37]/40"></div>
      </div>
    </motion.div>
  );
};
