import { useTheme } from './ThemeProvider';
import { CiLight } from 'react-icons/ci';
import { RxMoon } from 'react-icons/rx';

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full shadow-lg hover:bg-Red/90 transition duration-300 bottom-5 right-5 fixed"
        >
            {theme === 'light' ? (
                <RxMoon />
            ) : (
                <CiLight />
            )}
        </button>
    );
};

export default ThemeToggleButton;