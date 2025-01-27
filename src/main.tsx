import React from "react"
import { createRoot } from "react-dom/client"

import ReactDOM from "react-dom"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import ErrorPage from "./componants/Error"
import User from "./pages/User"
import Signing from "./pages/signing"

import Header from "./componants/Header"
import Footer from "./componants/Footer"
import "./index.css"

//redux
import { Provider } from "react-redux"
import { store } from "./state/store"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<Signing />} />
            <Route path="/user" element={<User />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </Router>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
