import { useState } from 'react'

const useCardOpen = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleCard = () => {
    if (window.innerWidth < 481) {
      setIsOpen(!isOpen)
    }
  }

  return { isOpen, toggleCard }

}

export default useCardOpen