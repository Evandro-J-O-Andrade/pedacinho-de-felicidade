import { useState, useEffect, useCallback, useRef } from "react";

export default function Carrossel3D({ items = [], renderItem, autoPlay = true, interval = 5000 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const dragState = useRef({ active: false, startX: 0, currentX: 0 });
  const wrapperRef = useRef(null);

  const itemCount = items.length;

  const next = useCallback(() => {
    if (itemCount === 0) return;
    setActiveIndex((prev) => (prev + 1) % itemCount);
  }, [itemCount]);

  const prev = useCallback(() => {
    if (itemCount === 0) return;
    setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount);
  }, [itemCount]);

  const goTo = useCallback(
    (index) => {
      if (itemCount === 0) return;
      setActiveIndex(Math.max(0, Math.min(index, itemCount - 1)));
    },
    [itemCount]
  );

  const startDrag = useCallback((clientX) => {
    dragState.current = { active: true, startX: clientX, currentX: clientX, moved: false };
    setIsPaused(true);
  }, []);

  const moveDrag = useCallback((clientX) => {
    if (!dragState.current.active) return;
    const diff = clientX - dragState.current.startX;
    if (Math.abs(diff) > 10) {
      dragState.current.moved = true;
    }
    dragState.current.currentX = clientX;
  }, []);

  const endDrag = useCallback(() => {
    if (!dragState.current.active) return;

    const diff = dragState.current.startX - dragState.current.currentX;
    const threshold = 50;

    if (dragState.current.moved && Math.abs(diff) > threshold) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
    }

    dragState.current.active = false;
    setIsPaused(false);
  }, [next, prev]);

  useEffect(() => {
    if (itemCount === 0 || !autoPlay || isPaused) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, isPaused, itemCount, next]);

  useEffect(() => {
    if (activeIndex >= itemCount && itemCount > 0) {
      setActiveIndex(0);
    }
  }, [activeIndex, itemCount]);

  const getItemClass = (index) => {
    const total = itemCount;
    if (total === 0) return "";

    const diff = (index - activeIndex + total) % total;
    if (diff === 0) return "active";
    if (diff === 1) return "next";
    if (diff === 2) return "next-2";
    if (diff === total - 1) return "prev";
    if (diff === total - 2) return "prev-2";
    return "";
  };

  if (itemCount === 0) {
    return null;
  }

  return (
    <div
      ref={wrapperRef}
      className="carrossel-3d-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        if (e.target instanceof Element && e.target.closest("button, a, input, textarea, select")) return;
        startDrag(e.clientX);
      }}
      onPointerMove={(e) => moveDrag(e.clientX)}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{
        width: "100%",
        background: "linear-gradient(135deg, rgba(255, 182, 193, 0.6) 0%, rgba(255, 218, 221, 0.7) 50%, rgba(255, 240, 245, 0.8) 100%)",
        borderRadius: "20px",
        boxShadow: "0 20px 40px rgba(236, 72, 153, 0.1)",
        padding: "40px 0",
        userSelect: "none",
        touchAction: "pan-y",
        cursor: dragState.current.active ? "grabbing" : "grab",
      }}
    >
      <style>{`
        .carrossel-3d-wrapper {
          position: relative;
        }

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
          transform: translateX(0) translateY(-30px) rotateY(0deg) scale(1.2);
        }

        .carrossel-3d-wrapper .carrossel-3d-item.prev {
          opacity: 0.5;
          z-index: 5;
          transform: translateX(-280px) rotateY(20deg) scale(0.8);
        }

        .carrossel-3d-wrapper .carrossel-3d-item.next {
          opacity: 0.5;
          z-index: 5;
          transform: translateX(280px) rotateY(-20deg) scale(0.8);
        }

        .carrossel-3d-wrapper .carrossel-3d-item.prev-2,
        .carrossel-3d-wrapper .carrossel-3d-item.next-2 {
          opacity: 0.15;
        }

        .carrossel-3d-wrapper .carrossel-3d-item.prev-2 {
          transform: translateX(-360px) rotateY(35deg) scale(0.6);
        }

        .carrossel-3d-wrapper .carrossel-3d-item.next-2 {
          transform: translateX(360px) rotateY(-35deg) scale(0.6);
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
          transition: all 0.3s ease;
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
          .carrossel-3d-wrapper .carrossel-3d-item {
            width: 280px;
            margin-left: -140px;
            margin-top: -200px;
          }

          .carrossel-3d-wrapper .carrossel-3d-item.active {
            transform: translateX(0) translateY(-20px) rotateY(0deg) scale(1.1);
          }

          .carrossel-3d-wrapper .carrossel-3d-item.prev {
            transform: translateX(-120px) rotateY(20deg) scale(0.75);
          }

          .carrossel-3d-wrapper .carrossel-3d-item.next {
            transform: translateX(120px) rotateY(-20deg) scale(0.75);
          }

          .carrossel-3d-wrapper .carrossel-3d-item.prev-2 {
            transform: translateX(-180px) rotateY(35deg) scale(0.5);
          }

          .carrossel-3d-wrapper .carrossel-3d-item.next-2 {
            transform: translateX(180px) rotateY(-35deg) scale(0.5);
          }

          .carrossel-3d-arrow {
            width: 50px;
            height: 50px;
            font-size: 24px;
            bottom: 10px;
          }

          .carrossel-3d-arrow.prev {
            left: 10px;
          }

          .carrossel-3d-arrow.next {
            right: 10px;
          }
        }
      `}</style>

      <div style={{ perspective: "1500px", maxWidth: "1400px", height: "600px", margin: "0 auto", position: "relative", overflow: "visible" }}>
        {items.map((item, index) => (
          <div key={index} className={`carrossel-3d-item ${getItemClass(index)}`}>
            {renderItem(item, index)}
          </div>
        ))}

        <button className="carrossel-3d-arrow prev" onClick={prev} aria-label="Anterior">
          ‹
        </button>
        <button className="carrossel-3d-arrow next" onClick={next} aria-label="Próximo">
          ›
        </button>

        <div className="carrossel-3d-nav">
          {items.map((_, index) => (
            <button
              key={index}
              className={`carrossel-3d-dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => goTo(index)}
              aria-label={`Ver item ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
