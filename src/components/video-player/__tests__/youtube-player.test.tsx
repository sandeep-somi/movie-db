import React from 'react'
import { render } from "@testing-library/react"
import YoutubePlayer from "../youtube-player"

describe('YoutubePlayer', () => {
  it('should render', () => {
    const { container } = render(<YoutubePlayer />)
    expect(container).toBeDefined()
  })
})