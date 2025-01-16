import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import logo from "../../assets/images/argentBankLogo.webp"

import "../../styles/css/header/style.css"

function Header() {
  return (
    <div className="header-conteneur">
      <div className="logo-conteneur">
        <Link to="/">
          <img src={logo} alt="logo de l'entreprise Argent Bank" />{" "}
        </Link>
      </div>
      <nav>
        <div className="sign-in-conteneur">
          <Link to="/sign-in" className="header-sign-in">
            <FontAwesomeIcon icon={faCircleUser} />
            Sign In
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Header
