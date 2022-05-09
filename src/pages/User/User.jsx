import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import Modal from '../../components/Modal'
import { useModal } from '../../hooks/useModal'
import { useUser } from '../../hooks/useUser'
import { getAvatar } from '../../utils'
import './styles.css'

export default function User () {
  const { id } = useParams()
  const { user, lastAlbumPhoto, latestPost, todosToComplete, loading, latestPostComment, todos } = useUser({ id })
  const { showModal, handleModalClick } = useModal()
  const { showModal: showTable, handleModalClick: handleTableClick } = useModal()

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
                <h2 className='title ml-3 is-4'>My Tasks</h2>
                <table className='table is-fullwidth'>
                  <tbody>
                    {todos.length && todos.map(todo =>
                      (
                        <tr key={todo.id}>
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
          <div className='card p-4 mt-4'>
            <h2 className='title is-3 p-4'>Latest Photo</h2>
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
            <h2 className='title is-3 p-4'>Latest Post</h2>
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
            <footer>
              <button className='button is-dark button-is-medium'>View All Posts</button>
            </footer>
          </div>
        </div>

      </div>
    </div>
  )
}
