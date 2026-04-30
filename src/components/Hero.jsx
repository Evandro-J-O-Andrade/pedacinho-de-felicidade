import { useState, useEffect } from "react";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="home" style={{
      minHeight: "100vh",
      backgroundImage: "url('/img/banner.png')",
      backgroundSize: "cover",
      backgroundPosition: "center top",
      backgroundRepeat: "no-repeat",
      width: "100%",
      overflow: "hidden"
    }}>
      <style>{`
        #home {
          width: 100%;
          overflow-x: hidden;
        }
        @media only screen and (max-width: 1024px) {
          #home {
            min-height: 0 !important;
            height: auto !important;
            aspect-ratio: 1688 / 709;
            background-size: contain !important;
            background-position: center top !important;
            margin-top: 175px !important;
            overflow: hidden !important;
          }
        }
        @media only screen and (min-width: 1025px) {
          #home {
            margin-top: 185px !important;
            overflow: hidden !important;
          }
        }
      `}</style>
    </section>
  );
}
