import { Link } from "react-router-dom"

import "../../styles/css/error/style.css"

function ErrorPage() {
  return (
    <div className="error-conteneur">
      <h1>404</h1>
      <p>Cette page n'éxiste pas.</p>
      <Link to="/">Revenir à l'acceuil</Link>
    </div>
  )
}

export default ErrorPage
