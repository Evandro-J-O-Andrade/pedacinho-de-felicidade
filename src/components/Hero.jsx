export default function Hero() {
  return (
    <section style={{
      minHeight: "100vh",
      backgroundImage: "url('/img/banner.png')",
      backgroundSize: "cover",
      backgroundPosition: "center top",
      marginTop: "100px",
      paddingTop: "0px"
    }}>
      <div style={{
        backgroundColor: "rgba(255,255,255,0.95)",
        padding: "30px 40px",
        borderRadius: "20px",
        maxWidth: "450px",
        marginLeft: "40px",
        position: "absolute",
        bottom: "120px"
      }}>
        <h2 style={{ fontSize: "32px", fontWeight: "bold", color: "#ec4899" }}>
          Pedacinho de Felicidade
        </h2>
        <p style={{ marginTop: "8px", color: "#666", fontSize: "16px" }}>
          Sua festa a um passo de ser conto de fadas ✨
        </p>
      </div>
    </section>
  );
}