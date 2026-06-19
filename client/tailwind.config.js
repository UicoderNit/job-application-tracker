export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111827',
        muted: '#64748b',
        paper: '#f4f7fb',
        brand: '#0f766e',
        accent: '#f59e0b',
        coral: '#e11d48'
      },
      boxShadow: {
        soft: '0 18px 50px rgba(15, 23, 42, 0.10)',
        glow: '0 20px 60px rgba(15, 118, 110, 0.18)'
      }
    }
  },
  plugins: []
};
