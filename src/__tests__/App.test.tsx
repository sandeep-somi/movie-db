import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
// eslint-disable-next-line jest/no-mocks-import
import wrapper from '../__mocks__/provider-wrapper'

describe('App', () => {
  it('renders watch later link', () => {
    render(<App />, {wrapper})
    const linkElement = screen.getByText(/Watch Later/i)
    expect(linkElement).toBeDefined()
  })

  it('renders watch later component', async () => {
    render(<App />, { wrapper })
    const user = userEvent.setup()
    await user.click(screen.getByText(/watch later/i))
    expect(screen.getByText(/There are no movies saved to watch later./i)).toBeDefined()
  })
})
