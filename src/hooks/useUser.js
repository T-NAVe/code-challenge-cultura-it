import { useState, useEffect } from 'react'
import getUserProfileData from '../services/getUserProfileData'

export function useUser ({ id }) {
  const [user, setUser] = useState({})
  const [lastAlbumPhoto, setlastAlbumPhoto] = useState({})
  const [latestPostComment, setLatestPostComment] = useState({})
  const [latestPost, setLatestPost] = useState({})
  const [todosToComplete, setTodosToComplete] = useState({})
  const [todos, setTodos] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getUserProfileData(id).then(data => {
      const { user, lastAlbumPhoto, latestPost, todosToComplete, latestPostComment, todos } = data
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
