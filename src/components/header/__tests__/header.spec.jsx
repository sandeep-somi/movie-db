import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from '../../../redux/store'
import Header from '../header'

describe('Header', () => {
  const wrapper = ({ children }) => (
    <Provider store={store}>
      <Router>
        {children}
      </Router>
    </Provider>
  )

  it('should render', () => {
    render(<Header />, { wrapper })
    expect(screen.getByTestId('movie-db-header')).toBeInTheDocument()
    expect(screen.getByText('Search movies...')).toBeInTheDocument()
  })
})

// test('Header renders and allows search input', () => {
//   const mockSearchMovies = jest.fn()

//   render(
//     <Provider store={store}>
//       <Router>
//         <Header searchMovies={mockSearchMovies} />
//       </Router>
//     </Provider>
//   )

//   const searchInput = screen.getByTestId('search-movies')
//   fireEvent.change(searchInput, { target: { value: 'Inception' } })
//   expect(searchInput.value).toBe('Inception')
//   expect(mockSearchMovies).toHaveBeenCalledWith('Inception')
// })