
export default function Modal ({ children, showModal, toggleModal, isCard = false, cardTitle = '' }) {
  return (
    <div className={showModal ? 'modal is-active' : 'modal'}>
      {isCard
        ? (
          <>
            <div onClick={toggleModal} className='modal-background' />
            <div className='modal-card'>
              <header className='modal-card-head'>
                <p className='modal-card-title'>{cardTitle}</p>
              </header>
              <section className='modal-card-body'>
                {children}
              </section>
              <button onClick={toggleModal} className='modal-close is-large' aria-label='close' />
            </div>
          </>
          )
        : (
          <>
            <div onClick={toggleModal} className='modal-background' />
            <div className='modal-content'>
              {children}
            </div>
            <button onClick={toggleModal} className='modal-close is-large' aria-label='close' />
          </>

          )}
    </div>

  )
}
