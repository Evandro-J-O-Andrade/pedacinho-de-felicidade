import { useState, useEffect, useCallback } from "react";

export default function Carrossel3D({ items, renderItem, autoPlay = true, interval = 5000 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goTo = (index) => setActiveIndex(index);

  useEffect(() => {
    if (!autoPlay || isPaused || items.length === 0) return;
    
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, isPaused, items.length, next]);

  const getItemClass = (index) => {
    const diff = index - activeIndex;
    const total = items.length;
    
    if (diff === 0) return "active";
    if (diff === -1 || diff === total - 1) return "prev";
    if (diff === 1 || diff === -total + 1) return "next";
    if (diff === -2 || diff === total - 2) return "prev-2";
    if (diff === 2 || diff === -total + 2) return "next-2";
    return "";
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div 
      className="carrossel-3d-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ 
        perspective: "1500px", 
        width: "100%", 
        maxWidth: "1100px", 
        height: "480px", 
        margin: "0 auto", 
        position: "relative",
        overflow: "visible"
      }}
    >
      <style>{`
        .carrossel-3d-wrapper .carrossel-3d-item {
          position: absolute;
          width: 350px;
          left: 50%;
          top: 50%;
          margin-left: -175px;
          margin-top: -200px;
          transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
          opacity: 0;
          pointer-events: none;
          transform-style: preserve-3d;
        }
        .carrossel-3d-wrapper .carrossel-3d-item.active {
          opacity: 1;
          pointer-events: auto;
          z-index: 10;
          transform: translateX(0) rotateY(0deg) !important;
        }
        .carrossel-3d-wrapper .carrossel-3d-item.prev {
          opacity: 0.5;
          z-index: 5;
          transform: translateX(-150px) rotateY(15deg) scale(0.85) !important;
        }
        .carrossel-3d-wrapper .carrossel-3d-item.next {
          opacity: 0.5;
          z-index: 5;
          transform: translateX(150px) rotateY(-15deg) scale(0.85) !important;
        }
        .carrossel-3d-wrapper .carrossel-3d-item.prev-2 {
          opacity: 0.15;
          transform: translateX(-200px) rotateY(30deg) scale(0.7) !important;
        }
        .carrossel-3d-wrapper .carrossel-3d-item.next-2 {
          opacity: 0.15;
          transform: translateX(200px) rotateY(-30deg) scale(0.7) !important;
        }
        .carrossel-3d-nav {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 20;
        }
        .carrossel-3d-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #e5e7eb;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
          padding: 0;
        }
        .carrossel-3d-dot.active {
          background: #ec4899;
          transform: scale(1.4);
        }
        .carrossel-3d-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #ec4899;
          color: #ec4899;
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
          box-shadow: 0 4px 15px rgba(236, 72, 153, 0.2);
        }
        .carrossel-3d-arrow:hover {
          background: #ec4899;
          color: #fff;
          transform: translateY(-50%) scale(1.1);
        }
        @media (max-width: 768px) {
          .carrossel-3d-wrapper .carrossel-3d-item { width: 200px !important; margin-left: -100px; }
          .carrossel-3d-wrapper .carrossel-3d-item.prev { transform: translateX(-60px) rotateY(15deg) scale(0.8) !important; }
          .carrossel-3d-wrapper .carrossel-3d-item.next { transform: translateX(60px) rotateY(-15deg) scale(0.8) !important; }
          .carrossel-3d-arrow { width: 40px; height: 40px; font-size: 20px; }
          .carrossel-3d-arrow.prev { left: 5px !important; }
          .carrossel-3d-arrow.next { right: 5px !important; }
        }
      `}</style>

      {items.map((item, index) => (
        <div 
          key={index} 
          className={`carrossel-3d-item ${getItemClass(index)}`}
          style={{ width: "280px" }}
        >
          {renderItem(item, index)}
        </div>
      ))}

      {/* Navigation Arrows */}
      <button 
        className="carrossel-3d-arrow prev" 
        onClick={prev}
        style={{ left: "-70px" }}
        aria-label="Anterior"
      >
        ‹
      </button>
      <button 
        className="carrossel-3d-arrow next" 
        onClick={next}
        style={{ right: "-70px" }}
        aria-label="Próximo"
      >
        ›
      </button>

      {/* Dots Navigation */}
      <div className="carrossel-3d-nav">
        {items.map((_, index) => (
          <button
            key={index}
            className={`carrossel-3d-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => goTo(index)}
            aria-label={`Ver item ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}