import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminPage from "../features/admin/AdminPage.jsx"
import '../styles/index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
