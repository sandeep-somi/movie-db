import React from 'react'
import { render } from '@testing-library/react'
import Movies from '../movies'
// eslint-disable-next-line jest/no-mocks-import
import { movies } from '../../../constants/jest-helpers'
// eslint-disable-next-line jest/no-mocks-import
import wrapper from '../../../__mocks__/provider-wrapper'

describe('Movies', () => {
  it('should render', () => {
    const { container } = render(<Movies movies={movies.results} />, { wrapper })
    expect(container).toBeInTheDocument()
  })
})
