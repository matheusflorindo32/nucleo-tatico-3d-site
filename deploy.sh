#!/bin/bash

# Núcleo Tático 3D Site - Deployment Script
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
    echo "║   🚀  NÚCLEO TÁTICO - DEPLOYMENT                            ║"
    echo "║                                                              ║"
    echo "║   Deploy to GitHub Pages, Vercel, or Netlify                ║"
    echo "║                                                              ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Check prerequisites
check_prerequisites() {
    log_step "Checking deployment prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed"
        exit 1
    fi
    
    # Check git
    if ! command -v git &> /dev/null; then
        log_error "git is not installed"
        exit 1
    fi
    
    # Check if in git repository
    if [ ! -d ".git" ]; then
        log_error "Not a git repository. Run './start.sh git' first"
        exit 1
    fi
    
    log_success "All prerequisites met"
}

# Build for production
build_for_production() {
    log_step "Building for production..."
    
    # Clean previous build
    if [ -d "dist" ]; then
        rm -rf dist
        log_info "Cleaned previous build"
    fi
    
    # Build project
    if command -v npm &> /dev/null; then
        npm run build
    elif command -v yarn &> /dev/null; then
        yarn build
    else
        log_error "No package manager found"
        exit 1
    fi
    
    if [ $? -eq 0 ]; then
        log_success "Build completed successfully"
        echo -e "${YELLOW}Build size: $(du -sh dist | cut -f1)${NC}"
    else
        log_error "Build failed"
        exit 1
    fi
}

# Deploy to GitHub Pages
deploy_github_pages() {
    log_step "Deploying to GitHub Pages..."
    
    # Check if gh-pages branch exists
    if git branch | grep -q "gh-pages"; then
        log_info "gh-pages branch exists"
    else
        log_info "Creating gh-pages branch"
        git checkout --orphan gh-pages
        git rm -rf .
        git commit --allow-empty -m "Initial gh-pages commit"
        git push origin gh-pages
        git checkout main
    fi
    
    # Install gh-pages if not present
    if command -v npm &> /dev/null; then
        if ! npm list gh-pages &> /dev/null; then
            log_info "Installing gh-pages..."
            npm install --save-dev gh-pages
        fi
    fi
    
    # Add deploy script to package.json if not present
    if ! grep -q "deploy" package.json; then
        log_info "Adding deploy script to package.json..."
        
        # Use a temporary file for JSON manipulation
        cat > package.json.tmp << 'EOF'
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
EOF
        # Merge with existing package.json (simplified)
        # In production, use jq or similar tool
        log_warning "Please add 'deploy' script manually to package.json:"
        echo -e "${YELLOW}  \"deploy\": \"gh-pages -d dist\"${NC}"
    fi
    
    # Deploy
    if command -v npm &> /dev/null; then
        npm run deploy
    elif command -v yarn &> /dev/null; then
        yarn deploy
    fi
    
    if [ $? -eq 0 ]; then
        log_success "Deployed to GitHub Pages!"
        echo -e "${YELLOW}"
        echo "══════════════════════════════════════════════════════════════"
        echo "   Your site is live at:"
        echo "   https://[your-username].github.io/[repository-name]/"
        echo "══════════════════════════════════════════════════════════════"
        echo -e "${NC}"
    else
        log_error "GitHub Pages deployment failed"
    fi
}

# Deploy to Vercel
deploy_vercel() {
    log_step "Deploying to Vercel..."
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        log_info "Installing Vercel CLI..."
        if command -v npm &> /dev/null; then
            npm install -g vercel
        else
            log_error "npm not found. Install Vercel CLI manually: npm i -g vercel"
            exit 1
        fi
    fi
    
    # Deploy
    vercel --prod
    
    if [ $? -eq 0 ]; then
        log_success "Deployed to Vercel!"
    else
        log_error "Vercel deployment failed"
    fi
}

