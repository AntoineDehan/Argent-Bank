import Collapse from "../../componants/Collapse"
import { useSelector } from "react-redux"
import { RootState } from "../../state/store"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import "../../styles/css/user/style.css"

const User: React.FC = () => {
  const token = useSelector((state: RootState) => state.signed.token)
  const navigate = useNavigate()
  useEffect(() => {
    if (token === null) {
      navigate("/sign-in")
    }
  }, [token, navigate])

  if (token === null) {
    return <div>Loading...</div>
  }
  return (
    <div className="user-conteneur">
      <div className="user-info-conteneur">
        <h1>
          Welcome back <br />
          {token}
        </h1>
        <button className="btn-edit">Edit Name</button>
      </div>
      <div className="checkings-conteneur">
        <Collapse checking={""} money={1} />
        <Collapse checking={""} money={100} />
        <Collapse checking={""} money={1} />
      </div>
    </div>
  )
}

export default User
