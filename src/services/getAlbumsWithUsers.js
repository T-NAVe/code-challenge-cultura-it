// https://jsonplaceholder.typicode.com/albums/1/photos
// 5. Generar un perfil de usuario en el cuál se puedan visualizar las tareas a completar, el último post creado, el último comentario realizado y la última foto cargada.
// El último comentario realizado por el usuario no es un endpoint disponible en la API, por lo que lo reemplazamos por el último comentario del último post
import { getUser, getAllAlbums, getUserAlbums } from './getData'

export async function getAllAlbumsWithUsers () {
  const albums = await getAllAlbums()

  const users = []

  const albumsWithUserName = await Promise.all(albums.map(async (album) => {
    users.includes(album.userId) && users.push(album.userId)
    const { username, email } = await getUser(album.userId)
    const posts = {
      ...album,
      username,
      email
    }
    return posts
  })
  )

  return albumsWithUserName
}

export async function getUserAlbumsWIthUser (id) {
  const albums = await getUserAlbums(id)

  const user = await getUser(id)
  const { username, email } = user

  const albumsWithUserName = albums.map((album) => {
    const albums = {
      ...album,
      username,
      email
    }
    return albums
  })

  return albumsWithUserName
}
