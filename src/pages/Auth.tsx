import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Mail, Lock, User, Sparkles, LogOut, Package, MapPin, CheckCircle, Clock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Logged-in session state
  const [userEmail, setUserEmail] = useState(localStorage.getItem("srr_user_email") || "");
  const [userName, setUserName] = useState(localStorage.getItem("srr_user_name") || "");
  const [savedAddresses, setSavedAddresses] = useState<string[]>([]);
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  useEffect(() => {
    if (userEmail) {
      fetchUserData(userEmail);
    }
  }, [userEmail]);

  const fetchUserData = async (cleanEmail: string) => {
    setIsLoadingOrders(true);
    try {
      // Fetch profile saved addresses
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (profile) {
        setSavedAddresses(profile.saved_addresses || []);
        if (profile.full_name) {
          setUserName(profile.full_name);
          localStorage.setItem("srr_user_name", profile.full_name);
        }
      }

      // Fetch user's actual orders from Supabase
      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('user_email', cleanEmail)
        .order('created_at', { ascending: false });

      setUserOrders(orders || []);
    } catch (err) {
      console.error("Error fetching account data:", err);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || password.length < 6) {
      setAuthError("Please enter a valid email address and 6+ character password.");
      return;
    }
    setAuthError("");
    setIsSubmitting(true);

    const userEmailClean = email.trim().toLowerCase();
    const displayName = fullName.trim() || userEmailClean.split("@")[0];

    try {
      if (isLogin) {
        try {
          await supabase.auth.signInWithPassword({
            email: userEmailClean,
            password: password
          });
        } catch (authErr) {
          console.log("Supabase Auth fallback:", authErr);
        }

        const { data: prof } = await supabase
          .from('profiles')
          .select('*')
          .eq('email', userEmailClean)
          .maybeSingle();

        if (!prof) {
          await supabase
            .from('profiles')
            .upsert(
              {
                email: userEmailClean,
                full_name: displayName,
                saved_addresses: []
              },
              { onConflict: 'email' }
            );
        }

        localStorage.setItem("srr_user_email", userEmailClean);
        localStorage.setItem("srr_user_name", prof?.full_name || displayName);
        setUserEmail(userEmailClean);
        setUserName(prof?.full_name || displayName);
        window.dispatchEvent(new Event("auth-changed"));
      } else {
        try {
          await supabase.auth.signUp({
            email: userEmailClean,
            password: password
          });
        } catch (sErr) {
          console.log("Supabase Auth signup notice:", sErr);
        }

        await supabase
          .from('profiles')
          .upsert(
            {
              email: userEmailClean,
              full_name: displayName,
              saved_addresses: []
            },
            { onConflict: 'email' }
          );

        localStorage.setItem("srr_user_email", userEmailClean);
        localStorage.setItem("srr_user_name", displayName);
        setUserEmail(userEmailClean);
        setUserName(displayName);
        window.dispatchEvent(new Event("auth-changed"));
      }
    } catch (err: any) {
      setAuthError(err.message || "Authentication failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("srr_user_email");
    localStorage.removeItem("srr_user_name");
    localStorage.removeItem("srr_cart_items");
    setUserEmail("");
    setUserName("");
    setUserOrders([]);
    setSavedAddresses([]);
    window.dispatchEvent(new Event("auth-changed"));
  };

  const handleGoogleLogin = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
    } catch (err: any) {
      console.log("Google Sign-In notice:", err.message);
    }
  };

  return (
    <div className="pt-28 md:pt-36 pb-24 px-6 min-h-screen flex items-center justify-center relative bg-[#05070B] overflow-hidden text-[#E2E4E9]">
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-multiply pointer-events-none"></div>
      
      {/* Background decorations */}
      <div className="absolute top-[10%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-[#121A2F]/10 blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-[#C5A059]/5 blur-[120px] pointer-events-none"></div>

      {userEmail ? (
        /* LOGGED-IN CUSTOMER DASHBOARD CONSOLE */
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl bg-[#0A0E17]/80 backdrop-blur-md p-8 md:p-12 border border-[#C5A059]/30 rounded-2xl relative z-10 shadow-2xl space-y-8"
        >
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"></div>

          {/* Profile Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[#E2E4E9]/10">
            <div>
              <span className="text-[#C5A059] font-bold tracking-[0.25em] uppercase text-[10px] flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Customer Console
              </span>
              <h1 className="font-serif text-3xl font-bold text-white">
                Welcome, {userName || userEmail.split("@")[0]}
              </h1>
              <p className="text-xs text-[#E2E4E9]/50 font-light mt-1">{userEmail}</p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>

          {/* Saved Addresses Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Saved Addresses
            </h3>
            {savedAddresses.length === 0 ? (
              <div className="p-4 bg-[#05070B] border border-[#E2E4E9]/10 rounded-xl text-xs text-[#E2E4E9]/40 font-light">
                No saved shipping addresses found. Check out an order to save your address for quick 1-click purchases.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedAddresses.map((addr, idx) => (
                  <div key={idx} className="p-4 bg-[#05070B] border border-[#C5A059]/20 rounded-xl text-xs text-[#E2E4E9]/80 font-light flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{addr}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Orders History Section */}
          <div className="space-y-4 pt-4 border-t border-[#E2E4E9]/10">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] flex items-center gap-2">
                <Package className="w-4 h-4" /> Order History & Traceability
              </h3>
              <button 
                onClick={() => navigate("/products")}
                className="text-[10px] uppercase font-bold text-[#C5A059] hover:underline"
              >
                + Shop New Order
              </button>
            </div>

            {isLoadingOrders ? (
              <div className="p-8 text-center text-xs text-[#E2E4E9]/40 animate-pulse">
                Syncing order ledger from Supabase...
              </div>
            ) : userOrders.length === 0 ? (
              <div className="p-8 bg-[#05070B] border border-[#E2E4E9]/10 rounded-xl text-center space-y-3">
                <p className="text-xs text-[#E2E4E9]/40 font-light">You have no order records yet.</p>
                <button
                  onClick={() => navigate("/products")}
                  className="inline-flex items-center gap-2 bg-[#C5A059] text-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
                >
                  Browse Vedic Shop <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.map((ord: any) => (
                  <div key={ord.id} className="p-5 bg-[#05070B] border border-[#E2E4E9]/10 rounded-xl space-y-3">
                    <div className="flex justify-between items-center border-b border-[#E2E4E9]/5 pb-3">
                      <div>
                        <span className="text-xs font-bold text-white block">Order #{ord.id.slice(0, 8)}</span>
                        <span className="text-[10px] text-[#E2E4E9]/40 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" /> {new Date(ord.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <span className="px-3 py-1 bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {ord.status || "Processing"}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {ord.items?.map((item: any, i: number) => (
                        <div key={i} className="text-xs text-[#E2E4E9]/70 flex justify-between font-light">
                          <span>• {item.name} ({item.volume}) x {item.qty}</span>
                          <span>₹{(item.price * item.qty).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-[#E2E4E9]/5 text-xs">
                      <span className="text-[#E2E4E9]/40">Shipping Address: {ord.shipping_address?.slice(0, 25)}...</span>
                      <span className="font-bold text-[#C5A059] text-sm">Total: ₹{ord.total_amount?.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        /* AUTHENTICATION LOGIN / SIGN UP FORM */
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg bg-[#0A0E17]/60 backdrop-blur-md p-10 md:p-14 border border-[#E2E4E9]/10 rounded-2xl relative z-10 shadow-2xl"
        >
          {/* Top gold border accent */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"></div>

          <div className="text-center mb-10 flex flex-col items-center">
            <span className="text-[#C5A059] font-bold tracking-[0.25em] uppercase text-[10px] mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              SRR Farms Account
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#E2E4E9] tracking-tight">
              {isLogin ? "Sign In" : "Register"}
            </h1>
          </div>

          {authError ? (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl mb-6 text-xs text-rose-400 text-center font-medium">
              {authError}
            </div>
          ) : null}

          <form className="space-y-6 mb-8" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 z-10">
                    <User className="w-4 h-4" />
                  </span>
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-12 pr-5 py-4 border border-[#E2E4E9]/10 focus:border-[#C5A059] focus:outline-none bg-[#05070B] transition-colors text-sm font-light placeholder:text-gray-500 rounded-lg text-white" 
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 z-10">
                <Mail className="w-4 h-4" />
              </span>
              <input 
                type="email" 
                required
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-5 py-4 border border-[#E2E4E9]/10 focus:border-[#C5A059] focus:outline-none bg-[#05070B] transition-colors text-sm font-light placeholder:text-gray-500 rounded-lg text-white" 
              />
            </div>

            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 z-10">
                <Lock className="w-4 h-4" />
              </span>
              <input 
                type={showPassword ? "text" : "password"} 
                required
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 border border-[#E2E4E9]/10 focus:border-[#C5A059] focus:outline-none bg-[#05070B] transition-colors text-sm font-light placeholder:text-gray-500 rounded-lg text-white" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full relative flex items-center justify-center gap-3 bg-gradient-to-b from-[#E6C98A] via-[#C5A059] to-[#A88543] text-[#0A0E17] px-8 py-4.5 rounded-full hover:brightness-110 transition-all duration-300 font-bold tracking-widest uppercase text-xs shadow-[0_10px_30px_rgba(197,160,89,0.3),inset_0_1px_1px_rgba(255,255,255,0.6)] hover:-translate-y-0.5 group mt-8 overflow-hidden border border-[#F4E3B4]/40 disabled:opacity-50 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>
              <span className="relative z-10">
                {isSubmitting ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
              </span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-x-0 h-px bg-[#E2E4E9]/10"></div>
              <span className="relative px-3 bg-[#0A0E17] text-[10px] uppercase font-bold tracking-widest text-[#E2E4E9]/35">
                or
              </span>
            </div>

            {/* Google Button */}
            <button 
              type="button"
              onClick={handleGoogleLogin}
              className="w-full relative flex items-center justify-center gap-3 bg-transparent text-white border border-[#E2E4E9]/10 hover:border-[#C5A059] px-8 py-4 rounded-full transition-all duration-300 font-bold tracking-widest uppercase text-xs hover:-translate-y-0.5 cursor-pointer"
            >
              <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.67 0 3.2.58 4.38 1.71l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.39 3.65 1.47 7.56l3.86 3c.9-2.69 3.42-4.52 6.67-4.52z"/>
                <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.75-4.88 3.75-8.54z"/>
                <path fill="#FBBC05" d="M5.33 14.28c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28L1.47 6.72C.53 8.61 0 10.74 0 13s.53 4.39 1.47 6.28l3.86-3z"/>
                <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.66-2.84c-1.1.74-2.5 1.18-4.3 1.18-3.25 0-5.77-1.83-6.67-4.52l-3.86 3C3.39 20.35 7.35 23 12 23z"/>
              </svg>
              Continue with Google
            </button>
          </form>
          
          <div className="text-center text-xs font-light text-[#E2E4E9]/50">
            {isLogin ? "New to SRR Farms? " : "Already registered? "}
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-[#C5A059] hover:text-[#E6C98A] transition-colors ml-1 uppercase tracking-wider text-[10px] cursor-pointer"
            >
              {isLogin ? "Create an account" : "Sign In"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
