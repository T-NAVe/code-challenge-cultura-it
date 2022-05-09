import { useState, useEffect } from 'react'
import getUserProfileData from '../services/getUserProfileData'
import { useNavigate } from 'react-router-dom'

export function useUser ({ id }) {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [lastAlbumPhoto, setlastAlbumPhoto] = useState({})
  const [latestPostComment, setLatestPostComment] = useState({})
  const [latestPost, setLatestPost] = useState({})
  const [todosToComplete, setTodosToComplete] = useState({})
  const [todos, setTodos] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getUserProfileData(id).then(data => {
      const { user, lastAlbumPhoto, latestPost, todosToComplete, latestPostComment, todos, error } = data
      if (error) {
        setLoading(false)
        navigate('/404-not-found')
      }
      setUser(user)
      setlastAlbumPhoto(lastAlbumPhoto)
      setLatestPostComment(latestPostComment)
      setLatestPost(latestPost)
      setTodosToComplete(todosToComplete)
      setLoading(false)
      setTodos(todos)
    })
  }, [])

  return ({ user, lastAlbumPhoto, latestPost, todosToComplete, latestPostComment, loading, todos })
}
