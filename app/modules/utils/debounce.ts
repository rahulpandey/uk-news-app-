import React, { useState, useEffect } from "react";

const useDebounce = (func: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(func);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(func);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [func]);

  return debouncedValue;
};
export default useDebounce;
