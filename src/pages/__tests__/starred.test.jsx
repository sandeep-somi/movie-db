import React from 'react'
import Starred from '../starred-movies'
import { render } from '@testing-library/react'
// eslint-disable-next-line jest/no-mocks-import
import wrapper from '../../__mocks__/provider-wrapper'

describe('Starred', () => {
  it('should render', () => {
    const { container } = render(<Starred />, { wrapper })
    expect(container).toBeDefined()
  })
})