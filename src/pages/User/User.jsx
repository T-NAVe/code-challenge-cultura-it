import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import Modal from '../../components/Modal'
import { useModal } from '../../hooks/useModal'
import { useUser } from '../../hooks/useUser'
import { getAvatar } from '../../utils'
import './styles.css'

export default function User () {
  const { id } = useParams()
  const { user, lastAlbumPhoto, latestPost, todosToComplete, loading, latestPostComment, todos, setTodos } = useUser({ id })
  const { showModal, handleModalClick } = useModal()
  const { showModal: showTable, handleModalClick: handleTableClick } = useModal()
  const [type, setType] = useState({
    completed: false,
    ascending: false,
    name: false
  })

  const handleFilterByCompleted = (e, whatToSort) => {
    e.stopPropagation()
    if (whatToSort === 'byCompleted' && !type.completed) {
      setType(prev => ({ ...prev, completed: !prev.completed }))
      setTodos(todos.sort((a, b) => Number(b.completed) - Number(a.completed)))
    } else {
      setType(prev => ({ ...prev, completed: !prev.completed }))
      setTodos(todos.sort((a, b) => Number(a.completed) - Number(b.completed)))
    }
  }
  const handleFilterByOrder = (e, whatToSort) => {
    e.stopPropagation()
    if (whatToSort === 'byOrder' && !type.ascending) {
      setType(prev => ({ ...prev, ascending: !prev.ascending }))
      setTodos(todos.sort((a, b) => b.id - a.id))
    } else {
      setType(prev => ({ ...prev, ascending: !prev.ascending }))
      setTodos(todos.sort((a, b) => a.id - b.id))
    }
  }

  const handleFilterByName = (e, whatToSort) => {
    e.stopPropagation()
    if (whatToSort === 'byName' && !type.name) {
      setType(prev => ({ ...prev, name: !prev.name }))
      setTodos(todos.sort((a, b) => a.title.localeCompare(b.title)))
    } else {
      setType(prev => ({ ...prev, name: !prev.name }))
      setTodos(todos.sort((a, b) => -1 * a.title.localeCompare(b.title)))
    }
  }
  if (loading) {
    return <Loading />
  }
  return (
    <div style={{ height: '100%' }} className='container'>
      <div className='columns is-desktop'>

        <div className='column'>
          <div className='card p-4 mt-4'>
            <div className='card-content'>
              <div className='media'>
                <div className='media-left'>
                  <div className='card-image'>
                    <figure className='image is-64x64'>
                      <img src={getAvatar(user.username)} alt={user.username} />
                    </figure>
                  </div>
                </div>
                <div className='media-content'>
                  <h2 className='title is-5'>{user.username}</h2>
                  <p className='subtitle is-6'>{user.email}</p>
                </div>
              </div>
            </div>
            <div className='table-container'>
              <h2 className='title ml-3 is-4'>My Tasks</h2>
              <table onClick={handleTableClick} className='table is-clickable is-fullwidth'>
                <tbody>
                  {todosToComplete.length && todosToComplete.map((todo, index) =>
                    index > 3 && (
                      <tr key={todo.id}>
                        <td>{todo.title}</td>
                        <td>{todo.completed ? '✔' : '❌'}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
            <Modal cardTitle={user.username} isCard showModal={showTable} toggleModal={handleTableClick}>
              <div className='table-container'>
                <span className='card-title'>
                  <h2 className='title ml-3 is-4'>My Tasks</h2>
                </span>
                <table className='table is-fullwidth'>
                  <thead>
                    <tr>
                      <th className='is-clickable'><p onClick={e => handleFilterByOrder(e, 'byOrder')}>id</p></th>
                      <th className='is-clickable'><p onClick={e => handleFilterByName(e, 'byName')}>Title</p></th>
                      <th className='is-clickable'><p onClick={e => handleFilterByCompleted(e, 'byCompleted')}>Status</p></th>
                    </tr>
                  </thead>
                  <tbody>
                    {todos.length && todos.map(todo =>
                      (
                        <tr key={todo.id}>
                          <td>{todo.id}</td>
                          <td>{todo.title}</td>
                          <td>{todo.completed ? '✔' : '❌'}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </Modal>
          </div>
        </div>

        <div className='column'>
          <div className='card is-fullheight p-4 mt-4'>
            <span className='card-title'>
              <h2 className='title is-3 p-4'>Latest Photo</h2>
              <span className='p-4'>
                <Link to={`/albums/${id}`} className='button is-dark'>View all</Link>
              </span>
            </span>

            <div className='card-image'>
              <figure onClick={handleModalClick} className='image is-clickable is-4by3'>
                <h3>{lastAlbumPhoto.title}</h3>
                <img src={lastAlbumPhoto.url} alt={lastAlbumPhoto.title} />
              </figure>
            </div>
            <Modal showModal={showModal} toggleModal={handleModalClick}>
              <p className='image is-4by3'>
                <img src={lastAlbumPhoto.url} alt={lastAlbumPhoto.title} />
              </p>
            </Modal>
          </div>
        </div>

        <div className='column'>
          <div className='card p-4 mt-4'>
            <span className='card-title'>
              <h2 className='title is-3 p-4'>Latest Post</h2>
              <span className='p-4'>
                <Link to={`/posts/${id}`} className='button is-dark'>View all</Link>
              </span>
            </span>
            <div className='card-content'>
              <h3 className='title is-4'>{latestPost.title}</h3>
              <p className='content'>{latestPost.body}</p>
              <h3>Last Coment</h3>
              <div className='card-content'>
                <ul>
                  <li className='content'>
                    <p>from {latestPostComment.email}</p>
                    <p>{latestPostComment.body}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
