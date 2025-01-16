import Collapse from "../../componants/Collapse"

import "../../styles/css/user/style.css"

function User() {
  return (
    <div className="user-conteneur">
      <div className="user-info-conteneur">
        <h1>
          Welcome back <br />
          $USER!
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
