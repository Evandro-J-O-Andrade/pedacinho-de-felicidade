export default function Hero() {
  return (
    <section id="home" style={{
      minHeight: "100vh",
      backgroundImage: "url('/img/banner.png')",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      display: "flex",
      alignItems: "flex-start"
    }}>
      <style>{`
        @media only screen and (min-width: 350px) and (max-width: 1024px) {
          #home {
            min-height: 50vh !important;
            background-size: cover !important;
            background-repeat: no-repeat !important;
            background-position: center center !important;
            margin-top: 0 !important;
            padding: 0 !important;
          }
        }
        @media only screen and (max-width: 349px) {
          #home {
            min-height: 45vh !important;
            background-size: cover !important;
            background-repeat: no-repeat !important;
            background-position: center center !important;
            margin-top: 0 !important;
            padding: 0 !important;
          }
        }
        @media only screen and (min-width: 1025px) {
          #home {
            margin-top: 0 !important;
            background-size: cover !important;
            background-position: center top !important;
          }
        }
      `}</style>
    </section>
  );
}