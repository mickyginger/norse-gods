export const TOGGLE_NAVBAR = 'TOGGLE_NAVBAR'
export const CLOSE_NAVBAR = 'CLOSE_NAVBAR'

export function toggleNavbar() {
  return { type: TOGGLE_NAVBAR }
}

export function closeNavbar() {
  return { type: CLOSE_NAVBAR }
}
