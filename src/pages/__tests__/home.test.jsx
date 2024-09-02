import React from 'react'
import Home from '../home'
import { render } from '@testing-library/react'
// eslint-disable-next-line jest/no-mocks-import
import wrapper from '../../__mocks__/provider-wrapper'

describe('Home', () => {
  it('should render', () => {
    const { container } = render(<Home />, { wrapper })
    expect(container).toBeDefined()
  })
})