import React, { createContext, useContext, useEffect, useState } from 'react';

interface themeContextValue {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext<themeContextValue>({
    theme: 'light',
    toggleTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        // Get theme from localStorage if available, default to 'light'
        const storedTheme = localStorage.getItem('theme');
        return storedTheme ? (storedTheme === 'dark' ? 'dark' : 'light') : 'light';
    });

    const toggleTheme = async () => {
        const body = document.body;
        const isDarkClass = body.classList.contains('dark');

        if (isDarkClass) {
            body.classList.remove('dark');
            setTheme('light');
            localStorage.setItem('theme', 'light'); // Save light theme to localStorage
        } else {
            body.classList.add('dark');
            setTheme('dark');
            localStorage.setItem('theme', 'dark'); // Save dark theme to localStorage
        }
    };

    useEffect(() => {
        // Update body class based on theme state
        document.body.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };

const useTheme = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return { theme, toggleTheme };
};

export default useTheme;
