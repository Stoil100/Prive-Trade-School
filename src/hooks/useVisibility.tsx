import React, { useEffect, useState, forwardRef, RefObject, MutableRefObject } from "react";

const useVisibility =(
  refCurrent:HTMLElement
)=> {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });

    if (refCurrent) {
      observer.observe(refCurrent);
    }

    return () => {
      observer.disconnect();
    };
  }, [refCurrent]);

  return isIntersecting;
};

export default useVisibility;
