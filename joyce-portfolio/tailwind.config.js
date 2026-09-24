/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* Base — obsidian with a violet cast, so the accents sit in the same family */
        void: '#05040E',
        abyss: '#08071A',
        panel: '#0C0A20',
        elevated: '#13102E',
        line: '#1F1940',

        /* Iridescent ramp: cool to warm, travelling the long way round the wheel */
        mint: '#4FF3C8',
        iris: '#6E5BFF',
        rose: '#FF5F9E',
        solar: '#FFBE4D',

        ink: '#EDEAFF',
        mute: '#8A85B8',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -12px rgba(79, 243, 200, 0.5)',
        'glow-iris': '0 0 60px -16px rgba(110, 91, 255, 0.65)',
        panel: '0 28px 70px -34px rgba(0, 0, 0, 0.95)',
        lift: '0 40px 90px -45px rgba(110, 91, 255, 0.75)',
      },
      backgroundImage: {
        'holo': 'linear-gradient(115deg, #4FF3C8 0%, #6E5BFF 46%, #FF5F9E 74%, #FFBE4D 100%)',
        'holo-soft': 'linear-gradient(115deg, rgba(79,243,200,0.9), rgba(110,91,255,0.9) 50%, rgba(255,190,77,0.9))',
        'panel-sheen': 'linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0) 55%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(6%, -8%, 0) scale(1.14)' },
          '66%': { transform: 'translate3d(-7%, 6%, 0) scale(0.92)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        /* Drives the animated conic border on featured panels */
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'scan-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
        'flow-dash': {
          to: { strokeDashoffset: '-1000' },
        },
        'holo-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        drift: 'drift 24s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        'spin-slow': 'spin-slow 6s linear infinite',
        'pulse-ring': 'pulse-ring 2.6s cubic-bezier(0.22,1,0.36,1) infinite',
        'scan-down': 'scan-down 5s ease-in-out infinite',
        'flow-dash': 'flow-dash 14s linear infinite',
        'holo-shift': 'holo-shift 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
