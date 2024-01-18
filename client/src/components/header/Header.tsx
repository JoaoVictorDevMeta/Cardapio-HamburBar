function Header() {
  return (
    <header
        style={{
        height: "13vh",
        width: "100%",
        padding: "20px 90px 0px",
        display: "flex",
        justifyContent: "space-between",
        }}
    >
        <a 
            style={{
            color: "black",
            textDecoration: "none",
            }}
            href="/"
        >
            <h1
                style={{
                    fontSize: "48px",
                    fontWeight: "900",
                }}
            >HamburBar</h1>
      </a>
      <h2>Logado como</h2>
    </header>
  )
}

export default Header