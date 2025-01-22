import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "../../state/store"
import { editAsync } from "../../state/signed/SignedSlice"

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
      console.log({ username: newUsername })
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

  return (
    <div className="user-info-conteneur">
      {isEditing ? (
        <div>
          <h1>Edit user info</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">User name:</label>
            <input
              type="text"
              name="username"
              value={newUsername}
              onChange={e => setNewUsername(e.target.value)}
            ></input>
            <label htmlFor="name">First name:</label>
            <input
              type="text"
              name="name"
              id=""
              readOnly
              defaultValue={firstname}
            />
            <label htmlFor="lastname">last name:</label>
            <input
              type="text"
              name="lastname"
              id=""
              readOnly
              defaultValue={lastname}
            />
            <div className="button-form">
              <button type="submit">Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h1>Welcome back {username}!</h1>
          <button onClick={() => setIsEditing(true)}>Edit Name</button>
        </div>
      )}
    </div>
  )
}

export default UserInfo
