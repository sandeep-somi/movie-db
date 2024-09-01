import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Modal from '../modal'

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (element, target) => {
    return element
  },
}))

describe('Modal', () => {
  let portalRoot

  beforeEach(() => {
    portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'modal-portal')
    document.body.appendChild(portalRoot)
  })

  afterEach(() => {
    document.body.removeChild(portalRoot)
    portalRoot = null
  })

  const mockOnClose = jest.fn()
  const mockChildren = <div>Test Content</div>

  it('should render', () => {
    const { container } = render(
      <Modal isOpen={true} onClose={mockOnClose}>
        {mockChildren}
      </Modal>
    )

    expect(container).toBeInTheDocument()
  })

  it('should renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        {mockChildren}
      </Modal>
    )

    expect(screen.getByTestId('modal')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose}>
        {mockChildren}
      </Modal>
    )

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
  })
})
