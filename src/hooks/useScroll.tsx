import { createContext, useState, useEffect } from "react";

export default function useScrollListener() {
  const [data, setData] = useState({
    y: 0,
    lastY: 0
  });

  // set up event listeners
  useEffect(() => {
    const handleScroll = () => {
      setData((last) => {
        return {
          y: window.scrollY,
          lastY: last.y
        };
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return data;
}

export const ScrollContext = createContext(null);
