import { useState, useEffect, useCallback, useRef } from "react";

export default function Carrossel3D({ items, renderItem, autoPlay = true, interval = 5000 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const carrosselRef = useRef(null);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goTo = (index) => setActiveIndex(index);

  // Funções para drag/touch
  const handleStart = useCallback((clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
    setIsPaused(true);
  }, []);

  const handleMove = useCallback((clientX) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  }, [isDragging]);

  const handleEnd = useCallback(() => {
    if (!isDragging) return;
    const diff = startX - currentX;
    const threshold = 50; // pixels para considerar swipe

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }
    setIsDragging(false);
    setIsPaused(false);
  }, [isDragging, startX, currentX, next, prev]);

  // Touch events
  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Mouse events
  const handleMouseDown = (e) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd();
    }
  };

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
      ref={carrosselRef}
      className="carrossel-3d-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => { setIsPaused(false); handleMouseLeave(); }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{ 
        width: "100%", 
        background: "linear-gradient(135deg, rgba(255, 182, 193, 0.6) 0%, rgba(255, 218, 221, 0.7) 50%, rgba(255, 240, 245, 0.8) 100%)",
        borderRadius: "20px",
        boxShadow: "0 20px 40px rgba(236, 72, 153, 0.1)",
        padding: "40px 0",
        userSelect: "none",
        touchAction: "pan-y",
        cursor: isDragging ? "grabbing" : "grab"
      }}
    >
      <style>{`
        .carrossel-3d-wrapper .carrossel-3d-item {
          position: absolute;
          width: 450px;
          left: 50%;
          top: 50%;
          margin-left: -225px;
          margin-top: -240px;
          transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
          opacity: 0;
          pointer-events: none;
          transform-style: preserve-3d;
        }
        .carrossel-3d-wrapper .carrossel-3d-item.active {
          opacity: 1;
          pointer-events: auto;
          z-index: 15;
          transform: translateX(0) translateY(-30px) rotateY(0deg) scale(1.2) !important;
        }
        .carrossel-3d-wrapper .carrossel-3d-item.prev {
          opacity: 0.5;
          z-index: 5;
          transform: translateX(-280px) rotateY(20deg) scale(0.8) !important;
        }
        .carrossel-3d-wrapper .carrossel-3d-item.next {
          opacity: 0.5;
          z-index: 5;
          transform: translateX(280px) rotateY(-20deg) scale(0.8) !important;
        }
        .carrossel-3d-wrapper .carrossel-3d-item.prev-2 {
          opacity: 0.15;
          transform: translateX(-360px) rotateY(35deg) scale(0.6) !important;
        }
        .carrossel-3d-wrapper .carrossel-3d-item.next-2 {
          opacity: 0.15;
          transform: translateX(360px) rotateY(-35deg) scale(0.6) !important;
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
          bottom: 20px;
          transform: translateY(0);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #ec4899;
          color: #ec4899;
          font-size: 32px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
          box-shadow: 0 4px 20px rgba(236, 72, 153, 0.3);
        }
        .carrossel-3d-arrow:hover {
          background: #ec4899;
          color: #fff;
          transform: scale(1.1);
        }
        .carrossel-3d-arrow.prev {
          left: 20px;
        }
        .carrossel-3d-arrow.next {
          right: 20px;
        }
        @media (max-width: 768px) {
          .carrossel-3d-wrapper .carrossel-3d-item { width: 280px !important; margin-left: -140px; margin-top: -200px; }
          .carrossel-3d-wrapper .carrossel-3d-item.active { transform: translateX(0) translateY(-20px) rotateY(0deg) scale(1.1) !important; }
          .carrossel-3d-wrapper .carrossel-3d-item.prev { transform: translateX(-120px) rotateY(20deg) scale(0.75) !important; }
          .carrossel-3d-wrapper .carrossel-3d-item.next { transform: translateX(120px) rotateY(-20deg) scale(0.75) !important; }
          .carrossel-3d-wrapper .carrossel-3d-item.prev-2 { transform: translateX(-180px) rotateY(35deg) scale(0.5) !important; }
          .carrossel-3d-wrapper .carrossel-3d-item.next-2 { transform: translateX(180px) rotateY(-35deg) scale(0.5) !important; }
          .carrossel-3d-arrow { width: 50px; height: 50px; font-size: 24px; bottom: 10px; }
          .carrossel-3d-arrow.prev { left: 10px !important; }
          .carrossel-3d-arrow.next { right: 10px !important; }
        }
      `}</style>

      <div style={{ perspective: "1500px", maxWidth: "1400px", height: "600px", margin: "0 auto", position: "relative", overflow: "visible" }}>
        {items.map((item, index) => (
          <div 
            key={index} 
            className={`carrossel-3d-item ${getItemClass(index)}`}
            style={{ width: "380px" }}
          >
            {renderItem(item, index)}
          </div>
        ))}

        {/* Navigation Arrows */}
        <button 
          className="carrossel-3d-arrow prev" 
          onClick={prev}
          aria-label="Anterior"
        >
          ‹
        </button>
        <button 
          className="carrossel-3d-arrow next" 
          onClick={next}
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
    </div>
  );
}
