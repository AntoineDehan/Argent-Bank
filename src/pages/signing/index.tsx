import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { connexionAsync } from "../../state/signed/SignedSlice"
import { infoAsync } from "../../state/signed/SignedSlice"
import { AppDispatch, RootState } from "../../state/store"
import { useNavigate } from "react-router-dom"

import "../../styles/css/signin/style.css"

const Signing: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { token, error } = useSelector((state: RootState) => state.signed)

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const resultAction = await dispatch(connexionAsync({ email, password }))

      if (connexionAsync.fulfilled.match(resultAction)) {
        console.log("Login successful!")
        console.log("Dispatching infoAsync...")
        dispatch(infoAsync())
        navigate("/user")
      } else {
        console.error("Login failed:", resultAction.payload)
      }
    } catch (err) {
      console.error("Unexpected error:", err)
    }
  }

  return (
    <div className="signing-conteneur">
      <section className="form-conteneur">
        <div className="top-form">
          <FontAwesomeIcon icon={faCircleUser} />
          <h1>Sign In</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username </label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="btn" type="submit">
            Sign In
          </button>
        </form>
      </section>
    </div>
  )
}

export default Signing
