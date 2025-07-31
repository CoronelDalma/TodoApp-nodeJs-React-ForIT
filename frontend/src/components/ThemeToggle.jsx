import { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ThemeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    }

    useEffect(() => {
        const theme = isDarkMode ? 'dark' : 'light';
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [isDarkMode]);

    return (
        <button onClick={toggleTheme}>
        <FontAwesomeIcon icon={isDarkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon'} />
        </button>
    );
}

export default ThemeToggle;
