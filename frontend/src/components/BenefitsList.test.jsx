import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import BenefitsList from './BenefitsList'

// Mock de los stores
vi.mock('../store/benefitsStore', () => ({
  useBenefitsStore: () => ({
    benefits: [],
    loading: false,
    error: null,
    fetchBenefits: vi.fn(),
    searchTerm: '',
    searchStatus: 'all',
    currentPage: 1,
    setCurrentPage: vi.fn(),
    itemsPerPage: 10
  })
}))

vi.mock('../store/favoritesStore', () => ({
  useFavoritesStore: () => ({
    favorites: [],
    toggleFavorite: vi.fn()
  })
}))

// Mock de los componentes hijos para simplificar
vi.mock('./SearchBox', () => ({
  default: () => <div data-testid="search-box">Search Box</div>
}))

vi.mock('./Pagination', () => ({
  default: () => <div data-testid="pagination">Pagination</div>
}))

describe('BenefitsList', () => {
  it('renders the component with empty benefits list', () => {
    render(
      <BrowserRouter>
        <BenefitsList />
      </BrowserRouter>
    )

    // Verificar que se muestra el mensaje de "no se encontraron beneficios"
    expect(screen.getByText(/No se encontraron beneficios/i)).toBeInTheDocument()
  })
})