
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
// eslint-disable-next-line jest/no-mocks-import
import wrapper from '../../../__mocks__/provider-wrapper';
// eslint-disable-next-line jest/no-mocks-import
import { mockMovies } from '../../../constants/jest-helpers';
import Layout from '../layout'

describe('Layout', () => {
  const mockOnClear = jest.fn()

  it('should render with movies', () => {
    render(
        <Layout
        movies={mockMovies.results}
          title="Test Title"
          subtitle="Test Subtitle"
          onClear={mockOnClear}
        />,
        { wrapper }
    )

    expect(screen.getByTestId('layout')).toBeDefined()
    expect(screen.getByText('Test Title')).toBeDefined()
    expect(screen.getByText('Remove All')).toBeDefined()
    expect(screen.queryByText('Test Subtitle')).toBeNull()
  })

  it('should render without movies', () => {
    const movies = []
      render(
        <Layout
          movies={movies}
          title="Test Title"
          subtitle="Test Subtitle"
          onClear={mockOnClear}
        />,
        { wrapper }
      )

    expect(screen.getByTestId('layout')).toBeDefined()
    expect(screen.queryByText('Test Title')).toBeNull()
    expect(screen.queryByText('Remove All')).toBeNull()
    expect(screen.getByText('Test Subtitle')).toBeDefined()
    expect(screen.getByText('Go to')).toBeDefined()
    expect(screen.getByText('Home')).toBeDefined()
  })

  it('should calls onClear when Remove All button is clicked', () => {
      render(
        <Layout
          movies={mockMovies.results}
          title="Test Title"
          subtitle="Test Subtitle"
          onClear={mockOnClear}
        />,
        { wrapper }
      )

    fireEvent.click(screen.getByText('Remove All'))
    expect(mockOnClear).toHaveBeenCalledTimes(1)
  })
})
