import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, 
  File, 
  Download, 
  Eye, 
  Search, 
  Filter, 
  Grid, 
  List, 
  ChevronRight,
  Clock,
  User,
  BarChart3,
  Package,
  Shield,
  Zap,
  Cpu,
  Database,
  Cloud,
  Code,
  Terminal,
  Layers,
  Globe,
  Server,
  Network,
  Lock,
  Key,
  Settings,
  Bell,
  HelpCircle,
  X,
  RefreshCw,
  Home,
  FolderOpen,
  Archive,
  Upload,
  Share2,
} from 'lucide-react';
import { MainScene } from '../components/3d/MainScene';
import toast from 'react-hot-toast';

// Types
interface ProjectFile {
  id: string;
  name: string;
  type: 'folder' | 'file';
  category: 'code' | 'design' | 'documentation' | 'assets' | 'database' | 'config';
  size: string;
  lastModified: string;
  downloads: number;
  description: string;
  tags: string[];
  path: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived' | 'development';
  progress: number;
  lastUpdated: string;
  files: number;
  size: string;
  icon: string;
  color: string;
}

// Mock data
const projects: Project[] = [
  {
    id: '1',
    name: 'Núcleo Tático Platform',
    description: 'Plataforma educacional premium para concursos públicos',
    status: 'active',
    progress: 85,
    lastUpdated: '2 hours ago',
    files: 156,
    size: '2.4 GB',
    icon: '🎯',
    color: 'from-3d-primary to-3d-secondary',
  },
  {
    id: '2',
    name: 'Fitness System',
    description: 'Sistema de treinamento físico com anamnese wizard',
    status: 'active',
    progress: 100,
    lastUpdated: '1 day ago',
    files: 89,
    size: '1.2 GB',
    icon: '💪',
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: '3',
    name: 'Repositório Auditor',
    description: 'Sistema de auditoria multidisciplinar de repositórios',
    status: 'development',
    progress: 60,
    lastUpdated: '3 days ago',
    files: 42,
    size: '850 MB',
    icon: '🔍',
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: '4',
    name: 'CrossFit Materials',
    description: 'Biblioteca completa de materiais CrossFit CCFT',
    status: 'archived',
    progress: 100,
    lastUpdated: '1 week ago',
    files: 235,
    size: '4.7 GB',
    icon: '🔥',
    color: 'from-orange-500 to-red-600',
  },
  {
    id: '5',
    name: 'Telegram Bot',
    description: 'Bot do Núcleo Tático com integração Telegram',
    status: 'development',
    progress: 40,
    lastUpdated: '2 days ago',
    files: 31,
    size: '520 MB',
    icon: '🤖',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: '6',
    name: '3D Site Components',
    description: 'Componentes 3D avançados para o site',
    status: 'active',
    progress: 75,
    lastUpdated: '5 hours ago',
    files: 67,
    size: '1.8 GB',
    icon: '🎨',
    color: 'from-indigo-500 to-violet-600',
  },
];

