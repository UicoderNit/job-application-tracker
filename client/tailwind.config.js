export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17202a',
        muted: '#64748b',
        paper: '#f7f8fb',
        brand: '#0f766e',
        accent: '#d97706'
      },
      boxShadow: {
        soft: '0 14px 40px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};
