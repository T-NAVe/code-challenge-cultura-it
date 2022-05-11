
import { API_URL } from './settings'

export async function getUser (id) {
  try {
    const res = await window.fetch(`${API_URL}/users/${id}`)
    const data = await res.json()
    const { address, phone, ...restOfData } = data
    const user = restOfData
    return user
  } catch (error) { console.log(error) }
}

export async function getAllPost () {
  try {
    const res = await window.fetch(`${API_URL}/posts`)
    const data = await res.json()
    return data
  } catch (error) { console.log(error) }
}

export async function getPostById (id) {
  try {
    const res = await window.fetch(`${API_URL}/posts/${id}`)
    const data = await res.json()
    return data
  } catch (error) { console.log(error) }
}

export async function getPostComments (id) {
  try {
    const res = await window.fetch(`${API_URL}/posts/${id}/comments`)
    const data = await res.json()
    return data
  } catch (error) { console.log(error) }
}

export async function getUserAlbums (id) {
  try {
    const res = await window.fetch(`${API_URL}/users/${id}/albums`)
    const data = await res.json()
    return data
  } catch (error) { console.log(error) }
}

/// albums/1/photos
export async function getAlbumPhotos (id) {
  try {
    const res = await window.fetch(`${API_URL}/albums/${id}/photos`)
    const data = await res.json()
    return data
  } catch (error) { console.log(error) }
}

export async function getUserTodos (id) {
  try {
    const res = await window.fetch(`${API_URL}/users/${id}/todos`)
    const data = await res.json()
    return data
  } catch (error) { console.log(error) }
}

export async function getUserPosts (id) {
  try {
    const res = await window.fetch(`${API_URL}/users/${id}/posts`)
    const data = await res.json()
    return data
  } catch (error) { console.log(error) }
}

export async function getAllAlbums () {
  try {
    const res = await window.fetch(`${API_URL}/albums`)
    const data = await res.json()
    return data
  } catch (error) { console.log(error) }
}
