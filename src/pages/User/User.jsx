import { useParams } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import styles from './styles.module.css'

export default function User () {
  const { id } = useParams()
  const { user, lastAlbumPhoto, latestPost, todosToComplete, loading, latestPostComment } = useUser({ id })

  return (
    <div>
      <div>
        <h2>{user.username}</h2>
        <p>{user.email}</p>
        <img className={styles.avatar} src={`https://avatars.dicebear.com/api/initials/${user.username}.svg`} alt={user.username} />

      </div>
      <figure>
        <h3>{lastAlbumPhoto.title}</h3>
        <img src={lastAlbumPhoto.url} alt={lastAlbumPhoto.title} />
      </figure>
      <h2>Latest Post</h2>
      <div>
        <h3>{latestPost.title}</h3>
        <p>{latestPost.body}</p>
        <h3>Comments</h3>
        <ul>
          <li>
            {latestPostComment.email}
          </li>
        </ul>
      </div>
    </div>
  )
}
