import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
/* eslint-disable no-unused-vars */

function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const navigate = useNavigate();

  const calculateScrollPercentage = () => {
    const scrollPosition = window.scrollY;
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const percentage = Math.round((scrollPosition / totalHeight) * 100);
    setScrollPercentage(percentage);
  };

  useEffect(() => {
    calculateScrollPercentage();

    const handleScroll = () => {
      calculateScrollPercentage();
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <motion.span
      id="progress-value"
      aria-label={`En cliquant sur la valeur vous retournerez en haut de la page, ${scrollPercentage}%`}
      style={{
        background: `conic-gradient(#DEAFE6 ${scrollPercentage}%, #FCE8FF ${scrollPercentage}%)`
      }}
      onClick={handleScrollToTop}
      role="button"
      tabIndex={0}
    >
      <span>{`${scrollPercentage}%`}</span>
    </motion.span>
  );
}

export default ScrollProgress;
