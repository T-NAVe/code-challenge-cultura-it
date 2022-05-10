import { useState } from 'react'

export function useModal () {
  const [showModal, setShowModal] = useState(false)

  const handleModalClick = () => {
    // need to do this with javascript, since does not work as intended
    document.querySelector('html').classList.toggle('prevent-scroll')
    // document.html.classList.toggle('prevent-scroll', showModal)
    setShowModal(prev => !prev)
  }

  return { showModal, handleModalClick }
}
