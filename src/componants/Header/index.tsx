import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import logo from "../../assets/images/argentBankLogo.webp"
import { useDispatch, useSelector, UseSelector } from "react-redux"

import "../../styles/css/header/style.css"
import { RootState } from "../../state/store"

function Header() {
  const signedin = useSelector((state: RootState) => state.signed.value)
  const dispatch = useDispatch()

  return (
    <div className="header-conteneur">
      <div className="logo-conteneur">
        <Link to="/">
          <img src={logo} alt="logo de l'entreprise Argent Bank" />
        </Link>
      </div>
      <nav>
        <div className={"sign-in-conteneur"}>
          {signedin ? (
            <Link to="/user" className="header-dashboard">
              <FontAwesomeIcon icon={faCircleUser} />
              Dashboard
            </Link>
          ) : (
            <Link to="/sign-in" className="header-sign-in">
              <FontAwesomeIcon icon={faCircleUser} />
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Header
