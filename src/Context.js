import React from 'react';
export const ThemeContext = React.createContext({
    themeColor: 'blue',
});
ThemeContext.displayName = 'themeColor';
export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;
