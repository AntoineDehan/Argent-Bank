import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "../../state/store"
import { editAsync } from "../../state/signed/SignedSlice"

import "../../styles/css/userinfo/style.css"

const UserInfo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isEditing, setIsEditing] = useState(false)

  const { token, username, firstname, lastname } = useSelector(
    (state: RootState) => ({
      token: state.signed.token,
      username: state.signed.username,
      firstname: state.signed.firstname,
      lastname: state.signed.lastname,
    }),
  )
  const [newUsername, setNewUsername] = useState<string>(username)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newUsername === username) {
      setIsEditing(false)
      setNewUsername(username)
      return
    }

    try {
      const resultAction = await dispatch(editAsync({ userName: newUsername }))

      if (editAsync.fulfilled.match(resultAction)) {
        console.log("Username updated successfully")
        setIsEditing(false)
      } else {
        console.error("Failed to update username")
      }
    } catch (error) {
      console.error("Error updating username:", error)
    }
  }

  //En cas qu'username soit un peu trop lent a charger
  useEffect(() => {
    if (username) {
      setNewUsername(username)
    }
  }, [username])

  return (
    <div className="user-info-componant">
      {isEditing ? (
        <div className="user-info-conteneur">
          <h1>Edit user info</h1>
          <form onSubmit={handleSubmit} className="user-info-form">
            <div className="active field">
              <label htmlFor="username">User name:</label>
              <input
                type="text"
                name="username"
                value={newUsername}
                onChange={e => setNewUsername(e.target.value)}
              ></input>
            </div>
            <div className="inactive field">
              <label htmlFor="name">First name:</label>
              <input
                type="text"
                name="name"
                id=""
                readOnly
                defaultValue={firstname}
              />
            </div>
            <div className="inactive field">
              <label htmlFor="lastname">last name:</label>
              <input
                type="text"
                name="lastname"
                id=""
                readOnly
                defaultValue={lastname}
              />
            </div>

            <div className="button-form">
              <button type="submit">Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="user-info-conteneur">
          <h1>Welcome back {username}!</h1>
          <button onClick={() => setIsEditing(true)}>Edit Name</button>
        </div>
      )}
    </div>
  )
}

export default UserInfo
