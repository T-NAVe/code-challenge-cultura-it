import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import Modal from '../../components/Modal'
import { useModal } from '../../hooks/useModal'
import { getAlbumPhotos } from '../../services/getData'
import { getAllAlbumsWithUsers, getUserAlbumsWIthUser } from '../../services/getAlbumsWithUsers'

import { getAvatar } from '../../utils'
import './styles.css'
import Header from '../../components/Header'

export default function Posts () {
  const { id } = useParams()

  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [loadingPhotos, setLoadingPhotos] = useState(true)
  const [albums, setAlbums] = useState([])
  const [albumForModal, setAlbumForModal] = useState([])
  const { showModal, handleModalClick } = useModal()
  const [sorted, setSorted] = useState(false)

  const handleClick = (album) => {
    if (album.id === albumForModal.id && albumForModal.photos?.length) {
      handleModalClick()
    } else {
      setLoadingPhotos(true)
      setAlbumForModal(album)
      handleModalClick()
      getAlbumPhotos(album.id).then(data => {
        setLoadingPhotos(false)
        setAlbumForModal({ ...album, photos: data })
      }).catch(error => {
        console.log(error)
        if (error) navigate('/404-not-found')
      })
    }
  }

  const handleFilter = () => {
    if (!sorted) {
      const sortedAlbums = albums.sort((a, b) => b.id - a.id)
      setSorted(true)
      setAlbums(sortedAlbums)
    } else {
      const sortedAlbums = albums.sort((a, b) => a.id - b.id)
      setSorted(false)
      setAlbums(sortedAlbums)
    }
  }

  useEffect(() => {
    if (id) {
      !albums.length && getUserAlbumsWIthUser(id).then(albums => {
        setAlbums(albums)
        setAlbumForModal(albums[0])
        setLoading(false)
      }).catch(error => {
        console.log(error)
        if (error) navigate('/404-not-found')
      })
    } else {
      !albums.length && getAllAlbumsWithUsers().then(albums => {
        setAlbums(albums)
        setAlbumForModal(albums[0])
        setLoading(false)
      }).catch(error => {
        console.log(error)
        if (error) navigate('/404-not-found')
      })
    }
  }, [id, sorted])

  if (loading) {
    return <Loading />
  }
  return (
    <>
      <Header id={id} username={albums[0].username} typeOfPage='albums' handleFilter={handleFilter} sorted={sorted} />
      <div className='post_wrapper'>
        {albums.length && albums.map(album => (
          <div onClick={e => handleClick(album)} className='post box p-4 m-4 is-clickable' key={album.id}>
            <div className='container'>
              <figure className='image is-100x100'>
                <img src={getAvatar(album.username)} alt='avatar' />
              </figure>

              <h2 className='title is-4 pt-2 pb-2'>{album.username}</h2>
              <p className='subtitle pt-2 pb-2'>{album.email}</p>
            </div>
            <div className='content pt-2 pb-2'>
              <h2 className='title is-5'>{album.title}</h2>
            </div>
          </div>
        ))}
      </div>
      {
      albumForModal && (
        <Modal cardTitle={`${albumForModal.username} posted an album`} showModal={showModal} toggleModal={handleModalClick} isCard>
          <div className='columns'>
            <div className='column is-one-quarter media'>
              <div className='card-image'>
                <Link onClick={handleModalClick} to={`/user/${albumForModal.userId}`}>
                  <figure className='image is-64x64'>
                    <img src={getAvatar(albumForModal.username)} alt={albumForModal.username} />
                  </figure>
                </Link>
              </div>
              <div className='media-content'>
                <Link onClick={handleModalClick} to={`/user/${albumForModal.userId}`}>
                  <h2 className='title is-5'>{albumForModal.username}</h2>
                  <p className='subtitle is-6'>{albumForModal.email}</p>
                </Link>
              </div>
            </div>
            <div className='column content pt-2 pb-2'>
              <h2 className='title is-5'>{albumForModal.title}</h2>
            </div>
          </div>
          {loadingPhotos
            ? <Loading isLightMode />
            : (
              <div className='container'>
                <h3 className='title ml-3 is-4'>Photos</h3>
                <section className='album-photos is-fullwidth'>
                  {albumForModal.photos.map(photo => (
                    <div className='photo m-4' key={photo.id}>
                      <figure>
                        <div className='image'>
                          <img src={photo.url} />
                        </div>
                      </figure>
                      <h4 className='title ml-3 is-4'>{photo.title}</h4>
                    </div>
                  ))}
                </section>
              </div>
              )}
        </Modal>
      )
      }
    </>
  )
}
