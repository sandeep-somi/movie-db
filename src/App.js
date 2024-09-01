import { Routes, Route } from "react-router-dom"
import Header from './components/header'
import Starred from './pages/Starred'
import WatchLater from './pages/WatchLater'
import Home from './pages/Home'
import React from "react"
import './styles/app.scss'

const App = () => (
  <div className="App">
    <Header />
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/starred" element={<Starred />} />
        <Route path="/watch-later" element={<WatchLater />} />
        <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
      </Routes>
    </div>
  </div>
)

export default App
