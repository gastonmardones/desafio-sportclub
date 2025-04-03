import { Link } from "react-router-dom"
import { Heart } from "lucide-react"
import { useFavoritesStore } from "../store/favoritesStore"
import logo from "../assets/images/logo.png"

const Header = () => {
  const { favorites } = useFavoritesStore()
  const favoritesCount = favorites.length

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src={logo} 
            alt="SportClub Logo" 
            className="h-10"
          />
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            to="/favoritos"
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            aria-label="Ver favoritos"
          >
            <Heart className={`${favoritesCount > 0 ? "fill-red-600 stroke-red-600" : ""}`} size={20} />
            <span className="hidden sm:inline">Favoritos</span>
            {favoritesCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                {favoritesCount}
              </span>
            )}
          </Link>

        </nav>
      </div>
    </header>
  )
}

export default Header
