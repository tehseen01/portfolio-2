/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: 'hsla(var(--background))',
                foreground: 'hsla(var(--foreground))',
                primary: 'hsla(var(--primary))',
                border: 'hsla(var(--border))',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                bebas: ['Bebas Neue', 'sans-serif'],
            },
            animation: {
                scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
            },
            keyframes: {
                scroll: {
                    from: {
                        transform: 'translateX(0)',
                    },
                    to: {
                        transform: 'translateX(-100%)',
                    },
                },
            },
        },
    },
    plugins: [],
};
