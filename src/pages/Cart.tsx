import { motion } from "motion/react";
import { Minus, Plus, Trash2, ArrowRight, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GheeJar } from "../components/GheeJar";
import { useState } from "react";

export default function Cart() {
  const navigate = useNavigate();
  
  // State for quantity tracking
  const [items, setItems] = useState([
    { id: 1, name: "Pure A2 Desi Cow Ghee", volume: "1 Liter", price: 2499, qty: 1 },
    { id: 2, name: "Pure A2 Desi Cow Ghee", volume: "500ml", price: 1299, qty: 2 }
  ]);

  const updateQty = (id: number, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div className="bg-[#05070B] min-h-screen text-[#E2E4E9]">
      <div className="pt-28 md:pt-36 pb-24 px-6 max-w-7xl mx-auto relative z-10">
        
        {/* Banner */}
        <div className="mb-16 border-b border-[#E2E4E9]/10 pb-8 flex flex-col items-center sm:items-start">
          <span className="text-[10px] font-bold tracking-[0.4em] text-[#C5A059] uppercase mb-3">
            Shopping Cart
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-[#E2E4E9]">
            Your Selection
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 border border-[#E2E4E9]/10 rounded-2xl bg-[#0A0E17]/30 flex flex-col items-center">
            <ShoppingCart className="w-16 h-16 text-[#E2E4E9]/20 mb-6" />
            <h2 className="font-serif text-3xl font-bold text-[#E2E4E9] mb-4">Your Cart is Empty</h2>
            <p className="text-sm text-[#E2E4E9]/50 font-light mb-10 max-w-sm">
              It looks like you haven't added any A2 Ghee products to your cart yet.
            </p>
            <button 
              onClick={() => navigate('/products')} 
              className="px-8 py-4 bg-gradient-to-b from-[#E6C98A] via-[#C5A059] to-[#A88543] text-[#0A0E17] rounded-full font-bold tracking-widest uppercase text-xs"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Cart Items List */}
            <div className="lg:col-span-7 space-y-6">
              {items.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="flex flex-col sm:flex-row items-center gap-6 bg-[#05070B] p-6 border border-[#E2E4E9]/10 rounded-xl hover:border-[#C5A059]/30 transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C5A059]/0 to-[#C5A059]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  {/* Small Scale Jar visual */}
                  <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center scale-50 bg-[#0A0E17] border border-[#E2E4E9]/10 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(197,160,89,0.1)_0%,transparent_60%)]"></div>
                    <div className="pointer-events-none -mt-[38px] scale-[0.9]">
                       <GheeJar showShadows={false} />
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-serif text-xl font-bold text-[#E2E4E9] mb-1">
                      {item.name}
                    </h3>
                    <p className="text-[#C5A059] font-bold tracking-[0.2em] uppercase text-[10px] mb-3">
                      {item.volume}
                    </p>
                    <div className="font-serif text-lg font-bold text-[#E2E4E9]">
                      ₹{item.price.toLocaleString()}
                    </div>
                  </div>
                  
                  {/* Controls */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-6 sm:gap-4 w-full sm:w-auto mt-4 sm:mt-0 justify-between">
                    <div className="flex items-center gap-4 border border-[#E2E4E9]/10 rounded-full px-4 py-2 bg-[#05070B]">
                      <button 
                        onClick={() => updateQty(item.id, -1)}
                        className="text-[#E2E4E9]/40 hover:text-[#C5A059] transition-colors p-1"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-sans font-semibold text-sm w-4 text-center">
                        {item.qty}
                      </span>
                      <button 
                        onClick={() => updateQty(item.id, 1)}
                        className="text-[#E2E4E9]/40 hover:text-[#C5A059] transition-colors p-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-[#E2E4E9]/30 hover:text-red-500 transition-colors p-2 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase"
                    >
                      <span className="sm:hidden">Remove</span>
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-5">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="bg-[#0A0E17] p-8 md:p-10 border border-[#C5A059]/30 rounded-xl relative overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-noise opacity-30 mix-blend-multiply pointer-events-none"></div>
                <div className="absolute -top-[50%] -right-[50%] w-[100%] h-[100%] bg-[#121A2F]/20 blur-[80px] pointer-events-none"></div>

                <div className="relative z-10">
                  <h3 className="font-serif text-2xl font-bold mb-8 text-[#E2E4E9]">
                    Order Summary
                  </h3>
                  
                  <div className="space-y-6 text-sm font-light text-[#E2E4E9]/70 mb-8">
                    <div className="flex justify-between items-center">
                      <span>Subtotal</span>
                      <span className="font-medium text-[#E2E4E9]">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Shipping</span>
                      <span className="font-medium text-[#C5A059]">Complimentary</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-[#E2E4E9]/10 pt-8 mb-10">
                    <div className="flex justify-between items-end">
                      <span className="font-bold text-[#E2E4E9]">Total</span>
                      <span className="font-serif text-3xl font-bold text-[#C5A059]">
                        ₹{subtotal.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[9px] text-[#E2E4E9]/40 mt-3 text-right uppercase tracking-[0.15em] font-bold">
                      Inclusive of all taxes
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full relative flex items-center justify-center gap-3 bg-gradient-to-b from-[#E6C98A] via-[#C5A059] to-[#A88543] text-[#0A0E17] px-8 py-4.5 rounded-full hover:brightness-110 transition-all duration-300 font-bold tracking-widest uppercase text-xs shadow-[0_10px_30px_rgba(197,160,89,0.3),inset_0_1px_1px_rgba(255,255,255,0.6)] hover:-translate-y-0.5 group overflow-hidden border border-[#F4E3B4]/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>
                    <span className="relative z-10">Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
