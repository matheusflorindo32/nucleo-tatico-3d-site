#!/bin/bash

# Núcleo Tático 3D Site - Startup Script
# Version: 1.0.0

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Log functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${CYAN}[STEP]${NC} $1"
}

# Banner
print_banner() {
    echo -e "${CYAN}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                                                              ║"
    echo "║   🎯  NÚCLEO TÁTICO - ADVANCED 3D PLATFORM                  ║"
    echo "║                                                              ║"
    echo "║   ⚡  Secure 3D Dashboard with Project Management           ║"
    echo "║   🚀  Built with React, Three.js, and TypeScript            ║"
    echo "║                                                              ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Check prerequisites
check_prerequisites() {
    log_step "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed. Please install Node.js 18+"
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2)
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1)
    
    if [ $NODE_MAJOR -lt 18 ]; then
        log_error "Node.js version must be 18+. Current: $NODE_VERSION"
        exit 1
    fi
    
    log_success "Node.js $NODE_VERSION detected"
    
    # Check npm/yarn
    if command -v npm &> /dev/null; then
        PACKAGE_MANAGER="npm"
        log_success "npm detected"
    elif command -v yarn &> /dev/null; then
        PACKAGE_MANAGER="yarn"
        log_success "yarn detected"
    else
        log_error "No package manager found. Please install npm or yarn"
        exit 1
    fi
    
    # Check git
    if command -v git &> /dev/null; then
        log_success "git detected"
    else
        log_warning "git not found. GitHub features will be disabled"
    fi
}

# Install dependencies
install_dependencies() {
    log_step "Installing dependencies..."
    
    if [ "$PACKAGE_MANAGER" = "npm" ]; then
        npm install
    else
        yarn install
    fi
    
    if [ $? -eq 0 ]; then
        log_success "Dependencies installed successfully"
    else
        log_error "Failed to install dependencies"
        exit 1
    fi
}

# Check environment
check_environment() {
    log_step "Checking environment..."
    
    # Check for .env file
    if [ ! -f .env ]; then
        log_warning ".env file not found. Creating default..."
        cat > .env << EOF
# Núcleo Tático Environment Variables
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Núcleo Tático
VITE_3D_ENABLED=true
VITE_ANALYTICS_ID=
VITE_JWT_SECRET=your-secret-key-change-in-production
VITE_REFRESH_SECRET=your-refresh-secret-change-in-production
EOF
        log_success "Default .env file created"
    else
        log_success ".env file found"
    fi
    
    # Check public directory
    if [ ! -d "public/fonts" ]; then
        log_warning "Fonts directory not found. Creating..."
        mkdir -p public/fonts
        log_success "Fonts directory created"
    fi
}

# Build project
build_project() {
    log_step "Building project..."
    
    if [ "$PACKAGE_MANAGER" = "npm" ]; then
        npm run build
    else
        yarn build
    fi
    
    if [ $? -eq 0 ]; then
        log_success "Project built successfully"
    else
        log_error "Build failed"
        exit 1
    fi
}

# Start development server
start_dev_server() {
    log_step "Starting development server..."
    
    echo -e "${YELLOW}"
    echo "══════════════════════════════════════════════════════════════"
    echo "   Development Server Starting..."
    echo "   Access: http://localhost:3000"
    echo "   Press Ctrl+C to stop"
    echo "══════════════════════════════════════════════════════════════"
    echo -e "${NC}"
    
    if [ "$PACKAGE_MANAGER" = "npm" ]; then
        npm run dev
    else
        yarn dev
    fi
}

# Initialize git repository
init_git() {
    if ! command -v git &> /dev/null; then
        return
    fi
    
    log_step "Initializing git repository..."
    
    if [ ! -d ".git" ]; then
        git init
        git add .
        git commit -m "Initial commit: Núcleo Tático 3D Platform"
        log_success "Git repository initialized"
    else
        log_success "Git repository already exists"
    fi
}

# Create GitHub repository
create_github_repo() {
    if ! command -v git &> /dev/null; then
        return
    fi
    
    log_step "Setting up GitHub repository..."
    
    read -p "Do you want to create a GitHub repository? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter GitHub username: " GITHUB_USER
        read -p "Enter repository name (default: nucleo-tatico-3d-site): " REPO_NAME
        REPO_NAME=${REPO_NAME:-nucleo-tatico-3d-site}
        
        # Check if remote already exists
        if git remote | grep -q origin; then
            log_warning "Remote 'origin' already exists"
        else
            # Create repository on GitHub
            log_info "Creating repository on GitHub..."
            
            # You would need to set up GitHub CLI or use API here
            # For now, just show instructions
            echo -e "${YELLOW}"
            echo "══════════════════════════════════════════════════════════════"
            echo "   Manual GitHub Setup Required:"
            echo "   1. Go to https://github.com/new"
            echo "   2. Create repository: $REPO_NAME"
            echo "   3. Set as private (recommended)"
            echo "   4. Run these commands:"
            echo ""
            echo "   git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git"
            echo "   git branch -M main"
            echo "   git push -u origin main"
            echo "══════════════════════════════════════════════════════════════"
            echo -e "${NC}"
        fi
    fi
}

# Export project as ZIP
export_project() {
    log_step "Creating project archive..."
    
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    ZIP_NAME="nucleo-tatico-3d-site_$TIMESTAMP.zip"
    
    # Create zip excluding node_modules and build artifacts
    zip -r "$ZIP_NAME" . \
        -x "node_modules/*" \
        -x ".git/*" \
        -x "dist/*" \
        -x "*.log" \
        -x "*.zip"
    
    if [ $? -eq 0 ]; then
        log_success "Project exported to $ZIP_NAME"
        echo -e "${YELLOW}Archive size: $(du -h "$ZIP_NAME" | cut -f1)${NC}"
    else
        log_error "Failed to create archive"
    fi
}

# Show usage
show_usage() {
    echo -e "${CYAN}Usage: $0 [command]${NC}"
    echo ""
    echo "Commands:"
    echo "  start     Start development server (default)"
    echo "  install   Install dependencies only"
    echo "  build     Build project for production"
    echo "  git       Initialize git repository"
    echo "  github    Setup GitHub repository"
    echo "  export    Export project as ZIP"
    echo "  all       Run all setup steps"
    echo "  help      Show this help message"
    echo ""
}

# Main function
main() {
    COMMAND=${1:-start}
    
    case $COMMAND in
        start)
            print_banner
            check_prerequisites
            check_environment
            install_dependencies
            start_dev_server
            ;;
        install)
            print_banner
            check_prerequisites
            install_dependencies
            ;;
        build)
            print_banner
            check_prerequisites
            check_environment
            install_dependencies
            build_project
            ;;
        git)
            print_banner
            init_git
            ;;
        github)
            print_banner
            init_git
            create_github_repo
            ;;
        export)
            print_banner
            export_project
            ;;
        all)
            print_banner
            check_prerequisites
            check_environment
            install_dependencies
            init_git
            build_project
            export_project
            ;;
        help)
            show_usage
            ;;
        *)
            log_error "Unknown command: $COMMAND"
            show_usage
            exit 1
            ;;
    esac
}

# Run main function
main "$@"