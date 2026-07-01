import { useThemeContext } from '../context/ThemeContext';

export const useTheme = () => {
  const context = useThemeContext();
  return context;
};

export default useTheme;