const files: ProjectFile[] = [
  {
    id: '1',
    name: 'backend',
    type: 'folder',
    category: 'code',
    size: '1.2 GB',
    lastModified: '2 hours ago',
    downloads: 45,
    description: 'API backend com Express e Prisma',
    tags: ['nodejs', 'typescript', 'prisma', 'express'],
    path: '/nucleo-tatico-platform/backend',
  },
  {
    id: '2',
    name: 'frontend',
    type: 'folder',
    category: 'code',
    size: '850 MB',
    lastModified: '3 hours ago',
    downloads: 38,
    description: 'Frontend React com Three.js',
    tags: ['react', 'threejs', 'tailwind', 'vite'],
    path: '/nucleo-tatico-platform/frontend',
  },
  {
    id: '3',
    name: 'database',
    type: 'folder',
    category: 'database',
    size: '320 MB',
    lastModified: '1 day ago',
    downloads: 22,
    description: 'Schema e migrações do banco de dados',
    tags: ['postgresql', 'prisma', 'migrations'],
    path: '/nucleo-tatico-platform/database',
  },
  {
    id: '4',
    name: 'package.json',
    type: 'file',
    category: 'config',
    size: '4.2 KB',
    lastModified: '2 hours ago',
    downloads: 56,
    description: 'Dependências do projeto',
    tags: ['dependencies', 'scripts'],
    path: '/nucleo-tatico-platform/package.json',
  },
  {
    id: '5',
    name: 'architecture.md',
    type: 'file',
    category: 'documentation',
    size: '15 KB',
    lastModified: '1 day ago',
    downloads: 31,
    description: 'Arquitetura do sistema',
    tags: ['architecture', 'documentation'],
    path: '/nucleo-tatico-platform/docs/architecture.md',
  },
  {
    id: '6',
    name: 'components',
    type: 'folder',
    category: 'code',
    size: '210 MB',
    lastModified: '5 hours ago',
    downloads: 29,
    description: 'Componentes React reutilizáveis',
    tags: ['components', 'ui', 'react'],
    path: '/nucleo-tatico-3d-site/src/components',
  },
  {
    id: '7',
    name: 'skills',
    type: 'folder',
    category: 'code',
    size: '180 MB',
    lastModified: '3 days ago',
    downloads: 18,
    description: 'Skills do OpenClaw',
    tags: ['openclaw', 'skills', 'automation'],
    path: '/workspace/skills',
  },
  {
    id: '8',
    name: 'memory',
    type: 'folder',
    category: 'documentation',
    size: '45 MB',
    lastModified: 'Today',
    downloads: 12,
    description: 'Memórias e contexto do projeto',
    tags: ['memory', 'context', 'documentation'],
    path: '/workspace/memory',
  },
];

