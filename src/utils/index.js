import { AVATAR_RUL } from '../services/settings'

export const lastItem = (arr) => {
  const lastItem = arr.slice(-1)[0]
  return lastItem
}
export const getAvatar = (name) => {
  const avatar = `${AVATAR_RUL}${name}.svg`
  return avatar
}
