import { motion } from "motion/react";
import { CheckCircle2, ChevronRight, Lock, CreditCard, Landmark } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Checkout() {
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [savedAddresses, setSavedAddresses] = useState<string[]>([]);
  const [saveToProfile, setSaveToProfile] = useState(false);

  const [cartItems, setCartItems] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("srr_cart_items");
      const parsed = saved ? JSON.parse(saved) : [];
      return parsed.length > 0 ? parsed : [{ id: 2, name: "Pure A2 Desi Cow Ghee", volume: "1 Liter", price: 2499, qty: 1 }];
    } catch {
      return [{ id: 2, name: "Pure A2 Desi Cow Ghee", volume: "1 Liter", price: 2499, qty: 1 }];
    }
  });

  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const fetchUserProfile = async (userEmail: string) => {
    if (!userEmail.includes("@")) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, saved_addresses')
        .eq('email', userEmail.trim().toLowerCase())
        .maybeSingle();
      if (error) throw error;
      if (data) {
        if (data.full_name && !firstName) {
          const parts = data.full_name.trim().split(" ");
          setFirstName(parts[0] || "");
          setLastName(parts.slice(1).join(" ") || "");
        }
        const addrs = data.saved_addresses || [];
        setSavedAddresses(addrs);
        if (addrs.length > 0 && !address) {
          const parts = addrs[0].split(",");
          if (parts.length >= 3) {
            setAddress(parts[0].trim());
            setCity(parts[1].trim());
            setZipCode(parts[2].replace("PIN:", "").trim());
          } else {
            setAddress(addrs[0]);
          }
        }
      } else {
        setSavedAddresses([]);
      }
    } catch (e) {
      console.log("Error loading saved addresses:", e);
    }
  };

  useEffect(() => {
    const localEmail = localStorage.getItem("srr_user_email");
    const localName = localStorage.getItem("srr_user_name");
    if (localEmail) {
      setEmail(localEmail);
      if (localName) {
        const parts = localName.trim().split(" ");
        setFirstName(parts[0] || "");
        setLastName(parts.slice(1).join(" ") || "");
      }
      fetchUserProfile(localEmail);
    }
  }, []);

  if (orderPlaced) {
    return (
      <div className="pt-36 pb-24 min-h-screen flex items-center justify-center px-6 relative bg-[#05070B] text-[#E2E4E9]">
        <div className="absolute inset-0 bg-noise opacity-30 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute top-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-[#C5A059]/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-[#121A2F]/10 blur-[120px] pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="bg-[#0A0E17] p-12 md:p-16 border border-[#C5A059]/30 rounded-2xl text-center max-w-xl w-full relative overflow-hidden shadow-2xl"
        >
          {/* Top golden border accent */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"></div>
          
          <div className="w-20 h-20 border border-[#C5A059]/30 bg-[#C5A059]/5 rounded-full flex items-center justify-center mx-auto mb-8 relative">
            <CheckCircle2 className="w-10 h-10 text-[#C5A059] relative z-10" />
          </div>
          
          <h2 className="font-serif text-4xl font-bold text-[#E2E4E9] mb-4">Harvest Reserved</h2>
          <p className="text-[#E2E4E9]/60 font-light mb-10 leading-relaxed text-sm md:text-base max-w-sm mx-auto">
            Thank you for supporting sustainable farming. Your order <span className="font-bold text-white">#SRR-8492</span> is registered and will be shipped in glass containers soon.
          </p>
          
          {/* Simulated Organic Invoice receipt visual */}
          <div className="bg-[#05070B] border border-[#E2E4E9]/10 p-6 rounded-lg mb-10 text-left space-y-4 text-xs font-light text-[#E2E4E9]/60">
            <div className="flex justify-between border-b border-[#E2E4E9]/5 pb-3">
              <span className="font-medium text-white">ORDER SUMMARY</span>
              <span>19 JULY 2026</span>
            </div>
            <div className="flex justify-between">
              <span>Pure A2 Desi Cow Ghee (1L) × 1</span>
              <span className="font-medium text-white">₹2,499</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-[#E2E4E9]/5">
              <span>Pure A2 Desi Cow Ghee (500ml) × 2</span>
              <span className="font-medium text-white">₹2,598</span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-white pt-2">
              <span className="text-[#C5A059]">Total Paid</span>
              <span className="text-[#C5A059]">₹5,097</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/')} 
            className="w-full sm:w-auto inline-block relative bg-gradient-to-b from-[#161B2A] to-[#0A0E17] text-[#E6C98A] border border-[#C5A059]/40 px-10 py-4.5 rounded-full font-bold tracking-widest uppercase text-xs hover:shadow-[0_10px_30px_rgba(197,160,89,0.3)] transition-all duration-300 hover:-translate-y-0.5 group overflow-hidden hover:border-[#E6C98A]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>
            <span className="relative z-10">Return to Storefront</span>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#05070B] min-h-screen text-[#E2E4E9]">
      <div className="pt-28 md:pt-36 pb-24 px-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 border-b border-[#E2E4E9]/10 pb-8">
          <span className="text-[10px] font-bold tracking-[0.4em] text-[#C5A059] uppercase mb-3 block">
            Checkout Process
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-[#E2E4E9]">
            Secure Checkout
          </h1>
          <div className="flex items-center gap-2 text-[#E2E4E9]/40 text-[10px] font-bold tracking-widest uppercase mt-4">
            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/cart')}>Cart</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#E2E4E9]">Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Shipping Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <h3 className="font-serif text-2xl font-bold text-[#E2E4E9] mb-8">Shipping Address</h3>
              
              {savedAddresses.length > 0 && (
                <div className="mb-8 p-6 bg-[#0A0E17] border border-[#E2E4E9]/10 rounded-xl">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-4">Use Saved Address</h4>
                  <div className="flex flex-col gap-3">
                    {savedAddresses.map((addr, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          const parts = addr.split(",");
                          if (parts.length >= 3) {
                            setAddress(parts[0].trim());
                            setCity(parts[1].trim());
                            setZipCode(parts[2].replace("PIN:", "").trim());
                          } else {
                            setAddress(addr);
                          }
                        }}
                        className="w-full text-left p-4 rounded-lg bg-[#05070B] border border-[#E2E4E9]/10 hover:border-[#C5A059] transition-all text-xs font-light text-[#E2E4E9]/80"
                      >
                        {addr}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 sm:col-span-1 relative group">
                  <input 
                    type="text" 
                    placeholder="First Name" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-5 py-4 border border-[#E2E4E9]/20 focus:outline-none focus:border-[#C5A059] bg-[#05070B] transition-colors text-sm font-light placeholder:text-gray-500 rounded-lg" 
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 relative group">
                  <input 
                    type="text" 
                    placeholder="Last Name" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-5 py-4 border border-[#E2E4E9]/20 focus:outline-none focus:border-[#C5A059] bg-[#05070B] transition-colors text-sm font-light placeholder:text-gray-500 rounded-lg" 
                  />
                </div>
                <div className="col-span-2 relative group">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 border border-[#E2E4E9]/20 focus:outline-none focus:border-[#C5A059] bg-[#05070B] transition-colors text-sm font-light placeholder:text-gray-500 rounded-lg" 
                  />
                </div>
                <div className="col-span-2 relative group">
                  <input 
                    type="text" 
                    placeholder="Phone Number" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-5 py-4 border border-[#E2E4E9]/20 focus:outline-none focus:border-[#C5A059] bg-[#05070B] transition-colors text-sm font-light placeholder:text-gray-500 rounded-lg" 
                  />
                </div>
                <div className="col-span-2 relative group">
                  <input 
                    type="text" 
                    placeholder="Street Address" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-5 py-4 border border-[#E2E4E9]/20 focus:outline-none focus:border-[#C5A059] bg-[#05070B] transition-colors text-sm font-light placeholder:text-gray-500 rounded-lg" 
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 relative group">
                  <input 
                    type="text" 
                    placeholder="City" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-5 py-4 border border-[#E2E4E9]/20 focus:outline-none focus:border-[#C5A059] bg-[#05070B] transition-colors text-sm font-light placeholder:text-gray-500 rounded-lg" 
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 relative group">
                  <input 
                    type="text" 
                    placeholder="Postal Code" 
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full px-5 py-4 border border-[#E2E4E9]/20 focus:outline-none focus:border-[#C5A059] bg-[#05070B] transition-colors text-sm font-light placeholder:text-gray-500 rounded-lg" 
                  />
                </div>
                <div className="col-span-2 flex items-center gap-3 mt-2">
                  <label className="flex items-center gap-2 text-xs text-[#E2E4E9]/60 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={saveToProfile}
                      onChange={(e) => setSaveToProfile(e.target.checked)}
                      className="accent-[#C5A059] rounded border-[#E2E4E9]/20 bg-[#05070B]"
                    />
                    Save this address to my profile
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Payment Selector */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-2xl font-bold text-[#E2E4E9]">Payment Method</h3>
                <div className="flex items-center gap-1.5 text-[#E2E4E9]/40 text-[9px] font-bold tracking-widest uppercase">
                  <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Fully Encrypted</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Credit Card Tab */}
                <div
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center gap-5 p-5 border cursor-pointer relative overflow-hidden rounded-xl transition-all duration-300 ${
                    paymentMethod === "card"
                      ? "border-[#C5A059] bg-[#C5A059]/5 shadow-[inset_0_0_15px_rgba(197,160,89,0.1)]"
                      : "border-[#E2E4E9]/10 bg-[#05070B] hover:border-[#E2E4E9]/30"
                  }`}
                >
                  {paymentMethod === "card" && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C5A059]"></div>
                  )}
                  <div className="w-5 h-5 rounded-full border border-[#C5A059] flex items-center justify-center">
                    {paymentMethod === "card" && <div className="w-2.5 h-2.5 bg-[#C5A059] rounded-full"></div>}
                  </div>
                  <CreditCard className="w-5 h-5 text-[#C5A059]" />
                  <div className="flex-1">
                    <span className="font-medium text-[#E2E4E9] text-sm block">Credit/Debit Card</span>
                    <span className="text-[10px] text-[#E2E4E9]/40 block mt-0.5">Secure payments powered by Stripe</span>
                  </div>
                </div>

                {/* Cash on Delivery Tab */}
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex items-center gap-5 p-5 border cursor-pointer relative overflow-hidden rounded-xl transition-all duration-300 ${
                    paymentMethod === "cod"
                      ? "border-[#C5A059] bg-[#C5A059]/5 shadow-[inset_0_0_15px_rgba(197,160,89,0.1)]"
                      : "border-[#E2E4E9]/10 bg-[#05070B] hover:border-[#E2E4E9]/30"
                  }`}
                >
                  {paymentMethod === "cod" && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C5A059]"></div>
                  )}
                  <div className="w-5 h-5 rounded-full border border-[#C5A059] flex items-center justify-center">
                    {paymentMethod === "cod" && <div className="w-2.5 h-2.5 bg-[#C5A059] rounded-full"></div>}
                  </div>
                  <Landmark className="w-5 h-5 text-[#C5A059]" />
                  <div className="flex-1">
                    <span className="font-medium text-[#E2E4E9] text-sm block">Cash on Delivery</span>
                    <span className="text-[10px] text-[#E2E4E9]/40 block mt-0.5">Pay in cash or UPI when your jar arrives</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Sticky Invoice Summary */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="bg-[#0A0E17] p-8 md:p-10 border border-[#E2E4E9]/15 rounded-xl shadow-2xl sticky top-32"
            >
              <h3 className="font-serif text-2xl font-bold text-[#E2E4E9] mb-8">Order Summary</h3>
              
              {/* Items List */}
              <div className="space-y-6 mb-8 max-h-48 overflow-y-auto pr-2 scrollbar-thin">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center pb-5 border-b border-[#E2E4E9]/5">
                    <div className="flex flex-col">
                      <span className="font-serif text-base font-bold text-[#E2E4E9] mb-1">{item.name} ({item.volume})</span>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A059]">Qty: {item.qty}</span>
                    </div>
                    <span className="font-serif text-base font-bold text-[#E2E4E9]">₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Subtotal blocks */}
              <div className="space-y-4 text-xs font-light text-[#E2E4E9]/60 mb-8 border-b border-[#E2E4E9]/5 pb-6">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-medium text-white">₹{cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="font-medium text-[#C5A059]">Complimentary</span>
                </div>
              </div>
              
              {/* Total */}
              <div className="mb-10">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-[#E2E4E9]">Total</span>
                  <span className="font-serif text-4xl font-bold text-[#C5A059]">₹{cartSubtotal.toLocaleString()}</span>
                </div>
                <p className="text-[9px] text-[#E2E4E9]/40 mt-3 text-right uppercase tracking-[0.15em] font-bold">
                  Inclusive of all taxes
                </p>
              </div>
              
              {errorMsg ? (
                <p className="text-xs text-rose-400 text-center mb-4">{errorMsg}</p>
              ) : null}

              {/* Submit CTA */}
              <button 
                disabled={isSubmitting}
                onClick={async () => {
                  if (!firstName || !lastName || !email || !address || !city || !zipCode || !phone) {
                    setErrorMsg("Please fill all shipping details and contact phone.");
                    return;
                  }
                  setErrorMsg("");
                  setIsSubmitting(true);
                  try {
                    const orderAddress = `${address.trim()}, ${city.trim()}, PIN: ${zipCode.trim()}`;
                    
                    if (!savedAddresses.includes(orderAddress)) {
                      const updated = [...savedAddresses, orderAddress];
                      await supabase
                        .from('profiles')
                        .upsert(
                          {
                            email: email.trim().toLowerCase(),
                            full_name: `${firstName.trim()} ${lastName.trim()}`,
                            saved_addresses: updated
                          },
                          { onConflict: 'email' }
                        );
                      setSavedAddresses(updated);
                    }

                    const { error } = await supabase
                      .from('orders')
                      .insert({
                        user_email: email.trim().toLowerCase(),
                        items: cartItems,
                        total_amount: cartSubtotal,
                        shipping_address: orderAddress,
                        phone: phone.trim(),
                        purchase_type: 'onetime',
                        status: 'Pending'
                      });

                    if (error) throw error;

                    // Clear cart after successful checkout
                    localStorage.removeItem("srr_cart_items");
                    setOrderPlaced(true);
                  } catch (e: any) {
                    setErrorMsg("Database error: " + e.message);
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="w-full relative bg-gradient-to-b from-[#E6C98A] via-[#C5A059] to-[#A88543] text-[#0A0E17] px-8 py-5 rounded-full hover:brightness-110 shadow-[0_12px_30px_rgba(197,160,89,0.3)] transition-all duration-300 font-bold tracking-widest uppercase text-xs hover:-translate-y-0.5 group overflow-hidden border border-[#F4E3B4]/40 disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>
                <span className="relative z-10">{isSubmitting ? "Processing..." : "Complete Purchase"}</span>
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
