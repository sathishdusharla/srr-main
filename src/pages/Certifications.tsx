import { motion } from "motion/react";
import { ShieldCheck, FileText, CheckCircle2, Award, Download, Sparkles, HelpCircle } from "lucide-react";
import { useState } from "react";

export default function Certifications() {
  const [activeReport, setActiveReport] = useState("nabl");

  const certificates = [
    {
      id: "fssai",
      title: "FSSAI Registration License",
      authority: "Food Safety and Standards Authority of India",
      number: "Lic No: 11524021000849",
      desc: "Our dairy farms, curd-churning hubs, wood-fire kitchen, and automated glass packaging facilities are fully audited and registered under FSSAI food quality safety compliance guidelines.",
      verified: true
    },
    {
      id: "nabl",
      title: "NABL Accredited Lab Reports",
      authority: "National Accreditation Board for Testing Laboratories",
      number: "Report No: NABL/2026/G878",
      desc: "Every clarification batch undergoes NABL testing to verify zero moisture residue, optimal fatty acid structure, and complete absence of mineral oils, starches, or preservatives.",
      verified: true
    },
    {
      id: "a2casein",
      title: "A2 Casein Genetic Verification",
      authority: "Vedic Cattle Genetics Lab",
      number: "Cert No: A2-GIR-9428",
      desc: "DNA genotyping certificates confirm that our indigenous Gir and Sahiwal cows carry the homozygous A2/A2 beta-casein gene, guaranteeing pure A2 milk output.",
      verified: true
    }
  ];

  const parameters = [
    { name: "Free Fatty Acids (as Oleic Acid)", standard: "Max 1.0%", ourValue: "0.28% - 0.35%", status: "Highly Stable" },
    { name: "Moisture Content", standard: "Max 0.3%", ourValue: "< 0.15%", status: "Zero Spoilage risk" },
    { name: "Peroxide Value", standard: "Max 0.6 meq/kg", ourValue: "0.0 meq/kg", status: "Fresh Batch" },
    { name: "Adulterant Test (Starch/Urea/Sugar)", standard: "Absent", ourValue: "Not Detected", status: "100% Pure" },
    { name: "A2 Beta-Casein Protein", standard: "Present", ourValue: "Verified (A2 Only)", status: "Pure Gir Source" }
  ];

  return (
    <div className="bg-[#05070B] min-h-screen text-[#E2E4E9]">
      
      {/* ================= EDITORIAL BANNER ================= */}
      <div className="relative pt-28 md:pt-36 pb-20 px-6 max-w-7xl mx-auto border-b border-[#E2E4E9]/10">
        <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-[#C5A059]/5 blur-[100px] pointer-events-none"></div>
        <div className="absolute top-[40%] left-[5%] w-[25vw] h-[25vw] rounded-full bg-[#121A2F]/25 blur-[90px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#C5A059] uppercase mb-4">Quality Standards</span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-white leading-none">Purity Authenticated</h1>
          <p className="text-sm md:text-base text-[#E2E4E9]/60 font-light leading-relaxed max-w-2xl">
            We hold ourselves to the highest benchmarks of food safety and Ayurvedic integrity. Trace our official food safety licenses, laboratory profiles, and genetic casein certificates below.
          </p>
        </div>
      </div>

      {/* ================= CERTIFICATIONS GRID ================= */}
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#0A0E17]/40 border border-[#E2E4E9]/10 p-8 rounded-2xl flex flex-col justify-between hover:border-[#C5A059]/40 transition-colors relative group"
            >
              {/* Glowing hover light */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#C5A059]/0 to-[#C5A059]/2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl border border-[#C5A059]/20 bg-[#C5A059]/5 flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#C5A059]" />
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold tracking-wider uppercase rounded-full flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white mb-1 group-hover:text-[#C5A059] transition-colors">{cert.title}</h3>
                <span className="text-[10px] text-[#E2E4E9]/40 font-semibold block mb-4 uppercase tracking-wider">{cert.authority}</span>
                <p className="text-xs text-[#E2E4E9]/60 leading-relaxed font-light mb-6">{cert.desc}</p>
              </div>

              <div className="border-t border-[#E2E4E9]/5 pt-6 flex justify-between items-center text-xs">
                <span className="font-mono text-[#C5A059]/80 font-bold">{cert.number}</span>
                <button className="text-[10px] font-bold tracking-widest text-[#E2E4E9]/60 hover:text-white uppercase flex items-center gap-1.5 transition-colors cursor-pointer">
                  Report <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ================= LABORATORY PARAMETERS COMPARISON ================= */}
        <div className="border border-[#E2E4E9]/10 rounded-2xl bg-[#0A0E17]/20 overflow-hidden mb-24 max-w-4xl mx-auto backdrop-blur-md">
          <div className="p-8 border-b border-[#E2E4E9]/10 bg-[#05070B]/40 flex justify-between items-center flex-wrap gap-4">
            <div>
              <span className="text-[10px] text-[#C5A059] tracking-wider uppercase font-bold">NABL Laboratory Logs</span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">Batch #78 Purity Index</h3>
            </div>
            <span className="px-4 py-1.5 bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-[10px] font-bold tracking-widest uppercase rounded-full">
              Standard Compliance Passed
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[#E2E4E9]/10 text-xs font-bold text-[#E2E4E9]/40 tracking-wider uppercase bg-[#05070B]/20">
                  <th className="p-5 pl-8">Purity Parameter</th>
                  <th className="p-5 text-center">Government Food Safety Limits</th>
                  <th className="p-5 text-center text-[#C5A059] bg-[#C5A059]/5">SRR Farms Batch Value</th>
                  <th className="p-5 pr-8 text-center">Stability Rating</th>
                </tr>
              </thead>
              <tbody className="text-xs font-light text-[#E2E4E9]/70">
                {parameters.map((param, i) => (
                  <tr key={i} className="border-b border-[#E2E4E9]/5 hover:bg-white/2.5 transition-colors">
                    <td className="p-5 pl-8 font-semibold text-white">{param.name}</td>
                    <td className="p-5 text-center">{param.standard}</td>
                    <td className="p-5 text-center text-white bg-[#C5A059]/5 font-bold">{param.ourValue}</td>
                    <td className="p-5 pr-8 text-center">
                      <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 font-bold uppercase rounded-md text-[9px] tracking-wide">
                        {param.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= COMPLIANCE & SAFETY ASSURANCE FAQ ================= */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-white">Safety & Compliance Standards</h2>
            <div className="w-12 h-px bg-[#C5A059] mx-auto mt-4"></div>
          </div>

          {[
            {
              q: "Does your ghee have chemical colorings to make it look golden?",
              a: "Absolutely not. The distinct yellow-golden hue is organic. Cows grazing on open pastures absorb high levels of solar energy, releasing beta-carotene pigments directly from their feed into the milk fat structure naturally."
            },
            {
              q: "How often are laboratory purity tests carried out?",
              a: "We test every single clarification vessel batch. Batch numbers are generated on each clarification cycle, and logs are published transparently on our portal. No jar leaves our farm without a verified safety check."
            },
            {
              q: "Why do you use glass jars instead of plastic jars or pouches?",
              a: "High-grade glass is chemically inert and does not react with fat structures. Plastic containers can leach microplastics or chemicals (like BPA) when exposed to temperature changes, compromising purity. We package strictly in sterilized glass jars."
            }
          ].map((faq, i) => (
            <div key={i} className="border border-[#E2E4E9]/10 rounded-xl p-6 bg-[#0A0E17]/20 text-left space-y-3">
              <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C5A059]" />
                {faq.q}
              </h4>
              <p className="text-xs text-[#E2E4E9]/65 font-light leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
