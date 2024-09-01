
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
// eslint-disable-next-line jest/no-mocks-import
import wrapper from '../../../__mocks__/provider-wrapper';
// eslint-disable-next-line jest/no-mocks-import
import { mockMovies } from '../../../__mocks__/movies.mock';
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

    expect(screen.getByTestId('layout')).toBeInTheDocument()
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Remove All')).toBeInTheDocument()
    expect(screen.queryByText('Test Subtitle')).not.toBeInTheDocument()
  })

  it('should render without movies', () => {
    const mockMovies = []
      render(
        <Layout
          movies={mockMovies}
          title="Test Title"
          subtitle="Test Subtitle"
          onClear={mockOnClear}
        />,
        { wrapper }
      )

    expect(screen.getByTestId('layout')).toBeInTheDocument()
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument()
    expect(screen.queryByText('Remove All')).not.toBeInTheDocument()
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
    expect(screen.getByText('Go to')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
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
