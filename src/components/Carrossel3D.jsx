import { useState, useEffect, useCallback, useRef } from "react";
import "./Carrossel3D.css";

export default function Carrossel3D({ items = [], renderItem, autoPlay = true, interval = 5000 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        prev();
      } else if (event.key === "ArrowRight") {
        next();
      }
    },
    [next, prev]
  );

  useEffect(() => {
    if (itemCount === 0 || !autoPlay || isPaused || isFocused) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, isPaused, isFocused, itemCount, next]);

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
      className={`carrossel-3d-wrapper ${dragState.current.active ? "carrossel-3d-grabbing" : ""}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Carrossel de imagens"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
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
        cursor: dragState.current.active ? "grabbing" : "grab",
        outline: "none"
      }}
    >

      <div style={{ perspective: "1500px", maxWidth: "1400px", height: "600px", margin: "0 auto", position: "relative", overflow: "visible" }}>
        <div className="sr-only" aria-live="polite">Slide {activeIndex + 1} de {itemCount}</div>
        {items.map((item, index) => (
          <div key={index} className={`carrossel-3d-item ${getItemClass(index)}`}>
            {renderItem(item, index)}
          </div>
        ))}

        <button type="button" className="carrossel-3d-arrow prev" onClick={prev} aria-label="Anterior">
          ‹
        </button>
        <button type="button" className="carrossel-3d-arrow next" onClick={next} aria-label="Próximo">
          ›
        </button>

        <div className="carrossel-3d-nav" role="tablist" aria-label="Navegação do carrossel">
          {items.map((_, index) => (
            <button
              type="button"
              key={index}
              className={`carrossel-3d-dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => goTo(index)}
              aria-label={`Ver item ${index + 1}`}
              aria-pressed={index === activeIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
