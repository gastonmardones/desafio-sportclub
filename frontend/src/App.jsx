import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import BenefitsList from "./components/BenefitsList"
import BenefitDetail from "./components/BenefitDetail"
import FavoritesList from "./components/FavoritesList"
import Header from "./components/Header"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<BenefitsList />} />
            <Route path="/beneficios" element={<BenefitsList />} />
            <Route path="/beneficios/:id" element={<BenefitDetail />} />
            <Route path="/favoritos" element={<FavoritesList />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

