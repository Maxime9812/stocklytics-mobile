import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { Appearance } from 'react-native';

type ThemeContextType = {
  theme: 'light' | 'dark' | null | undefined;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: Appearance.getColorScheme(),
});

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    Appearance.addChangeListener((a) => {
      setTheme(a.colorScheme);
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
}
