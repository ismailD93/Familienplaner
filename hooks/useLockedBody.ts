import { useEffect } from "react";

const useLockBodyScroll = (locked: boolean, positionTop?: boolean) => {
  useEffect(() => {
    const enable = () => {
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("position");
      document.body.style.removeProperty("top");
      document.body.style.removeProperty("width");
    };

    // Prevent scrolling
    const disable = () => {
      document.body.style.overflow = "hidden";
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      positionTop && (document.body.style.position = "fixed");
      document.body.style.width = "100%";
    };

    if (locked) {
      disable();
    } else {
      enable();
    }

    // Re-enable scrolling when component unmounts
    return () => {
      enable();
    };
  }, [locked]);
};

export default useLockBodyScroll;
