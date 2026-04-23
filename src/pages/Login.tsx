import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, Cpu, Database, Cloud, Terminal } from 'lucide-react';
import { AuthForm } from '../components/ui/AuthForm';
import { MainScene } from '../components/3d/MainScene';

export function Login() {
  const navigate = useNavigate();
  const [showScene, setShowScene] = useState(true);

  const handleLoginSuccess = () => {
    // Simulate authentication
    localStorage.setItem('nucleo-tatico-auth', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-3d-dark text-3d-light overflow-hidden">
      {/* 3D Background */}
      {showScene && (
        <div className="fixed inset-0 z-0">
          <MainScene />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Panel - Features */}
        <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-gradient-3d flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-neon">Núcleo Tático</h1>
                <p className="text-3d-light/70">Advanced 3D Platform</p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold">Access Your Digital Command Center</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-3d-primary/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-3d-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Real-time 3D Visualization</h3>
                    <p className="text-3d-light/70">Interactive 3D scenes with WebGL acceleration</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-3d-secondary/20 flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-3d-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Project Management</h3>
                    <p className="text-3d-light/70">Organize and track all your projects in one place</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-3d-accent/20 flex items-center justify-center">
                    <Database className="w-5 h-5 text-3d-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Secure File Storage</h3>
                    <p className="text-3d-light/70">Encrypted storage with automatic backups</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Cloud className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Cloud Integration</h3>
                    <p className="text-3d-light/70">Sync with GitHub, GitLab, and cloud services</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Advanced Analytics</h3>
                    <p className="text-3d-light/70">Real-time insights and performance metrics</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowScene(!showScene)}
                className="px-4 py-2 rounded-lg bg-3d-primary/20 hover:bg-3d-primary/30 border border-3d-primary/30 flex items-center space-x-2"
              >
                {showScene ? 'Hide 3D Scene' : 'Show 3D Scene'}
              </button>
              <div className="text-sm text-3d-light/70">
                v1.0.0 • Secure Access Required
              </div>
            </div>
            <div className="text-xs text-3d-light/50">
              © 2026 Núcleo Tático Platform. All rights reserved.
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8 lg:hidden"
            >
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-3d flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-neon">Núcleo Tático</h1>
                  <p className="text-sm text-3d-light/70">Advanced 3D Platform</p>
                </div>
              </div>
            </motion.div>

            <AuthForm onSuccess={handleLoginSuccess} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <div className="glass rounded-lg p-4 mb-4">
                <h3 className="font-semibold mb-2">Demo Credentials</h3>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-3d-light/70">Email:</span>
                    <code className="text-3d-primary">admin@nucleotatico.com</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-3d-light/70">Password:</span>
                    <code className="text-3d-primary">Demo@1234</code>
                  </div>
                </div>
              </div>

              <p className="text-sm text-3d-light/70">
                This is a private platform. Access is restricted to authorized users only.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="fixed bottom-4 right-4 z-20">
        <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-green-500/20 border border-green-500/30">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-medium">Secure Connection • TLS 1.3</span>
        </div>
      </div>
    </div>
  );
}

export default Login;