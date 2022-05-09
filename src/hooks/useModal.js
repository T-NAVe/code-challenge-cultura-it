import { useState } from 'react'

export function useModal () {
  const [showModal, setShowModal] = useState(false)

  const handleModalClick = () => {
    setShowModal(prev => !prev)
  }

  return { showModal, handleModalClick }
}
