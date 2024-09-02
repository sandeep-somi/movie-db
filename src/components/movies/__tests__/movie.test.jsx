import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Movie from '../movie'
// eslint-disable-next-line jest/no-mocks-import
import { mockMovie } from '../../../constants/jest-helpers'
// eslint-disable-next-line jest/no-mocks-import
import wrapper from '../../../__mocks__/provider-wrapper'

describe('Movies', () => {
  const mockViewTrailer = jest.fn()
  it('should render', () => {
    const { container } = render(<Movie movie={mockMovie} viewTrailer={mockViewTrailer} />, { wrapper })
    expect(container).toBeDefined();
  })

  it('should add to watch list', async () => {
    render(<Movie movie={mockMovie} viewTrailer={mockViewTrailer} />, { wrapper })
    const watchLater = screen.getByTestId('watch-later');
    fireEvent.click(watchLater);
    await waitFor(() => {
      const removeWatchLater = screen.getByTestId('remove-watch-later');
      expect(removeWatchLater).toBeDefined();
    })
  })

  it('should remove from watch list', async () => {
    render(<Movie movie={mockMovie} viewTrailer={mockViewTrailer} />, { wrapper })
    const removeWatchLater = screen.getByTestId('remove-watch-later');
    fireEvent.click(removeWatchLater);
    await waitFor(() => {
      const watchLater = screen.getByTestId('watch-later');
      expect(watchLater).toBeDefined();
    })
  })
  
  it('should add to starred list', async () => {
    render(<Movie movie={mockMovie} viewTrailer={mockViewTrailer} />, { wrapper })
    const star = screen.getByTestId('starred-link');
    fireEvent.click(star);
    await waitFor(() => {
      const unstar = screen.getByTestId('unstar-link');
      expect(unstar).toBeDefined();
    })
  })

  it('should remove from starred list', async () => {
    render(<Movie movie={mockMovie} viewTrailer={mockViewTrailer} />, { wrapper })
    const unstar = screen.getByTestId('unstar-link');
    fireEvent.click(unstar);
    await waitFor(() => {
      const star = screen.getByTestId('starred-link');
      expect(star).toBeDefined();
    })
  })

  it('should call the view trailer function', () => {
    render(<Movie movie={mockMovie} viewTrailer={mockViewTrailer} />, { wrapper })
    const viewTrailer = screen.getByTestId('view-trailer');
    fireEvent.click(viewTrailer);
    expect(mockViewTrailer).toHaveBeenCalled();
  })

  it('should load placeholder image if the poster path is not available', () => {
    render(<Movie movie={{ ...mockMovie, poster_path: null }} viewTrailer={mockViewTrailer} />, { wrapper })
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/images/not-found-500X750.jpeg');
  })
})
