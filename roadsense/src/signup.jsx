import { useState, useEffect, useRef } from "react";
import { motion } from 'framer-motion';
import { Eye, EyeOff, Grid, ChevronRight } from 'lucide-react';

// BorderTrail Component
function BorderTrail({ size = 60, transition, style }) {
  const BASE_TRANSITION = {
    repeat: Infinity,
    duration: 5,
    ease: 'linear',
  };
  
  return (
    <div className='pointer-events-none absolute inset-0 rounded-2xl border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]'>
      <motion.div
        className="absolute aspect-square"
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          background: 'linear-gradient(90deg, rgba(20, 184, 166, 0) 0%, rgba(20, 184, 166, 1) 30%, rgba(45, 212, 191, 1) 50%, rgba(20, 184, 166, 1) 70%, rgba(20, 184, 166, 0) 100%)',
          filter: 'brightness(1.5)',
          ...style,
        }}
        animate={{
          offsetDistance: ['0%', '100%'],
        }}
        transition={transition ?? BASE_TRANSITION}
      />
    </div>
  );
}

// Floating Paths Background
function FloatingPaths({ position }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg className="h-full w-full text-teal-400" viewBox="0 0 696 316" fill="none">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={0.5 + path.id * 0.03}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// Custom Input with hover effect
function AppInput({ label, placeholder, type = "text", value, onChange, onKeyPress }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          className="peer relative z-10 w-full px-4 py-3 bg-slate-700/50 border-2 border-slate-600/50 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:bg-slate-700/70 focus:border-teal-500/50 transition-all duration-200"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        />
        {isHovering && (
          <>
            <div
              className="absolute pointer-events-none top-0 left-0 right-0 h-[2px] z-20 rounded-t-md overflow-hidden"
              style={{
                background: `radial-gradient(30px circle at ${mousePosition.x}px 0px, rgba(45, 212, 191, 1) 0%, transparent 70%)`,
              }}
            />
            <div
              className="absolute pointer-events-none bottom-0 left-0 right-0 h-[2px] z-20 rounded-b-md overflow-hidden"
              style={{
                background: `radial-gradient(30px circle at ${mousePosition.x}px 2px, rgba(45, 212, 191, 1) 0%, transparent 70%)`,
              }}
            />
          </>
        )}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 text-slate-400 hover:text-teal-400 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Signup() {
  const [usernameInput, setUsernameInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [typedName, setTypedName] = useState("");
  const [capturedUsername, setCapturedUsername] = useState("");
  const animationRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    if (!success || !capturedUsername) return;

    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    setTypedName("");
    let index = 0;

    const typeNext = () => {
      if (index < capturedUsername.length) {
        setTypedName(capturedUsername.substring(0, index + 1));
        index++;
        animationRef.current = setTimeout(typeNext, 120);
      }
    };

    animationRef.current = setTimeout(typeNext, 50);

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [success, capturedUsername]);

  const handleSignup = () => {
    if (!usernameInput.trim()) return;

    setLoading(true);
    const usernameNow = usernameInput.trim();

    setTimeout(() => {
      setCapturedUsername(usernameNow);
      setLoading(false);
      setSuccess(true);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !success) {
      handleSignup();
    }
  };

  const handleProceed = () => {
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <svg className="hidden">
          <defs>
            <filter id="blurMe">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        
        <div className="gradients-container h-full w-full blur-lg [filter:url(#blurMe)_blur(40px)]">
          <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-[radial-gradient(circle_at_center,_rgba(45,212,191,0.3)_0%,_transparent_50%)] animate-moveVertical opacity-100 mix-blend-hard-light"></div>
          <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.25)_0%,_transparent_50%)] animate-moveInCircle origin-[calc(50%-400px)] opacity-100 mix-blend-hard-light"></div>
          <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.25)_0%,_transparent_50%)] animate-moveInCircleSlow origin-[calc(50%+400px)] opacity-100 mix-blend-hard-light"></div>
          <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] bg-[radial-gradient(circle_at_center,_rgba(20,184,166,0.25)_0%,_transparent_50%)] animate-moveHorizontal origin-[calc(50%-200px)] opacity-70 mix-blend-hard-light"></div>
        </div>
      </div>

      <style>{`
        @keyframes moveVertical {
          0%, 100% { transform: translateY(-50%); }
          50% { transform: translateY(50%); }
        }
        @keyframes moveHorizontal {
          0%, 100% { transform: translateX(-50%) translateY(-10%); }
          50% { transform: translateX(50%) translateY(10%); }
        }
        @keyframes moveInCircle {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes moveInCircleSlow {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-moveVertical { animation: moveVertical 30s ease infinite; }
        .animate-moveHorizontal { animation: moveHorizontal 40s ease infinite; }
        .animate-moveInCircle { animation: moveInCircle 20s reverse infinite; }
        .animate-moveInCircleSlow { animation: moveInCircleSlow 40s linear infinite; }
      `}</style>

      <main className="relative w-full max-w-6xl grid lg:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl">
        <BorderTrail
          size={100}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: 'linear',
          }}
          style={{
            boxShadow: '0px 0px 60px 30px rgba(20, 184, 166, 0.4)',
          }}
        />

        {/* Left Panel - Signup Form */}
        <div 
          className="relative flex flex-col justify-center p-8 sm:p-12 bg-slate-700/70 backdrop-blur-xl overflow-hidden order-2 lg:order-1"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Home Button - Top Left */}
          <a
            href="/"
            className="absolute top-7 left-2 z-20 flex items-center gap-1 px-2 py-1.5 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span className="text-sm font-medium">Home</span>
          </a>

          {/* Glow effect that follows mouse - constrained to left panel only */}
          {isHovering && (
            <div
              className="absolute pointer-events-none w-[500px] h-[500px] bg-gradient-to-r from-teal-300/20 via-cyan-300/20 to-purple-300/20 rounded-full blur-3xl transition-opacity duration-200"
              style={{
                transform: `translate(${mousePosition.x - 250}px, ${mousePosition.y - 250}px)`,
                transition: 'transform 0.1s ease-out',
                opacity: 1
              }}
            />
          )}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.15),transparent_50%)]" />
          
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden relative z-10">
            <img 
              src="/roadsense.png" 
              alt="RoadSense Logo" 
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-white">RoadSense</h1>
              <p className="text-xs text-slate-300">Road safety monitoring</p>
            </div>
          </div>

          <div className="relative z-10 max-w-sm mx-auto w-full space-y-6">
            {success ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">
                    Welcome,{" "}
                    <span className="text-teal-300">
                      {typedName}
                      <span className="inline-block w-0.5 h-6 bg-teal-300 ml-1 animate-pulse" />
                    </span>
                  </h2>
                  <p className="text-slate-300 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Account created successfully
                  </p>
                </div>

                <button
                  onClick={handleProceed}
                  className="group relative w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg overflow-hidden transition-all hover:shadow-lg hover:shadow-teal-500/50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Proceed to Login
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </motion.div>
            ) : (
              <>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">Create your account</h2>
                  <p className="text-slate-300">Join RoadSense for safer journeys</p>
                </div>

                <div className="space-y-4">
                  <AppInput
                    label="Username"
                    placeholder="Enter your username"
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />

                  <AppInput
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />

                  <AppInput
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />

                  <button
                    type="button"
                    onClick={handleSignup}
                    disabled={loading}
                    className="group relative w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg overflow-hidden transition-all hover:shadow-lg hover:shadow-teal-500/50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      <>
                        <span className="relative z-10">Create Account</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center pt-4 text-sm">
                  <span className="text-slate-300">Already have an account?</span>
                  <a href="/login" className="ml-2 text-teal-300 hover:text-teal-200 transition-colors">
                    Sign in
                  </a>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Panel - Brand Showcase */}
        <div className="relative hidden lg:flex flex-col justify-between p-12 bg-slate-800/90 backdrop-blur-xl border-l border-slate-600/50 order-1 lg:order-2">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent z-10" />
          
          <div className="absolute inset-0">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
          </div>

          <div className="relative z-20 space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="/roadsense.png" 
                alt="RoadSense Logo" 
                className="w-12 h-12 rounded-xl object-cover shadow-lg shadow-teal-500/30"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">RoadSense</h1>
                <p className="text-sm text-slate-300">Smart monitoring for safer roads</p>
              </div>
            </div>
          </div>

          {/* Decorative grid */}
          <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}