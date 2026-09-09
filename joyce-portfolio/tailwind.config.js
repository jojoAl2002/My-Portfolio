/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#080B14',
        panel: '#0E1424',
        line: '#1D2740',
        signal: '#4FE0D8',
        pulse: '#8E7CFF',
        ink: '#E7ECF7',
        mute: '#7C8AAD',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
