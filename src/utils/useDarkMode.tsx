import { useState, useEffect } from 'react';

function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    // Create a media query listener for dark mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Define a handler that updates the state based on the media query
    const handleChange = (event) => setIsDarkMode(event.matches);

    // Add event listener for media query changes
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup event listener on component unmount
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isDarkMode;
}

export default useDarkMode;
