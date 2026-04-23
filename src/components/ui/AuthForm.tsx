import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Lock, Mail, User, Key, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

interface AuthFormProps {
  onSuccess?: () => void;
  defaultView?: 'login' | 'register';
}

export function AuthForm({ onSuccess, defaultView = 'login' }: AuthFormProps) {
  const [view, setView] = useState<'login' | 'register'>(defaultView);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isLogin = view === 'login';

  // Login form
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // Register form
  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Login successful! Welcome back.');
      onSuccess?.();
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Registration successful! Welcome to Núcleo Tático.');
      setView('login');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleView = () => {
    setView(isLogin ? 'register' : 'login');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="card-3d p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-3d flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-3d-light mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-3d-light/70">
              {isLogin 
                ? 'Sign in to access your Núcleo Tático dashboard'
                : 'Join Núcleo Tático and unlock premium features'
              }
            </p>
          </div>

          {/* Login Form */}
          {isLogin ? (
            <form onSubmit={handleSubmitLogin(handleLogin)} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-3d-light mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-3d-primary" />
                  <input
                    type="email"
                    {...registerLogin('email')}
                    className="w-full pl-10 pr-4 py-3 bg-3d-dark/50 border border-3d-primary/30 rounded-lg text-3d-light placeholder-3d-light/50 focus:outline-none focus:border-3d-primary focus:ring-2 focus:ring-3d-primary/20"
                    placeholder="you@example.com"
                    disabled={isLoading}
                  />
                </div>
                {loginErrors.email && (
                  <p className="mt-1 text-sm text-red-400">{loginErrors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-3d-light mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-3d-primary" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...registerLogin('password')}
                    className="w-full pl-10 pr-12 py-3 bg-3d-dark/50 border border-3d-primary/30 rounded-lg text-3d-light placeholder-3d-light/50 focus:outline-none focus:border-3d-primary focus:ring-2 focus:ring-3d-primary/20"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-3d-light/50 hover:text-3d-light"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {loginErrors.password && (
                  <p className="mt-1 text-sm text-red-400">{loginErrors.password.message}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...registerLogin('rememberMe')}
                    className="w-4 h-4 text-3d-primary bg-3d-dark border-3d-primary/30 rounded focus:ring-3d-primary focus:ring-offset-3d-dark"
                    disabled={isLoading}
                  />
                  <span className="ml-2 text-sm text-3d-light">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-3d-primary hover:text-3d-secondary transition-colors"
                  disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-cyber w-full py-3 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleSubmitRegister(handleRegister)} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-3d-light mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-3d-primary" />
                  <input
                    type="text"
                    {...registerRegister('name')}
                    className="w-full pl-10 pr-4 py-3 bg-3d-dark/50 border border-3d-primary/30 rounded-lg text-3d-light placeholder-3d-light/50 focus:outline-none focus:border-3d-primary focus:ring-2 focus:ring-3d-primary/20"
                    placeholder="John Doe"
                    disabled={isLoading}
                  />
                </div>
                {registerErrors.name && (
                  <p className="mt-1 text-sm text-red-400">{registerErrors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-3d-light mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-3d-primary" />
                  <input
                    type="email"
                    {...registerRegister('email')}
                    className="w-full pl-10 pr-4 py-3 bg-3d-dark/50 border border-3d-primary/30 rounded-lg text-3d-light placeholder-3d-light/50 focus:outline-none focus:border-3d-primary focus:ring-2 focus:ring-3d-primary/20"
                    placeholder="you@example.com"
                    disabled={isLoading}
                  />
                </div>
                {registerErrors.email && (
                  <p className="mt-1 text-sm text-red-400">{registerErrors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-3d-light mb-2">
                  Password
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-3d-primary" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...registerRegister('password')}
                    className="w-full pl-10 pr-12 py-3 bg-3d-dark/50 border border-3d-primary/30 rounded-lg text-3d-light placeholder-3d-light/50 focus:outline-none focus:border-3d-primary focus:ring-2 focus:ring-3d-primary/20"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-3d-light/50 hover:text-3d-light"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {registerErrors.password && (
                  <p className="mt-1 text-sm text-red-400">{registerErrors.password.message}</p>
                )}
                <div className="mt-2 text-xs text-3d-light/70">
                  Must contain: uppercase, lowercase, number, special character
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-3d-light mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-3d-primary" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...registerRegister('confirmPassword')}
                    className="w-full pl-10 pr-12 py-3 bg-3d-dark/50 border border-3d-primary/30 rounded-lg text-3d-light placeholder-3d-light/50 focus:outline-none focus:border-3d-primary focus:ring-2 focus:ring-3d-primary/20"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-3d-light/50 hover:text-3d-light"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {registerErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{registerErrors.confirmPassword.message}</p>
                )}
              </div>

              {/* Terms */}
              <div>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    {...registerRegister('acceptTerms')}
                    className="w-4 h-4 mt-1 text-3d-primary bg-3d-dark border-3d-primary/30 rounded focus:ring-3d-primary focus:ring-offset-3d-dark"
                    disabled={isLoading}
                  />
                  <span className="ml-2 text-sm text-3d-light">
                    I agree to the{' '}
                    <button type="button" className="text-3d-primary hover:text-3d-secondary">
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button type="button" className="text-3d-primary hover:text-3d-secondary">
                      Privacy Policy
                    </button>
                  </span>
                </label>
                {registerErrors.acceptTerms && (
                  <p className="mt-1 text-sm text-red-400">{registerErrors.acceptTerms.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-cyber w-full py-3 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          )}

          {/* Toggle View */}
          <div className="mt-8 text-center">
            <p className="text-3d-light/70">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              {' '}
              <button
                type="button"
                onClick={toggleView}
                className="text-3d-primary hover:text-3d-secondary font-medium transition-colors"
                disabled={isLoading}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-3d-dark/30 rounded-lg border border-3d-primary/20">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-3d-neon mr-2" />
              <span className="text-sm text-3d-light/70">
                Your data is encrypted and secure. We never share your information.
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default AuthForm;