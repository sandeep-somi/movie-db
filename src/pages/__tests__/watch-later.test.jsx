import React from 'react'
import WatchLater from '../watch-later'
import { render } from '@testing-library/react'
// eslint-disable-next-line jest/no-mocks-import
import wrapper from '../../__mocks__/provider-wrapper'

describe('WatchLater', () => {
  it('should render', () => {
    const { container } = render(<WatchLater />, { wrapper })
    expect(container).toBeDefined()
  })
})