export function Dashboard() {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [show3DScene, setShow3DScene] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Filter files based on search and category
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Categories', icon: <Layers className="w-4 h-4" />, count: files.length },
    { id: 'code', name: 'Code', icon: <Code className="w-4 h-4" />, count: files.filter(f => f.category === 'code').length },
    { id: 'design', name: 'Design', icon: <Globe className="w-4 h-4" />, count: files.filter(f => f.category === 'design').length },
    { id: 'documentation', name: 'Documentation', icon: <File className="w-4 h-4" />, count: files.filter(f => f.category === 'documentation').length },
    { id: 'assets', name: 'Assets', icon: <Package className="w-4 h-4" />, count: files.filter(f => f.category === 'assets').length },
    { id: 'database', name: 'Database', icon: <Database className="w-4 h-4" />, count: files.filter(f => f.category === 'database').length },
    { id: 'config', name: 'Config', icon: <Settings className="w-4 h-4" />, count: files.filter(f => f.category === 'config').length },
  ];

  // Stats
  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    totalFiles: files.length,
    totalSize: '10.8 GB',
    downloadsToday: 124,
  };

  const handleDownload = async (fileId: string, fileName: string) => {
    setIsDownloading(fileId);
    
    try {
      // Simulate download
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`Downloading ${fileName}...`);
      
      // In a real app, this would trigger a file download
      const file = files.find(f => f.id === fileId);
      if (file) {
        // Create a blob and download link
        const content = `This is a simulated download of ${fileName}\nPath: ${file.path}\nSize: ${file.size}\nLast Modified: ${file.lastModified}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      toast.error('Download failed. Please try again.');
    } finally {
      setIsDownloading(null);
    }
  };

  const handleDownloadAll = async () => {
    setIsDownloading('all');
    
    try {
      // Simulate creating a zip file
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast.success('Creating archive... This may take a moment.');
      
      // Simulate zip creation
      const content = `Núcleo Tático Projects Archive\nGenerated: ${new Date().toLocaleString()}\n\nProjects:\n${projects.map(p => `- ${p.name}: ${p.files} files, ${p.size}`).join('\n')}\n\nTotal: ${stats.totalFiles} files, ${stats.totalSize}`;
      const blob = new Blob([content], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nucleo-tatico-projects-${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Archive downloaded successfully!');
    } catch (error) {
      toast.error('Failed to create archive.');
    } finally {
      setIsDownloading(null);
    }
  };

  return (
    <div className="min-h-screen bg-3d-dark text-3d-light">
      {/* 3D Background Scene */}
      {show3DScene && (
        <div className="fixed inset-0 z-0">
          <MainScene />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="glass border-b border-3d-primary/20">
          <div className="container-3d py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-lg hover:bg-3d-primary/20"
                >
                  <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                    <div className="w-6 h-0.5 bg-3d-light"></div>
                    <div className="w-6 h-0.5 bg-3d-light"></div>
                    <div className="w-6 h-0.5 bg-3d-light"></div>
                  </div>
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-3d flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-neon">Núcleo Tático</h1>
                    <p className="text-sm text-3d-light/70">Advanced 3D Dashboard</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShow3DScene(!show3DScene)}
                  className="px-4 py-2 rounded-lg bg-3d-primary/20 hover:bg-3d-primary/30 border border-3d-primary/30 flex items-center space-x-2"
                >
                  {show3DScene ? (
                    <>
                      <X className="w-4 h-4" />
                      <span>Hide 3D</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span>Show 3D</span>
                    </>
                  )}
                </button>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-3d-light/50" />
                  <input
                    type="text"
                    placeholder="Search files, projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-3d-dark/50 border border-3d-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-3d-primary focus:border-transparent w-64"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg hover:bg-3d-primary/20">
                    <Bell className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-3d-primary/20">
                    <Settings className="w-5 h-5" />
                  </button>
                  <div className="w-8 h-8 rounded-full bg-gradient-3d flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Layout */}
        <div className="container-3d py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            {sidebarOpen && (
              <div className="lg:w-1/4">
                <div className="glass rounded-xl p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">Projects</h2>
                  <div className="space-y-3">
                    {projects.map(project => (
                      <button
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          selectedProject.id === project.id
                            ? 'bg-3d-primary/20 border border-3d-primary/30'
                            : 'hover:bg-3d-dark/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{project.icon}</span>
                            <div>
                              <div className="font-medium">{project.name}</div>
                              <div className="text-sm text-3d-light/70">{project.status}</div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>{project.files} files</span>
                          <span>{project.size}</span>
                        </div>
                        <div className="mt-2">
                          <div className="h-1 bg-3d-dark/50 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${project.color}`}
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <div className="text-xs text-3d-light/70 mt-1">
                            {project.progress}% complete
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="glass rounded-xl p-6">
                  <h2 className="text-lg font-semibold mb-4">Categories</h2>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                          selectedCategory === category.id
                            ? 'bg-3d-primary/20'
                            : 'hover:bg-3d-dark/50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-3d-light/70">{category.icon}</div>
                          <span>{category.name}</span>
                        </div>
                        <span className="text-sm bg-3d-dark/50 px-2 py-1 rounded">
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className={`${sidebarOpen ? 'lg:w-3/4' : 'w-full'}`}>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="glass rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <FolderOpen className="w-8 h-8 text-3d-primary" />
                    <span className="text-2xl font-bold">{stats.totalProjects}</span>
                  </div>
                  <div className="text-sm text-3d-light/70">Total Projects</div>
                  <div className="text-xs text-3d-light/50 mt-1">
                    {stats.activeProjects} active
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <File className="w-8 h-8 text-3d-secondary" />
                    <span className="text-2xl font-bold">{stats.totalFiles}</span>
                  </div>
                  <div className="text-sm text-3d-light/70">Total Files</div>
                  <div className="text-xs text-3d-light/50 mt-1">
                    {stats.totalSize} total
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Download className="w-8 h-8 text-3d-accent" />
                    <span className="text-2xl font-bold">{stats.downloadsToday}</span>
                  </div>
                  <div className="text-sm text-3d-light/70">Downloads Today</div>
                  <div className="text-xs text-3d-light/50 mt-1">
                    Last 24 hours
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <BarChart3 className="w-8 h-8 text-green-500" />
                    <span className="text-2xl font-bold">85%</span>
                  </div>
                  <div className="text-sm text-3d-light/70">System Health</div>
                  <div className="text-xs text-3d-light/50 mt-1">
                    Optimal performance
                  </div>
                </div>
              </div>

              {/* Files Section */}
              <div className="glass rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">Files</h2>
                    <p className="text-sm text-3d-light/70">
                      {filteredFiles.length} files found
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-3d-dark/50 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-3d-primary/20' : ''}`}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded ${viewMode === 'list' ? 'bg-3d-primary/20' : ''}`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={handleDownloadAll}
                      disabled={isDownloading === 'all'}
                      className="px-4 py-2 bg-3d-primary text-white rounded-lg hover:bg-3d-primary/90 disabled:opacity-50 flex items-center space-x-2"
                    >
                      {isDownloading === 'all' ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Creating Archive...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Download All</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Files Grid/List */}
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredFiles.map(file => (
                      <div
                        key={file.id}
                        className="glass rounded-lg p-4 hover:bg-3d-dark/50 transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-3d-primary/20 flex items-center justify-center">
                              {file.type === 'folder' ? (
                                <Folder className="w-5 h-5 text-3d-primary" />
                              ) : (
                                <File className="w-5 h-5 text-3d-secondary" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{file.name}</div>
                              <div className="text-xs text-3d-light/70">{file.category}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownload(file.id, file.name)}
                            disabled={isDownloading === file.id}
                            className="p-2 hover:bg-3d-dark/30 rounded"
                          >
                            {isDownloading === file.id ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <Download className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <p className="text-sm text-3d-light/70 mb-3">{file.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {file.tags.map(tag => (
                            <span
                              key={tag}
                              className="text-xs bg-3d-dark/50 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-xs text-3d-light/50">
                          <span>{file.size}</span>
                          <span>{file.lastModified}</span>
                          <span>{file.downloads} downloads</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-3d-primary/20">
                          <th className="text-left py-3 px-4">Name</th>
                          <th className="text-left py-3 px-4">Type</th>
                          <th className="text-left py-3 px-4">Size</th>
                          <th className="text-left py-3 px-4">Last Modified</th>
                          <th className="text-left py-3 px-4">Downloads</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredFiles.map(file => (
                          <tr
                            key={file.id}
                            className="border-b border-3d-primary/10 hover:bg-3d-dark/30"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                {file.type === 'folder' ? (
                                  <Folder className="w-4 h-4 text-3d-primary" />
                                ) : (
                                  <File className="w-4 h-4 text-3d-secondary" />
                                )}
                                <div>
                                  <div className="font-medium">{file.name}</div>
                                  <div className="text-xs text-3d-light/70">{file.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-xs bg-3d-dark/50 px-2 py-1 rounded">
                                {file.category}
                              </span>
                            </td>
                            <td className="py-3 px-4">{file.size}</td>
                            <td className="py-3 px-4">{file.lastModified}</td>
                            <td className="py-3 px-4">{file.downloads}</td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => handleDownload(file.id, file.name)}
                                disabled={isDownloading === file.id}
                                className="p-2 hover:bg-3d-dark/50 rounded"
                              >
                                {isDownloading === file.id ? (
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Download className="w-4 h-4" />
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="glass rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-4 rounded-lg bg-3d-primary/10 hover:bg-3d-primary/20 border border-3d-primary/30 flex items-center space-x-3">
                    <Upload className="w-5 h-5 text-3d-primary" />
                    <div className="text-left">
                      <div className="font-medium">Upload Files</div>
                      <div className="text-sm text-3d-light/70">Add new files to project</div>
                    </div>
                  </button>
                  <button className="p-4 rounded-lg bg-3d-secondary/10 hover:bg-3d-secondary/20 border border-3d-secondary/30 flex items-center space-x-3">
                    <Share2 className="w-5 h-5 text-3d-secondary" />
                    <div className="text-left">
                      <div className="font-medium">Share Project</div>
                      <div className="text-sm text-3d-light/70">Collaborate with team</div>
                    </div>
                  </button>
                  <button className="p-4 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 flex items-center space-x-3">
                    <Archive className="w-5 h-5 text-green-500" />
                    <div className="text-left">
                      <div className="font-medium">Backup Now</div>
                      <div className="text-sm text-3d-light/70">Create system backup</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;