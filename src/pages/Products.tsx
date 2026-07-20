import { motion, AnimatePresence } from "motion/react";
import { GheeJar } from "../components/GheeJar";
import { ShoppingCart, Star, Check, Sparkles, Filter, ChevronDown, X, ShieldCheck, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Products() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [addingStates, setAddingStates] = useState<Record<number, string>>({});
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const products = [
    {
      id: 1,
      name: "Pure A2 Desi Cow Ghee",
      volume: "500ml Jar",
      price: "₹1,299",
      description: "Handcrafted via Vedic Bilona method in clay pots. Sourced from grass-fed indigenous Gir cows.",
      rating: 4.9,
      reviews: 42,
      category: "Single Jars",
      popular: false,
      benefits: ["Probiotic Fermented", "Wood-fired Clarification", "Surya Ketu Spinal Absorption"],
      nutrition: { fat: "99.8g", energy: "898 kcal", carbs: "0g", sugar: "0g", casein: "A2 Protein Only" }
    },
    {
      id: 2,
      name: "Pure A2 Desi Cow Ghee",
      volume: "1 Liter",
      price: "₹2,499",
      description: "Our signature size. Perfectly textured golden granules, rich butter aroma, and high therapeutic value.",
      rating: 5.0,
      reviews: 128,
      category: "Single Jars",
      popular: true,
      benefits: ["Signature Granularity", "100% Grass-Fed A2", "Traditional Brass Vessel Simmering"],
      nutrition: { fat: "99.8g", energy: "898 kcal", carbs: "0g", sugar: "0g", casein: "A2 Protein Only" }
    },
    {
      id: 3,
      name: "Pure A2 Desi Cow Ghee",
      volume: "5 Liters Tin",
      price: "₹11,999",
      description: "Bulk culinary pack at optimal value. Perfect for regular Ayurvedic cooking, longevity, and deep health.",
      rating: 4.8,
      reviews: 56,
      category: "Single Jars",
      popular: false,
      benefits: ["Bulk Pantry Storage", "Double-sealed Purity", "Optimal Value Ratio"],
      nutrition: { fat: "99.8g", energy: "898 kcal", carbs: "0g", sugar: "0g", casein: "A2 Protein Only" }
    },
    {
      id: 4,
      name: "Heritage Culinary Combo",
      volume: "1L + 500ml Pack",
      price: "₹3,499",
      description: "The ideal gift set. Experience two sizes of our hand-clarified A2 Cow Ghee, packed in secure wood-shavings box.",
      rating: 5.0,
      reviews: 79,
      category: "Combos",
      popular: false,
      benefits: ["Artisanal Wooden Box", "Perfect for Gifting", "Double Size Versatility"],
      nutrition: { fat: "99.8g", energy: "898 (per 100g)", carbs: "0g", sugar: "0g", casein: "A2 Protein Only" }
    }
  ];

  const handleAddToCart = (id: number) => {
    setAddingStates(prev => ({ ...prev, [id]: "adding" }));
    setTimeout(() => {
      setAddingStates(prev => ({ ...prev, [id]: "added" }));
      
      const product = products.find(p => p.id === id);
      if (product) {
        const priceNum = parseInt(product.price.replace(/[^\d]/g, ""));
        window.dispatchEvent(new CustomEvent("add-to-cart", {
          detail: {
            id: product.id,
            name: product.name,
            volume: product.volume,
            price: priceNum
          }
        }));
      }

      setTimeout(() => {
        setAddingStates(prev => ({ ...prev, [id]: "idle" }));
      }, 2000);
    }, 800);
  };

  const filteredProducts = filter === "All" 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="bg-[#05070B] min-h-screen text-[#E2E4E9]">
      
      {/* ================= EDITORIAL BANNER ================= */}
      <div className="relative pt-28 md:pt-36 pb-20 px-6 max-w-7xl mx-auto border-b border-[#E2E4E9]/10">
        <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-[#C5A059]/5 blur-[100px] pointer-events-none"></div>
        <div className="absolute top-[40%] left-[5%] w-[25vw] h-[25vw] rounded-full bg-[#121A2F]/25 blur-[90px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-start max-w-2xl">
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#C5A059] uppercase mb-4">Vedic Harvest</span>
          <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-white leading-none">The Shop</h2>
          <p className="text-base text-[#E2E4E9]/60 font-light leading-relaxed">
            Slow-clarified in copper and brass vessels using firewood, our golden A2 Desi cow ghee carries optimal digestive enzymes, organic butyrate, and signature granulations.
          </p>
        </div>
      </div>

      {/* ================= FILTERING TABS ================= */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex items-center justify-between border-b border-[#E2E4E9]/5">
        <div className="flex gap-6 text-xs font-bold tracking-widest uppercase">
          {["All", "Single Jars", "Combos"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`pb-2 border-b cursor-pointer transition-colors ${
                filter === tab ? "border-[#C5A059] text-white" : "border-transparent text-[#E2E4E9]/40 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="text-[10px] text-[#E2E4E9]/30 uppercase tracking-wider font-semibold">
          Showing {filteredProducts.length} Premium items
        </div>
      </div>

      {/* ================= PRODUCTS GRID ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredProducts.map((product) => {
            const addingState = addingStates[product.id] || "idle";
            return (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onClick={() => setSelectedProduct(product)}
                className="group flex flex-col bg-[#05070B] p-8 border border-[#E2E4E9]/10 hover:border-[#C5A059]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 relative overflow-hidden cursor-pointer"
              >
                {/* Popular Badge */}
                {product.popular && (
                  <div className="absolute top-0 right-0 bg-[#C5A059] text-[#05070B] text-[8px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-bl-lg">
                    Popular
                  </div>
                )}

                {/* Ambient glow on card hover */}
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[#C5A059]/2.5 rounded-full blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                {/* Jar Visual Container */}
                <div className="relative h-64 flex items-center justify-center mb-8 scale-[0.65] md:scale-[0.7] origin-bottom group-hover:scale-[0.73] transition-transform duration-700 ease-out border-b border-[#E2E4E9]/5 pb-8">
                  {/* Glowing background light behind the jar on card hover */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(197,160,89,0.18)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
                  
                  <div className="pointer-events-none relative z-10">
                    <GheeJar showShadows={false} />
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] text-[#C5A059] tracking-wider uppercase font-bold">{product.volume}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
                        <span className="text-xs font-semibold text-[#E2E4E9]">{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-[#C5A059] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[#E2E4E9]/60 leading-relaxed font-light mb-8">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-[#E2E4E9]/5">
                    <span className="font-serif text-2xl font-bold text-white">{product.price}</span>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product.id);
                      }}
                      disabled={addingState === "adding"}
                      className={`relative flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold tracking-widest uppercase text-[10px] cursor-pointer shadow-md transition-all duration-300 ${
                        addingState === "added" 
                          ? "bg-emerald-500 text-white border border-emerald-400"
                          : "bg-transparent border border-[#C5A059]/50 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#05070B]"
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {addingState === "idle" && (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="flex items-center gap-2"
                          >
                            Add To Cart <ShoppingCart className="w-3.5 h-3.5" />
                          </motion.span>
                        )}
                        {addingState === "adding" && (
                          <motion.span
                            key="adding"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="flex items-center gap-2"
                          >
                            Adding...
                          </motion.span>
                        )}
                        {addingState === "added" && (
                          <motion.span
                            key="added"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="flex items-center gap-2"
                          >
                            Added <Check className="w-3.5 h-3.5" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ================= PRODUCT DETAILS DIALOG/MODAL ================= */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/90 z-[200] backdrop-blur-[4px]"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed inset-4 md:inset-x-auto md:left-[50%] md:-translate-x-1/2 md:top-[10%] md:bottom-[10%] w-full max-w-4xl bg-[#0A0E17] border border-[#C5A059]/25 z-[201] shadow-2xl rounded-2xl overflow-y-auto flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#E2E4E9]/10 flex justify-between items-center bg-[#05070B]/50 sticky top-0 z-10 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4.5 h-4.5 text-[#C5A059]" />
                  <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-[#C5A059] uppercase">Product Specifications</span>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-8 h-8 rounded-full border border-[#E2E4E9]/10 flex items-center justify-center hover:border-white transition-colors"
                >
                  <X className="w-4 h-4 text-[#E2E4E9]/70 hover:text-white" />
                </button>
              </div>

              {/* Main Split Layout */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 p-8">
                
                {/* Left Column: Media/Jar */}
                <div className="md:col-span-5 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#E2E4E9]/10 pb-8 md:pb-0 md:pr-8">
                  <div className="w-[200px] h-[200px] relative mb-6">
                    <GheeJar className="w-full h-full object-contain" animateFloat={true} />
                  </div>
                  <span className="text-xs font-serif italic text-[#C5A059] text-center mb-1">Granular Texture ❖ Gold Simmered</span>
                  <span className="text-[9px] text-[#E2E4E9]/40 tracking-wider uppercase font-semibold text-center">Batch certified by NABL Labs</span>
                </div>

                {/* Right Column: Specifications, Nutrition, Ingredients */}
                <div className="md:col-span-7 space-y-8">
                  
                  {/* Title & description */}
                  <div>
                    <h3 className="font-serif text-3xl font-bold text-white mb-2">{selectedProduct.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">{selectedProduct.volume}</span>
                      <span className="text-[#E2E4E9]/20">|</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                        <span className="text-xs font-semibold">{selectedProduct.rating}</span>
                        <span className="text-xs text-[#E2E4E9]/40">({selectedProduct.reviews} reviews)</span>
                      </div>
                    </div>
                    <p className="text-sm text-[#E2E4E9]/70 font-light mt-4 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Highlights benefits */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold tracking-widest text-[#C5A059] uppercase">Artisanal Process Highlights</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProduct.benefits?.map((b: string, i: number) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-[#E2E4E9]/80 font-light">
                          <span className="w-4 h-4 rounded-full border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center flex-shrink-0">
                            <Check className="w-2.5 h-2.5 text-emerald-400" />
                          </span>
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nutritional Facts Block (Luxury cosmetic facts style) */}
                  <div className="border border-[#E2E4E9]/10 rounded-xl p-6 bg-[#05070B]/50 space-y-4">
                    <h4 className="text-[10px] font-bold tracking-widest text-white uppercase border-b border-[#E2E4E9]/10 pb-2">Nutritional Information (per 100g)</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs">
                      <div>
                        <span className="text-[#E2E4E9]/40 block mb-0.5">Energy</span>
                        <span className="font-semibold text-white">{selectedProduct.nutrition.energy}</span>
                      </div>
                      <div>
                        <span className="text-[#E2E4E9]/40 block mb-0.5">Fat Content</span>
                        <span className="font-semibold text-white">{selectedProduct.nutrition.fat}</span>
                      </div>
                      <div>
                        <span className="text-[#E2E4E9]/40 block mb-0.5">Casein Profile</span>
                        <span className="font-semibold text-[#C5A059]">{selectedProduct.nutrition.casein}</span>
                      </div>
                      <div>
                        <span className="text-[#E2E4E9]/40 block mb-0.5">Carbohydrates</span>
                        <span className="font-semibold text-white">{selectedProduct.nutrition.carbs}</span>
                      </div>
                      <div>
                        <span className="text-[#E2E4E9]/40 block mb-0.5">Added Sugars</span>
                        <span className="font-semibold text-white">{selectedProduct.nutrition.sugar}</span>
                      </div>
                      <div>
                        <span className="text-[#E2E4E9]/40 block mb-0.5">Cholesterol</span>
                        <span className="font-semibold text-white">0.25g</span>
                      </div>
                    </div>
                  </div>

                  {/* Lab Test validation */}
                  <div className="flex items-center gap-4 bg-[#C5A059]/5 border border-[#C5A059]/20 rounded-xl p-4">
                    <ShieldCheck className="w-8 h-8 text-[#C5A059] flex-shrink-0" />
                    <div>
                      <h5 className="text-xs font-bold uppercase text-white">100% Free of Adulteration</h5>
                      <p className="text-[11px] text-[#E2E4E9]/60 leading-relaxed mt-0.5">We certify 0.0% vegetable oils, trans fats, or starches. Laboratory certificates ship with your box.</p>
                    </div>
                  </div>

                </div>

              </div>

              {/* Footer CTA & Price */}
              <div className="p-6 border-t border-[#E2E4E9]/10 bg-[#05070B]/80 flex justify-between items-center sticky bottom-0 z-10 backdrop-blur-md gap-4 flex-wrap sm:flex-nowrap">
                <div className="flex flex-col">
                  <span className="text-[9px] text-[#E2E4E9]/40 uppercase tracking-widest font-bold">Total Price</span>
                  <span className="font-serif text-3xl font-bold text-[#C5A059] mt-0.5">{selectedProduct.price}</span>
                </div>
                
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      handleAddToCart(selectedProduct.id);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-gradient-to-b from-[#E6C98A] via-[#C5A059] to-[#A88543] text-[#0A0E17] px-8 py-4.5 rounded-full hover:brightness-110 shadow-[0_10px_25px_rgba(197,160,89,0.3)] transition-all font-bold tracking-widest uppercase text-xs border border-[#F4E3B4]/40 cursor-pointer"
                  >
                    <span>Add to Cart</span>
                    <ShoppingCart className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/919999999999?text=${encodeURIComponent(
                      `Hello Team SRR Farms, I would like to place an order for the ${selectedProduct.name} (${selectedProduct.volume}) jar. Please share payment details.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4.5 rounded-full shadow-[0_10px_25px_rgba(16,185,129,0.2)] transition-colors font-bold tracking-widest uppercase text-xs cursor-pointer text-center"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.733-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.118-2.905-6.993-1.876-1.875-4.359-2.907-6.999-2.909-5.443 0-9.87 4.417-9.873 9.861-.001 1.79.483 3.541 1.398 5.091L1.85 22.147l4.797-1.258zM17.482 14.3c-.302-.15-1.787-.882-2.062-.982-.275-.1-.475-.15-.675.15-.2.3-.775.982-.95 1.182-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.414-1.492-.893-.797-1.496-1.78-1.671-2.08-.175-.3-.019-.462.132-.612.135-.135.302-.35.452-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.493-.51-.675-.52l-.575-.01c-.2 0-.525.075-.8.376-.275.3-1.05 1.027-1.05 2.504 0 1.478 1.075 2.903 1.225 3.103.15.2 2.115 3.23 5.124 4.53.715.31 1.273.495 1.708.634.719.228 1.375.196 1.892.119.577-.087 1.787-.732 2.037-1.439.25-.706.25-1.314.175-1.439-.075-.125-.275-.2-.575-.35z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
