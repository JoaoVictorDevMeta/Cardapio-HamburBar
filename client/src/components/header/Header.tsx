import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const {currentUser} = useSelector((state:any) => state.user);

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
        <Link
            style={{
            color: "black",
            textDecoration: "none",
            }}
            to="/"
        >
            <h1
                style={{
                    fontSize: "48px",
                    fontWeight: "900",
                }}
            >HamburBar</h1>
      </Link>
      {currentUser ?( 
        <Link to='/profile' style={{ color: "black", textDecoration: "none",}}>
          <h2>Logado como {currentUser.name}</h2>
        </Link>
      ) : null}
    </header>
  )
}

export default Header