# Deploy to Netlify
deploy_netlify() {
    log_step "Deploying to Netlify..."
    
    # Check if Netlify CLI is installed
    if ! command -v netlify &> /dev/null; then
        log_info "Installing Netlify CLI..."
        if command -v npm &> /dev/null; then
            npm install -g netlify-cli
        else
            log_error "npm not found. Install Netlify CLI manually: npm i -g netlify-cli"
            exit 1
        fi
    fi
    
    # Deploy
    netlify deploy --prod
    
    if [ $? -eq 0 ]; then
        log_success "Deployed to Netlify!"
    else
        log_error "Netlify deployment failed"
    fi
}

# Create deployment package
create_deployment_package() {
    log_step "Creating deployment package..."
    
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    DEPLOY_DIR="deploy_$TIMESTAMP"
    ZIP_NAME="nucleo-tatico-deploy_$TIMESTAMP.zip"
    
    # Create deployment directory
    mkdir -p "$DEPLOY_DIR"
    
    # Copy necessary files
    cp -r dist/* "$DEPLOY_DIR/"
    cp README.md "$DEPLOY_DIR/"
    cp package.json "$DEPLOY_DIR/"
    
    # Create deployment instructions
    cat > "$DEPLOY_DIR/DEPLOYMENT.md" << 'EOF'
# Núcleo Tático - Deployment Instructions

## 📦 Deployment Package Contents

This package contains the built version of the Núcleo Tático 3D Platform.

### Files Included:
- `index.html` - Main entry point
- `assets/` - Compiled JavaScript, CSS, and assets
- `README.md` - Project documentation
- `package.json` - Dependencies (for reference)

## 🚀 Quick Deployment

### Option 1: Static Hosting (Recommended)
1. Upload ALL files to your web hosting service
2. Ensure the server is configured for SPA (Single Page Application)
3. Access via your domain

### Option 2: Docker Deployment
```bash
# Create Dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Build and run
docker build -t nucleo-tatico .
docker run -p 8080:80 nucleo-tatico
```

### Option 3: Manual Server
1. Install Node.js 18+
2. Install serve: `npm install -g serve`
3. Run: `serve -s . -p 3000`

## 🔧 Configuration

### Environment Variables
Set these in your hosting platform:

```env
VITE_API_URL=https://your-api-url.com
VITE_APP_NAME=Núcleo Tático
VITE_3D_ENABLED=true
```

### CORS Configuration
If using a separate API, ensure CORS is configured:
- Allow origins: your deployment domain
- Allow methods: GET, POST, PUT, DELETE
- Allow headers: Content-Type, Authorization

## 📞 Support

For deployment issues, contact:
- Email: support@nucleotatico.com
- GitHub: https://github.com/yourusername/nucleo-tatico-3d-site

---

**Built with ❤️ by Núcleo Tático Team**
EOF
    
    # Create ZIP
    cd "$DEPLOY_DIR"
    zip -r "../$ZIP_NAME" .
    cd ..
    
    # Cleanup
    rm -rf "$DEPLOY_DIR"
    
    log_success "Deployment package created: $ZIP_NAME"
    echo -e "${YELLOW}Package size: $(du -h "$ZIP_NAME" | cut -f1)${NC}"
}

# Show usage
show_usage() {
    echo -e "${CYAN}Usage: $0 [platform]${NC}"
    echo ""
    echo "Platforms:"
    echo "  github    Deploy to GitHub Pages (requires gh-pages)"
    echo "  vercel    Deploy to Vercel (requires Vercel CLI)"
    echo "  netlify   Deploy to Netlify (requires Netlify CLI)"
    echo "  package   Create deployment package only"
    echo "  all       Build and create package"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 github    # Deploy to GitHub Pages"
    echo "  $0 package   # Create deployment ZIP"
    echo ""
}

# Main function
main() {
    PLATFORM=${1:-all}
    
    print_banner
    check_prerequisites
    
    case $PLATFORM in
        github)
            build_for_production
            deploy_github_pages
            ;;
        vercel)
            build_for_production
            deploy_vercel
            ;;
        netlify)
            build_for_production
            deploy_netlify
            ;;
        package)
            build_for_production
            create_deployment_package
            ;;
        all)
            build_for_production
            create_deployment_package
            ;;
        help)
            show_usage
            ;;
        *)
            log_error "Unknown platform: $PLATFORM"
            show_usage
            exit 1
            ;;
    esac
}

# Run main function
main "$@"