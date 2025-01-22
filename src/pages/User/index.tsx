import Collapse from "../../componants/Collapse"
import { useSelector } from "react-redux"
import { RootState } from "../../state/store"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import "../../styles/css/user/style.css"
import UserInfo from "../../componants/UserInfo"

const User: React.FC = () => {
  const token = useSelector((state: RootState) => state.signed.token)
  const navigate = useNavigate()
  useEffect(() => {
    if (token === null) {
      navigate("/sign-in")
    }
  }, [token, navigate])

  return (
    <div className="user-conteneur">
      <UserInfo />
      <div className="checkings-conteneur">
        <Collapse checking={""} money={1} />
        <Collapse checking={""} money={100} />
        <Collapse checking={""} money={1} />
      </div>
    </div>
  )
}

export default User
