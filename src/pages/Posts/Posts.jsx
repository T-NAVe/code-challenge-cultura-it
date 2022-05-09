import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Loading from '../../components/Loading'
import Modal from '../../components/Modal'
import { useModal } from '../../hooks/useModal'
import getAllPostsWithUsers from '../../services/getAllPostsWithUsers'
import { getPostComments } from '../../services/getData'
import { getAvatar } from '../../utils'
import './styles.css'

export default function Posts () {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [loadingComments, setLoadingComments] = useState(true)
  const [posts, setPosts] = useState([])
  const [postForModal, setPostForModal] = useState([])
  const { showModal, handleModalClick } = useModal()

  const handleClick = (post) => {
    if (post.id === postForModal.id && postForModal?.comments?.length) {
      handleModalClick()
    } else {
      setLoadingComments(true)
      setPostForModal(post)
      handleModalClick()
      getPostComments(post.id).then(data => {
        setLoadingComments(false)
        setPostForModal({ ...post, comments: data })
      }).catch(error => {
        console.log(error)
        if (error) navigate('/404-not-found')
      })
    }
  }

  useEffect(() => {
    !posts.length && getAllPostsWithUsers().then(posts => {
      setPosts(posts)
      setPostForModal(posts[0])
      setLoading(false)
    }).catch(error => {
      console.log(error)
      if (error) navigate('/404-not-found')
    })
  }, [postForModal])

  if (loading) {
    return <Loading />
  }
  return (
    <>
      <div className={showModal ? 'prevent-scroll' : 'post_wrapper'}>
        {posts.length && posts.map(post => (
          <div onClick={e => handleClick(post)} className='post box p-4 m-4 is-clickable' key={post.id}>
            <div className='container'>
              <figure className='image is-100x100'>
                <img src={getAvatar(post.username)} alt='avatar' />
              </figure>

              <h2 className='title is-4 pt-2 pb-2'>{post.username}</h2>
              <p className='subtitle pt-2 pb-2'>{post.email}</p>
            </div>
            <div className='content pt-2 pb-2'>
              <h2 className='title is-5'>{post.title}</h2>
              <p className='subtitle'>{post.body}</p>
            </div>
          </div>
        ))}
      </div>
      {
      postForModal && (
        <Modal cardTitle={`${postForModal.username} posted`} showModal={showModal} toggleModal={handleModalClick} isCard>
          <div className='columns'>
            <div className='column is-one-quarter media'>
              <div className='card-image'>
                <Link to={`/user/${postForModal.userId}`}>
                  <figure className='image is-64x64'>
                    <img src={getAvatar(postForModal.username)} alt={postForModal.username} />
                  </figure>
                </Link>
              </div>
              <div className='media-content'>
                <Link to={`/user/${postForModal.userId}`}>
                  <h2 className='title is-5'>{postForModal.username}</h2>
                  <p className='subtitle is-6'>{postForModal.email}</p>
                </Link>
              </div>
            </div>
            <div className='column content pt-2 pb-2'>
              <h2 className='title is-5'>{postForModal.title}</h2>
              <p className='subtitle is-5'>{postForModal.body}</p>
            </div>
          </div>
          {loadingComments
            ? <></>
            : (
              <div className='table-container'>
                <h3 className='title ml-3 is-4'>comments</h3>
                <table className='table is-fullwidth'>
                  <tbody>
                    {postForModal.comments.map(comment => (
                      <tr key={comment.id}>
                        <td>
                          <article className='media'>
                            <figure className='media-left'>
                              <p className='image is-48x48'>
                                <img src={getAvatar(comment.name)} />
                              </p>
                            </figure>
                            <div className='media-content'>
                              <div className='content post-content'>
                                <h4 className='title is-6 '>{comment.name}</h4>
                                <p className='subtitle is-7 '>{comment.email}</p>
                                <p className='subtitle is-5'>{comment.body}</p>
                              </div>
                            </div>
                          </article>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
              )}

        </Modal>
      )
      }
    </>
  )
}

/*
    "postId": 1,
    "id": 1,
    "name": "id labore ex et quam laborum",
    "email": "Eliseo@gardner.biz",
    "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"

*/
