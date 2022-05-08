// 5. Generar un perfil de usuario en el cuál se puedan visualizar las tareas a completar, el último post creado, el último comentario realizado y la última foto cargada.
// El último comentario realizado por el usuario no es un endpoint disponible en la API, por lo que lo reemplazamos por el último comentario del último post
import { getLastItem } from '../utils'
import { getUser, getUserAlbums, getUserPosts, getUserTodos, getAlbumPhotos, getPostComments } from './getData'

async function getLastAlbumPhoto (userId) {
  const albums = await getUserAlbums(userId)
  const lastAlbum = getLastItem(albums)
  const photos = await getAlbumPhotos(lastAlbum.id)
  return getLastItem(photos)
}

export default async function getUserProfileData (id) {
  const user = await getUser(id)
  const posts = await getUserPosts(id)
  console.log(posts)
  const postComments = await getPostComments(getLastItem(posts).id)
  const latestPostComment = getLastItem(postComments)
  const lastAlbumPhoto = await getLastAlbumPhoto(id)
  const todos = await getUserTodos(id)

  const userData = {
    user,
    lastAlbumPhoto,
    latestPost: getLastItem(posts),
    latestPostComment,
    todosToComplete: todos.filter(todo => todo.completed === false)
  }
  return userData
}
