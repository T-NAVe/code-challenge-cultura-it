// 5. Generar un perfil de usuario en el cuál se puedan visualizar las tareas a completar, el último post creado, el último comentario realizado y la última foto cargada.
// El último comentario realizado por el usuario no es un endpoint disponible en la API, por lo que lo reemplazamos por el último comentario del último post
import { getAllPost, getUser, getUserPosts } from './getData'

export async function getAllPostsWithUsers () {
  const posts = await getAllPost()

  const users = []

  const postsWithUserName = await Promise.all(posts.map(async (post) => {
    users.includes(post.userId) && users.push(post.userId)
    const { username, email } = await getUser(post.userId)
    const posts = {
      ...post,
      username,
      email
    }
    return posts
  })
  )

  return postsWithUserName
}

export async function getUserPostsWithUsers (id) {
  const posts = await getUserPosts(id)

  const users = []

  const postsWithUserName = await Promise.all(posts.map(async (post) => {
    users.includes(post.userId) && users.push(post.userId)
    const { username, email } = await getUser(post.userId)
    const posts = {
      ...post,
      username,
      email
    }
    return posts
  })
  )

  return postsWithUserName
}
