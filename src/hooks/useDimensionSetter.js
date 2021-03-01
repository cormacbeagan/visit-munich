import { useState, useEffect } from 'react';

export const useDimensionSetter = () => {
  const [dimensions, setDimensions] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const debouncedResizeHandle = debounce(() => {
      setDimensions([window.innerWidth, window.innerHeight]);
    }, 100);
    window.addEventListener('resize', debouncedResizeHandle);
    return () => window.removeEventListener('resize', debouncedResizeHandle);
  }, []);
  return dimensions;
};
function debounce(func, ms) {
  let timer;
  return _ => {
    clearTimeout(timer);
    timer = setTimeout(_ => {
      timer = null;
      func.apply(this, arguments);
    }, ms);
  };
}

// Credits: https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
