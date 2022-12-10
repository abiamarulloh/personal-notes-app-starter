import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeConsumer } from '../../../contexts/ToggleTheme';
import './index.css';

function ToggleTheme() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return <button onClick={toggleTheme}>{theme === 'light' ? <FaMoon /> : <FaSun />}</button>;
      }}
    </ThemeConsumer>
  );
}

export default ToggleTheme;
