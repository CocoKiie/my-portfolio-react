import React from 'react';

function ScrollProgress() {
  const calculateScrollPercentage = () => {
    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");
    if (scrollProgress) {
      const scrollPosition = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      scrollProgress.style.background = `conic-gradient(#DEAFE6 ${Math.round((scrollPosition / totalHeight) * 100)}%, #FCE8FF ${Math.round((scrollPosition / totalHeight) * 100)}%)`;
      progressValue.textContent = `${Math.round((scrollPosition / totalHeight) * 100)}%`;
      return Math.round((scrollPosition / totalHeight) * 100);
    }
  };

  window.addEventListener('DOMContentLoaded', () => {
    // Appeler la fonction pour initialiser la valeur de progress value
    calculateScrollPercentage();

    window.addEventListener('scroll', () => {
      calculateScrollPercentage();
    });

    const scrollTopButton = document.getElementById("progress-value");

    scrollTopButton.addEventListener("click", function () {
      window.scrollTo(0, 0);
    });
  });

  return (
    <>
      <div id="progress" aria-label="Pourcentage de votre position dans la page">
        <span id="progress-value" aria-label="En cliquant sur la valeur vous retournerez en haut de la page">0%</span>
      </div>
    </>
  );
}

export default ScrollProgress;