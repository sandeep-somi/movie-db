import React from 'react'
import { render, screen, waitFor } from "@testing-library/react"
import YoutubePlayer from "../youtube-player"

describe('YoutubePlayer', () => {
  it('should render', () => {
    const { container } = render(<YoutubePlayer />)
    expect(container).toBeInTheDocument()
  })

  it('should play video', async () => {

    render(<YoutubePlayer videoKey="cdx31ak4KbQ" />)

    await waitFor(() => {
      screen.debug()
      const player = screen.getByTestId('youtube-player')
      expect(player).toBeInTheDocument()
    })
  })
})