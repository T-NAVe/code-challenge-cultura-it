import { useState } from 'react'

export function useModal () {
  const [showModal, setShowModal] = useState(false)

  const handleModalClick = () => {
    // need to do this with javascript, since does not work as intended
    // document.body.toggleAttribute('prevent-scroll')
    setShowModal(prev => !prev)
  }

  return { showModal, handleModalClick }
}
