export default function Header ({ username, typeOfPage, handleFilter, sorted, id }) {
  return (
    <header className='header'>
      <h1>{id ? `${username} ${typeOfPage}` : `Watching all ${typeOfPage}`}</h1>
      <button onClick={handleFilter} className='button is-dark is-small'>{sorted ? 'View newer first' : 'View oldest first'}</button>
    </header>
  )
}
