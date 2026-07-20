import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Menu, X, Sparkles, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CartItem {
  id: number;
  name: string;
  volume: string;
  price: number;
  qty: number;
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("srr_cart_items");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("srr_cart_items", JSON.stringify(cartItems));
  }, [cartItems]);

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Watch scroll to adjust navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen to custom "add to cart" events from Products or Home pages
  useEffect(() => {
    const handleAddToCartEvent = (e: Event) => {
      const customEvent = e as CustomEvent<CartItem>;
      if (customEvent.detail) {
        const addedProduct = customEvent.detail;
        setCartItems((prev) => {
          const exists = prev.find((item) => item.id === addedProduct.id);
          if (exists) {
            return prev.map((item) =>
              item.id === addedProduct.id ? { ...item, qty: item.qty + 1 } : item
            );
          }
          return [...prev, { ...addedProduct, qty: 1 }];
        });
        // Open the slide-over cart drawer immediately
        setIsCartOpen(true);
      }
    };
    window.addEventListener("add-to-cart", handleAddToCartEvent);
    return () => window.removeEventListener("add-to-cart", handleAddToCartEvent);
  }, []);

  const [userEmail, setUserEmail] = useState(localStorage.getItem("srr_user_email") || "");
  const [userName, setUserName] = useState(localStorage.getItem("srr_user_name") || "");

  useEffect(() => {
    const handleAuthChange = () => {
      const emailLocal = localStorage.getItem("srr_user_email") || "";
      setUserEmail(emailLocal);
      setUserName(localStorage.getItem("srr_user_name") || "");
      if (!emailLocal) {
        localStorage.removeItem("srr_cart_items");
        setCartItems([]);
      }
    };
    window.addEventListener("auth-changed", handleAuthChange);
    return () => window.removeEventListener("auth-changed", handleAuthChange);
  }, []);

  const updateCartQty = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeCartItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const getWhatsAppMessage = () => {
    const itemsText = cartItems
      .map(item => `- ${item.name} (${item.volume}) x ${item.qty} (₹${(item.price * item.qty).toLocaleString()})`)
      .join("\n");
    const fullText = `Hello Team SRR Farms, I would like to place an order via WhatsApp.\n\nItems in my cart:\n${itemsText}\n\nSubtotal: ₹${cartSubtotal.toLocaleString()}\n\nPlease guide me with the payment and delivery details.`;
    return encodeURIComponent(fullText);
  };

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
    isHome
      ? isScrolled 
        ? "bg-[#05070B]/90 backdrop-blur-md text-[#E2E4E9] border-[#C5A059]/20 shadow-lg"
        : "bg-transparent text-[#E2E4E9] border-transparent"
      : "bg-[#05070B]/90 backdrop-blur-md text-[#E2E4E9] border-[#C5A059]/10 shadow-lg"
  }`;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/products" },
    { name: "Purity", path: "/certifications" },
    { name: "Story", path: "/about" }
  ];

  return (
    <>
      <nav className={navClasses}>
        {/* Luxury Announcement Ticker */}
        <div className="bg-[#C5A059] text-[#05070B] text-[8px] font-bold tracking-[0.3em] py-2 px-6 overflow-hidden select-none border-b border-[#05070B]/10 relative hidden sm:block">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            <span>Free Shipping on all orders over ₹2,000 ❖ Batch #78 Clarifying now ❖ 100% Certified Organic A2 Milk ❖ Crafted via Vedic Bilona Churning</span>
            <span>Free Shipping on all orders over ₹2,000 ❖ Batch #78 Clarifying now ❖ 100% Certified Organic A2 Milk ❖ Crafted via Vedic Bilona Churning</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="font-serif text-2xl font-bold tracking-widest flex items-center gap-1.5 hover:opacity-90 transition-opacity">
            SRR<span className="text-[#C5A059]">.</span>
          </Link>

          {/* Desktop Links with Active Indicators */}
          <div className="hidden md:flex items-center gap-10 font-sans text-xs font-bold tracking-[0.2em] uppercase">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`relative py-1.5 transition-colors duration-300 ${
                    isActive ? "text-[#C5A059]" : "text-[#E2E4E9]/60 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavDot"
                      className="absolute bottom-0 left-1/2 -translate-x-[50%] w-1 h-1 rounded-full bg-[#C5A059]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {userEmail ? (
              <div className="hidden md:flex items-center gap-2 bg-[#0A0E17] border border-[#C5A059]/40 rounded-full px-3.5 py-1.5 text-xs shadow-md">
                <button
                  onClick={() => navigate("/auth")}
                  className="flex items-center gap-2 text-white hover:text-[#C5A059] transition-colors cursor-pointer"
                  title="View Profile Console"
                >
                  <User className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="font-semibold max-w-[120px] truncate">{userName || userEmail.split("@")[0]}</span>
                  <span className="text-[9px] uppercase font-bold text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded-full border border-[#C5A059]/20 hover:bg-[#C5A059] hover:text-black transition-all ml-1">
                    Profile
                  </span>
                </button>
                <span className="text-[#E2E4E9]/20">|</span>
                <button
                  onClick={() => {
                    localStorage.removeItem("srr_user_email");
                    localStorage.removeItem("srr_user_name");
                    localStorage.removeItem("srr_cart_items");
                    setUserEmail("");
                    setUserName("");
                    window.dispatchEvent(new Event("auth-changed"));
                    navigate("/auth");
                  }}
                  className="text-[9px] uppercase font-bold text-rose-400 hover:text-rose-300 tracking-wider cursor-pointer"
                  title="Sign out"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/auth" className={`hidden md:block transition-colors duration-300 hover:text-[#C5A059] ${
                location.pathname === "/auth" ? "text-[#C5A059]" : "text-[#E2E4E9]/70"
              }`}>
                <User className="w-4.5 h-4.5" />
              </Link>
            )}
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative transition-colors duration-300 hover:text-[#C5A059] text-[#E2E4E9]/70 cursor-pointer"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#C5A059] text-black text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-md">
                  {totalItemsCount}
                </span>
              )}
            </button>
            
            <button 
              className="md:hidden text-[#E2E4E9]/70 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer (Cinematic slide-in panel) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />
            
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-[#05070B] border-l border-[#C5A059]/10 z-50 md:hidden p-8 flex flex-col shadow-2xl justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-12">
                  <span className="font-serif text-xl font-bold tracking-wider">
                    SRR<span className="text-[#C5A059]">.</span>
                  </span>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[#E2E4E9]/50 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-6 text-sm font-bold tracking-widest uppercase">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link 
                        key={link.path} 
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`py-2 border-b border-[#E2E4E9]/5 transition-colors ${
                          isActive ? "text-[#C5A059]" : "text-[#E2E4E9]/60 hover:text-white"
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                  <Link 
                    to="/auth" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-2 border-b border-[#E2E4E9]/5 transition-colors ${
                      location.pathname === "/auth" ? "text-[#C5A059]" : "text-[#E2E4E9]/60 hover:text-white"
                    }`}
                  >
                    Account
                  </Link>
                </div>
              </div>

              <div className="text-[10px] tracking-widest text-[#E2E4E9]/30 uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                Vedic Bilona Ghee
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= DTC SLIDE-OVER DRAWER CART ================= */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-[2px]"
            />
            
            {/* Slide-over cart container */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.05, duration: 0.5 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-[#0A0E17] border-l border-[#C5A059]/20 z-[101] shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#E2E4E9]/10 flex justify-between items-center bg-[#05070B]/50">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
                  <span className="font-serif text-lg font-bold text-white">Your Cart ({totalItemsCount})</span>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full border border-[#E2E4E9]/10 flex items-center justify-center hover:border-white transition-colors"
                >
                  <X className="w-4 h-4 text-[#E2E4E9]/70 hover:text-white" />
                </button>
              </div>

              {/* Items List (scrollable) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <ShoppingBag className="w-12 h-12 text-[#E2E4E9]/10 mb-4" />
                    <p className="text-sm text-[#E2E4E9]/40 font-light">Your harvest cart is currently empty.</p>
                    <button 
                      onClick={() => { setIsCartOpen(false); navigate('/products'); }}
                      className="mt-6 text-xs font-bold tracking-widest text-[#C5A059] uppercase hover:text-white transition-colors"
                    >
                      Shop Products
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div 
                      key={item.id}
                      className="flex gap-4 p-4 border border-[#E2E4E9]/5 bg-[#05070B]/40 rounded-xl relative overflow-hidden group hover:border-[#C5A059]/20 transition-all"
                    >
                      <div className="flex-1">
                        <span className="text-[10px] text-[#C5A059] tracking-wider uppercase font-bold">{item.volume}</span>
                        <h4 className="font-serif text-base font-bold text-white mt-0.5 leading-snug">{item.name}</h4>
                        <div className="font-serif text-sm font-bold text-[#E2E4E9]/80 mt-2">
                          ₹{item.price.toLocaleString()}
                        </div>
                        
                        {/* Quantity picker & delete */}
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center gap-3 border border-[#E2E4E9]/15 rounded-full px-3 py-1 bg-[#05070B]">
                            <button 
                              onClick={() => updateCartQty(item.id, -1)}
                              className="text-[#E2E4E9]/50 hover:text-[#C5A059]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-semibold w-4 text-center">{item.qty}</span>
                            <button 
                              onClick={() => updateCartQty(item.id, 1)}
                              className="text-[#E2E4E9]/50 hover:text-[#C5A059]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button 
                            onClick={() => removeCartItem(item.id)}
                            className="text-[#E2E4E9]/30 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-[#E2E4E9]/10 bg-[#05070B]/60 space-y-6">
                  {/* Shipping Bar */}
                  <div className="text-center p-3 bg-[#C5A059]/5 border border-[#C5A059]/20 rounded-lg text-xs font-light text-[#E2E4E9]/80">
                    🎉 You qualify for <span className="font-bold text-[#C5A059]">Complimentary Premium Shipping</span>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-xs font-light text-[#E2E4E9]/50 uppercase tracking-widest">Subtotal</span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Taxes included</span>
                    </div>
                    <span className="font-serif text-3xl font-bold text-[#C5A059]">
                      ₹{cartSubtotal.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/checkout');
                    }}
                    className="w-full relative flex items-center justify-center gap-3 bg-gradient-to-b from-[#E6C98A] via-[#C5A059] to-[#A88543] text-[#0A0E17] py-4.5 rounded-full hover:brightness-110 shadow-[0_10px_25px_rgba(197,160,89,0.3)] transition-all font-bold tracking-widest uppercase text-xs border border-[#F4E3B4]/40 cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/919999999999?text=${getWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full relative flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white py-4.5 rounded-full shadow-[0_10px_25px_rgba(16,185,129,0.2)] transition-colors font-bold tracking-widest uppercase text-xs cursor-pointer text-center"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.733-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.118-2.905-6.993-1.876-1.875-4.359-2.907-6.999-2.909-5.443 0-9.87 4.417-9.873 9.861-.001 1.79.483 3.541 1.398 5.091L1.85 22.147l4.797-1.258zM17.482 14.3c-.302-.15-1.787-.882-2.062-.982-.275-.1-.475-.15-.675.15-.2.3-.775.982-.95 1.182-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.414-1.492-.893-.797-1.496-1.78-1.671-2.08-.175-.3-.019-.462.132-.612.135-.135.302-.35.452-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.493-.51-.675-.52l-.575-.01c-.2 0-.525.075-.8.376-.275.3-1.05 1.027-1.05 2.504 0 1.478 1.075 2.903 1.225 3.103.15.2 2.115 3.23 5.124 4.53.715.31 1.273.495 1.708.634.719.228 1.375.196 1.892.119.577-.087 1.787-.732 2.037-1.439.25-.706.25-1.314.175-1.439-.075-.125-.275-.2-.575-.35z"/>
                    </svg>
                    Order via WhatsApp
                  </a>
                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
