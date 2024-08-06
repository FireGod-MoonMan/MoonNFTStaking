import {useState, useEffect} from "react";
import { LightModeOutlined } from '@mui/icons-material';
import {
    circleBtnStyle
} from './ThemeStyle'
const ThemeButton = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Load theme preference from localStorage on component mount
    useEffect(() => {
        const storedTheme = localStorage.getItem('color-theme');
        if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
        setIsDarkMode(!isDarkMode);
    };
    return (
        <div className="fixed bottom-10 left-1 z-[100] hidden">
            <button id="themeButton" onClick={() => toggleTheme()} 
                className={`${circleBtnStyle(46)}`}
                aria-expanded="false" data-headlessui-state="" type="button">
                <LightModeOutlined />
            </button>
        </div>
    )
}

export default ThemeButton