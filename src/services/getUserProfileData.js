// 5. Generar un perfil de usuario en el cuál se puedan visualizar las tareas a completar, el último post creado, el último comentario realizado y la última foto cargada.
// El último comentario realizado por el usuario no es un endpoint disponible en la API, por lo que lo reemplazamos por el último comentario del último post
import { lastItem } from '../utils'
import { getUser, getUserAlbums, getUserPosts, getUserTodos, getAlbumPhotos, getPostComments } from './getData'

async function getLastAlbumPhoto (userId) {
  const albums = await getUserAlbums(userId)
  const lastAlbum = lastItem(albums)
  const photos = await getAlbumPhotos(lastAlbum.id)
  return lastItem(photos)
}

export default async function getUserProfileData (id) {
  try {
    const user = await getUser(id)
    const posts = await getUserPosts(id)
    const postComments = await getPostComments(lastItem(posts).id)
    const latestPostComment = lastItem(postComments)
    const lastAlbumPhoto = await getLastAlbumPhoto(id)
    const todos = await getUserTodos(id)

    const userData = {
      user,
      lastAlbumPhoto,
      latestPost: lastItem(posts),
      latestPostComment,
      todosToComplete: todos.filter(todo => todo.completed === false),
      todos
    }
    return userData
  } catch (error) {
    return { error }
  }
}
