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
      backgroundRepeat: "no-repeat"
    }}>
      <style>{`
        #home {
          width: 100%;
          overflow-x: hidden;
        }
        @media only screen and (max-width: 1024px) {
          #home {
            min-height: 50vh !important;
            background-size: cover !important;
            background-position: center center !important;
            margin-top: 175px !important;
          }
        }
        @media only screen and (min-width: 1025px) {
          #home {
            margin-top: 185px !important;
          }
        }
      `}</style>
    </section>
  );
}