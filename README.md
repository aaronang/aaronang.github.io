# Aaron Ang - Personal Website

A modern personal website built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

- **React 19** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for modern, responsive styling
- **GitHub Pages** deployment ready
- **Automatic CI/CD** with GitHub Actions

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/aaronang/aaronang.github.io.git
cd aaronang.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages (manual)

## 🌐 Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

1. Push your changes to the `main` branch
2. GitHub Actions will automatically build and deploy to GitHub Pages
3. Your site will be available at `https://aaronang.github.io`

### Manual Deployment

If you prefer manual deployment:

```bash
npm run deploy
```

### GitHub Pages Setup

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the sidebar
3. Set source to "GitHub Actions"
4. Ensure the repository is public (required for free GitHub Pages)

## 📁 Project Structure

```
aaronang.github.io/
├── .github/workflows/    # GitHub Actions workflows
├── public/              # Static assets
├── src/                 # Source code
│   ├── App.tsx         # Main App component
│   ├── index.css       # Global styles with Tailwind
│   └── main.tsx        # App entry point
├── vite.config.ts      # Vite configuration
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration is set up in `vite.config.ts` and imported in `src/index.css`.

## 🔧 Configuration

- **Base URL**: Configured for GitHub Pages at `/aaronang.github.io/`
- **Build Output**: `dist/` directory
- **TypeScript**: Strict mode enabled

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

Built with ❤️ using React, TypeScript, Vite, and Tailwind CSS
